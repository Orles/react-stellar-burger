import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from '../../utils/type';
import { BURGER_CONSTRUCTOR_DELETE } from '../../services/actions/burgerConstructorAction';
import BurgerConstructorStyle from '../burgerConstructor/burgerConstructor.module.css';
import PropTypes from 'prop-types';
import { Iingredient } from '../../utils/type';
import { FC } from 'react';

interface IitemProps {
    item: Iingredient;
    moveIngridient: (dragIndex: Iingredient, hoverIndex: Iingredient) => void;
}

export const IngridientConstructor: FC<IitemProps> = ({ item, moveIngridient }) => {
    const dispatch = useDispatch();
    const ref = React.useRef<HTMLLIElement>(null)
    const [{ isDrag }, dragRef] = useDrag({
        type: 'items',
        item: item,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [, dropRef] = useDrop({
        accept: 'items',
        hover: (onHover: Iingredient, monitor) => {
            const dragIndex = onHover._id
            const hoverIndex = item._id

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY = hoverBoundingRect ? (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2 : 0
            const asd = monitor.getClientOffset()
            const hoverActualY = asd && hoverBoundingRect ? asd.y - hoverBoundingRect.top : 0

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return

            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveIngridient(onHover, item)

        }
    })

    const opacity = isDrag ? 0 : 1
    dragRef(dropRef(ref))

    return (
            <li ref={ref} style={{opacity}} className={BurgerConstructorStyle.item}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => {
                        dispatch({type: BURGER_CONSTRUCTOR_DELETE, payload: item.key});
                    }}
                />
            </li>
    )
}