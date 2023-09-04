import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './login.module.css'
import { useSelector } from "react-redux";
import { out } from '../../utils/Api';
import { useDispatch } from "react-redux";
import { userUpdates } from '../../utils/Api';
import { useLocation } from 'react-router-dom';

function Profile() {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user.user);
    const [value, setValue] = React.useState({
        email: user.email,
        text: user.name,
        password: ''
    })
    const [passwordShown, setPasswordShown] = React.useState(true);
    const togglePassword = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        setPasswordShown(false);
    };
    function activ() {
        setPasswordShown(true)
    }
    if (passwordShown === false) {
        document.addEventListener('click', activ)
    }
    const outUser = () => {
        dispatch(out());
    }

    function onClick(e) {
        e.preventDefault();
        dispatch(userUpdates(value.email, value.password, value.text));
        setValue({
            ...value,
            password: ''
        })
    }

    function cancellation() {
        setValue({
            email: user.email,
            text: user.name,
            password: ''
        })
    }

    const change = user.email !== value.email || user.name !== value.text || value.password !== ''
    // if (passwordShown === true) {
    //     document.removeEventListener('click', activ())
    // }
    const inputRef = React.useRef(null)
    return (
        <div className={style.table}>
            <div className={style.container}>
                <ul className={style.list}>
                    <li className={style.item}>
                        <NavLink to='/profile' className={({ asd = location.pathname === '/profile' }) =>
                        asd ? `${style.active} text text_type_main-medium` : `${style.a} text text_type_main-medium text_color_inactive`
                    }>Профиль</NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink to='/profile/orders' className={({ isActive }) =>
                        isActive ? `${style.active} text text_type_main-medium` : `${style.a} text text_type_main-medium text_color_inactive`
                    }>История заказов</NavLink>
                    </li>
                    <li className={style.item}>
                        <button className={`${style.b} text text_type_main-medium text_color_inactive`} onClick={outUser}>Выход</button>
                    </li>
                </ul>
                <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
            </div>
            {location.pathname === '/profile' &&
            <form className={style.form} onSubmit={e => onClick(e)}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setValue({
                        ...value,
                        text: e.target.value
                    })}
                    value={value.text}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    icon='EditIcon'
                    size={'default'}
                    extraClass="ml-1"
                    onIconClick={togglePassword}
                    disabled={passwordShown}
                />
                <EmailInput
                    onChange={e => setValue({
                        ...value,
                        email: e.target.value
                    })}
                    value={value.email}
                    name={'email'}
                    placeholder="Логин"
                    isIcon={true}
                    extraClass="mb-2"
                />
                <PasswordInput
                    onChange={e => setValue({
                        ...value,
                        password: e.target.value
                    })}
                    value={value.password}
                    name={'password'}
                    icon="EditIcon"
                />
                {change &&
                    <div className={style.buttons}>
                        <Button htmlType="button" type="secondary" size="medium" onClick={cancellation}>
                            Отмена
                        </Button>
                        <Button htmlType="submit" type="primary" size="medium" >
                            Сохранить
                        </Button>
                    </div>
                }
            </form> }
            {location.pathname === '/profile/orders' && 
                <p>asdasdasdasd</p>
            }
        </div>
    )
}

export default Profile;