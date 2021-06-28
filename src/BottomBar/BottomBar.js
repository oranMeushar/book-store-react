import React from 'react';
import './BottomBar.css';
import { Link } from 'react-router-dom';
import bookImg from '../assets/book.png';
import categoryImg from '../assets/category.png';

const BottomBar = () => {
    return (
        <nav className="BottomBar">
            <ul>
                <li>
                    <Link to="/books"> <img src={bookImg} alt="bookImg" title="my books" /> </Link>
                </li>
                <li>
                    <Link to="/categories"> <img src={categoryImg} alt="categoryImg" title="my categories" /> </Link>
                </li>
            </ul>
        </nav>
    );
};

export default BottomBar;