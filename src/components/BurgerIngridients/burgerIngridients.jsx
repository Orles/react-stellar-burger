import React from 'react';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngridientsStyle from './burgerIngridients.module.css';
import Modal from '../Modal/modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Ingridient from '../ingridient/ingridient';
import PropTypes from 'prop-types';

function BurgerIngridients(props) {
    const [current, setCurrent] = React.useState('one');
    const [isOpen, setIsOpen] = React.useState(false);
    const [i, setI] = React.useState([]);

    const handleClickScroll = (current) => {
        setCurrent(current)
        const element = document.getElementById(current);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            <div className={`${BurgerIngridientsStyle.tab} mb-10`}>
                <Tab value="one" active={current === 'one'} onClick={handleClickScroll}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={handleClickScroll}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={handleClickScroll}>
                    Начинки
                </Tab>
            </div>
            <div className={`${BurgerIngridientsStyle.board} custom-scroll`}>
                <h2 id="one" className='text text_type_main-medium mb-6'>Булки</h2>
                <ul className={`${BurgerIngridientsStyle.list} mb-10`}>
                    {props.data.map((item) => {
                        if (item.type === 'bun') {
                            return (
                                <Ingridient key={item._id} data={item} handleOpen={() => {
                                    setIsOpen(true);
                                    setI(item)
                                }} />
                            )
                        }
                    })}
                </ul>
                <h2 id="two" className='text text_type_main-medium mb-6'>Соусы</h2>
                <ul className={`${BurgerIngridientsStyle.list} mb-10`}>
                    {props.data.map((item) => {
                        if (item.type === 'sauce') {
                            return (
                                <Ingridient key={item._id} data={item} handleOpen={() => {
                                    setIsOpen(true);
                                    setI(item)
                                }} />
                            )
                        }
                    })}
                </ul>
                <h2 id="three" className='text text_type_main-medium mb-6'>Начинки</h2>
                <ul className={`${BurgerIngridientsStyle.list} mb-10`}>
                    {props.data.map((item) => {
                        if (item.type === 'main') {
                            return (
                                <Ingridient key={item._id} data={item} handleOpen={() => {
                                    setIsOpen(true);
                                    setI(item)
                                }} />
                            )
                        }
                    })}
                </ul>
            </div>
            
            <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                <IngredientDetails data={i} />
            </Modal>
        </>
    );
}

BurgerIngridients.prototype = {
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

export default BurgerIngridients;