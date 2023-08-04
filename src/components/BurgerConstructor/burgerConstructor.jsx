import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyle from './burgerConstructor.module.css';
import Modal from '../Modal/modal';
import React from 'react';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector, useDispatch } from 'react-redux';
import { BURGER_CONSTRUCTOR_ADD_BUN, BURGER_CONSTRUCTOR_ADD_INGRIDIENTS, BURGER_CONSTRUCTOR_MOVE } from '../../services/actions/burgerConstructorAction';
import { postOrdersDetailsIngredients } from '../../services/actions/orderDetailsAction';
import { useDrop } from 'react-dnd';
import { IngridientConstructor } from '../ingridientConstructor/ingridientConstructor';

function BurgerConstructor() {
    const [isOpen, setIsOpen] = React.useState(false);

    const dispatch = useDispatch();
    const { burgerIngridients } = useSelector(state => state.burgerIngridients);
    const { bun } = useSelector(state => state.burgerConstructor)
    const { ingridient } = useSelector(state => state.burgerConstructor)

    React.useEffect(
        () => {
            const buns = burgerIngridients.find(item => item.type === 'bun');

            dispatch({
                type: BURGER_CONSTRUCTOR_ADD_BUN,
                payload: buns
            })

        }, [burgerIngridients]
    )



    const ingridientId = ingridient.map((item) => {
        return item._id
    })

    let bunPrice = 0;
    let ingridientPrice = 0

    if (bun) {
        ingridientId.push(bun._id, bun._id)
        bunPrice = bun.price * 2
    }

    if (ingridient) {
        ingridientPrice =
            ingridient.reduce((sum, i) => {
                return sum + i.price
            }, 0)
    }

    let totalPrice = bunPrice + ingridientPrice;

    function click(ingridientId) {
        dispatch(postOrdersDetailsIngredients(ingridientId));
    }

    const [, dropRef] = useDrop({
        accept: "item",
        drop(item) {
            const copyItem = { ...item }
            copyItem.key = Math.random();
            if (copyItem.type === 'bun') {
                dispatch({
                    type: BURGER_CONSTRUCTOR_ADD_BUN,
                    payload: copyItem
                })
            } else {
                dispatch({
                    type: BURGER_CONSTRUCTOR_ADD_INGRIDIENTS, payload: copyItem
                });
            }
        }
    })


    const moveIngridient = (dragIndex, hoverIndex) => {
        const a = ingridient.findIndex(c => c._id === dragIndex._id)
        const b = ingridient.findIndex(c => c._id === hoverIndex._id)
        const sortedIngridient = [...ingridient]
        sortedIngridient.splice(a, 1)
        sortedIngridient.splice(b, 0, dragIndex)

        dispatch({
            type: BURGER_CONSTRUCTOR_MOVE,
            payload: sortedIngridient
        })
    }

    return (
        <>
            <div className={'ml-8 mb-4 mr-4 mr-4'}>
                {bun && <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />}
            </div>
            <ul ref={dropRef} className={`${BurgerConstructorStyle.list} custom-scroll pl-4`}>
                {ingridient.map((item) => {
                    if (item !== 'bun') {
                        return (
                            <IngridientConstructor key={Math.random()} item={item} moveIngridient={moveIngridient} />
                        )
                    }
                })}
            </ul>
            <div className='ml-8 mr-4 mt-4 mb-10'>
                {bun && <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />}
            </div>
            <div className={BurgerConstructorStyle.board}>
                <p className={`${BurgerConstructorStyle.text} text text_type_digits-medium`}>
                    {totalPrice} <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="large" onClick={() => {
                    setIsOpen(true);
                    click(ingridientId)
                    }}>
                    Оформить заказ
                </Button>
                <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                    <OrderDetails handleClose={() => setIsOpen(false)} />
                </Modal>
            </div>
        </>
    )
}

export default BurgerConstructor;