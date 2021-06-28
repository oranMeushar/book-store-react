import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions/category';
import './NewCategory.css';

const NewCategory = (props) => {
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);

    useEffect(() => {
        if (props.isEdit) {
            setCategory(props.editItem.name);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.isEdit) {
            if (props.editItem.name === category || isValid()) {
                dispatch(actions.editCategory(category, props.editItem.id))
                props.setIsModal(false);
            }
        }
        else if (isValid()) {
            dispatch(actions.addCategory(category));
            props.setIsModal(false);
        }
    }

    const isValid = () => {
        let isValid = true;

        if (!category) {
            setCategory('Invalid category');
            isValid = false
        }

        const found = categories.find(existCategory => {
            return existCategory.name === category
        })
        if (found) {
            isValid = false;
            setCategory('Category exists...')
        }
        return isValid;
    }
    return (
        <form className="NewCategory" onSubmit={handleSubmit} autoComplete="off">
            <label>New Category</label>
            <input type="text" autoFocus name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
};

export default NewCategory;