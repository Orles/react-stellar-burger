import OrderDetailsStyle from './OrderDetails.module.css'
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import img from '../../image/done.svg'
import PropTypes from 'prop-types';

function OrderDetails(props) {
    return (
        <>
            <h2 className='text text_type_digits-large mt-30 mb-8'>666666</h2>
            <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
            <button className={`${OrderDetailsStyle.btn} mb-15`} onClick={props.handleClose}>
            <img src={img} alt="galka" />
            </button>
            <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

OrderDetails.prototype = {
    handleClose: PropTypes.func
}

export default OrderDetails