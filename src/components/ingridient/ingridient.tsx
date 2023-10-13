import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngridientsStyle from '../burgerIngridients/burgerIngridients.module.css'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { RootState, Iingredient } from '../../utils/type';
import { FC } from 'react';

interface Iingridient {
     data: Iingredient;
}

const Ingridient: FC<Iingridient> = (props) => {
    const { ingridient } = useSelector((state: RootState) => state.burgerConstructor)
    const { bun } = useSelector((state: RootState) => state.burgerConstructor)
    let count = 0;

    for (let i of ingridient) {
        if (props.data._id === i._id) {
            count++
        }
    }

    if (bun) {
        if (props.data._id === bun._id) {
            count = 2
        }
    }

    const [, dragRef] = useDrag({
        type: "item",
        item: props.data,
    })

    return (
            <li key={props.data._id} ref={dragRef} className={BurgerIngridientsStyle.item}>
                <img src={props.data.image} alt={props.data.name} className='mb-1' />
                <p className={`${BurgerIngridientsStyle.text} text text_type_digits-default mb-2`}>
                    {props.data.price}
                    <CurrencyIcon type="primary" />
                </p>
                <h3 className={`${BurgerIngridientsStyle.title} text text_type_main-default`}>
                    {props.data.name}
                </h3>
                {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
            </li>
    )
}

export default Ingridient;