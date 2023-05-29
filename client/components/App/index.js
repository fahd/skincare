import React from 'react';
import { Router, createHistory } from '@reach/router';
import Home from '../Home';
import Product from '../Product';
import Profile from '../Profile';
import Brand from '../Brand';
import Brands from '../Brands';
import Settings from '../Settings';
import CreateList from '../CreateList';
import List from '../List';
import MyLists from '../MyLists';
import { Error } from '../../shared/';
import './index.css';
import AuthContextProvider, { AuthContext } from "../../context/authContext";
import { Nav } from '../../shared';
import { Footer } from '../../shared';

let history = createHistory(window);

const App = () => {
  
  return (
    <AuthContextProvider>
      <Nav history={history}/>
      <Router>
        <Home path='/' />
        <Brand path='/brand/:slug' />
        <Brands path='/brands' />
        <Product path='/products/:brand/:id' />
        <Settings path='/me/settings' />
        <Profile path='/user/:username' />
        <CreateList path='/create-list' />
        <List path='/user/:username/lists/:listid/:listslug' />
        <MyLists path='/me/my-lists' />
        <Error path='*' />
      </Router>
      <Footer/>
    </AuthContextProvider>
  );
};

export default App;
