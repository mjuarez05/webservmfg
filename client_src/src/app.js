import React, {PureComponent} from 'react';
import store from './store';
import {withTranslation} from 'react-i18next';
import i18n from 'i18next';
import Login from './view/Login';
import Dashboard from './view/Dashboard';
import {loginAuthorized} from './actionCreators';
import {
  setToken,
  isAuth,
  getEnviroment,
  setBaseURLDefault,
} from './services/Auth';
import styles from './style.module.scss';
import Enviroment from './env.json';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const APP_NAME = Enviroment.app_name;
const LANG = Enviroment.lang;
toast.configure({
  autoClose: 8000,
  draggable: false,
});

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userid: localStorage.getItem('userid'),
      username: localStorage.getItem('username'),
      nombre: localStorage.getItem('nombre'),
      apellido: localStorage.getItem('apellido'),
      ttl: localStorage.getItem('ttl'),
      lang: localStorage.getItem('i18nextLng')
        ? localStorage.getItem('i18nextLng').split('-')[0]
        : 'es' || LANG,
      isAuth: false,
      token: localStorage.getItem('token'),
      msg: '',
    };

    store.subscribe((e) => {
      this.setState({
        lang: store.getState().lang,
        token: store.getState().token,
        nombre: store.getState().nombre,
        apellido: store.getState().apellido,
        username: store.getState().username,
        ttl: store.getState().ttl,
      });
      localStorage.setItem('sesionStart', new Date());
      localStorage.setItem('userid', store.getState().userid);
      localStorage.setItem('token', store.getState().token);
      localStorage.setItem('ttl', store.getState().ttl);
      localStorage.setItem('username', store.getState().username);
      localStorage.setItem('nombre', store.getState().nombre);
      localStorage.setItem('apellido', store.getState().apellido);
      i18n.changeLanguage(store.getState().lang);
      if (
        store.getState().token !== '' &&
        store.getState().token !== undefined
      ) {
        setTimeout(() => {
          this.setState({
            isAuth:
              store.getState().token !== '' &&
              store.getState().token !== undefined,
          });
        }, 2000);
      } else {
        this.setState({isAuth: false, msg: ''});
      }
    });
  }

  componentDidMount = () => {
    window.title = APP_NAME;
    getEnviroment().then((data) => {
      setBaseURLDefault(data.api_url);
      if (this.state.token !== '') {
        setToken(this.state.token);
        isAuth(this.state.userid)
          .then((response) => {
            console.log('login');
            store.dispatch(
              loginAuthorized(
                this.state.token,
                this.state.userid,
                response.data.username,
                response.data.nombre,
                response.data.apellido,
                this.state.ttl,
              ),
            );
            this.setState({
              msg: i18n.t('login.welcome'),
            });
          })
          .catch((error) => {
            console.log('error');
            console.error(error.response);
            this.setState({
              msg:
                error.response !== undefined
                  ? i18n.t('login.' + error.response.data.error.code)
                  : i18n.t('login.error'),
            });
          });
      }
    });
  };

  render() {
    return !this.state.isAuth ? (
      <div>
        <Login className={styles.login} msg={this.state.msg} />
      </div>
    ) : (
      <div>
        <Dashboard
          className={styles.dashboard}
          userid={this.state.userid}
          appname={APP_NAME}
        />
        <ToastContainer />
      </div>
    );
  }
}
export default withTranslation()(App);
