import { Input, EmailInput, PasswordInput, Button, CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import style from './login.module.css'
import { useSelector } from "../../utils/type";
import { out } from '../../utils/Api';
import { useDispatch } from "../../utils/type";
import { userUpdates } from '../../utils/Api';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import { WS_CONNECTION_START_ORDERS, WS_SEND_MESSAGE_ORDERS, WS_DISCONECT_ORDERS } from '../../services/actions/ordersAction';
import { Iingredient, Iorder, RootState } from '../../utils/type';

const Profile: FC = () => {
    const inputRef = React.useRef(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const { burgerIngridients } = useSelector((state: RootState) => state.burgerIngridients);
    const orders = useSelector((store: RootState) => store.orders.orders);
    const user = useSelector((store: RootState) => store.user.user);
    const [value, setValue] = React.useState({
        email: user?.email,
        text: user?.name,
        password: ''
    })

    React.useEffect(
        () => {
            if (user) {
                const accessToken = localStorage.getItem("accessToken")
                if (accessToken) {
                    dispatch({
                        type: WS_CONNECTION_START_ORDERS,
                        payload: `wss://norma.nomoreparties.space/orders?token=${accessToken.replace('Bearer ', '')}`
                    })
                    dispatch({
                        type: WS_SEND_MESSAGE_ORDERS
                    })
                }
            }
            return () => {
                dispatch({
                    type: WS_DISCONECT_ORDERS
                })
            }
        }, []
    )

    const [passwordShown, setPasswordShown] = React.useState<boolean>(true);

    function activ() {
        setPasswordShown(true)
    }

    if (passwordShown === false) {
        document.addEventListener('click', activ)
    }

    const outUser = () => {
        dispatch(out());
    }

    function onClick(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (value.email && value.password && value.text) {
            dispatch(userUpdates(value.email, value.password, value.text));
        }
        setValue({
            ...value,
            password: ''
        })
    }

    function cancellation() {
        setValue({
            email: user?.email,
            text: user?.name,
            password: ''
        })
    }

    function totalPrice(item: string[]) {
        let price = 0;
        item.map((b) => {
            burgerIngridients.map((i: Iingredient) => {
                if (b === i._id) {
                    price += i.price
                }
            })
        })
        return price
    }

    function gg(item: Iorder) {
        if (item.ingredients.length <= 6) {
            return (burgerIngridients.map((i: Iingredient) => {
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
            const jsxElements: React.ReactElement[] = []
            asd.forEach((r, index) => {
                burgerIngridients.forEach((i: Iingredient) => {
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

    const change = user?.email !== value.email || user?.name !== value.text || value.password !== ''

    if (!orders) return null
    const fds = orders.orders.slice().reverse();
    return (
        <div className={style.table}>
            <div className={style.container}>
                <ul className={style.list}>
                    <li className={style.item}>
                        <NavLink to='/profile' className={`${location.pathname === '/profile' ? `${style.active} text text_type_main-medium` : `${style.a} text text_type_main-medium text_color_inactive`}`}>Профиль</NavLink>

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
                    {value.text && <Input
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
                        disabled={passwordShown}
                    />}
                    {value.email && <EmailInput
                        onChange={e => setValue({
                            ...value,
                            email: e.target.value
                        })}
                        value={value.email}
                        name={'email'}
                        placeholder="Логин"
                        isIcon={true}
                        extraClass="mb-2"
                    />}
                    {value.password && <PasswordInput
                        onChange={e => setValue({
                            ...value,
                            password: e.target.value
                        })}
                        value={value.password}
                        name={'password'}
                        icon="EditIcon"
                    />}
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
                    {fds.map((item: Iorder) => {
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