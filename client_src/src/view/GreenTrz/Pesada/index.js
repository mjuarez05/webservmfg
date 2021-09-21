import React, {PureComponent} from 'react';
import Flex from '../../../components/Flex';
import Column from '../../../components/Column';
import Input from '../../../components/Input';
import ComboBox from '../../../components/ComboBox';
import GroupForm from '../../../components/GroupForm';
import styles from './styles.module.scss';
import {withTranslation} from 'react-i18next';
import Button from '../../../components/Button';
import {LoaderViewError} from '../../../actions.js';
import pallet from '../../../assets/pallet.svg';
import {getPlantas, getTurnos} from '../../../services/General';
import Fullscreen from 'react-full-screen';
// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment';
import {
  // subscribeGetPesoBal,
  // subscribeGetEstadoBal,
  subscribeSocketBal,
  unsubscribeSocket,
  getGreenTrzUltimoPallet,
  getGreenTrzProductosByGroup,
  getGreenTrzProducto,
  initGreenTrzAsDetipals,
  cerrarGreenTrzAsDetipals,
  getLastPalletActivity,
  getLastPalletOpen,
  incrementNumPall,
  initGreenTrzAsHDetipals,
} from '../../../services/GreenTrz';
import {
  getTrxParamByPlantaAndTrx,
  checkTrxParamsNeed,
} from '../../../services/TrxParam';

import store from '../../../store';
import axios from 'axios';
import dayjs from 'dayjs';

