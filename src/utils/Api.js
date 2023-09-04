import { SET_USER, SET_AUTHCHECKED, TOGGLE_OK } from "../services/actions/userAction";

// const navigate = useNavigate();
const URL = 'https://norma.nomoreparties.space/api';

const onResponce = (res) => {
  return res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
}

export function getData() {
  return fetch(`${URL}/ingredients`)
    .then((res) => onResponce(res))
}

export function postIngridients(ingredients) {
  return fetch(`${URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ingredients
    })
  }).then((res) => onResponce(res))
}

export function registerUser(name, email, password) {
  return (dispatch) => {
    return fetch('https://norma.nomoreparties.space/api/auth/register', {
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

export const login = (email, password) => {
  return (dispatch) => {
    return fetch("https://norma.nomoreparties.space/api/auth/login", {
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
  return (dispatch) => {
    return fetch("https://norma.nomoreparties.space/api/auth/logout", {
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
  return fetch("https://norma.nomoreparties.space/api/auth/token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken")
    })
  }).then(res => onResponce(res));
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await onResponce(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("accessToken", refreshData.accessToken);
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await onResponce(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = () => {
  return (dispatch) => {
    return fetchWithRefresh("https://norma.nomoreparties.space/api/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken")
      }
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
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch((error) => {
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

export const fogotPassword = (email) => {
  return (dispatch) => {
    return fetch("https://norma.nomoreparties.space/api/password-reset", {
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
      });
  };
};

export const resetPassword = (password, token) => {
    return fetch("https://norma.nomoreparties.space/api/password-reset/reset", {
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
      .then(res => onResponce(res));
};

export const userUpdates = (email, password, name) => {
  return (dispatch) => {
  return fetch("https://norma.nomoreparties.space/api/auth/user", {
    method: "PATCH",
    headers: {
      authorization: localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
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
      } else {
        return Promise.reject("Ошибка данных с сервера");
      }
    });
}};