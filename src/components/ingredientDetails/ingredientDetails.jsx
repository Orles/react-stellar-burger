import IngredientDetailsStyle from './ingredientDetails.module.css'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function IngredientDetails() {
    const { burgerIngridients } = useSelector(state => state.burgerIngridients);
    const {id} = useParams();
    const ingridient = burgerIngridients.find((item) => {
        return item._id === id
    })
    if (!ingridient) return null
    // const { ingridient } = useSelector(state => state.ingredientDetails);
    return (
        <div className={`${IngredientDetailsStyle.page}`}>
            <h2 className={`${IngredientDetailsStyle.title} text text_type_main-large mt-10 ml-10`}>Детали ингредиента</h2>
            <img src={ingridient.image} alt={ingridient.name} className={`${IngredientDetailsStyle.img} mb-4`} />
            <p className='text text_type_main-medium mb-8'>{ingridient.name}</p>
            <ul className={`${IngredientDetailsStyle.list} mb-15`}>
                <li className={IngredientDetailsStyle.item}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
                    <p className='text text_type_main-default text_color_inactive'>{ingridient.calories}</p>
                </li>
                <li className={IngredientDetailsStyle.item}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{ingridient.proteins}</p>
                </li>
                <li className={IngredientDetailsStyle.item}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{ingridient.fat}</p>
                </li>
                <li className={IngredientDetailsStyle.item}>
                    <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
                    <p className='text text_type_main-default text_color_inactive'>{ingridient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

export default IngredientDetails;