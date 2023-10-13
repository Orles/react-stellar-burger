import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './login.module.css';
import { useNavigate } from "react-router-dom";
import { resetPassword } from '../../utils/Api';

function ResetPassword() {
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = React.useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const [value, setValue] = React.useState({
        token: '',
        password: '',
    })
    const inputRef = React.useRef(null);
    const onClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        return resetPassword(value.password, value.token)
        .then((res) => {
            if (res.success) {
              // dispatch({
              //   type: TOGGLE_OK,
              //   payload: false
              // });
              navigate('/login')
            } else {
              return Promise.reject("Ошибка данных с сервера");
            }
          });
    };
    return (
        <div className={style.contnent}>
            <h2 className="mb-6 text text_type_main-medium">Восстановление пароля</h2>
            <form className={style.form} onSubmit={e => onClick(e)}>
            <Input
                    type={passwordShown ? "text" : "password"}
                    placeholder={'Введите новый пароль'}
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
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setValue({
                        ...value,
                        token: e.target.value
                    })}
                    value={value.token}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
            <Button htmlType="submit" type="primary" size="large">
            Сохранить
            </Button>
            </form>
            <p className="text text_type_main-default mb-4 mt-20 text_color_inactive" >
            Вспомнили пароль? <Link className={style.link} to='/login'>Войти</Link>
            </p>
        </div>
    )
}

export default ResetPassword;