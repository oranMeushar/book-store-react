import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Books from './Pages/Books/Books';
import Categories from './Pages/Categories/Categories';
import BottomBar from './BottomBar/BottomBar';
import * as categoryActions from './store/actions/category';
import * as bookActions from './store/actions/book';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem('categories'));
    const books = JSON.parse(localStorage.getItem('books'));
    if (categories) {
      dispatch(categoryActions.setCategories(categories));
    }
    if (books) {
      dispatch(bookActions.setBooks(books));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/books" component={Books} />
        <Route exact path="/categories" component={Categories} />
      </Switch>
      <BottomBar />
    </div>
  );
}

export default App;
