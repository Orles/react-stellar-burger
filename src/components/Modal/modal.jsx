import React from "react";
import ReactDOM from 'react-dom';
import modalStyles from "./modal.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { ORDER_DETAILS_NO } from "../../services/actions/orderDetailsAction";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const modalRoot = document.getElementById("popup");
function Modal({ children, handleClose }) {
  const location = useLocation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModalClick = (e) => {
    // Предотвращаем всплытие события клика до верхних элементов
    e.stopPropagation();
  };

  React.useEffect(() => {
    const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  return ReactDOM.createPortal(

    <>
      <ModalOverlay handleClose={handleClose}>
        <div className={modalStyles.board}>
          <div className={modalStyles.conteiner} onClick={handleModalClick}>
            <button className={modalStyles.button} onClick={handleClose}>
              <CloseIcon type="primary" />
            </button>
            {children}
          </div>
        </div>
      </ModalOverlay>
    </>
    ,
    modalRoot
  );
}

Modal.propTypes = { 
  children: PropTypes.element.isRequired,
}


export default Modal