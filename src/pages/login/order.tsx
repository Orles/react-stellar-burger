import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './order.module.css';
import { useLocation } from "react-router-dom";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { WS_CONNECTION_START_ORDERS, WS_SEND_MESSAGE_ORDERS, WS_DISCONECT_ORDERS } from "../../services/actions/ordersAction";
import { Iingredient, RootState } from "../../utils/type";

const Order: FC = () => {
    const user = useSelector((store: RootState) => store.user.user);
    const dispatch = useDispatch()
    const { id } = useParams();
    const location = useLocation();
    const background = location.state && location.state.background;
    React.useEffect(
        () => {
            if (!background && location.pathname === `/feed/${id}`) {
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
            } else if (!background && location.pathname === `/profile/orders/${id}`){
                if (user) {
                    const accessToken = localStorage.getItem("accessToken")
                    if (accessToken) {
                    dispatch({
                        type: WS_CONNECTION_START_ORDERS,
                        payload: `wss://norma.nomoreparties.space/orders?token=${accessToken.replace('Bearer ', '')}`
                    })
                    dispatch({
                        type: WS_SEND_MESSAGE_ORDERS
                    })}
                }
                return () => {
                    dispatch({
                        type: WS_DISCONECT_ORDERS
                    })
                }
            }
        }, [location.pathname, id, user]
    )
    const { orders } = useSelector((state: RootState) => state.orders);
    const { burgerIngridients } = useSelector((state: RootState) => state.burgerIngridients);
    let price = 0;
    console.log(orders)
    if (!orders) return null
    const order = orders.orders.find((item) => {
        return item._id === id
    })
    if (!order) return null
    interface IngredientsCount {
        [key: string]: number;
      }
      
      let asd: IngredientsCount = {};
    const dsa = () => {
        for (const item of order.ingredients) {
            if (!asd[item]) {
                asd[item] = 0;
            }
            asd[item]++;
        }
        return asd;
    }
    dsa()

    return (
        <div className={`${style.table} mt-30`}>
            <p className={`${style.number} text text_type_digits-default mb-10`}>#{order.number}</p>
            <h2 className={`${style.title} text text_type_main-medium mb-2`}>{order.name}</h2>
            <p className="text text_type_main-default mb-15">{order.status === 'done' ? 'Выполнен' : 'created' ? 'Создан' : 'Готовится'}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <ul className={`${style.list} custom-scroll`}>
                {Object.keys(asd).map((b) => {

                    return (burgerIngridients.map((i: Iingredient) => {
                        if (b === i._id) {
                            price += i.price * asd[b]
                            return (
                                <li className={style.items} key={b}>
                                    <div className={style.img} ><img src={i.image} alt={i.name} /></div>
                                    <p className="text text_type_main-default">{i.name}</p>
                                    <p className={`${style.cost} text text_type_digits-default`}>{asd[b]} x {i.price} <CurrencyIcon type="primary" /></p>
                                </li>
                            )
                        }
                    }
                    ))
                }

                )}
            </ul>
            <div className={`${style.div} mb-10`}>
                <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(order.createdAt)} /></p>
                <p className="text text_type_digits-default">{price} <CurrencyIcon type="primary"/></p>
            </div>
        </div>
    )
}

export default Order;