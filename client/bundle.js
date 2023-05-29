import React from 'react';
import ReactDOM from 'react-dom';
import "core-js/stable";
import "regenerator-runtime/runtime";
import ClientApp from './';
// hydrate for server side rendering
ReactDOM.hydrate(<ClientApp />, document.getElementById('root'));


// module.hot.accept();
