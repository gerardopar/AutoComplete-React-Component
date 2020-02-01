// importing modules
import React from 'react';
import ReactDOM from 'react-dom';

// importing components
import AppRouter from '../src/routers/AppRouter';

// importing style sheet
import './styles/main.scss';

const jsx = (
    <AppRouter />
);

// rendering app
ReactDOM.render(jsx, document.getElementById('app'));