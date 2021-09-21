import React, {PureComponent} from 'react';
import Flex from '../../../components/Flex';
import Column from '../../../components/Column';
// import Input from '../../../components/Input';
import ComboBox from '../../../components/ComboBox';
import Input from '../../../components/Input';
// import store from '../../../store';
import GroupForm from '../../../components/GroupForm';
import styles from './styles.module.scss';
import {withTranslation} from 'react-i18next';
import Button from '../../../components/Button';
import CustomStore from 'devextreme/data/custom_store';
import {LoaderViewError} from '../../../actions.js';
import {CSSTransition} from 'react-transition-group';
import pallet from '../../../assets/pallet.svg';
import {getPlantas, getTurnos} from '../../../services/General';
import Fullscreen from 'react-full-screen';
// import Popup from 'devextreme-react/popup';
// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment';
import Grid from './grid.js';
import {
  getGreenTrzUltimoPallet,
  getGreenTrzProductosByGroup,
  getGreenTrzProducto,
  initGreenTrzAsDetipals,
  cerrarGreenTrzAsDetipals,
  createGreenTrzAsConspalsParcial,
  createGreenTrzAsConspalsTotal,
  getLastPalletActivityFinal,
  incrementNumPall,
  // getPalletAConsumir,
  getLastPalletOpenProductoFinal,
  // initGreenTrzAsHDetipals,
  getTotalAConsumir,
  getTotalProducidoFinal,
  getTotalConsumidoFinal,
} from '../../../services/GreenTrz';
import {
  getTrxParamByPlantaAndTrx,
  checkTrxParamsNeed,
} from '../../../services/TrxParam';
import esMessages from 'devextreme/localization/messages/es.json';
import enMessages from 'devextreme/localization/messages/en.json';
import {locale, loadMessages} from 'devextreme/localization';

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
];
const TRX = store.getState().tabList[store.getState().tabActive].id;

