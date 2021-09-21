import React, {PureComponent} from 'react';
import Flex from '../../../components/Flex';
import Column from '../../../components/Column';
import Input from '../../../components/Input';
import ComboBox from '../../../components/ComboBox';
import Button from '../../../components/Button';
import {
  getAllRole,
  createRole,
  editRole,
  eliminarRole,
} from '../../../services/Roles';
import {getAllModels, getAllMethods} from '../../../services/Transacciones';
import {
  createPermission,
  eliminarPermission,
  getRolePermission,
} from '../../../services/Permisos';
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

const columnsPermisos = (t) => {
  return [
    {
      Header: t('roles.permisosDe'),
      foldable: true,
      columns: [
        {
          Header: 'ID',
          accessor: 'id',
          show: false,
        },
        {
          Header: t('permisos.model'),
          accessor: 'model',
        },
        {
          Header: t('permisos.accessType'),
          accessor: 'accessType',
        },
        {
          Header: t('permisos.property'),
          accessor: 'property',
        },
        {
          Header: t('permisos.permission'),
          accessor: 'permission',
        },
        {
          Header: t('permisos.principalType'),
          accessor: 'principalType',
          show: false,
        },
        {
          Header: t('permisos.principalId'),
          accessor: 'principalId',
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

const accessTypes = (t) => {
  return [
    {
      id: 'READ',
      value: t('permisos.read'),
    },
    {
      id: 'CREATE',
      value: t('permisos.create'),
    },
    {
      id: 'EXECUTE',
      value: t('permisos.execute'),
    },
    {
      id: '*',
      value: t('permisos.all'),
    },
  ];
};
const permissions = (t) => {
  return [
    {
      id: 'ALLOW',
      value: t('permisos.allow'),
    },
    {
      id: 'DENY',
      value: t('permisos.deny'),
    },
  ];
};

class Role extends PureComponent {
  constructor(props) {
    super(props);
    this._columns = columns;
    this.state = {
      rol: {
        id: '',
        name: '',
        creted: '',
        modified: '',
        description: '',
      },
      permiso: {
        id: '',
        model: '',
        accessType: '',
        permission: '',
        principalType: 'ROLE',
        property: '',
        principalId: '',
      },
      ifYouCan: true,
      ifYouAddPermission: false,
      roles: [],
      allmodels: [],
      allmethods: [],
      permisos: [],
      msg: '',
      msgPermisos: '',
      modeRol: 'crear',
      modePermisos: 'crear',
      wait: false,
    };
  }

  getModels = () => {
    let t = this;
    getAllModels()
      .then((response) => {
        t.setState({allmodels: response.data.models});
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status === 401) {
          t.setState({ifYouCan: false});
        }
      });
  };

  getMethods = (modelName) => {
    let t = this;
    getAllMethods(modelName)
      .then((response) => {
        t.setState({allmethods: response.data.methods});
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
        t.setState({roles: response.data});
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status === 401) {
          t.setState({ifYouCan: false});
        }
      });
  };

  getPermissionsForRole = (roleName) => {
    let t = this;
    getRolePermission(roleName)
      .then((response) => {
        t.setState({permisos: response.data});
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status === 401) {
          t.setState({ifYouCan: false});
        }
      });
  };

  componentDidMount = () => {
    this.getRoles();
    this.getModels();
  };

  handleInputChange = (event) => {
    let newRol = {
      ...this.state.rol,
      [event.target.name]: event.target.value,
    };
    this.setState({rol: newRol});
  };

  handleInputChangePermiso = (event) => {
    let newPermiso = {
      ...this.state.permiso,
      [event.target.name]: event.target.value,
    };
    this.setState({permiso: newPermiso});
  };

  handlerSubmit = (e) => {
    this.setState({wait: true});
    let t = this;
    e.preventDefault();
    if (this.state.modeRol === 'crear' && this.state.rol.id === '') {
      createRole({
        name: this.state.rol.name,
        description: this.state.rol.description,
        created: new Date(),
        modified: new Date(),
      })
        .then((response) => {
          this.getRoles();
          this.props.t('roles.create');
          this.setState({
            rol: {
              id: '',
              name: '',
              description: '',
              created: '',
              modified: '',
            },
            modeRol: 'crear',
            wait: false,
            msg: this.props.t('roles.creadoOK'),
          });
        })
        .catch((error) => {
          this.setState({wait: false});
          console.error(error.response);
          t.setState({
            msg:
              error.response !== undefined
                ? this.props.t('roles.' + error.response.data.error.message)
                : this.props.t('roles.error'),
          });
        });
    } else {
      editRole({
        name: this.state.rol.name,
        description: this.state.rol.description,
        id: this.state.rol.id,
        created: this.state.rol.created,
        modified: new Date(),
      })
        .then((response) => {
          this.getRoles();
          this.setState({
            rol: {
              id: '',
              name: '',
              description: '',
              created: '',
              modified: '',
            },
            modeRol: 'crear',
            wait: false,
            msg: this.props.t('roles.modificadoOK'),
          });
        })
        .catch((error) => {
          this.setState({wait: false});
          console.error(error.response);
          t.setState({
            msg:
              error.response !== undefined
                ? this.props.t('roles.' + error.response.data.error.code)
                : this.props.t('roles.error'),
          });
        });
    }
  };

  handlerSubmitPermsio = (e) => {
    this.setState({wait: true});
    let t = this;
    e.preventDefault();
    createPermission({
      model: this.state.permiso.model,
      accessType: this.state.permiso.accessType,
      property: this.state.permiso.property,
      permission: this.state.permiso.permission,
      principalType: this.state.permiso.principalType,
      principalId: this.state.permiso.principalId,
    })
      .then((response) => {
        this.getPermissionsForRole(this.state.rol.name);
        this.props.t('permisos.create');
        this.setState({
          permiso: {
            model: '',
            accessType: '',
            permission: '',
            property: '',
            principalId: this.state.permiso.principalId,
            principalType: 'ROLE',
          },
          modePermisos: 'crear',
          wait: false,
          msgPermisos: this.props.t('permisos.creadoOK'),
        });
      })
      .catch((error) => {
        this.setState({wait: false});
        console.error(error.response);
        t.setState({
          msg:
            error.response !== undefined
              ? this.props.t('permisos.' + error.response.data.error.message)
              : this.props.t('permisos.error'),
        });
      });
  };

  handlerClear = () => {
    this.setState({
      rol: {
        id: '',
        name: '',
        description: '',
        created: '',
        modified: '',
      },
      modeRol: 'crear',
      wait: false,
      msg: '',
    });
  };

  handlerClearPermisos = () => {
    this.setState({
      permiso: {
        model: '',
        accessType: '',
        permission: '',
        property: '',
        principalId: this.state.permiso.principalId,
        principalType: 'ROLE',
      },
      modePermisos: 'crear',
      wait: false,
      msgPermisos: '',
    });
  };

  handlerGridAction = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        if (rowInfo !== undefined) {
          this.handlerClearPermisos();
          this.getPermissionsForRole(rowInfo.original.name);
          this.setState({
            rol: {
              id: rowInfo.original.id,
              name: rowInfo.original.name,
              created: rowInfo.original.created,
              modified: rowInfo.original.modified,
              description: rowInfo.original.description,
            },
            permiso: {
              model: '',
              accessType: '',
              permission: '',
              principalType: 'ROLE',
              property: '*',
              principalId: rowInfo.original.name,
            },
            msg: '',
            modeRol: 'editar',
          });
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

  handlerGridPermisosAction = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        if (rowInfo !== undefined) {
          if (column.Header === '') {
            let r = window.confirm(this.props.t('general.estaseguro'));
            if (r === true) {
              this.handlerDeletePermiso(rowInfo.original.id);
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
    eliminarRole(id)
      .then((response) => {
        this.handlerClear();
        this.getRoles();
        this.setState({
          ...this.state,
          msg: this.props.t('roles.eliminadoOK'),
        });
      })
      .catch((error) => {
        console.error(error.response);
        t.setState({
          msg:
            error.response !== undefined
              ? this.props.t('roles.' + error.response.data.error.code)
              : this.props.t('roles.error'),
        });
      });
  };

  handlerDeletePermiso = (id) => {
    let t = this;
    eliminarPermission(id)
      .then((response) => {
        this.getPermissionsForRole(this.state.rol.name);
        this.setState({
          ...this.state,
          msg: this.props.t('permisos.eliminadoOK'),
        });
      })
      .catch((error) => {
        console.error(error.response);
        t.setState({
          msg:
            error.response !== undefined
              ? this.props.t('roles.' + error.response.data.error.code)
              : this.props.t('roles.error'),
        });
      });
  };

  handlerSelectChange = (e) => {
    this.setState({
      permiso: {
        ...this.state.permiso,
        [e.target.name]: e.target.value,
      },
    });
    if (e.target.name === 'model') this.getMethods(e.target.value);
  };

  handlerGoAddPermission = () => {
    this.setState({
      msg: '',
      ifYouAddPermission: !this.state.ifYouAddPermission,
    });
  };

  render() {
    return this.state.ifYouCan ? (
      !this.state.ifYouAddPermission ? (
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
                  {this.state.modeRol === 'crear'
                    ? this.props.t('roles.newRoles')
                    : this.props.t('roles.modificarRoles', {
                        rol: this.state.rol.name,
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
                  <i className="fa fa-shield fa-stack-1x " />
                </span>
              </div>
              <div className="padding-default">
                <Input
                  id="name"
                  type="text"
                  label={this.props.t('roles.name')}
                  placeholder={this.props.t('roles.name')}
                  value={this.state.rol.name || ''}
                  onChange={this.handleInputChange}
                />
                <Input
                  id="description"
                  type="text"
                  label={this.props.t('roles.description')}
                  placeholder={this.props.t('roles.description')}
                  value={this.state.rol.description || ''}
                  onChange={this.handleInputChange}
                />
                <div className="center">
                  <Button
                    visible={true}
                    loading={this.state.wait}
                    disabled={
                      this.state.rol.name === '' ||
                      this.state.rol.description === ''
                    }
                    text={
                      this.state.modeRol === 'crear'
                        ? this.props.t('general.crear')
                        : this.props.t('general.editar')
                    }
                    styleType="success"
                    id="guardar"
                    icon="shield"
                    width="100%"
                    classes={styles.btn}
                    onPress={this.handlerSubmit}
                  />
                  {/* <Button
                    visible={this.state.modeRol === 'editar' ? true : false}
                    loading={this.state.wait}
                    disabled={this.state.wait}
                    text={this.props.t('roles.addPermiso')}
                    styleType="info"
                    id="addPermissions"
                    icon="shield"
                    width="100%"
                    classes={styles.btn}
                    onPress={this.handlerGoAddPermission}
                  /> */}
                  <br />
                  <Button
                    visible={this.state.modeRol === 'editar' ? true : false}
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
                <div className="center">{this.state.msg}</div>
              </div>
            </Flex>
          </Column>
          <Column height="100%" padding="0" width="74%" auto={true}>
            <ReactTable
              className="-striped -highlight"
              data={this.state.roles}
              columns={columns(this.props.t)}
              sortable={true}
              multiSort={true}
              resizable={true}
              filterable={true}
              defaultPageSize={15}
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
                  {this.props.t('permisos.newPermiso', {
                    rol: this.state.rol.name,
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
                  <i className="fa fa-key fa-stack-1x " />
                </span>
              </div>
              <div className="padding-default">
                <ComboBox
                  id="model"
                  // value={this.state.permiso.model}
                  items={this.state.allmodels}
                  onSelect={this.handlerSelectChange}
                />
                <ComboBox
                  id="property"
                  // value={this.state.permiso.property}
                  items={this.state.allmethods}
                  onSelect={this.handlerSelectChange}
                />
                <ComboBox
                  id="accessType"
                  itemId="id"
                  itemText="value"
                  //value={this.state.permiso.accessType}
                  items={accessTypes(this.props.t)}
                  onSelect={this.handlerSelectChange}
                />
                <ComboBox
                  id="permission"
                  itemId="id"
                  itemText="value"
                  // value={this.state.permiso.permission}
                  items={permissions(this.props.t)}
                  onSelect={this.handlerSelectChange}
                />
                <div className="center">
                  <Button
                    visible={this.state.modeRol === 'editar' ? true : false}
                    type="outline"
                    loading={this.state.wait}
                    disabled={this.state.wait}
                    text={this.props.t('general.volver')}
                    id="volverToRoles"
                    icon="arrow-left"
                    width="100%"
                    classes={styles.btn}
                    onPress={this.handlerGoAddPermission}
                  />
                  <Button
                    visible={true}
                    loading={this.state.wait}
                    disabled={
                      this.state.permiso.accessType === '' ||
                      this.state.permiso.permission === '' ||
                      this.state.permiso.property === '' ||
                      this.state.permiso.model === ''
                    }
                    text={
                      this.state.modePermisos === 'crear'
                        ? this.props.t('general.crear')
                        : this.props.t('general.editar')
                    }
                    styleType="success"
                    id="guardar"
                    icon="key"
                    width="100%"
                    classes={styles.btn}
                    onPress={this.handlerSubmitPermsio}
                  />
                  <Button
                    visible={
                      this.state.modePermisos === 'editar' ? true : false
                    }
                    type="outline"
                    loading={this.state.wait}
                    disabled={this.state.wait}
                    text={this.props.t('general.cancelar')}
                    id="cancelar"
                    icon="eraser"
                    width="100%"
                    classes={styles.btn}
                    onPress={this.handlerClearPermisos}
                  />
                </div>
                <div className="center">{this.state.msg}</div>
              </div>
            </Flex>
          </Column>
          <Column height="100%" padding="0" width="74%" auto={true}>
            <ReactTable
              className="-striped -highlight"
              data={this.state.permisos}
              columns={columnsPermisos(this.props.t)}
              sortable={true}
              multiSort={true}
              resizable={true}
              filterable={true}
              defaultPageSize={15}
              getTdProps={this.handlerGridPermisosAction}
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
export default withTranslation()(Role);
