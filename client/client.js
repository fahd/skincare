import React from 'react';
import ReactDOM from 'react-dom';
import ClientApp from './';
// render for client-side rendering
ReactDOM.render(<ClientApp />, document.getElementById('root'));

module.hot.accept();
