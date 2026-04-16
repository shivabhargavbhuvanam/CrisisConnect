import React from 'react';
import ReactDOM from 'react-dom';
import App from './../App';
import LanguageDropdown from './LanguageDropDown';
import i18n from 'i18next';

function MainApp() {
    return (
        <React.StrictMode>
            <LanguageDropdown />
            <App />
        </React.StrictMode>
    );
}

ReactDOM.render(<MainApp />, document.getElementById('root'));
