const URL = 'https://norma.nomoreparties.space/api';

const onResponce = (res) => {
    return res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`);
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