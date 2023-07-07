import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngridientsStyle from '../BurgerIngridients/burgerIngridients.module.css'
import PropTypes from 'prop-types';

function Ingridient(props) {
    return (
        <li key={props.data._id} className={BurgerIngridientsStyle.item} onClick={props.handleOpen}>
            <img src={props.data.image} alt={props.data.name} className='mb-1' />
            <p className={`${BurgerIngridientsStyle.text} text text_type_digits-default mb-2`}>
                {props.data.price}
                <CurrencyIcon type="primary" />
            </p>
            <h3 className={`${BurgerIngridientsStyle.title} text text_type_main-default`}>
                {props.data.name}
            </h3>
            <Counter count={1} size="default" extraClass="m-1" className={BurgerIngridientsStyle.Counter} />
        </li>
    )
}

Ingridient.prototype = {
    data: PropTypes.object
}

export default Ingridient;