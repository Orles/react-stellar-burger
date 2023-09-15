import { useLocation } from 'react-router-dom';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import style from './login.module.css'
import { useSelector } from "react-redux";

function Feed() {
    const location = useLocation();
    const { burgerIngridients } = useSelector(state => state.burgerIngridients);
    const { allOrders } = useSelector(state => state.allOrders);

    if (!allOrders) return null
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
    function gg(item, price) {
        if (item.ingredients.length <= 6) {
            return (burgerIngridients.map((i) => {
                for (const b of item.ingredients) {
                    if (b === i._id) {
                        return (
                            <li className={style.miniLi} key={Math.random()}>
                                <img src={i.image} alt={i.name} />
                            </li>
                        )
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
                            <li className={style.miniLi} key={Math.random()}>
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
    const ordersDone = [];
    const ordersPending = [];
    function orderStatus() {
        allOrders.orders.map((i) => {
            if (i.status === 'done') {
                ordersDone.push(i.number);
            } else if (i.status === 'pending') {
                ordersPending.push(i.number)
            }
        })
    }
    orderStatus()

    return (
        <>
            <h2 className={`${style.titleFeed} text text_type_main-large`}>Лента заказов</h2>
            <div className={style.taburet}>
                <div className={style.stul}>
                    <ul className={`${style.ul} custom-scroll`}>
                        {allOrders.orders.map((item) => {
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
                                {ordersDone.map((i) => {
                                    return (
                                        <li className="text text_type_digits-default" key={Math.random()}>{i}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                            <ul className={style.listFeed}>
                            {ordersPending.map((i) => {
                                    return (
                                        <li className={`${style.white} text text_type_digits-default`} key={Math.random()}>{i}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <p className="text text_type_main-medium">Выполнено за все время:</p>
                    <p className="text text_type_digits-large mb-15">{allOrders.total}</p>
                    <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                    <p className="text text_type_digits-large">{allOrders.totalToday}</p>
                </div>
            </div>
        </>
    )
}

export default Feed;