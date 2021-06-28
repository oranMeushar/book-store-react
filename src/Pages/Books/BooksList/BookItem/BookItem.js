import React, { useState } from 'react';
import './BookItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import * as actions from '../../../../store/actions/book';
import Modal from '../../../../Modal/Modal';
import NewBook from '../../../../NewBook/NewBook';

const BookItem = (props) => {
    const [isModal, setIsModal] = useState(false);
    const [editItem, setEditItem] = useState({});
    const dispatch = useDispatch()
    const books = useSelector(state => state.book.books);

    const handleDeleteButton = (id) => {
        dispatch(actions.deleteBook(id));
    }
    
    const handleEditButton = (id) => {
        const oldBook = books.find((book) => {
            return book.id === id
        })
        setEditItem(oldBook);
        setIsModal(true);
    }

    return (
        <div className="BookItem">
            <CSSTransition in={isModal} timeout={500} mountOnEnter unmountOnExit classNames="Modal">
                <Modal setIsModal={setIsModal}>
                    <NewBook setIsModal={setIsModal} isEdit={true} editItem={editItem} />
                </Modal>
            </CSSTransition>
            <div className="BookItem-details">
                <p><strong>Name: </strong>{props.book.name}</p>
                <p><strong>Author: </strong>{props.book.author}</p>
                <p><strong>Price: </strong>${props.book.price}</p>
                <p><strong>Category: </strong>{props.book.category}</p>
            </div>

            <div className="BookItem-buttons-wrapper">
                <button className="BookItem-edit" onClick={() => handleEditButton(props.book.id)}>Edit</button>
                <button className="BookItem-delete" onClick={() => handleDeleteButton(props.book.id)}>X</button>
            </div>
        </div>
    );
};

export default BookItem;