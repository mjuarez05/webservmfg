import React, {PureComponent} from 'react';
import Flex from '../../../components/Flex';
import Column from '../../../components/Column';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {
  getAllTrxParam,
  createTrxParam,
  editTrxParam,
  eliminarTrxParam,
} from '../../../services/TrxParam';
import styles from './styles.module.scss';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {withTranslation} from 'react-i18next';

import {LoaderViewError} from '../../../actions.js';
import ComboBox from '../../../components/ComboBox';
import {Icon} from 'react-fa';
import {getPlantas} from '../../../services/General';
import {getAllTRX} from '../../../services/Transacciones';
import axios from 'axios';

const columns = (t) => {
  return [
    {
      Header: t('trxparam.title'),
      foldable: true,
      columns: [
        {
          Header: 'ID',
          accessor: 'id',
        },
        {
          Header: t('trxparam.planta'),
          accessor: 'planta.descripcion',
          // Cell: (props) => <span className="number">{props.value}</span>, // Custom cell components!
        },
        {
          accessor: 'trx.trx',
          Header: t('trxparam.trx'),
          // accessor: d => d.friend.name // Custom value accessors!
        },
        {
          accessor: 'descr',
          Header: t('trxparam.descr'),
          filterable: false,
          // sorteable: false,
          // Cell: (row) => {
          //   return <Icon name={row.original.icon} />;
          // },
          // accessor: d => d.friend.name // Custom value accessors!
        },
        {
          accessor: 'valor',
          Header: t('trxparam.valor'),
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
// const columnsRoles = (t) => {
//   return [
//     {
//       Header: t('roles.roles'),
//       foldable: true,
//       columns: [
//         {
//           Header: 'ID',
//           accessor: 'id',
//           show: false,
//         },
//         {
//           Header: t('roles.name'),
//           accessor: 'name',
//         },
//         {
//           accessor: 'description',
//           Header: t('roles.description'),
//         },
//         {
//           accessor: 'created',
//           Header: t('roles.created'),
//           show: false,
//           Cell: (row) => {
//             return (
//               <Moment
//                 locale={localStorage.getItem('i18nextLng')}
//                 format="DD-MM-YYYY HH:mm"
//               >
//                 {row.original.created}
//               </Moment>
//             );
//           },
//         },
//         {
//           accessor: 'modified',
//           Header: t('roles.modified'),
//           show: false,
//           Cell: (row) => {
//             return (
//               <Moment
//                 locale={localStorage.getItem('i18nextLng')}
//                 format="DD-MM-YYYY HH:mm"
//               >
//                 {row.original.modified}
//               </Moment>
//             );
//           },
//         },
//         {
//           Header: '',
//           filterable: false,
//           sortable: false,
//           width: 40,
//           Cell: (row) => (
//             <button className={styles.eliminar} alt={t('general.eliminar')}>
//               <Icon name="close" />
//             </button>
//           ),
//         },
//       ],
//     },
//   ];
// };

class TrxParam extends PureComponent {
  constructor(props) {
    super(props);
    this._columns = columns;
    this.state = {
      trx: {
        trxId: '',
        trxPlanta: '',
        trxTransac: '',
        trxName: '',
        trxValue: '',
        trxEstado: '',
      },
      plantas: [],
      trxparam: [],
      trxs: [],
      ifYouCan: true,
      ifYouAddRole: false,
      msg: '',
      mode: 'crear',
      wait: false,
    };
  }

  getData = () => {
    axios
      .all([getPlantas(), getAllTrxParam(), getAllTRX()])
      .then((values) => {
        this.setState({
          plantas: values[0].data,
          trxparam: values[1].data,
          trxs: values[2].data.filter((v) => v.trx !== 'title'),
        });
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status === 401) {
          this.setState({ifYouCan: false});
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

    if (this.state.mode === 'crear' && this.state.trx.trxId === '') {
      createTrxParam({
        descr: this.state.trx.trxName,
        valor: this.state.trx.trxValue,
        id_planta: parseInt(this.state.trx.trxPlanta),
        id_trx: parseInt(this.state.trx.trxTransac),
      })
        .then((response) => {
          this.getData();
          this.props.t('trxparam.create');
          this.setState({
            ...this.state,
            trx: {
              trxId: '',
              trxPlanta: '',
              trxTransac: '',
              trxName: '',
              trxValue: '',
            },
            mode: 'crear',
            wait: false,
            msg: this.props.t('trxparam.creadoOk'),
          });
        })
        .catch((error) => {
          this.setState({wait: false});
          console.error(error.response);
          t.setState({
            msg:
              error.response !== undefined
                ? this.props.t('trxparam.' + error.response.data.error.message)
                : this.props.t('trxparam.error'),
          });
        });
    } else {
      editTrxParam({
        descr: this.state.trx.trxName,
        valor: this.state.trx.trxValue,
        id_planta: parseInt(this.state.trx.trxPlanta),
        id_trx: parseInt(this.state.trx.trxTransac),
        id: parseInt(this.state.trx.trxId),
      })
        .then((response) => {
          this.getData();
          this.setState({
            ...this.state,
            trx: {
              trxId: '',
              trxPlanta: '',
              trxTransac: '',
              trxName: '',
              trxValue: '',
            },
            mode: 'crear',
            wait: false,
            msg: this.props.t('trxparam.modificadoOk'),
          });
        })
        .catch((error) => {
          this.setState({wait: false});
          console.error(error.response);
          t.setState({
            msg:
              error.response !== undefined
                ? this.props.t('trxparam.' + error.response.data.error.code)
                : this.props.t('trxparam.error'),
          });
        });
    }
  };

  handlerClear = () => {
    this.setState({
      ...this.state,
      trx: {
        trxId: '',
        trxPlanta: '',
        trxTransac: '',
        trxName: '',
        trxValue: '',
      },
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
            trxId: rowInfo.original.id,
            trxPlanta: rowInfo.original.planta.id,
            trxTransac: rowInfo.original.trx.id,
            trxName: rowInfo.original.descr,
            trxValue: rowInfo.original.valor,
          },
          msg: '',
          mode: 'editar',
        });
        // this.getTRXRoles(rowInfo.original.id);
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

  // handlerGridRolesAction = (state, rowInfo, column, instance) => {
  //   return {
  //     onClick: (e) => {
  //       this.setState({
  //         rol: {
  //           id: rowInfo.original.id,
  //           name: rowInfo.original.name,
  //           description: rowInfo.original.description,
  //           created: rowInfo.original.created,
  //           modified: rowInfo.original.modified,
  //         },
  //         msg: '',
  //         mode: 'editar',
  //       });
  //       if (column.Header === '') {
  //         let r = window.confirm(this.props.t('general.estaseguro'));
  //         if (r === true) {
  //           this.handlerDeleteRol(this.state.trx.id, rowInfo.original.id);
  //         } else {
  //           this.handlerClear();
  //         }
  //       }
  //     },
  //   };
  // };

  // handlerAddRole = () => {
  //   let t = this;
  // addTRXToRol(this.state.trx.id, this.state.rolSelected)
  //   .then((response) => {
  //     // this.handlerClear();
  //     this.getData();
  //     this.setState({
  //       msg: this.props.t('trxparam.roleAdded'),
  //     });
  //   })
  //   .catch((error) => {
  //     console.error(error.response);
  //     t.setState({
  //       msg:
  //         error.response !== undefined
  //           ? this.props.t('trxparam.' + error.response.data.error.code)
  //           : this.props.t('trxparam.error'),
  //     });
  //   });
  // };

  // handlerGoAddRoles = () => {
  //   this.setState((prevState) => {
  //     return {msg: '', ifYouAddRole: !prevState.ifYouAddRole};
  //   });
  // };

  handlerSelectChange = (e) => {
    this.setState({
      ...this.state,
      trx: {...this.state.trx, [e.target.id]: e.target.value},
    });
  };

  // handlerDeleteRol = (id, role) => {
  // let t = this;
  // findTRXRole(id, role).then((response) => {
  //   removeTRXFromRol(response.data[0].id)
  //     .then(() => {
  //       this.getData();
  //       this.setState({
  //         msg: this.props.t('usuarios.roleDeleted'),
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error.response);
  //       t.setState({
  //         msg:
  //           error.response !== undefined
  //             ? this.props.t('usuarios.' + error.response.data.error.code)
  //             : this.props.t('usuarios.error'),
  //       });
  //     });
  // });
  // };

  handlerDelete = (id) => {
    let t = this;
    eliminarTrxParam(id)
      .then((response) => {
        this.handlerClear();
        this.getData();
        this.setState({
          msg: this.props.t('trxparam.eliminadoOK'),
        });
      })
      .catch((error) => {
        console.error(error.response);
        t.setState({
          msg:
            error.response !== undefined
              ? this.props.t('trxparam.' + error.response.data.error.code)
              : this.props.t('trxparam.error'),
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
                    ? this.props.t('trxparam.newTRX')
                    : this.props.t('trxparam.modificarTRX', {
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
                <ComboBox
                  id="trxPlanta"
                  label={this.props.t('general.planta')}
                  items={this.state.plantas}
                  itemId="id"
                  itemText="descripcion"
                  value={this.state.trx.trxPlanta}
                  onSelect={this.handlerSelectChange}
                />
                <ComboBox
                  id="trxTransac"
                  label={this.props.t('trxparam.trx')}
                  items={this.state.trxs}
                  itemId="id"
                  itemText="trx"
                  value={this.state.trx.trxTransac}
                  onSelect={this.handlerSelectChange}
                />
                <Input
                  id="trxName"
                  type="text"
                  label={this.props.t('trxparam.descr')}
                  placeholder={this.props.t('trxparam.descr')}
                  autocomplete={false}
                  required={true}
                  value={this.state.trx.trxName || ''}
                  onChange={this.handleInputChange}
                />
                <Input
                  id="trxValue"
                  type="text"
                  label={this.props.t('trxparam.valor')}
                  placeholder={this.props.t('trxparam.valor')}
                  autocomplete={false}
                  required={true}
                  value={this.state.trx.trxValue || ''}
                  onChange={this.handleInputChange}
                />

                <div className="center">
                  <Button
                    visible={true}
                    loading={this.state.wait}
                    disabled={
                      this.state.trx.trxPlanta === '' ||
                      this.state.trx.trxTransac === '' ||
                      this.state.trx.trxName === '' ||
                      this.state.trx.trxValue === ''
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
                  {/* <Button
                    visible={this.state.mode === 'editar' ? true : false}
                    loading={this.state.wait}
                    disabled={this.state.wait}
                    text={this.props.t('trxparam.addrole')}
                    styleType="info"
                    id="addRoleToTrx"
                    icon="shield"
                    width="100%"
                    classes={styles.btn}
                    onPress={this.handlerGoAddRoles}
                  /> */}
                  {/* <br /> */}
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
              data={this.state.trxparam}
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
                  {this.props.t('trxparam.addrole', {
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
                {/* <Button
                  visible={true}
                  loading={this.state.wait}
                  disabled={this.state.rolSelected === ''}
                  text={this.props.t('trxparam.addrole')}
                  styleType="success"
                  id="addRoleToTRX"
                  icon="shield"
                  width="100%"
                  classes={styles.btn}
                  onPress={this.handlerAddRole}
                /> */}
                <br />
                <div className="center">{this.state.msg}</div>
              </div>
              <div className="center">{this.state.msgPermisos}</div>
            </Flex>
          </Column>
          {/* <Column height="100%" padding="0" width="74%" auto={true}>
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
          </Column> */}
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
export default withTranslation()(TrxParam);
