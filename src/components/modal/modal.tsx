import React, {FC, ReactNode } from "react";
import ReactDOM from 'react-dom';
import modalStyles from "./modal.module.css";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from "../modalOverlay/modalOverlay";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { ORDER_DETAILS_NO } from "../../services/actions/orderDetailsAction";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
interface Imodal {
  children: ReactNode;
  handleClose: () => void;
}
const modalRoot = document.getElementById("popup");
const Modal: FC<Imodal> = ({ children, handleClose }) => {

  React.useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);
  if (!modalRoot) return null
  return ReactDOM.createPortal(
    <div>
        <div className={modalStyles.board}>
      <ModalOverlay handleClose={handleClose} />
          <div className={modalStyles.conteiner} >
            <button className={modalStyles.button} onClick={handleClose}>
              <CloseIcon type="primary" />
            </button>
            {children}
          </div>
        </div>
      </div>
    ,
    modalRoot
  );
}

export default Modal