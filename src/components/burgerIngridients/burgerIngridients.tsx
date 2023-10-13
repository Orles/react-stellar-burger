import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngridientsStyle from './burgerIngridients.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredientDetails/ingredientDetails';
import Ingridient from '../ingridient/ingridient';
import { useDispatch, useSelector } from 'react-redux';
import { getBurgerIngridientsData } from '../../services/actions/burgerIngridientsAction';
import { INGREDIENT_DETAILS_MODAL_CLOSE } from '../../services/actions/ingridienrDetailsAction';
import { BURGER_CONSTRUCTOR_ADD_BUN } from '../../services/actions/burgerConstructorAction';
import { Link, useLocation } from 'react-router-dom';
import { RootState, Iingredient } from '../../utils/type';
import { FC } from 'react';

const BurgerIngridients: FC = () => {
    // const [i, setI] = React.useState([]);
    // const handleClickScroll = (current) => {
    //     setCurrent(current)
    //     const element = document.getElementById(current);
    //     if (element) {
    //         element.scrollIntoView({ behavior: 'smooth' });
    //     }
    // };

    const location = useLocation();

    const { burgerIngridients } = useSelector((state: RootState) => state.burgerIngridients);

    const dispatch = useDispatch();

    const bun = burgerIngridients.find((item: Iingredient) => item.type === 'bun');

    React.useEffect(
        () => {
            dispatch({
                type: BURGER_CONSTRUCTOR_ADD_BUN,
                payload: bun
            })
        }, [dispatch]
    );

    function closeClick() {
        dispatch({
            type: INGREDIENT_DETAILS_MODAL_CLOSE
        })
    }

    const [current, setCurrent] = React.useState<string>('one');
    const [isOpen, setIsOpen] = React.useState(false);

    const oneRef = React.useRef<HTMLDivElement | null>(null);
    const twoRef = React.useRef<HTMLDivElement | null>(null);
    const threeRef = React.useRef<HTMLDivElement | null>(null);
    const tabRef = React.useRef<HTMLDivElement | null>(null);

    const tabScroll = () => {
        if (tabRef.current) {
            const tabRefY = tabRef.current.getBoundingClientRect().y;
            const oneOffset = oneRef.current ? Math.abs(oneRef.current.getBoundingClientRect().y - tabRefY) : Infinity;
            const twoOffset = twoRef.current ? Math.abs(twoRef.current.getBoundingClientRect().y - tabRefY) : Infinity;
            const threeOffset = threeRef.current ? Math.abs(threeRef.current.getBoundingClientRect().y - tabRefY) : Infinity;
    
            if (oneOffset < twoOffset && oneOffset < threeOffset) {
                setCurrent('one')
            }
            if (twoOffset < oneOffset && twoOffset < threeOffset) {
                setCurrent('two')
            }
            if (threeOffset < oneOffset && threeOffset < twoOffset) {
                setCurrent('three')
            }
        }

    };

    const refHandler = (ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
          }
    }

    return (
        <>
            <div className={`${BurgerIngridientsStyle.tab} mb-10`}>
                <Tab value="one" active={current === 'one'} onClick={() => {
                    setCurrent('one')
                    refHandler(oneRef)
                }}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={() => {
                    setCurrent('two')
                    refHandler(twoRef)
                }}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={() => {
                    setCurrent('three')
                    refHandler(threeRef)
                }}>
                    Начинки
                </Tab>
            </div>
            <div ref={tabRef} onScroll={tabScroll} className={`${BurgerIngridientsStyle.board} custom-scroll`}>
                <h2 ref={oneRef} id="one" className='text text_type_main-medium mb-6'>Булки</h2>
                <ul className={`${BurgerIngridientsStyle.list} mb-10`}>
                    {burgerIngridients.map((item: Iingredient) => {
                        if (item.type === 'bun') {
                            return (
                                <Link key={item._id} className={BurgerIngridientsStyle.link} to={`/ingredients/${item._id}`} state={{ background: location }}>
                                    <Ingridient data={item} />
                                </Link>
                            )
                        }
                    })}
                </ul>
                <h2 ref={twoRef} id="two" className='text text_type_main-medium mb-6'>Соусы</h2>
                <ul className={`${BurgerIngridientsStyle.list} mb-10`}>
                    {burgerIngridients.map((item: Iingredient) => {
                        if (item.type === 'sauce') {
                            return (
                                <Link key={item._id} className={BurgerIngridientsStyle.link} to={`/ingredients/${item._id}`} state={{ background: location }}>
                                    <Ingridient data={item} />
                                </Link>
                            )
                        }
                    })}
                </ul>
                <h2 ref={threeRef} id="three" className='text text_type_main-medium mb-6'>Начинки</h2>
                <ul className={`${BurgerIngridientsStyle.list} mb-10`}>
                    {burgerIngridients.map((item: Iingredient) => {
                        if (item.type === 'main') {
                            return (
                                <Link key={item._id} className={BurgerIngridientsStyle.link} to={`/ingredients/${item._id}`} state={{ background: location }}>
                                    <Ingridient data={item} />
                                </Link>
                            )
                        }
                    })}
                </ul>
            </div>

            {/* <Modal handleClose={() => {
                setIsOpen(false);
                closeClick();
                }} isOpen={isOpen}>
                <IngredientDetails />
            </Modal> */}
        </>
    );
}

export default BurgerIngridients;