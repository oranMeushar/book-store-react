import * as actionTypes from '../actions/actionTypes';

const initialState = {
    categories: []
}

const handleAddCategory = (state, action) => {
    const categories = [...state.categories];
    categories.push(action.payload);
    localStorage.setItem('categories', JSON.stringify(categories));
    return {
        ...state,
        categories
    }
}

const handleDeleteCategory = (state, action) => {
    const id = action.payload;
    const filtered = state.categories.filter((category) => {
        return category.id !== id
    });
    localStorage.setItem('categories', JSON.stringify(filtered));
    return {
        ...state,
        categories: filtered
    }
}

const handleEditCategory = (state, action) => {
    const id = action.payload.id;
    const updatedCategories = state.categories.map((category) => {
        if (category.id === id) {
            category.name = action.payload.name
        }
        return category;
    });

    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    return {
        ...state,
        categories: updatedCategories
    }
}

const handleSetCategories = (state, action) => {
    return {
        ...state,
        categories: action.payload
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CATEGORIES:
            return handleSetCategories(state, action);
        case actionTypes.ADD_CATEGORY:
            return handleAddCategory(state, action);
        case actionTypes.DELETE_CATEGORY:
            return handleDeleteCategory(state, action);
        case actionTypes.EDIT_CATEGORY:
            return handleEditCategory(state, action);
        default:
            return state;
    }
}

export default reducer;