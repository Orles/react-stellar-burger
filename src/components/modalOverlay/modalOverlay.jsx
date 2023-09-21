import ModalOverlayStyle from './modalOverlay.module.css'
import PropTypes from 'prop-types';

function ModalOverlay(props) {
    return (
        <div className={ModalOverlayStyle.container} onClick={props.handleClose}>
            {props.children}
        </div>
    )
}

ModalOverlay.propTypes = {
    handleClose: PropTypes.func
}

export default ModalOverlay;