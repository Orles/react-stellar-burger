import { Input, EmailInput, PasswordInput, Button, CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './login.module.css'
import { useSelector } from "react-redux";
import { out } from '../../utils/Api';
import { useDispatch } from "react-redux";
import { userUpdates } from '../../utils/Api';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import { WS_CONNECTION_START_ORDERS, WS_SEND_MESSAGE_ORDERS, WS_DISCONECT_ORDERS } from '../../services/actions/ordersAction';

function Profile() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { burgerIngridients } = useSelector(state => state.burgerIngridients);
    const orders = useSelector((store) => store.orders.orders);
    const user = useSelector((store) => store.user.user);
    const [value, setValue] = React.useState({
        email: user.email,
        text: user.name,
        password: ''
    })

    React.useEffect(
        () => {
            if (user) {
                dispatch({
                    type: WS_CONNECTION_START_ORDERS,
                    payload: `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem("accessToken").replace('Bearer ', '')}`
                })
                dispatch({
                    type: WS_SEND_MESSAGE_ORDERS
                })
            }
            return () => {
                dispatch({
                    type: WS_DISCONECT_ORDERS
                })
            }
        }, []
    )

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

    function totalPrice(item) {
        let price = 0;
        item.map((b) => {
            burgerIngridients.map((i) => {
                if (b === i._id) {
                    price += i.price
                }
            })
        })
        return price
    }

    function gg(item) {
        if (item.ingredients.length <= 6) {
            return (burgerIngridients.map((i) => {
                for (const b of item.ingredients) {
                    for (const j in item.ingredients) {

                        if (b === i._id) {
                            return (
                                <li className={style.miniLi} key={b + j}>
                                    <img src={i.image} alt={i.name} />
                                </li>
                            )
                        }
                    }
                }
            }))
        } else {
            const g = item.ingredients.length - 6;
            const asd = item.ingredients.slice(0, 6);
            const jsxElements = []
            asd.forEach((r, index) => {
                burgerIngridients.forEach((i) => {
                    if (r === i._id) {
                        jsxElements.push(
                            <li className={style.miniLi} key={r + index}>
                                <img src={i.image} alt={i.name} className={style.img} />
                                {index === 0 ? (
                                    <div className={style.vid}>
                                        <p className={`${style.span} text text_type_main-small`}>{g}+</p>
                                    </div>
                                ) : null}

                            </li>
                        );
                    }
                });
            })
            return jsxElements
        }
    }

    const change = user.email !== value.email || user.name !== value.text || value.password !== ''
    const inputRef = React.useRef(null);

    if (!orders) return null
    const fds = orders.orders.slice().reverse();
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
                </form>}
            {location.pathname === '/profile/orders' && orders &&
                <ul className={`${style.ul} custom-scroll`}>
                    {fds.map((item) => {
                        return (
                            <Link to={`/profile/orders/${item._id}`} state={{ background: location }} className={style.color} key={item._id}>
                                <li className={style.li}>
                                    <div className={style.div}>
                                        <p className='text text_type_digits-default'>#{item.number}</p>
                                        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(item.createdAt)} />
                                    </div>
                                    <h3 className='text text_type_main-medium mb-2'>{item.name}</h3>
                                    <p className="text text_type_main-default mb-6">{item.status === 'done' ? 'Выполнен' : 'created' ? 'Создан' : 'Готовится'}</p>
                                    <div className={style.div}>
                                        <ul className={style.miniUl}>
                                            {
                                                gg(item)
                                            }

                                        </ul>
                                        <p className={`${style.p} text text_type_digits-default`}>{totalPrice(item.ingredients)} <CurrencyIcon type="primary" /></p>
                                    </div>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            }
        </div>
    )
}

export default Profile;