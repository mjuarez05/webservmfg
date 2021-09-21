import React, {PureComponent} from 'react';
import Flex from '../../../components/Flex';
import Column from '../../../components/Column';
import {
  getGreenTrxAllPalletByDay,
  getGreenTrxPallet,
  getGreenTrzProductosByGroup,
  remanejarGreenTrxPallet,
  eliminarPallet,
} from '../../../services/GreenTrz';
import {withTranslation} from 'react-i18next';
import i18n from 'i18next';
import {LoaderViewError} from '../../../actions.js';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import styles from './styles.module.scss';
import Button from '../../../components/Button';
import {Icon} from 'react-fa';
import Input from '../../../components/Input';
import GroupForm from '../../../components/GroupForm';
import ComboBox from '../../../components/ComboBox';
import axios from 'axios';
import Moment from 'react-moment';
import store from '../../../store';
import dayjs from 'dayjs';

const columns = (t) => {
  return [
    {
      Header: '',
      filterable: false,
      sortable: false,
      width: 40,
      Cell: (row) => (
        <button className={styles.eliminar} alt={t('general.remanejar')}>
          <Icon name="pencil" />
        </button>
      ),
    },

    {
      Header: i18n.t('greenpallet.numpal'),
      accessor: 'numpal',
      width: 130,
      filterMethod: (filter, row) => {
        return row.numpal.indexOf(filter.value) !== -1;
      },
    },
    {
      Header: i18n.t('greenpallet.idProd'),
      accessor: 'id_prod',
      filterMethod: (filter, row) => {
        return row.id_prod.toString().indexOf(filter.value) !== -1;
      },
    },
    {
      Header: i18n.t('greenpallet.descrMat'),
      accessor: 'descr_mat',
      width: 250,
      filterMethod: (filter, row) => {
        return (
          row.descr_mat.toUpperCase().indexOf(filter.value.toUpperCase()) !== -1
        );
      },
    },
    {
      Header: i18n.t('greenpallet.idFamilia'),
      accessor: 'id',
      filterMethod: (filter, row) => {
        return row.id.toString().indexOf(filter.value.toUpperCase()) !== -1;
      },
    },
    {
      Header: i18n.t('greenpallet.descFamilia'),
      accessor: 'descr',
      width: 250,
      filterMethod: (filter, row) => {
        return (
          row.descr_mat.toUpperCase().indexOf(filter.value.toUpperCase()) !== -1
        );
      },
    },
    {
      Header: i18n.t('greenpallet.idPlanta'),
      accessor: 'id_planta',
      filterMethod: (filter, row) => {
        return (
          row.descr_mat.toString().indexOf(filter.value.toUpperCase()) !== -1
        );
      },
    },
    {
      Header: i18n.t('greenpallet.idArea'),
      accessor: 'id_area',
      filterMethod: (filter, row) => {
        return (
          row.id_area.toString().indexOf(filter.value.toUpperCase()) !== -1
        );
      },
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.ptoPes'),
      accessor: 'pto_pes',
      filterMethod: (filter, row) => {
        return (
          row.pto_pes.toString().indexOf(filter.value.toUpperCase()) !== -1
        );
      },
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.fechorPes'),
      accessor: 'fechoe_pes',
      width: 250,
      Cell: (row) => {
        return <Moment format="DD/MM/YYYY">{row.original.fechor_pes}</Moment>;
      },

      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.idTurno'),
      accessor: 'id_turno',
      filterMethod: (filter, row) => {
        return (
          row.id_turno.toString().indexOf(filter.value.toUpperCase()) !== -1
        );
      },
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.unidades'),
      accessor: 'unidades',
      filterMethod: (filter, row) => {
        return (
          row.unidades.toString().indexOf(filter.value.toUpperCase()) !== -1
        );
      },
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.taraPal'),
      accessor: 'tara_pal',
      filterMethod: (filter, row) => {
        return (
          row.tara_pal.toString().indexOf(filter.value.toUpperCase()) !== -1
        );
      },
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.taraBolsa'),
      accessor: 'tara_bolsa',
      filterMethod: (filter, row) => {
        return (
          row.tara_bolsa.toString().indexOf(filter.value.toUpperCase()) !== -1
        );
      },
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.kneto'),
      accessor: 'kneto',
      filterMethod: (filter, row) => {
        return row.kneto.toString().indexOf(filter.value.toUpperCase()) !== -1;
      },
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.kbruto'),
      accessor: 'kbruto',
      filterMethod: (filter, row) => {
        return row.kbruto.toString().indexOf(filter.value.toUpperCase()) !== -1;
      },
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.fecProd'),
      accessor: 'fec_prod',
      width: 250,
      Cell: (row) => {
        return <Moment format="DD/MM/YYYY">{row.original.fec_prod}</Moment>;
      },

      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.fecCong'),
      accessor: 'fec_cong',
      width: 250,
      Cell: (row) => {
        return <Moment format="DD/MM/YYYY">{row.original.fec_cong}</Moment>;
      },

      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.fecVenc'),
      accessor: 'fec_venc',
      width: 250,
      Cell: (row) => {
        return <Moment format="DD/MM/YYYY">{row.original.fec_venc}</Moment>;
      },

      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.idUsuario'),
      accessor: 'id_usuario',
      filterMethod: (filter, row) => {
        return (
          row.id_usuario.toString().indexOf(filter.value.toUpperCase()) !== -1
        );
      },
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.lote'),
      accessor: 'lote',
      filterMethod: (filter, row) => {
        return (
          row.lote.toUpperCase().indexOf(filter.value.toUpperCase()) !== -1
        );
      },
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.horAper'),
      accessor: 'hora_aper',
      Cell: (row) => {
        return <Moment format="HH:mm:ss">{row.original.hora_aper}</Moment>;
      },

      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.horaCierre'),
      accessor: 'hora_cierre',
      Cell: (row) => {
        return <Moment format="HH:mm:ss">{row.original.hora_cierre}</Moment>;
      },

      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.idEstado'),
      accessor: 'id_estado',
      filterMethod: (filter, row) => {
        return (
          row.id_estado.toUpperCase().indexOf(filter.value.toUpperCase()) !== -1
        );
      },
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.obspallet'),
      accessor: 'obspallet',
      width: 250,
      filterMethod: (filter, row) => {
        return (
          row.obspallet.toUpperCase().indexOf(filter.value.toUpperCase()) !== -1
        );
      },
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.intervenido'),
      accessor: 'intervenido',
      Cell: (row) => {
        return row.original.intervenido ? 'SI' : 'NO';
      },
      filterMethod: (filter, row) => {
        console.log(row, filter);
        if (filter.value === 'all') {
          return true;
        }
        if (filter.value === 'true') {
          return row.intervenido === true;
        }
        return row.intervenido === false;
      },
      Filter: ({filter, onChange}) => (
        <select
          onChange={(event) => onChange(event.target.value)}
          style={{width: '100%'}}
          value={filter ? filter.value : 'all'}
        >
          <option value="all">Todos</option>
          <option value="true">SI</option>
          <option value="false">NO</option>
        </select>
      ),
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.obsintervenido'),
      accessor: 'obsintervenido',
      width: 250,
      filterMethod: (filter, row) => {
        return (
          row.obsintervenido
            .toUpperCase()
            .indexOf(filter.value.toUpperCase()) !== -1
        );
      },
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.retenido'),
      accessor: 'retenido',
      Cell: (row) => {
        return row.original.retenido ? 'SI' : 'NO';
      },
      filterMethod: (filter, row) => {
        if (filter.value === 'all') {
          return true;
        }
        if (filter.value === 'true') {
          return row.retenido === true;
        }
        return row.retenido === false;
      },
      Filter: ({filter, onChange}) => (
        <select
          onChange={(event) => onChange(event.target.value)}
          style={{width: '100%'}}
          value={filter ? filter.value : 'all'}
        >
          <option value="all">Todos</option>
          <option value="true">SI</option>
          <option value="false">NO</option>
        </select>
      ),
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.obsretenido'),
      accessor: 'obsretenido',
      width: 250,
      filterMethod: (filter, row) => {
        return (
          row.obsretenido.toUpperCase().indexOf(filter.value.toUpperCase()) !==
          -1
        );
      },
      //Cell: this.renderEditable
    },
    {
      Header: 'X',
      filterable: false,
      sortable: false,
      width: 40,
      Cell: (row) => (
        <button className={styles.eliminar} alt={t('general.eliminar')}>
          <Icon name="close" />
        </button>
      ),
    },
  ];
};

