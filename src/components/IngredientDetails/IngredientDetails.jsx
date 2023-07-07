import IngredientDetailsStyle from './IngredientDetails.module.css'
import PropTypes from 'prop-types';

function IngredientDetails(props) {
    return (
        <>
            <h2 className={`${IngredientDetailsStyle.title} text text_type_main-large mt-10 ml-10`}>Детали ингредиента</h2>
            <img src={props.data.image} alt={props.data.name} className={`${IngredientDetailsStyle.img} mb-4`} />
            <p className='text text_type_main-medium mb-8'>{props.data.name}</p>
            <ul className={`${IngredientDetailsStyle.list} mb-15`}>
                <li className={IngredientDetailsStyle.item}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.data.calories}</p>
                </li>
                <li className={IngredientDetailsStyle.item}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.data.proteins}</p>
                </li>
                <li className={IngredientDetailsStyle.item}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.data.fat}</p>
                </li>
                <li className={IngredientDetailsStyle.item}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{props.data.carbohydrates}</p>
                </li>
            </ul>
        </>
    )
}

IngredientDetails.prototype = {
    data: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        calories: PropTypes.number,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number
      })
}

export default IngredientDetails;