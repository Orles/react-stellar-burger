import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyle from './burgerConstructor.module.css';
import Modal from '../Modal/modal';
import React from 'react';
import OrderDetails from '../OrderDetails/OrderDetails';
import PropTypes from 'prop-types';

function BurgerConstructor(props) {
    const [isOpen, setIsOpen] = React.useState(false);

    if (props.data.length === 0) {
        return null
    }
    return (
        <>
            <div className={'ml-8 mb-4 mr-4 mr-4'}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${props.data[0].name} (верх)`}
                    price={props.data[0].price}
                    thumbnail={props.data[0].image}
                />
            </div>
            <ul className={`${BurgerConstructorStyle.list} custom-scroll pl-4`}>
                {props.data.map((item) => {
                    if (item !== 'bun') {
                        return (
                            <li key={`${item._id} pr-4`} className={BurgerConstructorStyle.item}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                />
                            </li>
                        )
                    }
                })}
            </ul>
            <div className='ml-8 mr-4 mt-4 mb-10'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${props.data[0].name} (низ)`}
                    price={props.data[0].price}
                    thumbnail={props.data[0].image}
                />
            </div>
            <div className={BurgerConstructorStyle.board}>
                <p className={`${BurgerConstructorStyle.text} text text_type_digits-medium`}>
                    {props.data.reduce((s, i) => s = s + i.price, 267)} <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large" onClick={() => setIsOpen(true)}>
                    Оформить заказ
                </Button>
                <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                    <OrderDetails handleClose={() => setIsOpen(false)} />
                </Modal>
            </div>
        </>
    )
}

BurgerConstructor.prototype = {
    data: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        calories: PropTypes.number,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        _id: PropTypes.string,
        type: PropTypes.string,
        price: PropTypes.number,
    }))
}

export default BurgerConstructor;