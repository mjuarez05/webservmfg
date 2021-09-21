import React, {PureComponent} from 'react';
import {logoutAuth, setToken} from '../../services/Auth';
import store from '../../store';
import {withTranslation} from 'react-i18next';

import Flex from '../../components/Flex';
import TopBar from '../../components/TopBar';
import TopBarLeft from '../../components/TopBarLeft';
import TopBarCenter from '../../components/TopBarCenter';
import TopBarRight from '../../components/TopBarRight';
import Isotype from '../../components/Isotype';
import TopBarDropDownButton from '../../components/TopBarDropDownButton';
import TopBarDropDownItem from '../../components/TopBarDropDownItem';
import LeftBar from '../../components/LeftBar/index';
import LeftBarTop from '../../components/LeftBarTop';
import LeftBarButton from '../../components/LeftBarButton';
import LeftBarButtonMenu from '../../components/LeftBarButtonMenu';
import Content from '../../components/Content';
import TopBarSearch from '../../components/TopBarSearch';
import TopBarButton from '../../components/TopBarButton';
import TreeMenu from '../../components/TreeMenu';
import TabsContainer from '../../components/TabsContainer';
import TabsList from '../../components/TabsList';
import Tab from '../../components/Tab';
import TabPanel from '../../components/TabPanel';
import TabsContent from '../../components/TabsContent';
import TopBarMessage from '../../components/TopBarMessage';
import {findTRX} from '../../services/Transacciones';

import isologo from '../../assets/iso.svg';

import {
  logout,
  changeLanguage,
  changeActiveTab,
  addNewTab,
} from '../../actionCreators';
import styles from './styles.module.scss';
import Column from '../../components/Column';
import {
  LoaderViewHome,
  LoaderViewUsuarios,
  LoaderViewWelcome,
  LoaderViewTRX,
  LoaderViewError,
  LoaderViewRole,
  LoaderViewMonitorFaena,
  LoaderViewProfile,
  LoaderViewSock,
  LoaderViewListProductos,
  LoaderViewAddProductos,
  LoaderViewEditProductos,
  LoaderViewGreenPesada,
  LoaderViewGreenListPallets,
  LoaderViewGreenEditPallets,
  LoaderViewTrxParam,
  LoaderViewGreenPesPrdFinal,
  LoaderViewGreenPesCons,
  LoaderViewGreenCamaras,
  LoaderViewGreenCamarasAdmin,
  LoaderViewGreenFiltroCamaras,
} from '../../actions.js';