class GreenPesPrdFinalView extends PureComponent {
  constructor(props) {
    super(props);
    loadMessages(enMessages);
    loadMessages(esMessages);
    locale(store.getState().lang);

    this.state = {
      isFull: false,
      ifYouCan: true,
      ifYouAddPermission: false,
      wait: false,
      habilitado: false,
      pesando: false,
      pesada: {
        pesadaPlanta: '',
        pesadaPuesto: '',
        pesadaImpresora: '',
        pesadaTurno: '',
        pesadaProducto: '',
        pesobalanza: 0,
        pesoconsumo: 0,
        pesadaCantidadCajas: 0,
        pesadaCantidadBolsas: 0,
        palletNumero: 0,
        pesadaArea: '',
        palletPeso: '0',
        horaInicio: null,
        estadobalanza: '',
        lote: '-',
        producto: {},
      },
      ultimosPallet: [],
      aConsumir: 0,
      producidos: 0,
      consumidos: 0,
      decomiso: 0,
      plantas: [],
      impresoras: [],
      turnos: [],
      productos: [],
      puestos: [],
      paramsOk: null,
      visibleGridPallets: false,
      msg: '',
      palletsAConsumir: [],
    };
    this.ds = new CustomStore({
      key: 'numpal',
      load: (loadOptions) => {
        return this.state.palletsAConsumir;
      },
      update: (key, values) => {},
    });
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
              this.setState(
                {
                  ...this.state,
                  pesada: {
                    ...this.state.pesada,
                    producto: res.data[0],
                  },
                },
                () => {
                  if (
                    this.state.pesada.pesadaPlanta !== '' &&
                    this.state.pesada.pesadaTurno !== '' &&
                    this.state.pesada.pesadaProducto !== '' &&
                    this.state.pesada.pesadaPuesto !== '' &&
                    this.state.pesada.pesadaImpresora !== ''
                  ) {
                    this.getActivity();
                    this.setState({...this.state, habilitado: true});
                  }
                },
              );
            },
          );
        } else {
          if (
            this.state.pesada.pesadaPlanta !== '' &&
            this.state.pesada.pesadaTurno !== '' &&
            this.state.pesada.pesadaProducto !== '' &&
            this.state.pesada.pesadaPuesto !== '' &&
            this.state.pesada.pesadaImpresora !== ''
          ) {
            this.getActivity();
            this.setState({...this.state, habilitado: true});
          }
        }

        // if (
        //   this.state.pesada.pesadaPlanta !== '' &&
        //   this.state.pesada.pesadaTurno !== '' &&
        //   this.state.pesada.pesadaProducto !== '' &&
        //   this.state.pesada.pesadaPuesto !== '' &&
        //   this.state.pesada.pesadaImpresora !== ''
        // )
        //   this.setState({...this.state, habilitado: true});
      },
    );
  };

  getActivity = () => {
    axios
      .all([
        getLastPalletActivityFinal(
          this.state.pesada.pesadaPlanta,
          this.state.pesada.area,
          this.state.pesada.pesadaPuesto,
        ),
        getTotalAConsumir(
          this.state.pesada.pesadaPlanta,
          this.state.pesada.producto.idPrdfam,
        ),
        getTotalProducidoFinal(
          this.state.pesada.pesadaPlanta,
          this.state.pesada.producto.idPrdfam,
        ),
        getTotalConsumidoFinal(
          this.state.pesada.pesadaPlanta,
          this.state.pesada.producto.idPrdfam,
        ),
      ])
      .then((values) => {
        console.log(values);
        this.setState({
          ...this.state,
          habilitado:
            values[1].data.reduce(
              (a, b) => parseFloat(a) + parseFloat(b.kneto),
              0,
            ) > 0,
          ultimosPallet: values[0].data,
          aConsumir: values[1].data.reduce(
            (a, b) => parseFloat(a) + parseFloat(b.kneto),
            0,
          ),
          producidos: values[2].data[0].sum,
          consumidos: values[3].data[0].sum,
          palletsAConsumir: values[1].data.map((v) => {
            return {
              ...v,
              status: 1,
              usadas: v.unidades,
              kusados: v.kneto,
            };
          }),
        });
      });
  };

  componentDidMount = async () => {
    axios
      .all([getPlantas()])
      .then((values) => {
        this.setState({
          plantas: values[0].data,
        });
      })
      .catch((error) => {
        console.error(error.response);
        if (error.response.status === 401) {
          this.setState({ifYouCan: false});
        } else {
          this.setState();
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
                  this.setState({
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
                  });
                })
                .catch((error) => {
                  console.error(error.response);
                  if (error.response.status === 401) {
                    this.setState({ifYouCan: false});
                  }
                });
            }
            this.setState({
              // ...this.state,
              // turnos: values[0].data,
              // poductos: values[1].data,
              // pesada: {
              //   ...this.state.pesada,
              //   palletNumero: values[1].data[0].ultusado + 1,
              // },
              // params: values[3].data,
              paramsOk: res,
            });
          })
          .catch((error) => {
            console.error(error.response);
            if (error.response.status === 401) {
              this.setState({ifYouCan: false});
            }
          });
      });
  };

  // componentDidUpdate = (nextProps, nextState) => {
  //   console.log(nextProps, nextState);
  //   if (
  //     Object.entries(this.state.pesada.producto).length !== 0 &&
  //     this.state.pesada.pesadaPlanta !== ''
  //   )
  //     this.getActivity();
  // };

  handlerPesar = () => {
    if (this.state.pesando) {
      this.setState({
        pesando: !this.state.pesando,
        msg: 'Pesada Cancelada',
        msgType: styles.error,
        // pesadaCantidadCajas: this.state.pesada.producto.estibamax,
      });
    } else {
      axios
        .all([
          getLastPalletActivityFinal(
            this.state.pesada.pesadaPlanta,
            this.state.pesada.area,
            this.state.pesada.pesadaPuesto,
          ),
          getGreenTrzUltimoPallet(
            this.state.pesada.pesadaPlanta,
            this.state.params.filter((v) => v.descr === PARAMS_NEEDS[3])[0]
              .valor,
          ),
          // getPalletAConsumir(this.state.pesada.pesadaPlanta),
          getLastPalletOpenProductoFinal(
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
              idEstado: 4,
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
                  // palletsAConsumir: res[2].data.map((v) => {
                  //   return {
                  //     ...v,
                  //     status: 1,
                  //     usadas: v.unidades,
                  //     kusados: v.kneto,
                  //   };
                  // }),
                  pesando: !this.state.pesando,
                  pesada: {
                    ...this.state.pesada,
                    horaInicio: dayjs().subtract(
                      new Date().getTimezoneOffset() / 60,
                      'hour',
                    ),
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
              // palletsAConsumir: res[2].data.map((v) => {
              //   return {
              //     ...v,
              //     status: 1,
              //     usadas: v.unidades,
              //     kusados: v.kneto,
              //   };
              // }),
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
            msg: 'ERROR al iniciar la pesada',
            msgType: styles.error,
          });
          console.error(err);
        });
    }
  };

  handlerCerrarPallet = async () => {
    let t = this;
    let prod = this.state.productos.filter(
      (v) => v.codsap === this.state.pesada.pesadaProducto,
    );
    if (this.state.pesada.pesadaCantidadCajas === 0) {
      // toast.success('La Cantidad de bolsas debe ser mayor a 0', {
      //   position: toast.POSITION.TOP_LEFT,
      // });
      this.setState({
        msg: 'La Cantidad de Cajas debe ser mayor a 0',
        msgType: styles.error,
      });
      return;
    }
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
      unidades: parseInt(this.state.pesada.pesadaCantidadCajas),
      taraPal: 0,
      taraBolsa: parseFloat(prod[0].taraBolsa),
      kneto: parseFloat(this.state.pesada.pesobalanza),
      kbruto: parseFloat(this.state.pesada.pesobalanza),
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
      idEstado: 5,
    })
      .then(async (res) => {
        t.ds.load().then(async (v) =>
          v.map(async (c) => {
            if (c.status === 2) {
              if (c.kneto === c.kusados) {
                console.log('total', c.numpal);
                await createGreenTrzAsConspalsTotal(
                  {
                    idPlanta: parseInt(c.id_planta),
                    idNumpal: parseInt(c.numpal),
                    idUsuario: parseInt(store.getState().userid.toString()),
                    idProducto: c.id_prod,
                    knetos: parseFloat(c.kusados),
                    haper: c.hora_aper,
                    hcierr: c.hora_cierre,
                    cantbolsas: parseInt(c.unidades),
                    idArea: parseInt(c.id_area),
                  },
                  8,
                );
              } else {
                console.log('parcial', c.numpal);
                createGreenTrzAsConspalsParcial(
                  {
                    idPlanta: parseInt(c.id_planta),
                    idNumpal: parseInt(c.numpal),
                    idUsuario: parseInt(store.getState().userid.toString()),
                    idProducto: c.id_prod,
                    knetos: parseFloat(c.kneto),
                    kusados: parseFloat(c.kusados),
                    kresto: parseFloat(c.kneto) - parseFloat(c.kusados),
                    haper: c.hora_aper,
                    hcierr: c.hora_cierre,
                    cantbolsas: parseFloat(c.unidades),
                    idArea: parseInt(c.id_area),
                  },
                  7,
                );
              }
            }
          }),
        );

        // toast.success('El Pallet se cerro correctamente.!', {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        // initGreenTrzAsHDetipals({
        //   idPlanta: parseInt(this.state.pesada.pesadaPlanta),
        //   numpal: parseInt(this.state.pesada.palletNumero.ultusado) + 1,
        //   idArea: parseInt(this.state.pesada.area),
        //   ptoPes: parseInt(this.state.pesada.pesadaPuesto),
        //   fechorPes: dayjs().subtract(
        //     new Date().getTimezoneOffset() / 60,
        //     'hour',
        //   ),
        //   idTurno: parseInt(this.state.pesada.pesadaTurno),
        //   idProd: this.state.pesada.pesadaProducto,
        //   unidades: parseInt(this.state.pesada.pesadaCantidadCajas),
        //   taraPal: 0,
        //   taraBolsa: parseFloat(prod[0].taraBolsa),
        //   kneto: parseFloat(this.state.pesada.pesobalanza),
        //   kbruto: parseFloat(this.state.pesada.pesobalanza),
        //   fecProd: dayjs().subtract(
        //     new Date().getTimezoneOffset() / 60,
        //     'hour',
        //   ),
        //   fecCong: dayjs().subtract(
        //     new Date().getTimezoneOffset() / 60,
        //     'hour',
        //   ),
        //   fecVenc: dayjs().subtract(
        //     new Date().getTimezoneOffset() / 60,
        //     'hour',
        //   ),
        //   idUsuario: parseInt(store.getState().userid.toString()),
        //   lote: this.state.pesada.lote,
        //   horaAper: this.state.pesada.horaInicio,
        //   horaCierre: dayjs().subtract(
        //     new Date().getTimezoneOffset() / 60,
        //     'hour',
        //   ),
        //   secuencia: 0,
        //   idTipomov: 1,
        //   numbal: 0,
        //   idEstado: 5,
        // })
        //   .then((reshpal) => {

        this.setState(
          {
            ...this.state,
            msg: 'Pallet Cerrado',
            msgType: styles.success,
            pesando: !this.state.pesando,
            pesada: {
              ...this.state.pesada,
              pesobalanza: 0,
              pesoconsumo: 0,
              pesadaCantidadCajas: 0,
              pesadaCantidadBolsas: 0,
              palletNumero: 0,
              palletPeso: '0',
              horaInicio: null,
              estadobalanza: '',
            },
          },
          () => {
            this.getActivity();
          },
        );

        //   })
        //   .catch((err) => {
        //     // toast.error('Hemos tenido problemas al cerrar el Pallet.!', {
        //     //   position: toast.POSITION.TOP_CENTER,
        //     // });
        //     this.setState({
        //       msg: 'ERROR al cerrar el pallet',
        //       msgType: styles.error,
        //     });
        //     console.error(err);
        //   });
      })
      .catch((err) => {
        // toast.error('Hemos tenido problemas al cerrar el Pallet.!', {
        //   position: toast.POSITION.TOP_CENTER,
        // });
        this.setState({
          msg: 'ERROR al cerrar el pallet',
          msgType: styles.error,
        });
        console.error(err);
      });
  };

  handlerInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(
      this.state.pesada.producto.pesfijo,
      value,
      (parseFloat(this.state.pesada.producto.pesfijo) * value).toFixed(3),
    );
    if (name === 'pesadaCantidadCajas') {
      this.setState({
        ...this.state,
        pesada: {
          ...this.state.pesada,
          [name]: value,
          pesobalanza: parseFloat(this.state.pesada.producto.pesfijo) * value,
        },
      });
    }
    console.log(this.state);
  };

  handlerConsumir = () => {
    this.setState({...this.setState, visibleGridPallets: true});
  };

  cerrarVentana = (e) => {
    let bolsas = 0;
    let peso = 0;

    this.ds.load().then((v) =>
      v.map((c) => {
        if (c.status === 2) {
          bolsas = bolsas + parseInt(c.usadas);
          if (c.usadas !== c.unidades) {
            if (parseInt(c.unidades) !== 0)
              peso =
                peso +
                (parseInt(c.kusados) / parseInt(c.unidades)) *
                  parseInt(c.usadas);
          } else {
            peso = peso + parseFloat(c.kusados);
          }
        }
      }),
    );

    this.setState({
      ...this.state,
      pesada: {
        ...this.state.pesada,
        pesoconsumo: peso,
        pesadaCantidadBolsas: bolsas,
      },
      visibleGridPallets: false,
    });
  };

  render() {
    return this.state.ifYouCan ? (
      this.state.paramsOk === true || this.state.paramsOk === null ? (
        <Fullscreen
          enabled={this.state.isFull}
          onChange={(isFull) => this.setState({isFull})}
        >
          <Flex direction="column" margin="0">
            <Column width="100%">
              <div className={styles.title}>
                <div className={styles.titleText}>
                  {this.props.t('greentrz.PuestoFinal')}
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
            <Flex width="100%" height="calc(100% - 23rem)" direction="row">
              <Column width="60%" height="auto">
                <Flex width="100%" height="100%" direction="column">
                  <Column width="100%" height="80%" padding="5px">
                    <GroupForm
                      title={this.props.t('greentrz.UltimosPallet')}
                      columns={true}
                      disabled={!this.state.pesando}
                      height="100%"
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
                                {v.idProd} - {v.unidades} un. {v.kbruto}kg
                              </b>
                            </li>
                          );
                        })}
                      </ul>
                    </GroupForm>
                  </Column>
                  <Column width="100%" height="20%" p>
                    <Flex width="100%" height="100%" direction="row">
                      <Column width="33%" padding="5px">
                        <GroupForm
                          title={this.props.t('greentrz.aConsumir')}
                          columns={true}
                          disabled={!this.state.pesando}
                          height="100%"
                          //disabled={!this.state.pesando}
                          classes={styles.groupPesada}
                        >
                          <div className={styles.pesoTotales}>
                            {Intl.NumberFormat('es-ES').format(
                              parseFloat(this.state.aConsumir).toFixed(3),
                            )}{' '}
                            KG.
                          </div>
                        </GroupForm>
                      </Column>
                      <Column width="33%" padding="5px">
                        <GroupForm
                          title={this.props.t('greentrz.consumido')}
                          columns={true}
                          disabled={!this.state.pesando}
                          height="100%"
                          //disabled={!this.state.pesando}
                          classes={styles.groupPesada}
                        >
                          <div className={styles.pesoTotales}>
                            {Intl.NumberFormat('es-ES').format(
                              parseFloat(this.state.consumidos).toFixed(3),
                            )}{' '}
                            KG.
                          </div>
                        </GroupForm>
                      </Column>
                      <Column width="33%" padding="5px">
                        <GroupForm
                          title={this.props.t('greentrz.producidos')}
                          columns={true}
                          disabled={!this.state.pesando}
                          height="100%"
                          //disabled={!this.state.pesando}
                          classes={styles.groupPesada}
                        >
                          <div className={styles.pesoTotales}>
                            {Intl.NumberFormat('es-ES').format(
                              parseFloat(this.state.producidos).toFixed(3),
                            )}{' '}
                            KG.
                          </div>
                        </GroupForm>
                      </Column>

                      <Column width="33%" padding="5px">
                        <GroupForm
                          title={this.props.t('greentrz.decomiso')}
                          columns={true}
                          disabled={!this.state.pesando}
                          height="100%"
                          //disabled={!this.state.pesando}
                          classes={styles.groupPesada}
                        >
                          <div className={styles.pesoTotales}>
                            {Intl.NumberFormat('es-ES').format(
                              parseFloat(this.state.decomiso).toFixed(3),
                            )}{' '}
                            KG.
                          </div>
                        </GroupForm>
                      </Column>
                    </Flex>
                  </Column>
                </Flex>
              </Column>

              <Column width="40%" height="auto" padding="0px">
                <Flex width="100%" height="100%" direction="column">
                  <Column width="100%" height="50%" padding="5px">
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
                      >
                        <Column width="100%" height="auto">
                          <Button
                            width="100%"
                            heigh="100%"
                            visible={true}
                            styleType="success"
                            loading={this.state.wait}
                            disabled={this.state.pesada.pesadaPlanta === ''}
                            text={this.props.t('greentrz.consumir')}
                            id="cerrarPallet"
                            icon="save"
                            onPress={this.handlerConsumir}
                          ></Button>
                        </Column>
                      </Flex>
                    </GroupForm>
                  </Column>
                  <Column width="100%" height="50%" padding="5px">
                    <GroupForm
                      columns={true}
                      height="100%"
                      title={this.props.t('greentrz.otrosdatos')}
                      disabled={!this.state.pesando}
                      classes={styles.groupPesada}
                    >
                      <Flex direction="row" wrap="wrap">
                        <Column width="50%">
                          <div className={styles.topheader}>
                            <div className={styles.estadoBalanza}>
                              {this.props.t('greentrz.cantbolsas')}
                            </div>
                          </div>
                          <div className={styles.peso}>
                            {this.state.pesada.pesadaCantidadBolsas}
                          </div>
                        </Column>
                        <Column width="50%">
                          <div className={styles.topheader}>
                            <div className={styles.estadoBalanza}>
                              {this.props.t('greentrz.pesoConsumo')}
                            </div>
                          </div>
                          <div className={styles.peso}>
                            {Intl.NumberFormat('es-ES').format(
                              this.state.pesada.pesoconsumo.toFixed(3),
                            )}{' '}
                            KG.
                          </div>
                        </Column>
                        <Column width="50%" height="auto">
                          <div className={styles.detalleBolsas}>
                            <Input
                              id="pesadaCantidadCajas"
                              label={this.props.t('greentrz.cantcajas')}
                              type="number"
                              value={this.state.pesada.pesadaCantidadCajas}
                              onChange={this.handlerInputChange}
                              classes={styles.inputs}
                            />
                          </div>
                        </Column>
                        <Column width="50%">
                          <div className={styles.topheader}>
                            <div className={styles.estadoBalanza}>
                              {this.props.t('greentrz.pesoFinal')}
                            </div>
                          </div>
                          <div className={styles.peso}>
                            {Intl.NumberFormat('es-ES').format(
                              this.state.pesada.pesobalanza.toFixed(3),
                            )}{' '}
                            KG.
                          </div>
                        </Column>
                        <Button
                          width="100%"
                          heigh="100%"
                          visible={true}
                          styleType="success"
                          loading={this.state.wait}
                          disabled={
                            this.state.pesada.pesadaPlanta === '' ||
                            this.state.pesada.pesobalanza < 0 ||
                            this.state.pesada.pesoconsumo <
                              this.state.pesada.pesobalanza
                          }
                          text={this.props.t('greentrz.cerrarPallet')}
                          id="cerrarPallet"
                          icon="save"
                          onPress={this.handlerCerrarPallet}
                        ></Button>
                      </Flex>
                    </GroupForm>
                  </Column>
                </Flex>
              </Column>
            </Flex>
          </Flex>

          <CSSTransition
            in={this.state.visibleGridPallets}
            timeout={200}
            classNames="alert"
            unmountOnExit
          >
            <div className={styles.modal}>
              <div className={styles.box}>
                <Flex
                  classes={styles.container}
                  width="100%"
                  height="100%"
                  direction="row"
                  wrap="wrap"
                >
                  <Column width="100%" height="30%" padding="5px">
                    <div>{this.props.t('greentrz.palletsDisponibles')}</div>
                    <Grid pallets={this.ds} status={1} />
                  </Column>
                  <Column width="100%" height="30%" padding="5px">
                    <div>{this.props.t('greentrz.palletsAUtilizar')}</div>
                    <Grid pallets={this.ds} status={2} />
                  </Column>
                </Flex>
                <Button
                  width="100%"
                  margin="10px 0"
                  visible={true}
                  styleType="success"
                  text={this.props.t('general.cerrar')}
                  id="cerrarVentana"
                  icon="close"
                  onPress={this.cerrarVentana}
                ></Button>
              </div>
            </div>
          </CSSTransition>
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

export default withTranslation()(GreenPesPrdFinalView);
