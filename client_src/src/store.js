import {applyMiddleware, createStore, compose} from 'redux';
import {createLogger} from 'redux-logger';

const reducer = (state, action) => {
  if (action.type === 'CHANGE_LANGUAGE') {
    return {
      ...state,
      lang: action.lang,
    };
  } else if (action.type === 'LOGIN_AUTHORIZE') {
    return {
      ...state,
      token: action.token,
      userid: action.userid,
      username: action.username,
      nombre: action.nombre,
      apellido: action.apellido,
      ttl: action.ttl,
    };
  } else if (action.type === 'LOGOUT') {
    return {
      ...state,
      token: action.token,
      userid: action.userid,
      username: '',
      nombre: '',
      apellido: '',
      tabActive: 0,
      ttl: 0,
      tabList: [
        {
          name: 'Welcome',
          trx: 'Home',
          id: null,
          icon: 'home',
          closable: false,
          component: 'Home',
        },
      ],
    };
  } else if (action.type === 'ADD_NEW_TAB') {
    let isOpened = false;
    //check is opened
    state.tabList.map((tab) => {
      if (tab.trx === action.tab.trx) {
        isOpened = true;
      }
      return isOpened;
    });
    if (isOpened) {
      return state;
    } else {
      return {
        ...state,
        tabActive: state.tabList.length,
        tabList: state.tabList.concat(action.tab),
      };
    }
  } else if (action.type === 'REMOVE_TAB') {
    let newTabList = state.tabList.filter(function (tab) {
      return tab.trx !== action.trx;
    });
    return {
      ...state,
      tabActive: newTabList.length - 1,
      tabList: newTabList,
    };
  } else if (action.type === 'CHANGE_ACTIVE_TAB') {
    return {
      ...state,
      tabActive: action.newIndex,
    };
  } else if (action.type === 'CLOSE_MENU') {
    return {
      ...state,
      menuClosed: action.state,
    };
  }
  return state;
};

const logger = createLogger({collapsed: true});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(logger));

export default createStore(
  reducer,
  {
    lang:
      localStorage.getItem('i18nextLng') === null
        ? 'es'
        : localStorage.getItem('i18nextLng'),
    token: '',
    userid: null,
    username: '',
    nombre: '',
    apellido: '',
    ttl: 0,
    tabActive: 0,
    menuClosed: true,
    tabList: [
      {
        name: 'Welcome',
        trx: 'Home',
        id: null,
        icon: 'home',
        closable: false,
        component: 'Home',
      },
    ],
  },
  enhancer,
);
