import React from 'react';
import './CategoriesList.css';
import { useSelector } from 'react-redux';
import CategoriesItem from './CategoriesItem/CategoriesItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CategoriesList = () => {
    const categories = useSelector(state => state.category.categories);

    let list = categories.length > 0 ? (
        <TransitionGroup component={null}>
            {
                categories.map((category, idx) => {
                    return (
                        <CSSTransition key={idx} timeout={500} classNames="CategoriesItem">
                            <CategoriesItem category={category} key={categories.id} />
                        </CSSTransition>
                    )
                })
            }
        </TransitionGroup>) : <h1 className="CategoriesList-empty-msg">Category list is currently empty</h1>
    return (
        <div className="CategoriesList">
            {list}
        </div>
    );
};

export default CategoriesList;