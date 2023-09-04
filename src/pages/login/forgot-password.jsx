import { Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './login.module.css'
import { useDispatch } from "react-redux";
import { fogotPassword } from '../../utils/Api';

function ForgotPassword() {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState({
        email: '',
    })
    const onClick = () => {
        dispatch(fogotPassword(value.email));
    };
    const inputRef = React.useRef(null)
    return (
        <div className={style.contnent}>
            <h2 className="mb-6 text text_type_main-medium">Восстановление пароля</h2>
            <form className={style.form}>
                {/* <Input
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
                /> */}
                <EmailInput
                type='email'
                    onChange={e => setValue({
                        ...value,
                        email: e.target.value
                    })}
                    value={value.email}
                    name={'email'}
                    isIcon={false}
                />

            </form>
            <Button htmlType="button" type="primary" size="large" onClick={onClick}>
                <Link to='/reset-password' className={style.text}>Восстановить</Link>

            </Button>
            <p className="text text_type_main-default mb-4 mt-20 text_color_inactive" >
                Вспомнили пароль? <Link className={style.link} to='/login'>Войти</Link>
            </p>
        </div>
    )
}

export default ForgotPassword;