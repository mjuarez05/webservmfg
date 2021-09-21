import React, {PureComponent} from 'react';
import Flex from '../../../components/Flex';
import Column from '../../../components/Column';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import ComboBox from '../../../components/ComboBox';
import {
  getUsuarioTokens,
  getUsuarioRoles,
  getAllUsuario,
  addUsuario,
  editUsuario,
  eliminarUsuario,
  addRoleToUser,
  removeRoleToUser,
} from '../../../services/Usuarios';
import {getAllRole, findRole} from '../../../services/Roles';
import {killSession} from '../../../services/Auth';
import styles from './styles.module.scss';
import {withTranslation} from 'react-i18next';

import {LoaderViewError} from '../../../actions.js';
import {Icon} from 'react-fa';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment';

const columns = (t) => {
  return [
    {
      Header: t('usuarios.usuarios'),
      foldable: true,
      columns: [
        {
          Header: 'ID',
          accessor: 'id',
          show: false,
        },
        {
          Header: t('usuarios.nombre'),
          accessor: 'nombre',
        },
        {
          accessor: 'apellido',
          Header: t('usuarios.apellido'),
        },
        {
          accessor: 'username',
          Header: t('usuarios.username'),
        },
        {
          accessor: 'email',
          Header: t('usuarios.email'),
        },
        {
          accessor: 'password',
          Header: t('usuarios.password'),
          show: false,
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

const columnsRoles = (t) => {
  return [
    {
      Header: t('usuarios.roles'),
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
          Header: t('roles.description'),
          accessor: 'description',
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

const columnsSesiones = (t) => {
  return [
    {
      Header: t('usuarios.sessiones'),
      foldable: true,
      columns: [
        {
          Header: 'Token',
          accessor: 'id',
        },
        {
          Header: t('session.expire'),
          accessor: 'ttl',
        },
        {
          Header: t('session.created'),
          accessor: 'created',
          Cell: (row) => {
            return (
              <Moment format="DD-MM-YYYY HH:mm">{row.original.created}</Moment>
            );
          },
        },
        {
          Header: t('session.transcurrido'),
          Cell: (row) => {
            return (
              <Moment locale={localStorage.getItem('i18nextLng')} fromNow ago>
                {row.original.created}
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

class UserView extends PureComponent {
  constructor(props) {
    super(props);
    this._columns = columns;
    this.state = {
      user: {
        id: '',
        username: '',
        nombre: '',
        email: '',
        apellido: '',
        password: '',
      },
      ifYouCan: true,
      ifYouAddRole: false,
      usuarios: [],
      roles: [],
      sesiones: [],
      allroles: [],
      rolSelected: '',
      msgUsuario: '',
      modeUsuario: 'crear',
      wait: false,
    };
  }

  getData = () => {
    let t = this;
    getAllUsuario()
      .then((response) => {
        t.setState({usuarios: response.data});
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
        let items = [];
        if (this.state.roles.length > 0) {
          this.state.roles.forEach((v, i) => {
            response.data.forEach((v2, i2) => {
              if (v.name === v2.name) {
                items.push(i2);
              }
            });
          });
        } else {
          items = response.data;
        }
        items.forEach((v, i) => {
          response.data.splice(v - i, 1);
        });
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
    let newUsuario = {
      ...this.state.user,
      [event.target.name]: event.target.value,
    };
    this.setState({user: newUsuario});
  };

  addGeneralRol = (id) => {
    let t = this;
    findRole('General')
      .then((response) => {
        this.handlerAddRole(id, response.data[0].name);
      })
      .catch((error) => {
        this.setState({wait: false});
        console.error(error.response);
        t.setState({
          msgUsuario:
            error.response !== undefined
              ? this.props.t('role.' + error.response.data.error.message)
              : this.props.t('role.error'),
        });
      });
  };

  handlerSubmit = (e) => {
    this.setState({wait: true});
    let t = this;
    e.preventDefault();
    if (this.state.modeUsuario === 'crear' && this.state.user.id === '') {
      addUsuario({
        nombre: this.state.user.nombre,
        apellido: this.state.user.apellido,
        username: this.state.user.username,
        email: this.state.user.email,
        password: this.state.user.password,
      })
        .then((response) => {
          if (response.status === 200) {
            this.getData();
            this.props.t('usuarios.create');
            this.setState({
              user: {
                id: '',
                nombre: '',
                apellido: '',
                username: '',
                email: '',
              },
              modeUsuario: 'crear',
              wait: false,
              Usuario: this.props.t('general.creadoOK'),
            });
          } else {
            this.setState({wait: false});
            console.error(response);
            t.setState({
              msgUsuario:
                response.data !== undefined
                  ? this.props.t('usuarios.' + response.data.response.message)
                  : this.props.t('usuarios.error'),
            });
          }
        })
        .catch((error) => {
          this.setState({wait: false});
          console.error(error.response);
          t.setState({
            msgUsuario:
              error.response !== undefined
                ? this.props.t('usuarios.' + error.response.data.error.message)
                : this.props.t('usuarios.error'),
          });
        });
    } else {
      editUsuario({
        nombre: this.state.user.nombre,
        apellido: this.state.user.apellido,
        username: this.state.user.username,
        email: this.state.user.email,
        id: this.state.user.id,
        password: this.state.user.password,
      })
        .then((response) => {
          this.getData();
          this.setState({
            userid: '',
            nombre: '',
            apellido: '',
            username: '',
            email: '',
            mode: this.props.t('general.crear'),
            wait: false,
            msgUsuario: this.props.t('general.modificadoOK'),
          });
        })
        .catch((error) => {
          this.setState({wait: false});
          console.error(error.response);
          t.setState({
            msgUsuario:
              error.response !== undefined
                ? this.props.t('usuarios.' + error.response.data.error.code)
                : this.props.t('usuarios.error'),
          });
        });
    }
  };

  handlerClear = () => {
    this.setState({
      user: {
        id: '',
        nombre: '',
        apellido: '',
        username: '',
        email: '',
      },
      roles: [],
      sesiones: [],
      modeUsuario: 'crear',
      wait: false,
      msgUsuario: '',
    });
  };

  handlerGridAction = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        if (rowInfo !== undefined) {
          this.setState({
            user: {
              id: rowInfo.original.id,
              nombre: rowInfo.original.nombre,
              apellido: rowInfo.original.apellido,
              username: rowInfo.original.username,
              email: rowInfo.original.email,
              password: rowInfo.original.password,
            },
            roles: rowInfo.original.roles,
            msgUsuario: '',
            modeUsuario: 'editar',
          });
          getUsuarioTokens(rowInfo.original.id).then((response) => {
            rowInfo.original.accessTokens.length !==
            response.data.accessTokens.length
              ? this.setState({
                  sesiones: response.data.accessTokens,
                })
              : this.setState({
                  sesiones: rowInfo.original.accessTokens,
                });
          });
          this.getRoles();
          if (column.Header === '') {
            let r = window.confirm(this.props.t('general.estaseguro'));
            if (r === true) {
              this.handlerDelete(rowInfo.original.id);
            } else {
              this.handlerClear();
            }
          }
        }
      },
    };
  };

  handlerGridActionSessiones = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        if (rowInfo !== undefined) {
          if (column.Header === '') {
            let r = window.confirm(this.props.t('general.estaseguro'));
            if (r === true) {
              this.handlerDeleteSession(rowInfo.original.id);
            } else {
              this.handlerClear();
            }
          }
        }
      },
    };
  };

  handlerGridActionRoles = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        if (rowInfo !== undefined) {
          if (column.Header === '') {
            let r = window.confirm(this.props.t('general.estaseguro'));
            if (r === true) {
              this.handlerDeleteRol(this.state.user.id, rowInfo.original.name);
            } else {
              this.handlerClear();
            }
          }
        }
      },
    };
  };

  handlerDelete = (id) => {
    let t = this;
    eliminarUsuario(id)
      .then((response) => {
        this.handlerClear();
        this.getData().then(() => {});
        this.setState({
          msgUsuario: this.props.t('usuarios.eliminadoOK'),
        });
      })
      .catch((error) => {
        console.error(error.response);
        t.setState({
          msgUsuario:
            error.response !== undefined
              ? this.props.t('usuarios.' + error.response.data.error.code)
              : this.props.t('usuarios.error'),
        });
      });
  };

  handlerDeleteSession = (token) => {
    let t = this;
    killSession(token)
      .then((response) => {
        if (response.data.count === 1) {
          getUsuarioTokens(this.state.user.id).then((response) => {
            this.setState({
              sesiones: response.data.accessTokens,
              msgUsuario: this.props.t('session.eliminadoOK'),
            });
          });
        } else {
          this.setState({
            msgUsuario: this.props.t('session.eliminadoError'),
          });
        }
      })
      .catch((error) => {
        console.error(error.response);
        t.setState({
          msgUsuario:
            error.response !== undefined
              ? this.props.t('session.' + error.response.data.error.code)
              : this.props.t('session.error'),
        });
      });
  };

  handlerDeleteRol = (id, role) => {
    let t = this;
    removeRoleToUser(id, role)
      .then(() => {
        getUsuarioRoles(this.state.user.id).then((response) => {
          this.getRoles();
          this.setState({
            roles: response.data.roles,
            msgUsuario: this.props.t('usuarios.roleDeleted'),
          });
        });
      })
      .catch((error) => {
        console.error(error.response);
        t.setState({
          msgUsuario:
            error.response !== undefined
              ? this.props.t('usuarios.' + error.response.data.error.code)
              : this.props.t('usuarios.error'),
        });
      });
  };

  handlerAddRole = (userId, rolName) => {
    if (rolName === undefined) {
      userId = this.state.user.id;
      rolName = this.state.allroles.filter(
        (v) => v.name === this.state.rolSelected,
      )[0];
    }
    let t = this;

    addRoleToUser(userId, rolName)
      .then((response) => {
        getUsuarioRoles(this.state.user.id).then((response) => {
          this.getRoles();
          this.setState({
            roles: response.data.roles,
            msgUsuario: this.props.t('usuarios.rollAdded'),
          });
        });
      })
      .catch((error) => {
        console.error(error.response);
        t.setState({
          msgUsuario:
            error.response !== undefined
              ? this.props.t('usuarios.' + error.response.data.error.code)
              : this.props.t('usuarios.error'),
        });
      });
  };

  handlerSelectChange = (e) => {
    this.setState({rolSelected: e.target.value});
  };

  handlerGoAddRoles = (e) => {
    this.setState((prevState) => {
      return {
        ifYouAddRole: !prevState.ifYouAddRole,
        msgUsuario: '',
      };
    });
  };

  render() {
    return this.state.ifYouCan ? (
      !this.state.ifYouAddRole ? (
        <Flex direction="columns" padding="1rem" margin="0" wrap="wrap">
          <Column height="100%" padding="0" width="25%" animate={true}>
            <Flex
              direction="column"
              padding="0"
              margin="0"
              wrap="nowrap"
              round="3px"
            >
              <div className={styles.title}>
                <h3>
                  {this.state.modeUsuario === 'crear'
                    ? this.props.t('usuarios.newUsuario')
                    : this.props.t('usuarios.modificarUsuario', {
                        usuario: this.state.user.username,
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
                  <i className="fa fa-user fa-stack-1x " />
                </span>
              </div>
              <div className="padding-default">
                <Input
                  id="nombre"
                  type="text"
                  label={this.props.t('usuarios.nombre')}
                  placeholder={this.props.t('usuarios.nombre')}
                  value={this.state.user.nombre || ''}
                  onChange={this.handleInputChange}
                />
                <Input
                  id="apellido"
                  type="text"
                  label={this.props.t('usuarios.apellido')}
                  placeholder={this.props.t('usuarios.apellido')}
                  value={this.state.user.apellido || ''}
                  onChange={this.handleInputChange}
                />
                <Input
                  id="username"
                  type="text"
                  label={this.props.t('usuarios.username')}
                  placeholder={this.props.t('usuarios.username')}
                  value={this.state.user.username || ''}
                  onChange={this.handleInputChange}
                />
                <Input
                  id="email"
                  type="text"
                  required={true}
                  autocomplete={false}
                  label={this.props.t('usuarios.email')}
                  placeholder={this.props.t('usuarios.email')}
                  value={this.state.user.email || ''}
                  onChange={this.handleInputChange}
                />
                <Input
                  id="password"
                  type="password"
                  label={this.props.t('usuarios.password')}
                  placeholder={this.props.t('usuarios.password')}
                  autocomplete={false}
                  required={true}
                  value={this.state.user.password || ''}
                  onChange={this.handleInputChange}
                />

                <div className="center">
                  <Button
                    visible={true}
                    loading={this.state.wait}
                    disabled={
                      this.state.user.username === '' ||
                      this.state.user.nombre === '' ||
                      this.state.user.email === '' ||
                      this.state.user.apellido === ''
                    }
                    text={
                      this.state.modeUsuario === 'crear'
                        ? this.props.t('general.crear')
                        : this.props.t('general.editar')
                    }
                    styleType="success"
                    id="guardar"
                    icon="user"
                    width="100%"
                    classes={styles.btn}
                    onPress={this.handlerSubmit}
                  />
                  <Button
                    visible={this.state.modeUsuario === 'editar' ? true : false}
                    loading={this.state.wait}
                    disabled={this.state.wait}
                    text={this.props.t('usuarios.addrole')}
                    styleType="info"
                    id="goToAddRole"
                    icon="shield"
                    width="100%"
                    classes={styles.btn}
                    onPress={this.handlerGoAddRoles}
                  />

                  <Button
                    visible={this.state.modeUsuario === 'editar' ? true : false}
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
                </div>
              </div>
              <div className="center">{this.state.msgUsuario}</div>
            </Flex>
          </Column>
          <Column height="100%" padding="0" width="74%" animate={true}>
            <ReactTable
              className="-striped -highlight percent50"
              data={this.state.usuarios}
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
            <ReactTable
              className="-striped -highlight percent50"
              data={this.state.sesiones}
              columns={columnsSesiones(this.props.t)}
              sortable={true}
              multiSort={true}
              resizable={true}
              filterable={true}
              defaultPageSize={10}
              getTdProps={this.handlerGridActionSessiones}
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
        <Flex direction="columns" padding="1rem" margin="0" wrap="wrap">
          <Column height="100%" padding="0" width="25%" animate={true}>
            <Flex
              direction="column"
              padding="0"
              margin="0"
              wrap="nowrap"
              round="3px"
            >
              <div className={styles.title}>
                <h3>{this.props.t('usuarios.addrole')}</h3>
              </div>
              <div className={styles.icon}>
                <span className="fa-stack fa-lg">
                  <i
                    className={
                      'fa fa-circle fa-stack-2x fa-inverse ' + styles.shadow
                    }
                  />
                  <i className="fa fa-shield fa-stack-1x " />
                </span>
              </div>
              <div className="padding-default">
                <ComboBox
                  id="RolesToUser"
                  items={this.state.allroles}
                  itemId="name"
                  itemText="name"
                  onSelect={this.handlerSelectChange}
                />
                <Button
                  visible={this.state.modeUsuario === 'editar' ? true : false}
                  type="outline"
                  loading={this.state.wait}
                  disabled={this.state.wait}
                  text={this.props.t('general.volver')}
                  id="volverToUsers"
                  icon="arrow-left"
                  width="100%"
                  classes={styles.btn}
                  onPress={this.handlerGoAddRoles}
                />
                <Button
                  visible={true}
                  loading={this.state.wait}
                  disabled={this.state.rolSelected === ''}
                  text={this.props.t('usuarios.addrole')}
                  styleType="success"
                  id="addRoleToUser"
                  icon="shield"
                  width="100%"
                  classes={styles.btn}
                  onPress={this.handlerAddRole}
                />
              </div>
              <div className="center">{this.state.msgUsuario}</div>
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
              defaultPageSize={25}
              getTdProps={this.handlerGridActionRoles}
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
export default withTranslation()(UserView);