const PARAMS_NEEDS = [
  'Puesto',
  'Impresor',
  'GrupoMaterial',
  'CodNumera',
  'Area',
  'Lote',
  'FullScreen',
  'PesoManual',
];
const TRX = store.getState().tabList[store.getState().tabActive].id;
const PESADA_DEFAULT = {
  pesadaPlanta: '',
  pesadaPuesto: '',
  pesadaImpresora: '',
  pesadaTurno: '',
  pesadaProducto: '',
  pesobalanza: 0,
  pesadaCantidadBolsa: 0,
  palletNumero: 0,
  pesadaArea: '',
  palletPeso: '0',
  estadobalanza: '',
  obspallet: 'A la espera de Análisis',
  horaInicio: null,
  pesoManual: false,
  valormanual: 0,
  intervenido: true,
  lote: '-',
  producto: {},
};
class GreenPesada extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFull: false,
      ifYouCan: true,
      ifYouAddPermission: false,
      wait: false,
      habilitado: false,
      pesando: false,
      socketOk: true,
      pesada: {...PESADA_DEFAULT},
      ultimosPallet: [],
      plantas: [],
      impresoras: [],
      turnos: [],
      productos: [],
      puestos: [],
      paramsOk: null,
      msg: '',
    };
  }

  goFull = () => {
    this.setState({...this.state, isFull: !this.state.isFull});
  };

  handlerSelectChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(
      {
        ...this.state,
        pesada: {
          ...this.state.pesada,
          [name]: value,
        },
      },
      () => {
        if (name === 'pesadaPlanta') {
          this.buscarTurnos();
        }
        if (name === 'pesadaProducto') {
          getGreenTrzProducto(this.state.pesada.pesadaPlanta, value).then(
            (res) => {
              this.setState({
                ...this.state,
                pesada: {
                  ...this.state.pesada,
                  producto: res.data[0],
                },
              });
            },
          );
        }
        if (name === 'pesadaPuesto') {
          this.getActivity();
        }
        if (
          this.state.pesada.pesadaPlanta !== '' &&
          this.state.pesada.pesadaTurno !== '' &&
          this.state.pesada.pesadaProducto !== '' &&
          this.state.pesada.pesadaPuesto !== '' &&
          this.state.pesada.pesadaImpresora !== ''
        )
          this.setState({...this.state, habilitado: true});
      },
    );
  };

  componentWillUnmount = () => {
    if (!this.state.pesada.pesoManual) unsubscribeSocket();
  };

  componentDidMount = () => {
    axios
      .all([getPlantas()])
      .then((values) => {
        this.setState({
          ...this.state,
          plantas: values[0].data,
        });
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status === 401) {
          this.setState({...this.state, ifYouCan: false});
        } else {
          this.setState({
            ...this.state,
            msg: 'ERROR al obtener las plantas',
            msgType: styles.error,
          });
        }
      });
  };

  buscarTurnos = () => {
    axios
      .all([
        getTurnos(this.state.pesada.pesadaPlanta),
        getTrxParamByPlantaAndTrx(this.state.pesada.pesadaPlanta, TRX),
      ])
      .then((values) => {
        checkTrxParamsNeed(values[1].data, PARAMS_NEEDS)
          .then((res) => {
            if (res) {
              axios
                .all([
                  getGreenTrzProductosByGroup(
                    this.state.pesada.pesadaPlanta,
                    values[1].data.filter((v) => v.descr === PARAMS_NEEDS[2])[0]
                      .valor,
                  ),
                ])
                .then((resdata) => {
                  this.setState(
                    {
                      ...this.state,
                      turnos: values[0].data,
                      pesada: {
                        ...this.state.pesada,
                        lote: values[1].data.filter(
                          (v) => v.descr === PARAMS_NEEDS[5],
                        )[0].valor,
                        area: values[1].data.filter(
                          (v) => v.descr === PARAMS_NEEDS[4],
                        )[0].valor,
                        pesoManual:
                          values[1].data.filter(
                            (v) => v.descr === PARAMS_NEEDS[7],
                          )[0].valor === '1'
                            ? true
                            : false,
                      },
                      productos: resdata[0].data,
                      puestos: values[1].data.filter(
                        (v) => v.descr === PARAMS_NEEDS[0],
                      ),
                      impresoras: values[1].data.filter(
                        (v) => v.descr === PARAMS_NEEDS[1],
                      ),
                      params: values[1].data,
                      paramsOk: res,
                      isFull:
                        values[1].data.filter(
                          (v) => v.descr === PARAMS_NEEDS[6],
                        )[0].valor === '1'
                          ? true
                          : false,
                    },
                    () => {
                      if (!this.state.pesada.pesoManual) {
                        subscribeSocketBal(
                          'GREENPESADA',
                          (err, pesobalanza) => {
                            if (err !== null) {
                              this.setState({...this.state, socketOk: false});
                            }
                            if (
                              pesobalanza !== 0 ||
                              (pesobalanza === 0 &&
                                this.state.pesada.pesobalanza !== 0)
                            )
                              this.setState({
                                ...this.state,
                                pesada: {
                                  ...this.state.pesada,
                                  pesobalanza: pesobalanza,
                                },
                              });
                          },
                        );
                      }
                    },
                  );
                })
                .catch((error) => {
                  console.error(error.response);
                  if (error.response.status === 401) {
                    this.setState({...this.state, ifYouCan: false});
                  } else {
                    this.setState({
                      ...this.state,
                      msg: 'ERROR al obtener productos',
                      msgType: styles.error,
                    });
                  }
                });
            }
            this.setState({
              ...this.state,
              paramsOk: res,
            });
          })
          .catch((error) => {
            console.error(error.response);
            if (error.response.status === 401) {
              this.setState({...this.state, ifYouCan: false});
            } else {
              this.setState({
                ...this.state,
                msg: 'ERROR al obtener parametros',
                msgType: styles.error,
              });
            }
          });
      });
  };

  handlerPesar = () => {
    if (this.state.pesando) {
      this.setState({
        ...this.state,
        pesando: !this.state.pesando,
        msg: 'Pesada Cancelada',
        msgType: styles.error,
      });
    } else {
      axios
        .all([
          getLastPalletActivity(
            this.state.pesada.pesadaPlanta,
            this.state.pesada.area,
            this.state.pesada.pesadaPuesto,
          ),
          getGreenTrzUltimoPallet(
            this.state.pesada.pesadaPlanta,
            this.state.params.filter((v) => v.descr === PARAMS_NEEDS[3])[0]
              .valor,
          ),
          getLastPalletOpen(
            this.state.pesada.pesadaPlanta,
            this.state.pesada.area,
            this.state.pesada.pesadaPuesto,
          ),
        ])
        .then((res) => {
          if (res[2].data.length === 0) {
            initGreenTrzAsDetipals({
              idPlanta: parseInt(this.state.pesada.pesadaPlanta),
              numpal: parseInt(res[1].data[0].ultusado) + 1,
              idArea: parseInt(this.state.pesada.area),
              ptoPes: parseInt(this.state.pesada.pesadaPuesto),
              fechorPes: dayjs()
                .subtract(new Date().getTimezoneOffset() / 60, 'hour')
                .toISOString()
                .replace('Z', '')
                .replace('T', ' '),
              idTurno: parseInt(this.state.pesada.pesadaTurno),
              idProd: this.state.pesada.pesadaProducto,
              unidades: 0,
              taraPal: 0,
              taraBolsa: 0,
              kneto: 0,
              kbruto: 0,
              fecProd: dayjs()
                .subtract(new Date().getTimezoneOffset() / 60, 'hour')
                .toISOString()
                .replace('Z', '')
                .replace('T', ' '),
              fecCong: dayjs()
                .subtract(new Date().getTimezoneOffset() / 60, 'hour')
                .toISOString()
                .replace('Z', '')
                .replace('T', ' '),
              fecVenc: dayjs()
                .subtract(new Date().getTimezoneOffset() / 60, 'hour')
                .toISOString()
                .replace('Z', '')
                .replace('T', ' '),
              idUsuario: parseInt(store.getState().userid.toString()),
              lote: this.state.pesada.lote,
              horaAper: dayjs()
                .subtract(new Date().getTimezoneOffset() / 60, 'hour')
                .toISOString()
                .replace('Z', '')
                .replace('T', ' '),
              horaCierre: dayjs()
                .subtract(new Date().getTimezoneOffset() / 60, 'hour')
                .toISOString()
                .replace('Z', '')
                .replace('T', ' '),
              idEstado: 1,
              intervenido: true,
              retenido: false,
              obspallet: '',
              obsretenido: '',
              obsintervenido: '',
            }).then((resStart) => {
              incrementNumPall(
                this.state.params.filter((v) => v.descr === PARAMS_NEEDS[3])[0]
                  .valor,
                {
                  ...res[1].data[0],
                  numdde: parseInt(res[1].data[0].numdde),
                  numhta: parseInt(res[1].data[0].numhta),
                  ultusado: parseInt(res[1].data[0].ultusado) + 1,
                },
              ).then((result) => {
                //   toast.success('Se inicio la Pesada Correctamente!', {
                //     position: toast.POSITION.TOP_CENTER,
                //     className: 'toast-container',
                //   });
                this.setState({
                  ...this.state,
                  msg: 'Pesando...',
                  msgType: styles.blink,
                  ultimosPallet: res[0].data,
                  pesando: !this.state.pesando,
                  pesada: {
                    ...this.state.pesada,
                    horaInicio: dayjs()
                      .subtract(new Date().getTimezoneOffset() / 60, 'hour')
                      .toISOString()
                      .replace('Z', '')
                      .replace('T', ' '),
                    palletNumero: res[1].data[0],
                  },
                });
              });
            });
          } else {
            this.setState({
              ...this.state,
              msg: 'Pesando...',
              msgType: styles.blink,
              ultimosPallet: res[0].data,
              pesando: !this.state.pesando,
              pesada: {
                ...this.state.pesada,
                horaInicio: dayjs()
                  .subtract(new Date().getTimezoneOffset() / 60, 'hour')
                  .toISOString()
                  .replace('Z', '')
                  .replace('T', ' '),
                palletNumero: res[2].data[0],
              },
            });
          }
        })
        .catch((err) => {
          // toast.success('Error al inicial la Pesada.!', {
          //   position: toast.POSITION.TOP_CENTER,
          // });
          this.setState({
            ...this.state,
            msg: 'ERROR al iniciar la pesada',
            msgType: styles.error,
          });
          console.error(err);
        });
    }
  };

  handlerCerrarPallet = () => {
    let prod = this.state.productos.filter(
      (v) => v.codsap === this.state.pesada.pesadaProducto,
    );
    if (this.state.pesada.pesadaCantidadBolsa === 0) {
      // toast.success('La Cantidad de bolsas debe ser mayor a 0', {
      //   position: toast.POSITION.TOP_LEFT,
      // });
      this.setState({
        msg: 'La Cantidad de bolsas debe ser mayor a 0',
        msgType: styles.error,
      });
      return;
    }
    if (this.state.pesada.pesoManual) {
      if (
        parseFloat(
          this.state.pesada.valormanual / this.state.pesada.pesadaCantidadBolsa,
        ) < parseFloat(this.state.pesada.producto.pesmin) ||
        parseFloat(
          this.state.pesada.valormanual / this.state.pesada.pesadaCantidadBolsa,
        ) > parseFloat(this.state.pesada.producto.pesmax)
      ) {
        // toast.success('La Cantidad de bolsas debe ser mayor a 0', {
        //   position: toast.POSITION.TOP_LEFT,
        // });
        this.setState({
          ...this.state,
          msg: 'El peso promedio de bolsa es erroneo. Por Favor Verifique',
          msgType: styles.error,
        });
        return;
      }
    } else if (
      parseFloat(
        this.state.pesada.pesobalanza / this.state.pesada.pesadaCantidadBolsa,
      ) < parseFloat(this.state.pesada.producto.pesmin) ||
      parseFloat(
        this.state.pesada.pesobalanza / this.state.pesada.pesadaCantidadBolsa,
      ) > parseFloat(this.state.pesada.producto.pesmax)
    ) {
      // toast.success('La Cantidad de bolsas debe ser mayor a 0', {
      //   position: toast.POSITION.TOP_LEFT,
      // });
      this.setState({
        ...this.state,
        msg: 'El peso promedio de bolsa es erroneo. Por Favor Verifique',
        msgType: styles.error,
      });
      return;
    }
    console.log(this.state.pesada);

    cerrarGreenTrzAsDetipals({
      idPlanta: parseInt(this.state.pesada.pesadaPlanta),
      numpal: this.state.pesada.palletNumero.ultusado
        ? parseInt(this.state.pesada.palletNumero.ultusado) + 1
        : parseInt(this.state.pesada.palletNumero.numpal),
      idArea: parseInt(this.state.pesada.area),
      ptoPes: parseInt(this.state.pesada.pesadaPuesto),
      fechorPes: dayjs()
        .subtract(new Date().getTimezoneOffset() / 60, 'hour')
        .toISOString()
        .replace('Z', '')
        .replace('T', ' '),
      idTurno: parseInt(this.state.pesada.pesadaTurno),
      idProd: this.state.pesada.pesadaProducto,
      unidades: parseInt(this.state.pesada.pesadaCantidadBolsa),
      taraPal: 0,
      taraBolsa: parseFloat(prod[0].taraBolsa),
      kneto: this.state.pesada.pesoManual
        ? parseFloat(this.state.pesada.valormanual)
        : parseFloat(this.state.pesada.pesobalanza),
      kbruto: this.state.pesada.pesoManual
        ? parseFloat(this.state.pesada.valormanual)
        : parseFloat(this.state.pesada.pesobalanza),
      fecProd: dayjs()
        .subtract(new Date().getTimezoneOffset() / 60, 'hour')
        .toISOString()
        .replace('Z', '')
        .replace('T', ' '),
      fecCong: dayjs()
        .subtract(new Date().getTimezoneOffset() / 60, 'hour')
        .toISOString()
        .replace('Z', '')
        .replace('T', ' '),
      fecVenc: dayjs()
        .subtract(new Date().getTimezoneOffset() / 60, 'hour')
        .toISOString()
        .replace('Z', '')
        .replace('T', ' '),
      idUsuario: parseInt(store.getState().userid.toString()),
      lote: this.state.pesada.lote,
      horaAper: this.state.pesada.horaInicio,
      horaCierre: dayjs()
        .subtract(new Date().getTimezoneOffset() / 60, 'hour')
        .toISOString()
        .replace('Z', '')
        .replace('T', ' '),
      idEstado: 2,
      intervenido: true,
      retenido: false,
      obspallet: this.state.pesada.obspallet,
      obsretenido: '',
      obsintervenido: '',
    })
      .then((res) => {
        // toast.success('El Pallet se cerro correctamente.!', {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        initGreenTrzAsHDetipals({
          idPlanta: parseInt(this.state.pesada.pesadaPlanta),
          numpal: this.state.pesada.palletNumero.ultusado
            ? parseInt(this.state.pesada.palletNumero.ultusado) + 1
            : parseInt(this.state.pesada.palletNumero.numpal),
          idArea: parseInt(this.state.pesada.area),
          ptoPes: parseInt(this.state.pesada.pesadaPuesto),
          fechorPes: dayjs()
            .subtract(new Date().getTimezoneOffset() / 60, 'hour')
            .toISOString()
            .replace('Z', '')
            .replace('T', ' '),
          idTurno: parseInt(this.state.pesada.pesadaTurno),
          idProd: this.state.pesada.pesadaProducto,
          unidades: parseInt(this.state.pesada.pesadaCantidadBolsa),
          taraPal: 0,
          taraBolsa: parseFloat(prod[0].taraBolsa),
          kneto: this.state.pesada.pesoManual
            ? parseFloat(this.state.pesada.valormanual)
            : parseFloat(this.state.pesada.pesobalanza),
          kbruto: this.state.pesada.pesoManual
            ? parseFloat(this.state.pesada.valormanual)
            : parseFloat(this.state.pesada.pesobalanza),
          fecProd: dayjs()
            .subtract(new Date().getTimezoneOffset() / 60, 'hour')
            .toISOString()
            .replace('Z', '')
            .replace('T', ' '),
          fecCong: dayjs()
            .subtract(new Date().getTimezoneOffset() / 60, 'hour')
            .toISOString()
            .replace('Z', '')
            .replace('T', ' '),
          fecVenc: dayjs()
            .subtract(new Date().getTimezoneOffset() / 60, 'hour')
            .toISOString()
            .replace('Z', '')
            .replace('T', ' '),
          idUsuario: parseInt(store.getState().userid.toString()),
          lote: this.state.pesada.lote,
          horaAper: this.state.pesada.horaInicio,
          horaCierre: dayjs()
            .subtract(new Date().getTimezoneOffset() / 60, 'hour')
            .toISOString()
            .replace('Z', '')
            .replace('T', ' '),
          secuencia: 0,
          idTipomov: 1,
          numbal: 0,
          idEstado: 1,
        })
          .then((reshpal) => {
            this.setState(
              {
                ...this.state,
                msg: 'Pallet Cerrado',
                pesada: {
                  ...this.state.pesada,
                  pesobalanza: 0,
                  pesadaCantidadBolsa: 0,
                  palletNumero: 0,
                  palletPeso: '0',
                  estadobalanza: '',
                  obspallet: 'A la espera de Análisis',
                  horaInicio: null,
                  valormanual: 0,
                  intervenido: true,
                },
                msgType: styles.success,
                pesando: !this.state.pesando,
              },
              () => {
                this.getActivity();
              },
            );
          })
          .catch((err) => {
            // toast.error('Hemos tenido problemas al cerrar el Pallet.!', {
            //   position: toast.POSITION.TOP_CENTER,
            // });
            this.setState({
              ...this.state,
              msg: 'ERROR al cerrar el pallet',
              msgType: styles.error,
            });
            console.error(err);
          });
      })
      .catch((err) => {
        // toast.error('Hemos tenido problemas al cerrar el Pallet.!', {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        this.setState({
          ...this.state,
          msg: 'ERROR al cerrar el pallet',
          msgType: styles.error,
        });
        console.error(err);
      });
  };

  handlerInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      ...this.state,
      pesada: {
        ...this.state.pesada,
        [name]: value,
      },
    });
  };

  getActivity() {
    getLastPalletActivity(
      this.state.pesada.pesadaPlanta,
      this.state.pesada.area,
      this.state.pesada.pesadaPuesto,
    ).then((detpal) => {
      this.setState({
        ...this.state,
        ultimosPallet: detpal.data,
      });
    });
  }

  render() {
    return this.state.ifYouCan ? (
      this.state.paramsOk === true || this.state.paramsOk === null ? (
        <Fullscreen
          enabled={this.state.isFull}
          onChange={(isFull) => this.setState({...this.state, isFull})}
        >
          <Flex direction="column" margin="0">
            <Column width="100%">
              <div className={styles.title}>
                <div className={styles.titleText}>
                  {this.props.t('greentrz.PuestoSemi')}
                  <span className={styles.msg}>
                    <div className={this.state.msgType}>
                      {this.props.t(this.state.msg)}
                    </div>
                  </span>
                  <Button
                    styleType="outline"
                    classes={styles.fullscreenBtn}
                    visible={true}
                    loading={this.state.wait}
                    disabled={this.state.wait}
                    id="pesarfullscreen"
                    icon={this.state.isFull ? 'chevron-down' : 'chevron-up'}
                    onPress={this.goFull}
                  ></Button>
                </div>
              </div>
              <div className={styles.icon}>
                <img src={pallet} alt="Pallet"></img>
              </div>
            </Column>
            <Column
              width="100%"
              height="auto"
              padding="5px"
              margin="0 0 20px 0"
            >
              <GroupForm
                title={this.props.t('general.configuracion')}
                classes={styles.group}
              >
                <Column width="49%" padding="5px">
                  <ComboBox
                    id="pesadaPlanta"
                    label={this.props.t('general.planta')}
                    items={this.state.plantas}
                    itemId="id"
                    disabled={this.state.pesando}
                    itemText="descripcion"
                    value={this.state.pesada.pesadaPlanta}
                    onSelect={this.handlerSelectChange}
                  />
                  <ComboBox
                    id="pesadaTurno"
                    label={this.props.t('general.turno')}
                    items={this.state.turnos}
                    itemId="id"
                    itemText="descr"
                    disabled={this.state.pesando}
                    value={this.state.pesada.pesadaTurno}
                    onSelect={this.handlerSelectChange}
                  />
                  <ComboBox
                    id="pesadaPuesto"
                    label={this.props.t('general.puesto')}
                    items={this.state.puestos}
                    itemId="id"
                    itemText="valor"
                    disabled={this.state.pesando}
                    value={this.state.pesada.pesadaPuesto}
                    onSelect={this.handlerSelectChange}
                  />
                </Column>
                <Column width="49%" height="100%" padding="5px">
                  <ComboBox
                    id="pesadaProducto"
                    label={this.props.t('general.producto')}
                    items={this.state.productos}
                    itemId="codsap"
                    itemText={['codsap', 'descrMat']}
                    disabled={this.state.pesando}
                    value={this.state.pesada.pesadaroducto}
                    onSelect={this.handlerSelectChange}
                  />
                  <ComboBox
                    id="pesadaImpresora"
                    label={this.props.t('general.impresora')}
                    items={this.state.impresoras}
                    itemId="id"
                    itemText="valor"
                    disabled={this.state.pesando}
                    value={this.state.pesada.pesadaImpresora}
                    onSelect={this.handlerSelectChange}
                  />
                  <Button
                    width="100%"
                    margin="0"
                    visible={true}
                    styleType="success"
                    loading={this.state.wait}
                    disabled={!this.state.habilitado}
                    text={
                      this.state.pesando
                        ? this.props.t('greentrz.stopPesada')
                        : this.props.t('greentrz.habilitarPesada')
                    }
                    id="pesar"
                    icon={this.state.pesando ? 'stop' : 'play'}
                    onPress={this.handlerPesar}
                  ></Button>
                </Column>
              </GroupForm>
            </Column>
            <Flex
              classes={styles.container}
              width="100%"
              height="calc(100% - 23rem)"
              direction="row"
            >
              <Column width="50%" height="auto" padding="5px" minHeight="290px">
                <GroupForm
                  title={this.props.t('greentrz.UltimosPallet')}
                  columns={true}
                  disabled={!this.state.pesando}
                  height="100%"
                  overflow="auto"
                  //disabled={!this.state.pesando}
                  classes={styles.groupPesada}
                >
                  <ul className={styles.listaPallet}>
                    {this.state.ultimosPallet.map((v) => {
                      return (
                        <li key={v.numpal}>
                          {v.numpal}
                          <small>
                            {' '}
                            -{' '}
                            <Moment format="DD/MM/YYYY HH:mm:ss">
                              {v.horaCierre}
                            </Moment>
                          </small>
                          <b>
                            {v.idProd} - {v.unidades} un. -
                            {Intl.NumberFormat('es-ES').format(v.kbruto)}kg
                          </b>
                        </li>
                      );
                    })}
                  </ul>
                </GroupForm>
              </Column>

              <Column width="50%" height="auto" padding="0px">
                <Flex
                  classes={styles.container}
                  width="100%"
                  height="100%"
                  direction="column"
                >
                  <Column
                    width="100%"
                    height="60%"
                    padding="5px"
                    minHeight="145px"
                  >
                    <GroupForm
                      height="100%"
                      title={this.props.t('greentrz.PesadaActual')}
                      classes={styles.group}
                      disabled={!this.state.pesando}
                    >
                      <Flex
                        classes={styles.container}
                        width="100%"
                        height="33%"
                        direction="row"
                        alignItems="center"
                      >
                        <Column width="50%" height="auto">
                          <div className={styles.numPallet}>
                            PALLET N°
                            <div>
                              {this.state.pesada.palletNumero.ultusado
                                ? parseInt(
                                    this.state.pesada.palletNumero.ultusado,
                                  ) + 1
                                : this.state.pesada.palletNumero.numpal
                                ? parseInt(
                                    this.state.pesada.palletNumero.numpal,
                                  )
                                : '-'}
                            </div>
                          </div>
                        </Column>
                        <Column width="50%" height="auto">
                          <div className={styles.numPallet}>
                            LOTE N°
                            <div>{this.state.pesada.lote}</div>
                          </div>
                        </Column>
                      </Flex>
                      <Flex
                        classes={styles.container}
                        width="100%"
                        height="33%"
                        direction="row"
                        alignItems="center"
                      >
                        <Column width="50%" height="auto">
                          {this.state.pesada.producto.descrMat || ''}
                        </Column>
                        <Flex
                          classes={styles.container}
                          width="55%"
                          height="33%"
                          direction="row"
                          alignItems="center"
                        >
                          <Column width="33%" height="auto">
                            <div className={styles.detalleBolsas}>
                              MIN.
                              <div>
                                {Intl.NumberFormat('es-ES').format(
                                  this.state.pesada.producto.pesmin || 0,
                                )}
                              </div>
                            </div>
                          </Column>
                          <Column width="33%" height="auto">
                            <div
                              className={[
                                styles.detalleBolsas,
                                this.state.pesada.pesadaCantidadBolsa !== 0
                                  ? this.state.pesada.pesoManual
                                    ? parseFloat(
                                        this.state.pesada.valormanual /
                                          this.state.pesada.pesadaCantidadBolsa,
                                      ) <
                                        parseFloat(
                                          this.state.pesada.producto.pesmin,
                                        ) ||
                                      parseFloat(
                                        this.state.pesada.valormanual /
                                          this.state.pesada.pesadaCantidadBolsa,
                                      ) >
                                        parseFloat(
                                          this.state.pesada.producto.pesmax,
                                        )
                                      ? styles.error
                                      : styles.success
                                    : parseFloat(
                                        this.state.pesada.producto.pesmin,
                                      ) <
                                        parseFloat(
                                          this.state.pesada.pesobalanza /
                                            this.state.pesada
                                              .pesadaCantidadBolsa,
                                        ) ||
                                      parseFloat(
                                        this.state.pesada.pesobalanza /
                                          this.state.pesada.pesadaCantidadBolsa,
                                      ) >
                                        parseFloat(
                                          this.state.pesada.producto.pesmax,
                                        )
                                    ? styles.error
                                    : styles.success
                                  : styles.error,
                              ].join(' ')}
                            >
                              PESO PROM.
                              <div>
                                {Intl.NumberFormat('es-ES').format(
                                  this.state.pesada.pesadaCantidadBolsa !== 0
                                    ? this.state.pesada.pesoManual
                                      ? parseFloat(
                                          this.state.pesada.valormanual /
                                            this.state.pesada
                                              .pesadaCantidadBolsa,
                                        ).toFixed(3)
                                      : parseFloat(
                                          this.state.pesada.pesobalanza /
                                            this.state.pesada
                                              .pesadaCantidadBolsa,
                                        ).toFixed(3)
                                    : 0,
                                )}
                              </div>
                            </div>
                          </Column>
                          <Column width="33%" height="auto">
                            <div className={styles.detalleBolsas}>
                              MAX.
                              <div>
                                {Intl.NumberFormat('es-ES').format(
                                  this.state.pesada.producto.pesmax || 0,
                                )}
                              </div>
                            </div>
                          </Column>
                        </Flex>
                      </Flex>
                      <Flex
                        classes={styles.container}
                        width="30%"
                        height="33%"
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {/* <Column
                          width="30%"
                          height="auto"
                          classes={styles.bolsas}
                        >
                          Cantidad de bolsas
                        </Column> */}
                        <Column width="100%" height="auto">
                          <div className={styles.detalleBolsas}>
                            <Input
                              id="pesadaCantidadBolsa"
                              label={this.props.t('greentrz.cantbolasa')}
                              type="number"
                              value={this.state.pesada.pesadaCantidadBolsa}
                              onChange={this.handlerInputChange}
                              classes={styles.inputs}
                            />
                          </div>
                        </Column>
                      </Flex>
                      <Flex
                        classes={styles.container}
                        width="70%"
                        height="33%"
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {/* <Column
                          width="20%"
                          height="auto"
                          classes={styles.bolsas}
                        >
                          Observaciones
                        </Column> */}
                        <Column width="90%" height="auto">
                          <div className={styles.detalleBolsas}>
                            <Input
                              id="obspallet"
                              label={this.props.t('greentrz.obspallet')}
                              type="text"
                              value={this.state.pesada.obspallet}
                              onChange={this.handlerInputChange}
                              classes={styles.inputs}
                            />
                          </div>
                        </Column>
                      </Flex>
                    </GroupForm>
                  </Column>
                  <Column
                    width="100%"
                    height="40%"
                    padding="5px"
                    minHeight="145px"
                  >
                    <GroupForm
                      columns={true}
                      height="100%"
                      title={
                        this.state.pesada.pesoManual
                          ? this.props.t('greentrz.PesoManual')
                          : this.props.t('greentrz.PesoBalanza')
                      }
                      disabled={!this.state.pesando}
                      classes={styles.groupPesada}
                    >
                      <div className={styles.topheader}>
                        {!this.state.pesada.pesoManual ? (
                          <div className={styles.estadoBalanza}>
                            BALANZA: {this.state.pesada.estadobalanza}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>

                      <div className={styles.peso}>
                        {this.state.pesada.pesoManual ? (
                          <div>
                            <Input
                              id="valormanual"
                              type="number"
                              value={this.state.pesada.valormanual}
                              onChange={(e) =>
                                this.setState({
                                  ...this.state,
                                  pesada: {
                                    ...this.state.pesada,
                                    valormanual: e.target.value,
                                  },
                                })
                              }
                            ></Input>{' '}
                            <span>kg</span>
                          </div>
                        ) : (
                          <div>
                            {Intl.NumberFormat('es-ES').format(
                              this.state.pesada.pesobalanza,
                            )}{' '}
                            kg
                          </div>
                        )}
                      </div>

                      <Button
                        width="100%"
                        heigh="100%"
                        visible={true}
                        styleType="success"
                        loading={this.state.wait}
                        disabled={this.state.pesada.pesadaPlanta === ''}
                        text={this.props.t('greentrz.cerrarPallet')}
                        id="cerrarPallet"
                        icon="save"
                        onPress={this.handlerCerrarPallet}
                      ></Button>
                    </GroupForm>
                  </Column>
                </Flex>
              </Column>
            </Flex>
          </Flex>
        </Fullscreen>
      ) : (
        <Flex direction="columns" padding="0" margin="0" wrap="wrap">
          <Column height="100vh">
            <LoaderViewError
              icon="need_param"
              title={this.props.t('error.needParamsTitle')}
              message={this.props.t('error.needParamsExplain')}
              data={PARAMS_NEEDS.join(', ')}
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

export default withTranslation()(GreenPesada);
