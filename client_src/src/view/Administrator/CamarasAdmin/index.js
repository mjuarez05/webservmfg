import React, {PureComponent} from 'react';
import Flex from '../../../components/Flex';
import Column from '../../../components/Column';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {
  getAllCamaras,
  createCamara,
  editCamara,
  eliminarCamara,
} from '../../../services/GreenTrz';
import styles from './styles.module.scss';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {withTranslation} from 'react-i18next';

import {LoaderViewError} from '../../../actions.js';
import ComboBox from '../../../components/ComboBox';
import {Icon} from 'react-fa';
import {getPlantas} from '../../../services/General';
import axios from 'axios';

const RESET_CAMARA = {
  id: '',
  planta: '',
  numcam: '',
  col: '',
  fila: '',
  altura: '',
  pasillo: '',
  estado: '',
  groupmat: '',
};

const columns = (t) => {
  return [
    {
      Header: t('greencamaras.title'),
      foldable: true,
      columns: [
        {
          Header: 'ID',
          accessor: 'id',
          sorteable: false,
        },
        {
          Header: t('greencamaras.planta'),
          accessor: 'idPlanta',
          sorteable: false,
        },
        {
          accessor: 'numcam',
          Header: t('greencamaras.numcam'),
          sorteable: false,
        },
        {
          accessor: 'col',
          Header: t('greencamaras.columna'),
          filterable: false,
          sorteable: false,
        },
        {
          accessor: 'fila',
          Header: t('greencamaras.fila'),
          filterable: false,
          sorteable: false,
        },
        {
          accessor: 'altura',
          Header: t('greencamaras.altura'),
          filterable: false,
          sorteable: false,
        },
        {
          accessor: 'pasillo',
          Header: t('greencamaras.pasillo'),
          filterable: false,
          sorteable: false,
        },
        // {
        //   accessor: 'estado',
        //   Header: t('greencamaras.estado'),
        // },
        {
          accessor: 'idGrupmat',
          Header: t('greencamaras.groupmat'),
          filterable: true,
          sorteable: false,
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

class CamarasAdminView extends PureComponent {
  constructor(props) {
    super(props);
    this._columns = columns;
    this.state = {
      camara: RESET_CAMARA,
      plantas: [],
      camaras: [],
      ifYouCan: true,
      msg: '',
      mode: 'crear',
      wait: false,
    };
  }

  getData = () => {
    axios
      .all([getPlantas(), getAllCamaras()])
      .then((values) => {
        this.setState({
          plantas: values[0].data,
          camaras: values[1].data,
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
    let newCamara = {
      ...this.state.camara,
      [event.target.name]: event.target.value,
    };
    this.setState({camara: newCamara});
  };

  handlerSubmit = (e) => {
    this.setState({wait: true});
    let t = this;
    e.preventDefault();

    if (this.state.mode === 'crear' && this.state.camara.id === '') {
      createCamara({
        idPlanta: parseInt(this.state.camara.planta),
        numcam: parseInt(this.state.camara.numcam),
        col: parseInt(this.state.camara.col),
        fila: parseInt(this.state.camara.fila),
        altura: parseInt(this.state.camara.altura),
        pasillo: this.state.camara.pasillo,
        estado: true,
        idGrupmat: parseInt(this.state.camara.groupmat),
      })
        .then((response) => {
          this.getData();
          this.props.t('greencamaras.create');
          this.setState({
            ...this.state,
            camara: RESET_CAMARA,
            mode: 'crear',
            wait: false,
            msg: this.props.t('greencamaras.creadoOk'),
          });
        })
        .catch((error) => {
          this.setState({wait: false});
          console.error(error.response);
          t.setState({
            msg:
              error.response !== undefined
                ? this.props.t(
                    'greencamaras.' + error.response.data.error.message,
                  )
                : this.props.t('greencamaras.error'),
          });
        });
    } else {
      editCamara({
        id: parseInt(this.state.camara.id),
        idPlanta: parseInt(this.state.camara.planta),
        numcam: parseInt(this.state.camara.numcam),
        col: parseInt(this.state.camara.col),
        fila: parseInt(this.state.camara.fila),
        altura: parseInt(this.state.camara.altura),
        pasillo: this.state.camara.pasillo,
        estado: true,
        idGrupmat: parseInt(this.state.camara.groupmat),
      })
        .then((response) => {
          this.getData();
          this.setState({
            ...this.state,
            camara: RESET_CAMARA,
            mode: 'crear',
            wait: false,
            msg: this.props.t('greencamaras.modificadoOk'),
          });
        })
        .catch((error) => {
          this.setState({wait: false});
          console.error(error.response);
          t.setState({
            msg:
              error.response !== undefined
                ? this.props.t('greencamaras.' + error.response.data.error.code)
                : this.props.t('greencamaras.error'),
          });
        });
    }
  };

  handlerClear = () => {
    this.setState({
      ...this.state,
      camara: RESET_CAMARA,
      mode: 'crear',
      wait: false,
      msg: '',
    });
  };

  handlerGridAction = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        if (rowInfo !== undefined) {
          this.setState({
            camara: {
              id: rowInfo.original.id,
              planta: rowInfo.original.idPlanta,
              numcam: rowInfo.original.numcam,
              col: rowInfo.original.col,
              fila: rowInfo.original.fila,
              altura: rowInfo.original.altura,
              pasillo: rowInfo.original.pasillo,
              estado: rowInfo.original.idEstado,
              groupmat: rowInfo.original.idGrupmat,
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
        }
      },
    };
  };

  handlerSelectChange = (e) => {
    this.setState({
      ...this.state,
      camara: {...this.state.camara, [e.target.id]: e.target.value},
    });
  };

  handlerDelete = (id) => {
    let t = this;
    eliminarCamara(id)
      .then((response) => {
        this.handlerClear();
        this.getData();
        this.setState({
          msg: this.props.t('greencamaras.eliminadoOK'),
        });
      })
      .catch((error) => {
        console.error(error.response);
        t.setState({
          msg:
            error.response !== undefined
              ? this.props.t('greencamaras.' + error.response.data.error.code)
              : this.props.t('greencamaras.error'),
        });
      });
  };

  render() {
    const {t} = this.props;
    const {camara} = this.state;
    return this.state.ifYouCan ? (
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
                  ? t('greencamaras.newCamara')
                  : t('greencamaras.modificarCamara', {
                      camara: camara.numcam,
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
                <i className="fa fa-snowflake-o fa-stack-1x " />
              </span>
            </div>
            <div className="padding-default">
              <ComboBox
                id="planta"
                label={t('general.planta')}
                items={this.state.plantas}
                itemId="id"
                itemText="descripcion"
                value={camara.planta}
                onSelect={this.handlerSelectChange}
              />
              <Input
                id="numcam"
                type="text"
                label={t('greencamaras.numcam')}
                placeholder={t('greencamaras.numcam')}
                autocomplete={false}
                required={true}
                value={camara.numcam || ''}
                onChange={this.handleInputChange}
              />
              <Input
                id="col"
                type="text"
                label={t('greencamaras.columna')}
                placeholder={t('greencamaras.columna')}
                autocomplete={false}
                required={true}
                value={camara.col || ''}
                onChange={this.handleInputChange}
              />

              <Input
                id="fila"
                type="text"
                label={t('greencamaras.fila')}
                placeholder={t('greencamaras.fila')}
                autocomplete={false}
                required={true}
                value={camara.fila || ''}
                onChange={this.handleInputChange}
              />
              <Input
                id="altura"
                type="text"
                label={t('greencamaras.altura')}
                placeholder={t('greencamaras.altura')}
                autocomplete={false}
                required={true}
                value={camara.altura || ''}
                onChange={this.handleInputChange}
              />
              <Input
                id="pasillo"
                type="text"
                label={t('greencamaras.pasillo')}
                placeholder={t('greencamaras.pasillo')}
                autocomplete={false}
                required={true}
                value={camara.pasillo || ''}
                onChange={this.handleInputChange}
              />
              <Input
                id="groupmat"
                type="text"
                label={t('greencamaras.groupmat')}
                placeholder={t('greencamaras.groupmat')}
                autocomplete={false}
                required={true}
                value={camara.groupmat || ''}
                onChange={this.handleInputChange}
              />

              <div className="center">
                <Button
                  visible={true}
                  loading={this.state.wait}
                  disabled={
                    camara.planta === '' ||
                    camara.numcam === '' ||
                    camara.col === '' ||
                    camara.altura === '' ||
                    camara.pasillo === '' ||
                    camara.fila === '' ||
                    camara.groupmat === ''
                  }
                  text={
                    this.state.mode === 'editar'
                      ? t('general.editar')
                      : t('general.crear')
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
                  type="outline"
                  loading={this.state.wait}
                  disabled={this.state.wait}
                  text={t('general.cancelar')}
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
            data={this.state.camaras}
            columns={columns(t)}
            sortable={true}
            multiSort={true}
            resizable={true}
            filterable={true}
            defaultPageSize={25}
            getTdProps={this.handlerGridAction}
            previousText={t('general.previous')}
            nextText={t('general.next')}
            loadingText={t('general.loading')}
            noDataText={t('general.norowsfound')}
            pageText={t('general.page')}
            ofText={t('general.of')}
            rowsText={t('general.rows')}
          />
        </Column>
      </Flex>
    ) : (
      <Flex direction="columns" padding="0" margin="0" wrap="wrap">
        <Column height="100vh">
          <LoaderViewError
            icon="401"
            title={t('error.noAuth')}
            message={t('error.noAuthMessage')}
          />
        </Column>
      </Flex>
    );
  }
}
export default withTranslation()(CamarasAdminView);
