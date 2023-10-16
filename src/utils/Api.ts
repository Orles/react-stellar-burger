import { SET_USER, SET_AUTHCHECKED, TOGGLE_OK } from "../services/actions/userAction";
import { AppDispatch } from "./type";

// const navigate = useNavigate();
const URL = 'https://norma.nomoreparties.space/api';

const onResponce = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
}

export function getData() {
  return fetch(`${URL}/ingredients`)
    .then((res) => onResponce(res))
    .catch(err => console.log(err))
}

export function postIngridients(ingredients: string[]) {
  const accessToken = localStorage.getItem("accessToken");
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return fetch(`${URL}/orders`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      ingredients,
    })
  })
    .then((res) => onResponce(res))
    .catch((err) => console.log(err));
}

export function registerUser(name: string, email: string, password: string) {
  return (dispatch: AppDispatch) => {
    return fetch(`${URL}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(onResponce)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: SET_USER,
            payload: res.user
          });
        } else {
          return Promise.reject("Ошибка данных с сервера");
        }
        console.log('as')
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: SET_AUTHCHECKED,
          payload: true
        });
      });
  }

}

export const login = (email: string, password: string) => {
  return (dispatch: AppDispatch) => {
    return fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(onResponce)
      .then((res) => {
        if (res.success) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: SET_USER,
            payload: res.user
          });
        } else {
          return Promise.reject("Ошибка данных с сервера");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: SET_AUTHCHECKED,
          payload: true
        });;
      });
  };
};

export const out = () => {
  return (dispatch: AppDispatch) => {
    return fetch(`${URL}/auth/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken")
      })
    })
      .then(onResponce)
      .then((res) => {
        if (res.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: SET_USER,
            payload: null
          });
        } else {
          return Promise.reject("Ошибка данных с сервера");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: SET_AUTHCHECKED,
          payload: false
        });;
      });
  };
};

const refreshToken = () => {
  return fetch(`${URL}/auth/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken")
    })
  }).then(res => onResponce(res))
    .catch(err => console.log(err))
};

interface IfetchOptions {
  method: string;
  headers: {
    "Content-Type": string;
    'Authorization'?: string;
  };
}

const fetchWithRefresh = async (url: string, options: IfetchOptions) => {
  try {
    const res = await fetch(url, options);
    return await onResponce(res);
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("accessToken", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await onResponce(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = () => {
  return (dispatch: AppDispatch) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers: IfetchOptions['headers'] = {
      'Content-Type': 'application/json',
    };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return fetchWithRefresh(`${URL}/auth/user`, {
      method: "GET",
      headers: headers,
    }).then((res) => {
      if (res.success) {
        dispatch({
          type: SET_USER,
          payload: res.user
        });
      } else {
        return Promise.reject("Ошибка данных с сервера");
      }
    });
  };
};

export const checkUserAuth = () => {
  return async (dispatch: any) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: SET_USER,
            payload: null
          });
        })
        .finally(() => dispatch({
          type: SET_AUTHCHECKED,
          payload: true
        }));
    } else {
      dispatch({
        type: SET_AUTHCHECKED,
        payload: true
      });
      dispatch({
        type: SET_USER,
        payload: null
      });
    }
  };
};

export const fogotPassword = (email: string) => {
  return (dispatch: AppDispatch) => {
    return fetch(`${URL}/password-reset`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email
      })
    },
    )
      .then(res => onResponce(res))
      .then((res) => {
        if (res.success) {
          dispatch({
            type: TOGGLE_OK,
            payload: true
          });
        } else {
          return Promise.reject("Ошибка данных с сервера");
        }
      })
      .catch(err => console.log(err))
  };
};

export const resetPassword = (password: string, token: string) => {
  return fetch(`${URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token
    })
  },
  )
    .then(res => onResponce(res))
    .catch(err => console.log(err))
};

export const userUpdates = (email: string, password: string, name: string) => {
  return (dispatch: AppDispatch) => {
    const accessToken = localStorage.getItem("accessToken");
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return fetch(`${URL}/auth/user`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({
        email,
        password,
        name
      })
    },
    )
      .then(res => onResponce(res))
      .then((res) => {
        if (res.success) {
          dispatch({
            type: SET_USER,
            payload: res.user
          });
          refreshToken()
            .then((res) => {
              if (res.success) {
                localStorage.setItem("refreshToken", res.refreshToken);
                localStorage.setItem("accessToken", res.accessToken);
              }
            })
        } else {
          return Promise.reject("Ошибка данных с сервера");
        }
      })
      .catch(err => console.log(err))
  }
};