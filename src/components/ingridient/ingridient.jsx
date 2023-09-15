import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngridientsStyle from '../BurgerIngridients/burgerIngridients.module.css'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

function Ingridient(props) {
    const { ingridient } = useSelector(state => state.burgerConstructor)
    const { bun } = useSelector(state => state.burgerConstructor)
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
            <li key={props.data._id} ref={dragRef} className={BurgerIngridientsStyle.item} onClick={props.handleOpen}>
                <img src={props.data.image} alt={props.data.name} className='mb-1' />
                <p className={`${BurgerIngridientsStyle.text} text text_type_digits-default mb-2`}>
                    {props.data.price}
                    <CurrencyIcon type="primary" />
                </p>
                <h3 className={`${BurgerIngridientsStyle.title} text text_type_main-default`}>
                    {props.data.name}
                </h3>
                {count > 0 && <Counter count={count} size="default" extraClass="m-1" className={BurgerIngridientsStyle.Counter} />}
            </li>
    )
}

Ingridient.prototype = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
        __v: PropTypes.number,
    }),

    handleOpen: PropTypes.func
}

export default Ingridient;