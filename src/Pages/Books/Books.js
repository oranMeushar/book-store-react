import React, { useState, useEffect } from 'react';
import './Books.css';
import addImg from '../../assets/add.png';
import viewImg from '../../assets/view.png';
import closedEyeImg from '../../assets/closed-eyes.png';
import { CSSTransition } from 'react-transition-group';
import Modal from '../../Modal/Modal';
import NewBook from '../../NewBook/NewBook';
import BooksList from './BooksList/BooksList';
import { useSelector } from 'react-redux';
const Books = () => {

    const [isModal, setIsModal] = useState(false);
    const [showBooks, setShowBooks] = useState(false);
    const [sort, setSort] = useState(false);
    const [checkboxes, setCheckboxes] = useState({});
    const [filteredBooks, setFilteredBooks] = useState([]);

    const categories = useSelector(state => state.category.categories);
    const books = useSelector(state => state.book.books);

    useEffect(() => {
        let result = handleFilters();
        setFilteredBooks(result);
    }, [checkboxes])

    useEffect(() => {
        setFilteredBooks(books);
    }, [books]);

    useEffect(() => {
        if (sort) {
            let result = handleSort(filteredBooks);
            setFilteredBooks(result);
        }
        else {
            let result = handleFilters();
            setFilteredBooks(result);
        }
    }, [sort]);

    const handleFilters = () => {
        let filtered = null;
        let result = [];

        for (const key in checkboxes) {
            filtered = books.filter((book) => {
                return book.category.includes(checkboxes[key]) && !result.includes(book);
            });
            result.push(...filtered);
        }
        if (result.length === 0 && Object.keys(checkboxes).length !== 0) {
            result = [];
        }
        if (result.length === 0 && Object.keys(checkboxes).length === 0) {
            result = books
        }
        if (sort) {
            result = handleSort(result);
        }
        return result;
    }

    const handleSort = (result) => {
        const i_books = [...result];
        i_books.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
        });
        return i_books;
    }

    const topToolBar = () => {
        return (
            <div className="Books-topToolBar">
                <div className="actions-wrapper">
                    <h2>{showBooks ? 'Hide' : 'Show'}<br />Books</h2>
                    <button onClick={() => setShowBooks(!showBooks)}> <img src={showBooks ? viewImg : closedEyeImg} alt="viewImg" /> </button>
                </div>
                <div className="actions-wrapper">
                    <h2>New <br /> Book</h2>
                    <button onClick={() => setIsModal(true)}> <img src={addImg} alt="addImg" /> </button>
                </div>
            </div>
        )
    }

    const handleChange = (e) => {
        if (e.target.checked) {
            setCheckboxes({
                ...checkboxes,
                [e.target.name]: e.target.value
            })
        }
        else {
            const properties = { ...checkboxes }
            delete properties[e.target.name];
            setCheckboxes(properties)
        }
    }

    return (
        <div className="Books">
            <CSSTransition in={isModal} timeout={500} mountOnEnter unmountOnExit classNames="Modal">
                <Modal setIsModal={setIsModal}>
                    <NewBook setIsModal={setIsModal} />
                </Modal>
            </CSSTransition>
            {topToolBar()}
            <h1>Books</h1>
            <div className="Books-filters">
                <div className="sort-wrapper">
                    <label>Sort By Name</label>
                    <input type="checkbox" name="sort" value={sort} onChange={() => setSort(!sort)} />
                </div>
                <div className="group-wrapper">
                    <label>Group By Categories</label>
                    {
                        categories.map((category) => {
                            return (
                                <label key={category.id}>
                                    {category.name}
                                    <input type="checkbox" value={category.name} name={category.name} onChange={handleChange} />
                                </label>
                            )
                        })
                    }
                </div>
            </div>
            {showBooks && <BooksList books={filteredBooks} />}
        </div >
    );
};

export default Books;