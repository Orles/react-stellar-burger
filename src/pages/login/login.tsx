import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './login.module.css'
import { login } from '../../utils/Api';
import { useDispatch } from "react-redux";

const Login: FC = () => {
    const dispatch = useDispatch();
    const [passwordShown, setPasswordShown] = React.useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const [value, setValue] = React.useState({
        email: '',
        password: '',
    })
    const inputRef = React.useRef(null)
    const onClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login(value.email, value.password));
    };
    return (
        <div className={style.contnent}>
            <h2 className="mb-6 text text_type_main-medium">Вход</h2>
            <form className={style.form} onSubmit={e => onClick(e)}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setValue({
                        ...value,
                        email: e.target.value
                    })}
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
                    onChange={e => setValue({
                        ...value,
                        password: e.target.value
                    })}
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
                Войти
            </Button>
            </form>
            <p className="text text_type_main-default mb-4 mt-20 text_color_inactive" >
                Вы — новый пользователь? <Link className={style.link} to='/register'>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Забыли пароль? <Link className={style.link} to='/forgot-password'>Восстановить пароль</Link>
            </p>
        </div>
    )
}

export default Login;