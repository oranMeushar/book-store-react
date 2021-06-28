import React from 'react';
import './Modal.css';

const Modal = (props) => {
    const handleClick = (e) => {
        e.target.className.includes('Modal') && props.setIsModal(false);
    }
    return (
        <div className="Modal" onClick={handleClick}>
            {props.children}
        </div>
    );
};

export default Modal;