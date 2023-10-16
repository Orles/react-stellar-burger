import { useLocation } from 'react-router-dom';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import style from './login.module.css'
import { useSelector } from "../../utils/type";
import React, { FC, useEffect } from 'react';
import { useDispatch } from '../../utils/type';
import { WS_DISCONECT_ORDERS, WS_CONNECTION_START_ORDERS, WS_SEND_MESSAGE_ORDERS } from '../../services/actions/ordersAction';
import { RootState, Iingredient, Iorder } from '../../utils/type';

const Feed: FC = () => {
    const location = useLocation();
    const { burgerIngridients } = useSelector((state: RootState) => state.burgerIngridients);
    const dispatch = useDispatch();
    const { orders } = useSelector((state: RootState) => state.orders);
    useEffect(
        () => {
            dispatch({
                type: WS_CONNECTION_START_ORDERS,
                payload: 'wss://norma.nomoreparties.space/orders/all'
            })
            dispatch({
                type: WS_SEND_MESSAGE_ORDERS
            })
            return () => {
                dispatch({
                    type: WS_DISCONECT_ORDERS
                })
            }
        }, []
    )
    if (!orders) return null
    function totalPrice(item: string[]) {
        let price = 0;
        item.map((b: string) => {
            burgerIngridients.map((i: Iingredient) => {
                if (b === i._id) {
                    price += i.price
                }
            })
        })
        return price
    }
    function gg(item: Iorder, price: number) {
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
    const ordersDone: number[] = [];
    const ordersPending: number[] = [];
    function orderStatus() {
        if (orders) {
            orders.orders.map((i: Iorder) => {
                if (i.status === 'done') {
                    ordersDone.push(i.number);
                } else if (i.status === 'pending') {
                    ordersPending.push(i.number)
                }
            })
        }
    }
    orderStatus()

    return (
        <>
            <h2 className={`${style.titleFeed} text text_type_main-large`}>Лента заказов</h2>
            <div className={style.taburet}>
                <div className={style.stul}>
                    <ul className={`${style.ul} custom-scroll`}>
                        {orders.orders.map((item: Iorder) => {
                            let price = 0;
                            return (
                                <Link to={`/feed/${item._id}`} state={{ background: location }} className={style.color} key={item._id}>
                                    <li className={style.li}>
                                        <div className={style.div}>
                                            <p className='text text_type_digits-default'>#{item.number}</p>
                                            <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(item.createdAt)} />
                                        </div>
                                        <h3 className='text text_type_main-medium mb-2'>{item.name}</h3>
                                        {/* <p className="text text_type_main-default mb-6">{item.status === 'done' ? 'Выполнен' : 'created' ? 'Создан' : 'Готовится'}</p> */}
                                        <div className={style.div}>
                                            <ul className={style.miniUl}>
                                                {
                                                    gg(item, price)
                                                }

                                            </ul>
                                            <p className={`${style.p} text text_type_digits-default`}>{totalPrice(item.ingredients)} <CurrencyIcon type="primary" /></p>
                                        </div>
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                </div>
                <div className={style.tablo}>
                    <div className={style.containerFeed}>
                        <div className={style.tableFeed}>
                            <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                            <ul className={style.listFeed}>
                                {ordersDone.map((i, index) => {
                                    return (
                                        <li className="text text_type_digits-default" key={index}>{i}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                            <ul className={style.listFeed}>
                                {ordersPending.map((i, index) => {
                                    return (
                                        <li className={`${style.white} text text_type_digits-default`} key={index}>{i}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <p className="text text_type_main-medium">Выполнено за все время:</p>
                    <p className="text text_type_digits-large mb-15">{orders.total}</p>
                    <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                    <p className="text text_type_digits-large">{orders.totalToday}</p>
                </div>
            </div>
        </>
    )
}

export default Feed;