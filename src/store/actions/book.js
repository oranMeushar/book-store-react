import * as actionTypes from './actionTypes';
import uniqid from 'uniqid';

export const addBook = (book) => {
    return {
        type: actionTypes.ADD_BOOK,
        payload: {
            ...book,
            id: uniqid()
        }
    }
}

export const deleteBook = (id) => {
    return {
        type: actionTypes.DELETE_BOOK,
        payload: id
    }
}

export const editBook = (book, id) => {
    return {
        type: actionTypes.EDIT_BOOK,
        payload: {
            ...book,
            id
        }
    }
}

export const setBooks = (books) => {
    return {
        type: actionTypes.SET_BOOKS,
        payload: books
    }
}