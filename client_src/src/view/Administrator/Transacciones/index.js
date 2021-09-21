import React, {PureComponent} from 'react';
import Flex from '../../../components/Flex';
import Column from '../../../components/Column';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {
  getAllTRX,
  addTRXToRol,
  createTRX,
  editTRX,
  eliminarTRX,
  getRoleTrx,
  removeTRXFromRol,
  findTRXRole,
} from '../../../services/Transacciones';
import {getAllRole} from '../../../services/Roles';
import styles from './styles.module.scss';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {withTranslation} from 'react-i18next';

import {LoaderViewError} from '../../../actions.js';
import ComboBox from '../../../components/ComboBox';
import {Icon} from 'react-fa';
import Moment from 'react-moment';
import pullAllBy from 'lodash/pullAllBy';

const columns = (t) => {
  return [
    {
      Header: t('transacciones.title'),
      foldable: true,
      columns: [
        {
          Header: 'ID',
          accessor: 'id',
        },
        {
          Header: t('transacciones.nombre'),
          accessor: 'name',
          Cell: (props) => <span className="number">{props.value}</span>, // Custom cell components!
        },
        {
          accessor: 'trx',
          Header: t('transacciones.trx'),
          // accessor: d => d.friend.name // Custom value accessors!
        },
        {
          accessor: 'icon',
          Header: t('transacciones.icono'),
          filterable: false,
          sorteable: false,
          Cell: (row) => {
            return <Icon name={row.original.icon} />;
          },
          // accessor: d => d.friend.name // Custom value accessors!
        },
        {
          accessor: 'component',
          Header: t('transacciones.componente'),
        },
        {
          accessor: 'menuId',
          Header: t('transacciones.grupo'),
        },
        {
          Header: '',
          filterable: false,
          sorteable: false,
          width: 40,
          Cell: (row) => (
            <button className={styles.eliminar} alt={t('general.eliminar')}>
              <Icon name="close" />
            </button>
          ),
        },
      ],
    },
  ];
};
const columnsRoles = (t) => {
  return [
    {
      Header: t('roles.roles'),
      foldable: true,
      columns: [
        {
          Header: 'ID',
          accessor: 'id',
          show: false,
        },
        {
          Header: t('roles.name'),
          accessor: 'name',
        },
        {
          accessor: 'description',
          Header: t('roles.description'),
        },
        {
          accessor: 'created',
          Header: t('roles.created'),
          show: false,
          Cell: (row) => {
            return (
              <Moment
                locale={localStorage.getItem('i18nextLng')}
                format="DD-MM-YYYY HH:mm"
              >
                {row.original.created}
              </Moment>
            );
          },
        },
        {
          accessor: 'modified',
          Header: t('roles.modified'),
          show: false,
          Cell: (row) => {
            return (
              <Moment
                locale={localStorage.getItem('i18nextLng')}
                format="DD-MM-YYYY HH:mm"
              >
                {row.original.modified}
              </Moment>
            );
          },
        },
        {
          Header: '',
          filterable: false,
          sortable: false,
          width: 40,
          Cell: (row) => (
            <button className={styles.eliminar} alt={t('general.eliminar')}>
              <Icon name="close" />
            </button>
          ),
        },
      ],
    },
  ];
};

class Transacciones extends PureComponent {
  constructor(props) {
    super(props);
    this._columns = columns;
    this.state = {
      trx: {
        id: '',
        trx: '',
        name: '',
        icon: '',
        component: '',
        menuId: '',
      },
      rol: {
        id: '',
        name: '',
        description: '',
        created: '',
        modified: '',
      },
      roles: [],
      allroles: [],
      rolSelected: '',
      ifYouCan: true,
      ifYouAddRole: false,
      transacciones: [],
      msg: '',
      mode: 'crear',
      wait: false,
    };
  }

