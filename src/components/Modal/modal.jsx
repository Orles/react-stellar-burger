import React from "react";
import ReactDOM from 'react-dom';
import modalStyles from "./modal.module.css";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("popup");

function Modal ({ children, isOpen, handleClose }) {
    React.useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
          document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
      }, [handleClose]);


    if (!isOpen) {
        return null
    }
    
    return ReactDOM.createPortal(
            
                <>
                <ModalOverlay handleClose={handleClose}>
                    <div className={modalStyles.board}>
                        <div className={modalStyles.conteiner}>
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

  Modal.prototype = {
    handleClose: PropTypes.func,
    isOpen: PropTypes.bool,
    children: PropTypes.element.isRequired
}


  export default Modal