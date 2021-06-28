import React, { useState } from 'react';
import './Categories.css';
import addImg from '../../assets/add.png';
import viewImg from '../../assets/view.png';
import closedEyeImg from '../../assets/closed-eyes.png';
import Modal from '../../Modal/Modal';
import { CSSTransition } from 'react-transition-group';
import NewCategory from '../../NewCategory/NewCategory';
import CategoriesList from './CategoriesList/CategoriesList';

const Categories = () => {
    const [isModal, setIsModal] = useState(false);
    const [showCategories, setShowCategories] = useState(false)

    const topToolBar = () => {
        return (
            <div className="Categories-topToolBar">
                <div className="actions-wrapper">
                    <h2>{showCategories ? 'Hide' : 'Show'}<br />Categories</h2>
                    <button onClick={() => setShowCategories(!showCategories)}> <img src={showCategories ? viewImg : closedEyeImg} alt="viewImg" /> </button>
                </div>
                <div className="actions-wrapper">
                    <h2>New <br /> Category</h2>
                    <button onClick={() => setIsModal(true)}> <img src={addImg} alt="addImg" /> </button>
                </div>
            </div>
        )
    }

    return (
        <div className="Categories">
            <CSSTransition in={isModal} timeout={500} mountOnEnter unmountOnExit classNames="Modal">
                <Modal setIsModal={setIsModal}>
                    <NewCategory setIsModal={setIsModal} />
                </Modal>
            </CSSTransition>
            {topToolBar()}
            <h1>Categories</h1>
            {showCategories && <CategoriesList showCategories={showCategories} />}
        </div>
    );
};
export default Categories;