class ListPalletView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      ifYouCan: true,
      pallets: [],
      productos: [],
      remanejar: false,
      productoSelect: null,
      numpal: null,
      intervenido: false,
      retenido: false,
      obsintervenido: '',
      obsretenido: '',
    };
  }

  handlerSelectChange = (e) => {
    this.setState({
      productoSelect: e.target.value,
    });
  };

  getData = () => {
    let t = this;
    axios
      .all([
        // getGreenTrxAllPalletByDay(1041, 1, dayjs(), dayjs()),
        getGreenTrxAllPalletByDay(
          1041,
          dayjs().format('YYYY-MM-DD'),
          dayjs().format('YYYY-MM-DD'),
        ),
        getGreenTrzProductosByGroup(1041, 1),
      ])
      .then((values) => {
        t.setState({pallets: values[0].data, productos: values[1].data});
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

  handlerInputChange = (event) => {
    this.setState({search: event.target.value});
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handlerSearchPallet();
    }
  };

  handlerDelete = (planta, numpal) => {
    let t = this;
    eliminarPallet(planta, numpal, parseInt(store.getState().userid.toString()))
      .then((response) => {
        this.setState(
          {
            remanejar: false,
            numpal: null,
            productoSelect: null,
            intervenido: false,
            retenido: false,
            obsintervenido: '',
            obsretenido: '',
            msg: this.props.t('greenpallet.remanejadoOK'),
            msgType: styles.success,
          },
          () => {
            this.getData();
          },
        );
      })
      .catch((error) => {
        console.error(error.response);
        t.setState({
          msg:
            error.response !== undefined
              ? this.props.t('greenpallet.' + error.response.data.error.code)
              : this.props.t('greenpallet.error'),
        });
      });
  };

  handlerGridAction = (state, rowInfo, column, instance) => {
    if (column.Header === 'X') {
      return {
        onClick: (e) => {
          let r = window.confirm(this.props.t('general.estaseguro'));
          if (r === true) {
            this.handlerDelete(
              rowInfo.original.id_planta,
              rowInfo.original.numpal,
            );
          }
        },
      };
    }
    if (column.Header === '') {
      return {
        onClick: (e) => {
          this.setState({
            msg: '',
            msgType: null,
            remanejar: true,
            intervenido: rowInfo.original.intervenido,
            retenido: rowInfo.original.retenido,
            obsintervenido: rowInfo.original.obsintervenido,
            obsretenido: rowInfo.original.obsretenido,
            numpal: rowInfo.original.numpal,
          });
        },
      };
    }
    return {};
  };

  handlerSearchPallet = () => {
    if (this.state.search !== '') {
      this.setState(
        {
          wait: true,
        },
        () => {
          getGreenTrxPallet(this.state.search)
            .then((response) => {
              this.setState({
                pallets: response.data,
                wait: false,
              });
            })
            .catch((error) => {
              if (error.response.data.error.status === 404) {
                this.setState({
                  wait: false,
                  edit: false,
                  msg: this.props.t('greenpallet.notFound'),
                });
              }
            });
        },
      );
    } else {
      this.setState({
        wait: false,
        edit: false,
        msg: this.props.t('greenpallet.typenumpal'),
      });
    }
  };

  handlerCancelRemanejo = () => {
    this.setState({
      remanejar: false,
      numpal: null,
      productoSelect: null,
      intervenido: false,
      retenido: false,
      obsretenido: '',
      obsintervenido: '',
    });
  };

  handlerGuardarRemanejo = (numpal) => {
    remanejarGreenTrxPallet({
      numpal: this.state.numpal,
      producto: this.state.productoSelect,
      usuario: parseInt(store.getState().userid.toString()),
      intervenido: this.state.intervenido,
      obsintervenido: this.state.obsintervenido,
      retenido: this.state.retenido,
      obsretenido: this.state.obsretenido,
    })
      .then((res) => {
        this.setState(
          {
            remanejar: false,
            numpal: null,
            productoSelect: null,
            intervenido: false,
            retenido: false,
            obsintervenido: '',
            obsretenido: '',
            msg: this.props.t('greenpallet.remanejadoOK'),
            msgType: styles.success,
          },
          () => {
            this.getData();
          },
        );
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status === 401) {
          this.setState({ifYouCan: false});
        } else {
          this.setState({
            msg: this.props.t('greenpallet.remanejadoError'),
            msgType: styles.error,
          });
        }
      });
  };

  handlerInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  refreshPallets = () => {
    this.getData();
  };

  render() {
    return this.state.ifYouCan ? (
      <Flex direction="row" padding="1rem" margin="0" wrap="wrap">
        <Column width="100%" height="77px">
          <div className={styles.title}>
            <div className={styles.titleText}>
              {this.props.t('greenpallet.editarPallet')}
            </div>
            <Button
              padding="5px"
              styleType="outline"
              visible={true}
              // loading={this.state.wait}
              // disabled={this.state.consumiendo}
              id="refreshPallets"
              icon={'refresh'}
              onPress={this.refreshPallets}
            ></Button>
          </div>
          <div className={styles.icon}>
            <span className="fa-stack fa-lg">
              <i
                className={
                  'fa fa-circle fa-stack-2x fa-inverse ' + styles.shadow
                }
              />
              <i className="fa fa-cube fa-stack-1x " />
            </span>
          </div>{' '}
        </Column>
        <Column
          width="30%"
          padding="10px"
          height="calc(100% - 82px)"
          classes={styles.detail}
        >
          <div className={styles.titleSub}>
            {this.props.t('general.search')}
          </div>
          <div>
            <Input
              id="search"
              type="number"
              value={this.state.search}
              whenKeyPress={this.handleKeyPress}
              onChange={this.handlerInputChange}
              label={this.props.t('greenpallet.numpal')}
            />
          </div>

          <Button
            width="100%"
            visible={true}
            styleType="outline"
            border={true}
            classes={styles.btn}
            loading={this.state.wait}
            disabled={this.state.wait}
            text={this.props.t('general.search')}
            id="cancelEditProducto"
            icon="search"
            onPress={this.handlerSearchPallet}
          />

          <GroupForm
            width="calc(100% - 20px)"
            position="absolute"
            bottom="10px"
            title={this.props.t('greentrz.Remanejo')}
            disabled={!this.state.remanejar}
          >
            <span className={styles.msg}>
              <div className={this.state.msgType}>
                {this.props.t(this.state.msg)}
              </div>
            </span>
            Pallet: <b>{this.state.numpal}</b>
            <br />
            <ComboBox
              id="remanejoProducto"
              label={this.props.t('general.producto')}
              items={this.state.productos}
              itemId="codsap"
              itemText={['codsap', 'descrMat']}
              value={this.state.productoSelect}
              onSelect={this.handlerSelectChange}
            />
            <div className={styles.separator}>
              <input
                checked={this.state.intervenido}
                type="checkbox"
                onChange={() => {
                  this.setState({intervenido: !this.state.intervenido});
                }}
              />{' '}
              {this.props.t('greenpallet.intervenido')}
            </div>
            <div className={styles.separator}>
              <Input
                id="obsintervenido"
                label={this.props.t('greenpallet.obsintervenido')}
                type="text"
                value={this.state.obsintervenido}
                onChange={this.handlerInputChange}
                classes={styles.inputs}
              />
            </div>
            <div className={styles.separator}>
              <input
                checked={this.state.retenido}
                type="checkbox"
                onChange={() => {
                  this.setState({retenido: !this.state.retenido});
                }}
              />{' '}
              {this.props.t('greenpallet.retenido')}
            </div>
            <div className={styles.separator}>
              <Input
                id="obsretenido"
                label={this.props.t('greenpallet.obsretenido')}
                type="text"
                value={this.state.obsretenido}
                onChange={this.handlerInputChange}
                classes={styles.inputs}
              />
            </div>
            <Button
              width="100%"
              visible={true}
              styleType="outline"
              border={true}
              classes={styles.btn}
              loading={this.state.wait}
              disabled={this.state.wait}
              text={this.props.t('general.cancelar')}
              id="cancelRemanjear"
              icon="eraser"
              onPress={this.handlerCancelRemanejo}
            />
            <Button
              width="100%"
              visible={true}
              styleType="success"
              border={true}
              classes={styles.btn}
              loading={this.state.wait}
              disabled={this.state.wait}
              text={this.props.t('general.editar')}
              id="guardarRemanjeo"
              icon="save"
              onPress={this.handlerGuardarRemanejo}
            />
          </GroupForm>
        </Column>

        <Column
          height="calc(100% - 82px)"
          padding="0"
          margin="0 0 0 10px"
          width="calc(70% - 10px)"
          auto={true}
        >
          <ReactTable
            className="-striped -highlight"
            data={this.state.pallets}
            columns={columns(this.props.t)}
            sortable={true}
            multiSort={true}
            resizable={true}
            filterable={true}
            defaultPageSize={25}
            getTdProps={this.handlerGridAction}
            previousText={i18n.t('general.previous')}
            nextText={i18n.t('general.next')}
            loadingText={i18n.t('general.loading')}
            noDataText={i18n.t('general.norowsfound')}
            pageText={i18n.t('general.page')}
            ofText={i18n.t('general.of')}
            rowsText={i18n.t('general.rows')}
          />
        </Column>
      </Flex>
    ) : (
      <Flex direction="columns" padding="0" margin="0" wrap="wrap">
        <Column height="100vh">
          <LoaderViewError
            icon="401"
            title={i18n.t('error.noAuth')}
            message={i18n.t('error.noAuthMessage')}
          />
        </Column>
      </Flex>
    );
  }
}
export default withTranslation()(ListPalletView);
