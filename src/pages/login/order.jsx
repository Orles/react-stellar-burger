import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './order.module.css';
import { useLocation } from "react-router-dom";

function Order() {
    const { orders } = useSelector(state => state.orders);
    const {allOrders} = useSelector(state => state.allOrders);
    const { burgerIngridients } = useSelector(state => state.burgerIngridients);
    const location = useLocation();
    const { id } = useParams();
    let price = 0;
    if (!orders) return null
    if (!allOrders) return null
    const fasa = location.pathname === `/profile/orders/${id}` ? orders : allOrders;
    const order = fasa.orders.find((item) => {
        return item._id === id
    })

let asd = {};

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
               
                    return (burgerIngridients.map((i) => {
                        if (b === i._id) {
                            price += i.price * asd[b]
                            return (
                                <li className={style.items} key={Math.random()}>
                                    <div className={style.img} ><img src={i.image} alt={i.name}/></div>
                                    <p className="text text_type_main-default">{i.name}</p>
                                    <p className={`${style.cost} text text_type_digits-default`}>{asd[b]} x {i.price} <CurrencyIcon /></p>
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
                <p className="text text_type_digits-default">{price} <CurrencyIcon /></p>
            </div>
        </div>
    )
}

export default Order;