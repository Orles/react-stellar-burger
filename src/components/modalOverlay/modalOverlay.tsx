import ModalOverlayStyle from './modalOverlay.module.css'
import PropTypes from 'prop-types';
import {FC, ReactNode } from "react";

interface ImodalOverlay {
    handleClose: () => void;
  }

const ModalOverlay: FC<ImodalOverlay> = (props) => {
    return (
        <div className={ModalOverlayStyle.container} onClick={props.handleClose}>
            {props.children}
        </div>
    )
}

export default ModalOverlay;