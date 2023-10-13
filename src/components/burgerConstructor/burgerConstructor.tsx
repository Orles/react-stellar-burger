import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyle from './burgerConstructor.module.css';
import Modal from '../modal/modal';
import React from 'react';
import OrderDetails from '../orderDetails/orderDetails';
import { useSelector, useDispatch } from 'react-redux';
import { BURGER_CONSTRUCTOR_ADD_BUN, BURGER_CONSTRUCTOR_ADD_INGRIDIENTS, BURGER_CONSTRUCTOR_MOVE } from '../../services/actions/burgerConstructorAction';
import { postOrdersDetailsIngredients } from '../../services/actions/orderDetailsAction';
import { useDrop } from 'react-dnd';
import { IngridientConstructor } from '../ingridientConstructor/ingridientConstructor';
import { ORDER_DETAILS_OK } from '../../services/actions/orderDetailsAction';
import { useLocation, useNavigate } from 'react-router-dom';
import { Iingredient } from '../../utils/type';
import { RootState } from '../../utils/type';
import { FC } from 'react';

const BurgerConstructor: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {ok} = useSelector((state: RootState) => state.orderDetails)
    // const { burgerIngridients } = useSelector(state => state.burgerIngridients);
    const user = useSelector((store: RootState) => store.user.user);
    const { bun } = useSelector((state: RootState) => state.burgerConstructor)
    const { ingridient } = useSelector((state: RootState) => state.burgerConstructor)

    const ingridientId = ingridient.map((item:Iingredient) => {
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
            ingridient.reduce((sum:number, i:Iingredient) => {
                return sum + i.price
            }, 0)
    }

    let totalPrice = bunPrice + ingridientPrice;

    function click(ingridientId:string[]) {
        if (user) {
            dispatch(postOrdersDetailsIngredients(ingridientId));
            dispatch({
                type: ORDER_DETAILS_OK,
                payload: true
            })
        } else {
            navigate('/login')
        }
    }

    const [, dropRef] = useDrop({
        accept: "item",
        drop(item:Iingredient) {
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


    const moveIngridient = (dragIndex:Iingredient, hoverIndex:Iingredient) => {
        const a = ingridient.findIndex((c:Iingredient) => c._id === dragIndex._id)
        const b = ingridient.findIndex((c:Iingredient) => c._id === hoverIndex._id)
        const sortedIngridient = [...ingridient]
        sortedIngridient.splice(a, 1)
        sortedIngridient.splice(b, 0, dragIndex)

        dispatch({
            type: BURGER_CONSTRUCTOR_MOVE,
            payload: sortedIngridient
        })
    }
    const handleClose = () => {
        if (location.pathname ==="/") {
          navigate("/")
        } else {
          navigate(-1)
        }
        dispatch({
            type: ORDER_DETAILS_OK,
            payload: false
        })
      }
    return (
        <>
        {!bun && 
        <p>
            Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа
        </p>
        }
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
                {ingridient.map((item:Iingredient) => {
                    if (item.type !== 'bun') {
                        return (
                            <IngridientConstructor key={item.key} item={item} moveIngridient={moveIngridient} />
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
                    click(ingridientId)
                    }} disabled={bun ? false : true}>
                    Оформить заказ
                </Button>
                {ok && <Modal handleClose={handleClose}>
                    <OrderDetails />
                </Modal>}
            </div>
        </>
    )
}

export default BurgerConstructor;