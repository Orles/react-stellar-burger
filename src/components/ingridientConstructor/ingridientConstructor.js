import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { BURGER_CONSTRUCTOR_DELETE } from '../../services/actions/burgerConstructorAction';
import BurgerConstructorStyle from '../BurgerConstructor/burgerConstructor.module.css';
import PropTypes from 'prop-types';

export function IngridientConstructor({ item, moveIngridient }) {
    const dispatch = useDispatch();

    const [{ isDrag }, dragRef] = useDrag({
        type: 'items',
        item: item,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [, dropRef] = useDrop({
        accept: 'items',
        hover: (onHover, monitor) => {
            const dragIndex = onHover._id
            const hoverIndex = item._id

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return

            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveIngridient(onHover, item)

        }
    })

    const opacity = isDrag ? 0 : 1
    const ref = React.useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

    return (
        <>
            <li ref={dragDropRef} style={{opacity}} className={BurgerConstructorStyle.item}>
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
        </>
    )
}

IngridientConstructor.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
        __v: PropTypes.number,
    }),

    moveIngridient: PropTypes.func
}