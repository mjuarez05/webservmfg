import React, {PureComponent} from 'react';
import Flex from '../../../components/Flex';
import Column from '../../../components/Column';
import Input from '../../../components/Input';
import ComboBox from '../../../components/ComboBox';
// import store from '../../../store';
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
  getGreenTrzProductosByGroup,
  getGreenTrzProducto,
  getPalletAConsumir,
  createGreenTrzAsConspalsParcial,
  createGreenTrzAsConspalsTotal,
  subscribeSocketBal,
  unsubscribeSocket,
  getLastPalletConsumoActivity,
  putEstadoPallet,
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

class GreenPesConsView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFull: false,
      ifYouCan: true,
      ifYouAddPermission: false,
      wait: false,
      habilitado: false,
      consumiendo: false,
      pesando: false,
      socketOk: true,
      pesada: {
        pallet: null,
        numpal: '',
        pesadaPlanta: '',
        pesadaPuesto: '',
        pesadaImpresora: '',
        pesadaTurno: '',
        pesadaProducto: '',
        pesobalanza: 0,
        pesadaCantidadBolsas: 0,
        palletNumero: 0,
        pesadaArea: '',
        palletPeso: '0',
        estadobalanza: '',
        pesoManual: false,
        valormanual: 0,
        horaini: null,
        horafin: null,
        lote: '-',
        producto: {},
      },
      ultimosPallet: [],
      plantas: [],
      impresoras: [],
      pallets: [],
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

  refreshPallets = () => {
    this.getLastPallets();
    this.getPallets();
  };

  getLastPallets = () => {
    getLastPalletConsumoActivity(
      this.state.pesada.pesadaPlanta,
      this.state.pesada.area,
      this.state.pesada.pesadaPuesto,
    ).then((detpal) => {
      this.setState({
        ...this.state,
        ultimosPallet: detpal.data,
      });
    });
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
          this.getLastPallets();
        }
        if (
          this.state.pesada.pesadaPlanta !== '' &&
          this.state.pesada.pesadaTurno !== '' &&
          this.state.pesada.numpal !== '' &&
          this.state.pesada.pesadaPuesto !== '' &&
          this.state.pesada.pesadaImpresora !== ''
        )
          this.setState({...this.state, habilitado: true});
      },
    );
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
        if (error.response.status === 401) {
          this.setState({ifYouCan: false});
        } else {
          this.setState();
        }
      });
  };

  getPallets = () => {
    getPalletAConsumir(this.state.pesada.pesadaPlanta).then((res) => {
      this.setState({
        ...this.state,
        pallets: res.data,
      });
    });
  };

  buscarTurnos = () => {
    axios
      .all([
        getTurnos(this.state.pesada.pesadaPlanta),
        getTrxParamByPlantaAndTrx(this.state.pesada.pesadaPlanta, TRX),
        getPalletAConsumir(this.state.pesada.pesadaPlanta),
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
                      pallets: values[2].data,
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
                          'GREENPESCONS',
                          (err, pesobalanza) => {
                            if (err !== null) {
                              this.setState({socketOk: false});
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

  handlerConsumir = () => {
    if (this.state.consumiendo) {
      putEstadoPallet(
        this.state.pesada.numpal,
        11, // a consumir
      ).then((res) => {
        this.setState({
          ...this.state,
          consumiendo: false,
          msg: this.props.t('greenpallet.ConsumoCancelado'),
          msgType: styles.success,
          pesada: {
            ...this.state.pesada,
            pesadaProducto: '',
            pallet: null,
            numpal: '',
          },
          wait: false,
        });
      });
    } else {
      putEstadoPallet(
        this.state.pesada.numpal,
        12, // consumiendo
      ).then((res) => {
        this.setState({
          ...this.state,
          consumiendo: true,
          msg: this.props.t('greenpallet.Consumiendo Pallet'),
          msgType: styles.blink,
          pesada: {
            ...this.state.pesada,
            horaini: dayjs().subtract(
              new Date().getTimezoneOffset() / 60,
              'hour',
            ),
            pesadaProducto: '',
            pallet: this.state.pallets.find(
              (v) => v.numpal === this.state.pesada.numpal,
            ),
          },
          wait: false,
        });
      });
    }
  };

  handlerCerrarPallet = () => {
    // let prod = this.state.productos.filter(
    //   (v) => v.codsap === this.state.pesada.pesadaProducto,
    // );
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
    if (
      this.state.pesada.pesadaCantidadBolsa > this.state.pesada.pallet.unidades
    ) {
      // toast.success('La Cantidad de bolsas debe ser mayor a 0', {
      //   position: toast.POSITION.TOP_LEFT,
      // });
      this.setState({
        msg: 'La Cantidad de bolsas debe ser menor a la del pallet original',
        msgType: styles.error,
      });
      return;
    }
    if (this.state.pesada.pesoManual) {
      if (
        parseInt(this.state.pesada.valormanual) >
        parseInt(this.state.pesada.pallet.kneto)
      ) {
        // toast.success('La Cantidad de bolsas debe ser mayor a 0', {
        //   position: toast.POSITION.TOP_LEFT,
        // });
        this.setState({
          msg: 'La Peso de las bolsas debe ser menor a la del pallet original',
          msgType: styles.error,
        });
        return;
      }
    } else {
      if (
        parseInt(this.state.pesada.pesobalanza) >
        parseInt(this.state.pesada.pallet.kneto)
      ) {
        // toast.success('La Cantidad de bolsas debe ser mayor a 0', {
        //   position: toast.POSITION.TOP_LEFT,
        // });
        this.setState({
          msg: 'La Peso de las bolsas debe ser menor a la del pallet original',
          msgType: styles.error,
        });
        return;
      }
    }

    createGreenTrzAsConspalsParcial(
      {
        idPlanta: parseInt(this.state.pesada.pesadaPlanta),
        idNumpal: parseInt(this.state.pesada.numpal),
        idUsuario: parseInt(store.getState().userid.toString()),
        idProducto: this.state.pesada.pesadaProducto,
        knetos: this.state.pesada.pesoManual
          ? parseFloat(this.state.pesada.valormanual)
          : parseFloat(this.state.pesada.pesobalanza),
        haper: this.state.pesada.horaini,
        hcierr: dayjs().subtract(new Date().getTimezoneOffset() / 60, 'hour'),
        cantbolsas: parseFloat(this.state.pesada.pesadaCantidadBolsas),
        idArea: parseInt(this.state.pesada.area),
      },
      7,
    )
      .then((res) => {
        // toast.success('El Pallet se cerro correctamente.!', {
        //   position: toast.POSITION.TOP_CENTER,
        // });

        this.setState(
          {
            ...this.state,
            consumiendo: false,
            pesando: false,
            numpal: '',
            msg: 'Se ha consumido pallet correctamente en forma parcial.',
            msgType: styles.success,
            pesada: {
              ...this.state.pesada,
              numpal: '',
              pallet: null,
              pesadaProducto: '',
              pesadaCantidadBolsas: 0,
              valormanual: 0,
            },
          },
          () => {
            this.getPallets();
            this.getLastPallets();
          },
        );
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
    if (name === 'pesadaCantidadBolsas') {
      this.setState({
        ...this.state,
        pesada: {
          ...this.state.pesada,
          [name]: value,
          pesobalanza: parseFloat(
            this.state.pesada.producto.pesfijo * e.target.value,
          ).toFixed(3),
        },
      });
    } else {
      this.setState({
        ...this.state,
        pesada: {
          ...this.state.pesada,
          [name]: value,
        },
      });
    }
  };

  handlerConsumoTotal = () => {
    this.setState({
      wait: true,
    });
    createGreenTrzAsConspalsTotal(
      {
        idPlanta: parseInt(this.state.pesada.pesadaPlanta),
        idNumpal: parseInt(this.state.pesada.pallet.numpal),
        idUsuario: parseInt(store.getState().userid.toString()),
        idProducto: this.state.pesada.pesadaProducto,
        knetos: parseFloat(this.state.pesada.pallet.kneto),
        haper: this.state.pesada.horaini,
        hcierr: dayjs().subtract(new Date().getTimezoneOffset() / 60, 'hour'),
        cantbolsas: parseInt(this.state.pesada.pallet.unidades),
        idArea: parseInt(this.state.pesada.area),
      },
      8,
    )
      .then((res) => {
        this.setState(
          {
            ...this.state,
            consumiendo: false,
            pesando: false,
            numpal: '',
            msg: 'Se ha consumido el total del pallet correctamente.',
            msgType: styles.success,
            pesada: {
              ...this.state.pesada,
              numpal: '',
              pallet: null,
              pesadaProducto: '',
              pesadaCantidadBolsas: 0,
              valormanual: 0,
            },
          },
          () => {
            this.getPallets();
            this.getLastPallets();
          },
        );
      })
      .catch((e) => {
        console.error(e);
      });
  };

  handlerConsumoParcial = () => {
    this.setState({
      ...this.state,
      consumiendo: true,
      pesando: true,
    });
  };

  componentWillUnmount = () => {
    console.log(this.state.pesada.pesoManual);
    if (!this.state.pesada.pesoManual) unsubscribeSocket();
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
                  {this.props.t('greentrz.consumo')}
                  <span className={styles.msg}>
                    <div className={this.state.msgType}>
                      {this.props.t(this.state.msg)}
                    </div>
                  </span>
                  <Button
                    padding="5px"
                    styleType="outline"
                    classes={styles.fullscreenBtn}
                    visible={true}
                    loading={this.state.wait}
                    disabled={this.state.consumiendo}
                    id="refreshPallets"
                    icon={'refresh'}
                    onPress={this.refreshPallets}
                  ></Button>
                  <Button
                    padding="5px"
                    styleType="outline"
                    // classes={styles.fullscreenBtn}
                    visible={true}
                    loading={this.state.wait}
                    disabled={this.state.consumiendo}
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
                    disabled={this.state.consumiendo}
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
                    disabled={this.state.consumiendo}
                    value={this.state.pesada.pesadaTurno}
                    onSelect={this.handlerSelectChange}
                  />
                  <ComboBox
                    id="pesadaPuesto"
                    label={this.props.t('general.puesto')}
                    items={this.state.puestos}
                    itemId="id"
                    itemText="valor"
                    disabled={this.state.consumiendo}
                    value={this.state.pesada.pesadaPuesto}
                    onSelect={this.handlerSelectChange}
                  />
                </Column>
                <Column width="49%" height="100%" padding="5px">
                  {/* <ComboBox
                    id="pesadaProducto"
                    label={this.props.t('general.producto')}
                    items={this.state.productos}
                    itemId="codsap"
                    itemText={['codsap', 'descrMat']}
                    disabled={this.state.pesando}
                    value={this.state.pesada.pesadaroducto}
                    onSelect={this.handlerSelectChange}
                  /> */}
                  <ComboBox
                    id="pesadaImpresora"
                    label={this.props.t('general.impresora')}
                    items={this.state.impresoras}
                    itemId="id"
                    itemText="valor"
                    disabled={this.state.consumiendo}
                    value={this.state.pesada.pesadaImpresora}
                    onSelect={this.handlerSelectChange}
                  />
                  <ComboBox
                    id="numpal"
                    label={this.props.t('greenpallet.numpal')}
                    items={this.state.pallets}
                    itemId="numpal"
                    itemText="numpal"
                    disabled={this.state.consumiendo}
                    value={this.state.pesada.numpal}
                    onSelect={this.handlerSelectChange}
                  />
                  {/* <Input
                    id="numpal"
                    type="number"
                    disabled={this.state.consumiendo}
                    value={this.state.pesada.numpal}
                    whenKeyPress={this.handleKeyPress}
                    onChange={this.handlerInputChange}
                    label={this.props.t('greenpallet.numpal')}
                  /> */}
                  <Button
                    width="100%"
                    margin="0"
                    visible={true}
                    styleType="success"
                    loading={this.state.wait}
                    disabled={!this.state.habilitado}
                    text={
                      !this.state.consumiendo
                        ? this.props.t('greentrz.consumir')
                        : this.props.t('greentrz.cancelarConsumo')
                    }
                    id="pesar"
                    icon={this.state.pesando ? 'stop' : 'play'}
                    onPress={this.handlerConsumir}
                  ></Button>
                </Column>
              </GroupForm>
            </Column>
            <Flex
              classes={styles.container}
              width="100%"
              height="calc(100% - 20rem)"
              direction="row"
            >
              <Column width="50%" height="auto" padding="5px">
                <GroupForm
                  title={this.props.t('greentrz.UltimosPalletConsumido')}
                  columns={true}
                  disabled={!this.state.consumiendo}
                  height="100%"
                  //disabled={!this.state.pesando}
                  classes={styles.groupPesada}
                >
                  <ul className={styles.listaPallet}>
                    {this.state.ultimosPallet.map((v) => {
                      return (
                        <li key={v.idNumpal}>
                          {v.idNumpal}
                          <small>
                            {' '}
                            -{' '}
                            <Moment format="DD/MM/YYYY HH:mm:ss">
                              {v.fechorPes}
                            </Moment>
                          </small>
                          <b>
                            {v.idProducto} - {v.cantbolsas} bolsas. {v.knetos}kg
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
                  <Column width="100%" height="70%" padding="5px">
                    <GroupForm
                      height="100%"
                      title={this.props.t('greentrz.PesadaActual')}
                      classes={styles.group}
                      disabled={!this.state.consumiendo}
                    >
                      <Flex
                        classes={styles.container}
                        width="100%"
                        height="33%"
                        direction="row"
                        wrap="wrap"
                      >
                        <Column width="50%" height="auto">
                          <div className={styles.numPallet}>
                            PALLET N°
                            <div>
                              {this.state.pesada.pallet
                                ? this.state.pesada.pallet.numpal
                                : '-'}
                            </div>
                          </div>
                        </Column>
                        <Column width="50%" height="auto">
                          <div className={styles.numPallet}>
                            LOTE N°
                            <div>
                              {this.state.pesada.pallet
                                ? this.state.pesada.pallet.lote
                                : '-'}
                            </div>
                          </div>
                        </Column>
                        <Column width="100%" height="auto">
                          <div className={styles.producto}>
                            PRODUCTO
                            <div>
                              {this.state.pesada.pallet
                                ? this.state.pesada.pallet.descr_mat
                                : '-'}
                            </div>
                          </div>
                        </Column>
                      </Flex>

                      <Flex
                        classes={styles.container}
                        width="100%"
                        height="33%"
                        direction="row"
                      >
                        <Column width="50%" height="auto">
                          <div className={styles.detalleBolsas}>
                            {this.props.t('greentrz.pesototal')}
                            <div>
                              {this.state.pesada.pallet
                                ? this.state.pesada.pallet.kneto
                                : '-'}{' '}
                              Kg.
                            </div>
                          </div>
                        </Column>
                        <Column width="50%" height="auto">
                          <div className={styles.detalleBolsas}>
                            {this.props.t('greentrz.cantcajas')}
                            <div>
                              {this.state.pesada.pallet
                                ? this.state.pesada.pallet.unidades
                                : '-'}{' '}
                              Cajas.
                            </div>
                          </div>
                        </Column>
                      </Flex>
                      <Flex
                        classes={styles.container}
                        width="100%"
                        height="33%"
                        direction="row"
                        wrap="wrap"
                      >
                        <ComboBox
                          id="pesadaProducto"
                          label={this.props.t('general.producto')}
                          items={this.state.productos}
                          itemId="codsap"
                          itemText={['codsap', 'descrMat']}
                          value={this.state.pesada.pesadaProducto}
                          onSelect={this.handlerSelectChange}
                          width="100%"
                        />
                        <Column width="100%" height="auto">
                          <Button
                            width="50%"
                            margin="0"
                            visible={true}
                            styleType="success"
                            loading={this.state.wait}
                            text={this.props.t('greentrz.consumoTotal')}
                            id="pesar"
                            icon="play"
                            disabled={this.state.pesada.pesadaProducto === ''}
                            onPress={this.handlerConsumoTotal}
                          ></Button>
                          <Button
                            width="50%"
                            margin="0"
                            visible={true}
                            loading={this.state.wait}
                            text={this.props.t('greentrz.consumoParcial')}
                            id="pesar"
                            icon="pause"
                            disabled={this.state.pesada.pesadaProducto === ''}
                            onPress={this.handlerConsumoParcial}
                          ></Button>
                        </Column>
                      </Flex>
                    </GroupForm>
                  </Column>
                  <Column width="100%" height="30%" padding="5px">
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
                      <Flex
                        classes={styles.container}
                        width="100%"
                        height="auto"
                        direction="row"
                      >
                        <Column width="50%" height="auto">
                          <div className={styles.detalleBolsas}>
                            <Input
                              id="pesadaCantidadBolsas"
                              label={this.props.t('greentrz.cantbolasa')}
                              type="number"
                              min="0"
                              max={
                                parseFloat(this.state.pesada.pallet?.unidades) -
                                1
                              }
                              value={this.state.pesada.pesadaCantidadBolsas}
                              onChange={this.handlerInputChange}
                            />
                          </div>
                        </Column>
                        <Column
                          width="50%"
                          height="auto"
                          classes={styles.pesada}
                        >
                          <div className={styles.peso}>
                            {this.state.pesada.pesoManual ? (
                              <div className={styles.valormanual}>
                                <Input
                                  id="valormanual"
                                  type="number"
                                  min="0"
                                  max={
                                    parseFloat(
                                      this.state.pesada.pallet?.kneto,
                                    ) - 1
                                  }
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
                                ></Input>
                                <span>kg</span>
                              </div>
                            ) : (
                              <div>{this.state.pesada.pesobalanza} kg</div>
                            )}
                          </div>
                        </Column>
                      </Flex>
                      <Button
                        width="100%"
                        heigh="100%"
                        visible={true}
                        styleType="success"
                        loading={this.state.wait}
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

export default withTranslation()(GreenPesConsView);
