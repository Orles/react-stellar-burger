import ModalOverlayStyle from './ModalOverlay.module.css'
import PropTypes from 'prop-types';

function ModalOverlay(props) {
    return (
        <div className={ModalOverlayStyle.container} onClick={props.handleClose}>
            {props.children}
        </div>
    )
}

ModalOverlay.prototype = {
    handleClose: PropTypes.func
}

export default ModalOverlay;