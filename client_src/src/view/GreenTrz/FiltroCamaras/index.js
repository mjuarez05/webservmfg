import React, {PureComponent} from 'react';
import Flex from '../../../components/Flex';
import Column from '../../../components/Column';
import {
  getPalletInCamara,
  searchPalletInCamara,
} from '../../../services/GreenTrz';
import {withTranslation} from 'react-i18next';
import i18n from 'i18next';
import {LoaderViewError} from '../../../actions.js';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import styles from './styles.module.scss';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
// import axios from 'axios';
import Moment from 'react-moment';
// import dayjs from 'dayjs';

const columns = (t) => {
  return [
    {
      Header: i18n.t('greenpallet.numpal'),
      accessor: 'numpal',
      width: 130,
    },
    {
      Header: i18n.t('greencamaras.fechaEnCamara'),
      accessor: 'fecha',
      width: 250,
      Cell: (row) => {
        return (
          <Moment format="DD/MM/YYYY HH:mm:ss">{row.original.fecha}</Moment>
        );
      },
    },
    {
      Header: i18n.t('greencamaras.camara'),
      accessor: 'numcam',
    },
    {
      Header: i18n.t('greencamaras.columna'),
      Cell: (row) => {
        return (
          <div>{parseInt(row.original.poscol)+1}</div>
        );
      },
      accessor: 'poscol',
    },
    {
      Header: i18n.t('greencamaras.fila'),
      Cell: (row) => {
        return (
          <div>{parseInt(row.original.posfila)+1}</div>
        );
      },
      accessor: 'posfila',
    },
    {
      Header: i18n.t('greencamaras.altura'),
      Cell: (row) => {
        return (
          <div>{parseInt(row.original.posaltura)+1}</div>
        );
      },
      accessor: 'posaltura',
    },
    {
      Header: i18n.t('greenpallet.idProd'),
      accessor: 'id_prod',
    },
    {
      Header: i18n.t('greencamaras.descMatr'),
      width: 250,
      accessor: 'descr_mat',
    },
    {
      Header: i18n.t('greenpallet.idPlanta'),
      accessor: 'id_planta',
    },
    {
      Header: i18n.t('greenpallet.idArea'),
      accessor: 'id_area',

      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.ptoPes'),
      accessor: 'ptoPes',

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
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.unidades'),
      accessor: 'unidades',
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.taraPal'),
      accessor: 'taraPal',
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.taraBolsa'),
      accessor: 'taraBolsa',
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.kneto'),
      accessor: 'kneto',
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.kbruto'),
      accessor: 'kbruto',
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
      //Cell: this.renderEditable
    },
    {
      Header: i18n.t('greenpallet.lote'),
      accessor: 'lote',
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
      //Cell: this.renderEditable
    },
  ];
};

class ListPalletView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ifYouCan: true,
      pallets: [],
      productos: [],
      remanejar: false,
      productoSelect: null,
      numpal: null,
    };
  }

  handlerSelectChange = (e) => {
    this.setState({
      productoSelect: e.target.value,
    });
  };

  getData = () => {
    let t = this;
    getPalletInCamara(1041)
      .then((values) => {
        t.setState({pallets: values.data});
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
      this.handlerSearchProducto();
    }
  };

  handlerGridAction = (state, rowInfo, column, instance) => {
    if (column.Header === '') {
      return {
        onClick: (e) => {
          this.setState({remanejar: true, numpal: rowInfo.original.numpal});
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
          searchPalletInCamara(1041, this.state.search)
            .then((response) => {
              this.setState({
                pallets: response.data,
                wait: false,
              });
            })
            .catch((error) => {
              console.error(error.response);
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
        msg: this.props.t('greenpallet.typecode'),
      });
    }
  };

  render() {
    return this.state.ifYouCan ? (
      <Flex direction="row" padding="0" margin="0" wrap="wrap">
        <Column width="100%" height="77px">
          <div className={styles.title}>
            <div className={styles.titleText}>
              {this.props.t('greencamaras.filtroCamaras')}
            </div>
          </div>
          <div className={styles.icon}>
            <span className="fa-stack fa-lg">
              <i
                className={
                  'fa fa-circle fa-stack-2x fa-inverse ' + styles.shadow
                }
              />
              <i className="fa fa-snowflake-o fa-stack-1x " />
            </span>
          </div>
        </Column>
        <Column
          width="30%"
          padding="10px"
          height="calc(100% - 82px)"
          classes={styles.detail}
        >
          <div className={styles.title}>{this.props.t('general.search')}</div>
          <div>
            <Input
              id="codigo-search"
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

          <span>{this.state.msg}</span>
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
            columns={[
              {
                Header: i18n.t('greenpallet.pallets'),
                foldable: true,
                columns: columns(this.props.t),
              },
            ]}
            sortable={true}
            multiSort={true}
            resizable={true}
            filterable={true}
            defaultPageSize={25}
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
