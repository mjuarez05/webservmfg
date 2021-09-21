import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import store from './store';
import {Provider} from 'react-redux';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

//import registerServiceWorker from "./registerServiceWorker";

import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root'),
);
//registerServiceWorker();
