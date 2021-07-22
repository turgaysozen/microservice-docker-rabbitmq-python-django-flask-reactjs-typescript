import React from 'react';
import './App.css';

import Products from './admin/Products'
import ProductsCreate from './admin/ProductCreate'
import ProductsUpdate from './admin/ProductUpdate'
import Main from './main/Main'
import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/' exact component={Main} />
        <Route path='/admin/products' exact component={Products} />
        <Route path='/admin/products/create' exact component={ProductsCreate} />
        <Route path='/admin/products/:id/update' exact component={ProductsUpdate} />
      </BrowserRouter>
    </div>

  );
}

export default App;
