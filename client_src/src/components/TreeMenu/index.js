import React from 'react';
import {Treebeard, decorators} from 'react-treebeard';
import store from '../../store';
import {addNewTab, closeMenu} from '../../actionCreators';
import theme from './theme';
import * as filters from './filters';
import Input from '../Input/index';
import {withTranslation} from 'react-i18next';
import {getUserMenuByUser} from '../../services/Transacciones';

decorators.Header = ({style, node}) => {
  // const iconType = node.children   ? 'folder'   : node.icon;
  const iconType = node.icon;
  const iconClass = `fa fa-${iconType}`;
  const iconStyle = {
    marginRight: '5px',
  };

  return (
    <div style={style.base}>
      <div style={style.title}>
        <i className={iconClass} style={iconStyle} /> {node.name}
      </div>
    </div>
  );
};

let menu = {};

class TreeMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {
        name: 'Mi Menu',
        trx: 'title',
        id: null,
        toggled: true,
        icon: 'folder',
        children: [],
      },
    };
  }

  cleaningTree = (child) => {
    if (child.length > 0) {
      child.forEach((element) => {
        if (element.children.length > 0) {
          this.cleaningTree(element.children);
        } else {
          delete element.children;
        }
      });
    }
    if (child.children === undefined) return;
    if (child.children.length > 0) {
      child.children.forEach((element) => {
        if (element.children.length > 0) {
          this.cleaningTree(element.children);
        } else {
          delete element.children;
        }
      });
    } else {
      delete child.children;
    }
  };

  getTransacciones = (id) => {
    let t = this;
    getUserMenuByUser(id)
      .then((response) => {
        response.data.menu.forEach((element) => {
          if (element.children.length > 0) this.cleaningTree(element);
        });
        t.setState({
          data: {
            ...this.state.data,
            children: response.data.menu,
          },
        });
        menu = this.state.data;
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  componentDidMount = () => {
    this.getTransacciones(store.getState().userid);
  };

  onToggle = (node, toggled) => {
    const {cursor} = this.state;
    if (cursor) {
      cursor.active = false;
    }

    node.active = true;
    if (node.trx === 'title') {
      node.toggled = toggled;
    }
    this.setState({cursor: node});

    if (node.children === undefined || node.children.length === 0) {
      store.dispatch(
        addNewTab({
          name: node.name,
          trx: node.trx,
          id: node.id,
          component: node.component,
          closable: true,
        }),
      );
      store.dispatch(closeMenu({state: true}));
    }
  };

  onFilterMouseUp = (e) => {
    const filter = e.target.value.trim();
    if (!filter) {
      return this.setState({data: menu});
    }
    var filtered = filters.filterTree(menu, filter);
    filtered = filters.expandFilteredNodes(filtered, filter);
    this.setState({data: filtered});
  };

  render() {
    const {data: stateData} = this.state;

    return (
      <div>
        <h3>{this.props.title}</h3>
        <Input
          id={'searchMenu' + parseInt(Math.random() * 1000000, 10)}
          type="text"
          placeholder={this.props.t('component.treemenu.search')}
          whenKeyUp={this.onFilterMouseUp}
        />
        <div style={{height: 'calc(100vh - 11rem)', overflow: 'auto'}}>
          <Treebeard
            data={stateData}
            decorators={decorators}
            onToggle={this.onToggle}
            style={theme}
          />
        </div>
      </div>
    );
  }
}
export default withTranslation()(TreeMenu);
