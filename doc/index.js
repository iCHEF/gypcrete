// Document components are not used in production.
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import DocApp from './DocApp';

function renderApp(App) {
    const wrappedApp = (
        <AppContainer>
            <App />
        </AppContainer>
    );

    ReactDOM.render(wrappedApp, document.getElementById('root'));
}

if (module.hot) {
    module.hot.accept('./DocApp', () => renderApp(DocApp));
}

renderApp(DocApp);
