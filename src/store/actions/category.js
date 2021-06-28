import * as actionTypes from './actionTypes';
import uniqid from 'uniqid';

export const setCategories = (categories) => {
    return {
        type: actionTypes.SET_CATEGORIES,
        payload: categories
    }
}

export const addCategory = (category) => {
    return {
        type: actionTypes.ADD_CATEGORY,
        payload: {
            name: category,
            id: uniqid()
        }
    }
}

export const editCategory = (category, id) => {
    return {
        type: actionTypes.EDIT_CATEGORY,
        payload: {
            name: category,
            id
        }
    }
}

export const deleteCategory = (id) => {
    return {
        type: actionTypes.DELETE_CATEGORY,
        payload: id
    }
}