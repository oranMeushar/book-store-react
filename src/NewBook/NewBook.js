import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions/book';
import './NewBook.css';

const NewBook = (props) => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState([]);

    const categories = useSelector(state => state.category.categories);
    const dispatch = useDispatch();
    const selectRef = useRef();

    useEffect(() => {
        if (props.isEdit) {
            setName(props.editItem.name);
            setAuthor(props.editItem.author);
            setPrice(props.editItem.price)
            setCategory([props.editItem.category]);

            const options = [...selectRef.current.children];
            const index = options.findIndex(opt => {
                return opt.id === props.editItem.category;
            });
            setTimeout(() => {
                selectRef.current.children[index].selected = 'selected';
            }, 10);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && author && price && category) {
            const book = {
                name,
                author,
                price,
                category: category.join(', ')
            }

            if (props.isEdit) {
                dispatch(actions.editBook(book, props.editItem.id));
            }
            else {
                dispatch(actions.addBook(book));
            }
            props.setIsModal(false);
        }
    }

    console.log(category);

    const handleChange = (e) => {
        let categories = Array.from(e.target.selectedOptions, option => option.value);
        setCategory(categories);
    }
    return (
        <form className="NewBook" onSubmit={handleSubmit}>

            <label>Book's Name</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

            <label>Book's Author</label>
            <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />

            <label>Book's Price</label>
            <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} min="0" required />

            <label>Book's Category</label>
            <select onChange={handleChange} ref={selectRef} name="category" multiple required>
                {
                    categories.map((category) => {
                        return <option id={category.name} value={category.name} key={category.id}>{category.name}</option>
                    })
                }
            </select>
            <button type="submit">Submit</button>
        </form>
    );
};

export default NewBook;