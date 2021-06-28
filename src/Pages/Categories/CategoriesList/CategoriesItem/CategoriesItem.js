import React, { useState } from 'react';
import './CategoriesItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import * as actions from '../../../../store/actions/category';
import Modal from '../../../../Modal/Modal';
import NewCategory from '../../../../NewCategory/NewCategory';

const CategoriesItem = (props) => {
    const [isModal, setIsModal] = useState(false);
    const [editItem, setEditItem] = useState({});
    const dispatch = useDispatch()
    const categories = useSelector(state => state.category.categories);

    const handleDeleteButton = (id) => {
        dispatch(actions.deleteCategory(id));
    }
    
    const handleEditButton = (id) => {
        const oldCategory = categories.find((category) => {
            return category.id === id
        })
        setEditItem(oldCategory);
        setIsModal(true);
    }

    return (
        <div className="CategoriesItem">
            <CSSTransition in={isModal} timeout={500} mountOnEnter unmountOnExit classNames="Modal">
                <Modal setIsModal={setIsModal}>
                    <NewCategory setIsModal={setIsModal} isEdit={true} editItem={editItem} />
                </Modal>
            </CSSTransition>
            <h1>{props.category.name}</h1>
            <div className="CategoriesItem-buttons-wrapper">
                <button className="CategoriesItem-edit" onClick={() => handleEditButton(props.category.id)}>Edit</button>
                <button className="CategoriesItem-delete" onClick={() => handleDeleteButton(props.category.id)}>X</button>
            </div>
        </div>
    );
};

export default CategoriesItem;