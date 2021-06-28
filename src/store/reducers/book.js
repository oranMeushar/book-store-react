import * as actionTypes from '../actions/actionTypes';

const initialState = {
    books: []
}

const handleAddBook = (state, action) => {
    const books = [...state.books];
    books.push(action.payload);
    localStorage.setItem('books', JSON.stringify(books));
    return {
        ...state,
        books
    }
}

const handleDeleteBook = (state, action) => {
    const id = action.payload;
    const filtered = state.books.filter((book) => {
        return book.id !== id
    });
    localStorage.setItem('books', JSON.stringify(filtered));
    return {
        ...state,
        books: filtered
    }
}

const handleEditBook = (state, action) => {
    const id = action.payload.id;
    const updatedBooks = state.books.map((book) => {
        if (book.id === id) {
            book = action.payload
        }
        return book;
    });

    localStorage.setItem('books', JSON.stringify(updatedBooks));
    return {
        ...state,
        books: updatedBooks
    }
}

const handleSetBooks = (state, action) => {
    return {
        ...state,
        books: action.payload
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_BOOKS:
            return handleSetBooks(state, action);
        case actionTypes.ADD_BOOK:
            return handleAddBook(state, action);
        case actionTypes.DELETE_BOOK:
            return handleDeleteBook(state, action);
        case actionTypes.EDIT_BOOK:
            return handleEditBook(state, action);
        default:
            return state;
    }
}

export default reducer;