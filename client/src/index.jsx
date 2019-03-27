import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Root from 'pages/root';

// ReactDOM.render(<Root />, document.getElementById('app')); 

ReactDOM.render((
    // <BrowserRouter>
        <Root />
    // {/* </BrowserRouter> */}
), document.getElementById('app'));