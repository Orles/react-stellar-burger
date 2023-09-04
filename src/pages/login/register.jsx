import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './login.module.css'
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser } from '../../utils/Api';


function Register() {
    const dispatch = useDispatch();
    const [passwordShown, setPasswordShown] = React.useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        name: ''
    })
    const inputRef = React.useRef(null)
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [name, setName] = useState("");

    // const onChangeEmail = (evt) => {
    //     setEmail(evt.target.value);
    // };

    // const onChangePass = (evt) => {
    //     setPassword(evt.target.value);
    // };

    // const onChangeName = (evt) => {
    //     setName(evt.target.value);
    // };

    const onClick = (e) => {
        e.preventDefault();
        dispatch(registerUser(value.name, value.email, value.password));
    };

    return (
        <div className={style.contnent}>
            <h2 className="mb-6 text text_type_main-medium">Регистрация</h2>
            <form className={style.form} onSubmit={e => onClick(e)}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={(e) => {
                        setValue({
                            ...value,
                            name: e.target.value
                        })
                        // onChangeName();
                    }}
                    value={value.name}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={(e) => {
                        setValue({
                            ...value,
                            email: e.target.value
                        })
                        // onChangeEmail();
                    }}
                    value={value.email}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
                <Input
                    type={passwordShown ? "text" : "password"}
                    placeholder={'Пароль'}
                    onChange={(e) => {
                        setValue({
                            ...value,
                            password: e.target.value
                        })
                        // onChangePass();
                    }}
                    icon={passwordShown ? 'ShowIcon' : 'HideIcon'}
                    value={value.password}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={togglePassword}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
            <Button htmlType="submit" type="primary" size="large">
                Зарегистрироваться
            </Button>
            </form>
            <p className="text text_type_main-default mb-4 mt-20 text_color_inactive" >
                Уже зарегистрированы? <Link className={style.link} to='/login'>Войти</Link>
            </p>
        </div>
    )
}

export default Register;