// import Button from "../../components/Button"; const LoaderCompopnentHome =
// Loadable({   loader: () => import ('../Home'),   loading: () => null });
// const LoaderCompopnentWelcome = Loadable({   loader: () => import
// ('../Welcome'),   loading: () => null });
class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      launcher: '',
      msg: '',
      tabActive: store.getState().tabActive,
    };

    store.subscribe(() => {
      this.setState({
        tabActive: store.getState().tabActive,
      });
    });
  }

  clearLauncher() {
    this.setState({launcher: ''});
  }

  handlerChangeLenguage = (lang) => {
    store.dispatch(changeLanguage(lang));
  };

  handlerLogOut = () => {
    logoutAuth(store.getState().token)
      .then((response) => {
        setToken('');
        store.dispatch(logout('', ''));
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status === 401) {
          setToken('');
          store.dispatch(logout('', ''));
        }
      });
  };

  renderTabs = (component) => {
    switch (component) {
      case 'Welcome':
        return <LoaderViewWelcome />;
      case 'Home':
        return <LoaderViewHome />;
      case 'Usuarios':
        return <LoaderViewUsuarios />;
      case 'TRX':
        return <LoaderViewTRX />;
      case 'Role':
        return <LoaderViewRole />;
      case 'MonitorFaena':
        return <LoaderViewMonitorFaena />;
      case 'Profile':
        return <LoaderViewProfile />;
      case 'Productos':
        return <LoaderViewListProductos />;
      case 'AddProductos':
        return <LoaderViewAddProductos />;
      case 'EditProductos':
        return <LoaderViewEditProductos />;
      case 'Sock':
        return <LoaderViewSock />;
      case 'GreenPesada':
        return <LoaderViewGreenPesada />;
      case 'TrxParam':
        return <LoaderViewTrxParam />;
      case 'GreenEditPallets':
        return <LoaderViewGreenEditPallets />;
      case 'GreenListPallets':
        return <LoaderViewGreenListPallets />;
      case 'GreenPesPrdFinal':
        return <LoaderViewGreenPesPrdFinal />;
      case 'GreenPesCons':
        return <LoaderViewGreenPesCons />;
      case 'GreenCamaras':
        return <LoaderViewGreenCamaras />;
      case 'GreenCamarasAdmin':
        return <LoaderViewGreenCamarasAdmin />;
      case 'GreenFiltroCamaras':
        return <LoaderViewGreenFiltroCamaras />;
      default:
        return (
          <LoaderViewError
            icon="404"
            title={this.props.t('error.noFound')}
            message={this.props.t('error.noFoundMessage')}
          />
        );
    }
  };

  handlerGoHome = () => {
    store.dispatch(changeActiveTab(0));
  };

  handlerGoProfile = () => {
    store.dispatch(
      addNewTab({
        closable: true,
        component: 'Profile',
        name: 'Mi Perfil',
        trx: 'Profile',
        icon: 'vcard-o',
      }),
    );
  };

  handlerChangeLauncher = (e) => {
    this.setState({
      launcher: e.target.value.toUpperCase(),
      msg: '',
    });
  };

  handlerKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handlerLaunch();
    }
  };

  handlerLaunch = (e) => {
    let t = this;
    findTRX(this.state.launcher)
      .then((response) => {
        if (response.status === 200) {
          this.setState({msg: ''});
          store.dispatch(
            addNewTab({
              ...response.data,
              closable: true,
            }),
          );
          this.clearLauncher();
        }
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status === 401) {
          t.setState({
            ifYouCan: false,
            msg: this.props.t('transacciones.noauth'),
          });
        } else if (error.response.status === 404) {
          this.setState({
            msg: this.props.t('transacciones.noexiste'),
          });
        }
      });
  };

  render() {
    return (
      <Flex
        direction="row"
        padding="0"
        margin="0"
        classes={styles.app}
        wrap="wrap"
      >
        <Column
          height="100vh"
          classes={styles.altura}
          width="var(--leftbar-width)"
        >
          <LeftBar>
            <LeftBarTop>
              <Isotype name="Arido Components" isologo={isologo} />
              <LeftBarButton
                id="home"
                icon="home"
                onPress={this.handlerGoHome}
              />
              <LeftBarButtonMenu id="menu" icon="bars" fullmenu={true}>
                <TreeMenu title={this.props.t('dashboard.menu')} />
              </LeftBarButtonMenu>
            </LeftBarTop>
          </LeftBar>
        </Column>
        <Column auto={true} width="calc(100% - var(--leftbar-width))">
          <Flex
            direction="column"
            padding="0"
            margin="0"
            classes={styles.app}
            wrap="wrap"
          >
            <Column height="var(--topbar-height)" classes={styles.altura}>
              <TopBar>
                <TopBarLeft>
                  <TopBarSearch
                    id="launcher"
                    ref={(launcher) => (this.launcher = launcher)}
                    placeholder={this.props.t('dashboard.search')}
                    value={this.state.launcher || ''}
                    onChange={this.handlerChangeLauncher}
                    onKeyPress={this.handlerKeyPress}
                  />
                  <TopBarButton
                    id="go"
                    icon="search"
                    type="submit"
                    onPress={this.handlerLaunch}
                  />
                  <TopBarMessage>{this.state.msg}</TopBarMessage>
                </TopBarLeft>
                <TopBarCenter />
                <TopBarRight>
                  <TopBarDropDownButton
                    id="dropdown"
                    icon="globe"
                    disabled={false}
                    selected="es"
                    text={store.getState().lang.toUpperCase()}
                  >
                    <TopBarDropDownItem
                      id="lang-es"
                      text="Español"
                      disabled={false}
                      value="es"
                      onPress={this.handlerChangeLenguage}
                    />
                    <TopBarDropDownItem
                      id="lang-en"
                      text="Ingles"
                      disabled={false}
                      value="en"
                      onPress={this.handlerChangeLenguage}
                    />
                  </TopBarDropDownButton>
                  <TopBarDropDownButton
                    id="dropdown"
                    icon="user-circle"
                    disabled={false}
                    text={store.getState().username}
                  >
                    <TopBarDropDownItem
                      id="logout"
                      text={this.props.t('dashboard.profile')}
                      disabled={false}
                      onPress={this.handlerGoProfile}
                    />
                    <TopBarDropDownItem
                      id="logout"
                      text={this.props.t('dashboard.logout')}
                      disabled={false}
                      onPress={this.handlerLogOut}
                    />
                  </TopBarDropDownButton>
                </TopBarRight>
              </TopBar>
            </Column>
            <Column auto={true} backgroundColor="#f6f6f6">
              <Content>
                <Flex direction="column" padding="0" margin="0" wrap="wrap">
                  <Column padding="0.5rem" width="100%">
                    <TabsContainer activeTab={this.state.tabActive}>
                      <TabsList>
                        {store.getState().tabList.map((tab, key) => (
                          <Tab
                            id={tab.trx}
                            key={tab.trx + '_' + key}
                            closable={tab.closable}
                          >
                            <i className={'fa fa-' + tab.icon} />{' '}
                            {this.props.t('trx.' + tab.name)}
                          </Tab>
                        ))}
                      </TabsList>
                      <TabsContent>
                        {store.getState().tabList.map((tab, key) => (
                          <TabPanel key={tab.trx + '_' + key}>
                            {this.renderTabs(tab.component)}
                          </TabPanel>
                        ))}
                      </TabsContent>
                    </TabsContainer>
                  </Column>
                </Flex>
              </Content>
            </Column>
          </Flex>
        </Column>
      </Flex>
    );
  }
}
export default withTranslation()(Dashboard);
