import React from 'react';
import './BooksList.css';
import BookItem from './BookItem/BookItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const BooksList = ({books}) => {
    let list = books.length > 0 ? (
        <TransitionGroup component={null}>
            {
                books.map((book, idx) => {
                    return (
                        <CSSTransition key={idx} timeout={500} classNames="BookItem">
                            <BookItem book={book} key={book.id} />
                        </CSSTransition>
                    )
                })
            }
        </TransitionGroup>) : <h1 className="BooksList-empty-msg">Book list is currently empty</h1>

    return (
        <div className="BooksList">
            {list}
        </div>
    );
};

export default BooksList;