  getData = () => {
    let t = this;
    getAllTRX()
      .then((response) => {
        t.setState({transacciones: response.data});
        if (this.state.trx.id !== '') this.getTRXRoles(this.state.trx.id);
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status === 401) {
          t.setState({ifYouCan: false});
        }
      });
  };

  getTRXRoles = (trx) => {
    let t = this;
    getRoleTrx(trx)
      .then((response) => {
        t.setState({roles: response.data[0].roles});
        t.getRoles();
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status === 401) {
          t.setState({ifYouCan: false});
        }
      });
  };

  getRoles = () => {
    let t = this;
    getAllRole()
      .then((response) => {
        let items = this.state.roles;
        pullAllBy(response.data, items, 'id');
        t.setState({allroles: response.data});
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status === 401) {
          t.setState({ifYouCan: false});
        }
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  handleInputChange = (event) => {
    let newTRX = {
      ...this.state.trx,
      [event.target.name]: event.target.value,
    };
    this.setState({trx: newTRX});
  };

  handlerSubmit = (e) => {
    this.setState({wait: true});
    let t = this;
    e.preventDefault();

    if (this.state.mode === 'crear' && this.state.trx.id === '') {
      createTRX({
        name: this.state.trx.name,
        trx: this.state.trx.trx,
        icon: this.state.trx.icon,
        component: this.state.trx.component,
        menuId: this.state.trx.menuId,
      })
        .then((response) => {
          this.getData();
          this.props.t('transacciones.create');
          this.setState({
            trx: {
              id: '',
              name: '',
              icon: '',
              trx: '',
              menuId: '',
              component: '',
            },
            mode: 'crear',
            wait: false,
            msg: this.props.t('transacciones.creadoOk'),
          });
        })
        .catch((error) => {
          this.setState({wait: false});
          console.error(error.response);
          t.setState({
            msg:
              error.response !== undefined
                ? this.props.t(
                    'transacciones.' + error.response.data.error.message,
                  )
                : this.props.t('transacciones.error'),
          });
        });
    } else {
      editTRX({
        name: this.state.trx.name,
        trx: this.state.trx.trx,
        icon: this.state.trx.icon,
        component: this.state.trx.component,
        id: this.state.trx.id,
        menuId: this.state.trx.menuId,
      })
        .then((response) => {
          this.getData();
          this.setState({
            trx: {
              id: '',
              name: '',
              trx: '',
              component: '',
              icon: '',
              menuId: '',
            },
            mode: 'crear',
            wait: false,
            msg: this.props.t('transacciones.modificadoOk'),
          });
        })
        .catch((error) => {
          this.setState({wait: false});
          console.error(error.response);
          t.setState({
            msg:
              error.response !== undefined
                ? this.props.t(
                    'transacciones.' + error.response.data.error.code,
                  )
                : this.props.t('transacciones.error'),
          });
        });
    }
  };

  handlerClear = () => {
    this.setState({
      trx: {
        id: '',
        name: '',
        icon: '',
        component: '',
        trx: '',
        menuId: '',
      },
      rol: {
        id: '',
        name: '',
        description: '',
        created: '',
        modified: '',
      },
      roles: [],
      mode: 'crear',
      wait: false,
      msg: '',
    });
  };

  handlerGridAction = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        this.setState({
          trx: {
            id: rowInfo.original.id,
            name: rowInfo.original.name,
            icon: rowInfo.original.icon,
            trx: rowInfo.original.trx,
            menuId: rowInfo.original.menuId,
            component: rowInfo.original.component,
          },
          msg: '',
          mode: 'editar',
        });
        this.getTRXRoles(rowInfo.original.id);
        if (column.Header === '') {
          let r = window.confirm(this.props.t('general.estaseguro'));
          if (r === true) {
            this.handlerDelete(rowInfo.original.id);
          } else {
            this.handlerClear();
          }
        }
      },
    };
  };

  handlerGridRolesAction = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        this.setState({
          rol: {
            id: rowInfo.original.id,
            name: rowInfo.original.name,
            description: rowInfo.original.description,
            created: rowInfo.original.created,
            modified: rowInfo.original.modified,
          },
          msg: '',
          mode: 'editar',
        });
        if (column.Header === '') {
          let r = window.confirm(this.props.t('general.estaseguro'));
          if (r === true) {
            this.handlerDeleteRol(this.state.trx.id, rowInfo.original.id);
          } else {
            this.handlerClear();
          }
        }
      },
    };
  };

  handlerAddRole = () => {
    let t = this;
    addTRXToRol(this.state.trx.id, this.state.rolSelected)
      .then((response) => {
        // this.handlerClear();
        this.getData();
        this.setState({
          msg: this.props.t('transacciones.roleAdded'),
        });
      })
      .catch((error) => {
        console.error(error.response);
        t.setState({
          msg:
            error.response !== undefined
              ? this.props.t('transacciones.' + error.response.data.error.code)
              : this.props.t('transacciones.error'),
        });
      });
  };

  handlerGoAddRoles = () => {
    this.setState((prevState) => {
      return {msg: '', ifYouAddRole: !prevState.ifYouAddRole};
    });
  };

  handlerSelectChange = (e) => {
    this.setState({rolSelected: e.target.value});
  };

  handlerDeleteRol = (id, role) => {
    let t = this;
    findTRXRole(id, role).then((response) => {
      removeTRXFromRol(response.data[0].id)
        .then(() => {
          this.getData();
          this.setState({
            msg: this.props.t('usuarios.roleDeleted'),
          });
        })
        .catch((error) => {
          console.error(error.response);
          t.setState({
            msg:
              error.response !== undefined
                ? this.props.t('usuarios.' + error.response.data.error.code)
                : this.props.t('usuarios.error'),
          });
        });
    });
  };

  handlerDelete = (id) => {
    let t = this;
    eliminarTRX(id)
      .then((response) => {
        this.handlerClear();
        this.getData();
        this.setState({
          msg: this.props.t('transacciones.eliminadoOK'),
        });
      })
      .catch((error) => {
        console.error(error.response);
        t.setState({
          msg:
            error.response !== undefined
              ? this.props.t('transacciones.' + error.response.data.error.code)
              : this.props.t('transacciones.error'),
        });
      });
  };

  render() {
    return this.state.ifYouCan ? (
      !this.state.ifYouAddRole ? (
        <Flex direction="columns" padding="0" margin="0" wrap="wrap">
          <Column height="100%" padding="0" width="25%" auto={true}>
            <Flex
              direction="column"
              padding="0"
              margin="0"
              wrap="nowrap"
              round="3px"
            >
              <div className={styles.title}>
                <h3>
                  {this.state.mode === 'crear'
                    ? this.props.t('transacciones.newTRX')
                    : this.props.t('transacciones.modificarTRX', {
                        trx: this.state.trx.name,
                      })}
                </h3>
              </div>
              <div className={styles.icon}>
                <span className="fa-stack fa-lg">
                  <i
                    className={
                      'fa fa-circle fa-stack-2x fa-inverse ' + styles.shadow
                    }
                  />
                  <i className="fa fa-rocket fa-stack-1x " />
                </span>
              </div>
              <div className="padding-default">
                <Input
                  id="name"
                  type="text"
                  label={this.props.t('transacciones.nombre')}
                  placeholder={this.props.t('transacciones.nombre')}
                  value={this.state.trx.name || ''}
                  onChange={this.handleInputChange}
                />
                <Input
                  id="trx"
                  type="text"
                  label={this.props.t('transacciones.trx')}
                  placeholder={this.props.t('transacciones.trx')}
                  value={this.state.trx.trx || ''}
                  onChange={this.handleInputChange}
                />
                <Input
                  id="icon"
                  type="text"
                  label={this.props.t('transacciones.icono')}
                  placeholder={this.props.t('transacciones.icono')}
                  value={this.state.trx.icon || ''}
                  onChange={this.handleInputChange}
                />
                <Input
                  id="component"
                  type="text"
                  label={this.props.t('transacciones.componente')}
                  placeholder={this.props.t('transacciones.componente')}
                  autocomplete={false}
                  required={true}
                  value={this.state.trx.component || ''}
                  onChange={this.handleInputChange}
                />
                <Input
                  id="menuId"
                  type="text"
                  label={this.props.t('transacciones.grupo')}
                  placeholder={this.props.t('transacciones.grupo')}
                  autocomplete={false}
                  required={true}
                  value={this.state.trx.menuId || ''}
                  onChange={this.handleInputChange}
                />

                <div className="center">
                  <Button
                    visible={true}
                    loading={this.state.wait}
                    disabled={
                      this.state.trx.trx === '' ||
                      this.state.trx.name === '' ||
                      this.state.trx.icon === '' ||
                      this.state.trx.component === '' ||
                      this.state.trx.menuId === ''
                    }
                    text={
                      this.state.mode === 'editar'
                        ? this.props.t('general.editar')
                        : this.props.t('general.crear')
                    }
                    styleType="success"
                    id="guardar"
                    icon="user"
                    width="100%"
                    classes={styles.btn}
                    onPress={this.handlerSubmit}
                  />
                  <Button
                    visible={this.state.mode === 'editar' ? true : false}
                    loading={this.state.wait}
                    disabled={this.state.wait}
                    text={this.props.t('transacciones.addrole')}
                    styleType="info"
                    id="addRoleToTrx"
                    icon="shield"
                    width="100%"
                    classes={styles.btn}
                    onPress={this.handlerGoAddRoles}
                  />
                  <br />
                  <Button
                    visible={this.state.mode === 'editar' ? true : false}
                    type="outline"
                    loading={this.state.wait}
                    disabled={this.state.wait}
                    text={this.props.t('general.cancelar')}
                    id="cancelar"
                    icon="eraser"
                    width="100%"
                    classes={styles.btn}
                    onPress={this.handlerClear}
                  />

                  <div className="center">{this.state.msg}</div>
                </div>
              </div>
            </Flex>
          </Column>
          <Column height="100%" padding="0" width="74%" auto={true}>
            <ReactTable
              className="-striped -highlight"
              data={this.state.transacciones}
              columns={columns(this.props.t)}
              sortable={true}
              multiSort={true}
              resizable={true}
              filterable={true}
              defaultPageSize={25}
              getTdProps={this.handlerGridAction}
              previousText={this.props.t('general.previous')}
              nextText={this.props.t('general.next')}
              loadingText={this.props.t('general.loading')}
              noDataText={this.props.t('general.norowsfound')}
              pageText={this.props.t('general.page')}
              ofText={this.props.t('general.of')}
              rowsText={this.props.t('general.rows')}
            />
          </Column>
        </Flex>
      ) : (
        <Flex direction="columns" padding="0" margin="0" wrap="wrap">
          <Column height="100%" padding="0" width="25%" auto={true}>
            <Flex
              direction="column"
              padding="0"
              margin="0"
              wrap="nowrap"
              round="3px"
            >
              <div className={styles.title}>
                <h3>
                  {this.props.t('transacciones.addrole', {
                    role: this.state.trx.name,
                  })}
                </h3>
              </div>
              <div className={styles.icon}>
                <span className="fa-stack fa-lg">
                  <i
                    className={
                      'fa fa-circle fa-stack-2x fa-inverse ' + styles.shadow
                    }
                  />
                  <i className="fa fa-rocket fa-stack-1x " />
                </span>
              </div>
              <div className="padding-default">
                <ComboBox
                  id="RolesToTrx"
                  items={this.state.allroles}
                  itemId="id"
                  itemText="name"
                  onSelect={this.handlerSelectChange}
                />
                <Button
                  visible={this.state.mode === 'editar' ? true : false}
                  type="outline"
                  loading={this.state.wait}
                  disabled={this.state.wait}
                  text={this.props.t('general.volver')}
                  id="volverToTxr"
                  icon="arrow-left"
                  width="100%"
                  classes={styles.btn}
                  onPress={this.handlerGoAddRoles}
                />
                <Button
                  visible={true}
                  loading={this.state.wait}
                  disabled={this.state.rolSelected === ''}
                  text={this.props.t('transacciones.addrole')}
                  styleType="success"
                  id="addRoleToTRX"
                  icon="shield"
                  width="100%"
                  classes={styles.btn}
                  onPress={this.handlerAddRole}
                />
                <br />
                <div className="center">{this.state.msg}</div>
              </div>
              <div className="center">{this.state.msgPermisos}</div>
            </Flex>
          </Column>
          <Column height="100%" padding="0" width="74%" auto={true}>
            <ReactTable
              className="-striped -highlight"
              data={this.state.roles}
              columns={columnsRoles(this.props.t)}
              sortable={true}
              multiSort={true}
              resizable={true}
              filterable={true}
              defaultPageSize={5}
              getTdProps={this.handlerGridRolesAction}
              previousText={this.props.t('general.previous')}
              nextText={this.props.t('general.next')}
              loadingText={this.props.t('general.loading')}
              noDataText={this.props.t('general.norowsfound')}
              pageText={this.props.t('general.page')}
              ofText={this.props.t('general.of')}
              rowsText={this.props.t('general.rows')}
            />
          </Column>
        </Flex>
      )
    ) : (
      <Flex direction="columns" padding="0" margin="0" wrap="wrap">
        <Column height="100vh">
          <LoaderViewError
            icon="401"
            title={this.props.t('error.noAuth')}
            message={this.props.t('error.noAuthMessage')}
          />
        </Column>
      </Flex>
    );
  }
}
export default withTranslation()(Transacciones);
