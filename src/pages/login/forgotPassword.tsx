import { Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './login.module.css'
import { useDispatch } from "../../utils/type";
import { fogotPassword } from '../../utils/Api';  

const ForgotPassword: FC = () => {
    const dispatch = useDispatch();

    const [value, setValue] = React.useState({
        email: '',
    })
    const onClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(fogotPassword(value.email));
    };
    const inputRef = React.useRef(null)
    return (
        <div className={style.contnent}>
            <h2 className="mb-6 text text_type_main-medium">Восстановление пароля</h2>
            <form className={style.form} onSubmit={e => onClick(e)}>
                <EmailInput
                    onChange={e => setValue({
                        ...value,
                        email: e.target.value
                    })}
                    value={value.email}
                    name={'email'}
                    isIcon={false}
                />

            <Button htmlType="submit" type="primary" size="large">
                <Link to='/reset-password' className={style.text}>Восстановить</Link>

            </Button>
            </form>
            <p className="text text_type_main-default mb-4 mt-20 text_color_inactive" >
                Вспомнили пароль? <Link className={style.link} to='/login'>Войти</Link>
            </p>
        </div>
    )
}

export default ForgotPassword;