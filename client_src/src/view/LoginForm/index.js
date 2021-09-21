import React, {PureComponent} from 'react';
import {withTranslation} from 'react-i18next';
import i18n from 'i18next';
import store from '../../store';
import {login, setToken} from '../../services/Auth';
import {getUsuario} from '../../services/Usuarios';
import Flex from '../../components/Flex';
import Column from '../../components/Column';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ComboBox from '../../components/ComboBox';

import {loginAuthorized, changeLanguage} from '../../actionCreators';

import styles from './styles.module.scss';

import logo from '../../assets/logonuevo.png';

const APP_NAME = process.env.REACT_APP_NAME;

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      msg: this.props.msg,
      wait: false,
    };
  }

  handlerChange = (e) => {
    switch (e.target.id) {
      case 'username':
        this.setState({username: e.target.value});
        break;
      case 'password':
        this.setState({password: e.target.value});
        break;
      default:
    }
  };

  handlerPress = (event) => {
    this.setState({wait: true});
    let t = this;
    login(this.state.username, this.state.password)
      .then((response) => {
        this.setState({
          wait: false,
          msg: i18n.t('login.welcome'),
        });
        localStorage.setItem('token', response.data.id);
        setToken(response.data.id);
        getUsuario(response.data.userId)
          .then((profile) => {
            t.setState(
              {
                msg: i18n.t('general.bienvenido'),
              },
              () => {
                store.dispatch(
                  loginAuthorized(
                    response.data.id,
                    response.data.userId,
                    profile.data.username,
                    profile.data.nombre,
                    profile.data.apellido,
                    response.data.ttl,
                  ),
                );
              },
            );
          })
          .catch((error) => {
            this.setState({wait: false});
            console.error(error.response);
            t.setState({
              msg:
                error.response !== undefined
                  ? i18n.t('login.' + error.response.data.error.code)
                  : i18n.t('login.error'),
            });
          });
      })
      .catch((error) => {
        console.log('aca', error.response);
        this.setState({wait: false});
        console.error(error.response);
        t.setState({
          msg:
            error.response !== undefined
              ? i18n.t('login.' + error.response.data.error.code)
              : i18n.t('login.error'),
        });
      });
  };

  handlerOnSelect = (e) => {
    store.dispatch(changeLanguage(e.target.value));

    // this.setState({ lang: e.target.value }); localStorage.setItem("lang",
    // e.target.value); i18n.changeLanguage(e.target.value);
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handlerPress();
    }
  };

  render() {
    const items = [
      {
        value: 'es',
        text: 'Español',
      },
      {
        value: 'en',
        text: 'Ingles',
      },
    ];
    const {t} = this.props;

    return !store.getState().username ? (
      <Flex
        direction="column"
        alignContent="center"
        backgroundColor="var(--ligth)"
        alignItems="center"
        justifyContent="center"
        width="70%"
        margin=" 0 auto"
      >
        <Column
          margin="0"
          width="auto"
          auto={false}
          style={{
            textAlign: 'center',
          }}
        >
          <img src={logo} alt={APP_NAME} />
        </Column>
        <Column
          margin="0"
          auto={false}
          style={{
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              color: 'black',
            }}
          >
            {t('login.title')}
          </h3>
        </Column>
        <Column margin="0" padding="0" auto={false}>
          <Input
            id="username"
            placeholder={t('login.username')}
            border={false}
            type="text"
            autocomplete={true}
            className="center"
            width="100%"
            required={true}
            defaultValue={this.state.password}
            onChange={this.handlerChange}
          />
        </Column>
        <Column margin="0" padding="0" auto={false}>
          <Input
            id="password"
            border={false}
            placeholder={t('login.password')}
            type="password"
            required={true}
            autocomplete={true}
            className="center"
            width="100%"
            whenKeyPress={this.handleKeyPress}
            defaultValue={this.state.password}
            onChange={this.handlerChange}
          />
        </Column>

        <Column margin="0" auto={false}>
          <ComboBox
            id="lang"
            itemId="value"
            itemText="text"
            items={items}
            classes={styles.select}
            onSelect={this.handlerOnSelect}
            value={store.getState().lang}
          />
        </Column>
        <Column margin="0" auto={false}>
          <Button
            visible={true}
            icon="sign-in"
            disable={this.state.wait}
            loading={this.state.wait}
            classes={styles.btn}
            id="login"
            styleType="success"
            text={t('login.login')}
            className="center"
            width="100%"
            margin="0"
            onPress={this.handlerPress}
          />
        </Column>
        <Column margin="0" auto={false}>
          <br />
          <div className={styles.msg}>{this.state.msg}</div>
        </Column>
      </Flex>
    ) : (
      <Flex
        direction="column"
        alignContent="center"
        backgroundColor="var(--ligth)"
        alignItems="center"
        justifyContent="center"
      >
        <Column margin="0" auto={false}>
          <Flex
            direction="column"
            alignContent="center"
            backgroundColor="var(--ligth)"
            alignItems="center"
            justifyContent="center"
          >
            <img src={logo} alt={APP_NAME} />
            <br />
            <div className={styles.msg}>{this.props.msg}</div>
          </Flex>
        </Column>
      </Flex>
    );
  }
}
export default withTranslation()(Login);
