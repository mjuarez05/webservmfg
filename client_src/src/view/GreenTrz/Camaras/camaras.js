import styles from './styles.module.scss';
import React, {memo, useState, useEffect, useRef} from 'react';
import {withTranslation} from 'react-i18next';
import {CSSTransition} from 'react-transition-group';
import store from '../../../store';
import Button from '../../../components/Button';
import {Icon} from 'react-fa';
import Spinner from '../../../components/Spinner/index';
import {
  getAllPalletByPlant,
  setPositionPallet,
  getPositionPallet,
  putPositionPallet,
  deletePositionPallet,
  getPalletDesasociados,
  postPositioHistoryPallet,
  putEstadoPallet,
} from '../../../services/GreenTrz';
import {searchPalletInCamara} from '../../../services/GreenTrz';
import GreenPallet from './pallet';
import useDeepCompareEffect from 'use-deep-compare-effect';
import axios from 'axios';
import dayjs from 'dayjs';

let palletDraging = {};
// let listPallet = [];
let listPalletPasillo = [];
let listPalletAConsumir = [];
let listPalletDesasociados = [];

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Camaras = memo(
  ({
    numcam,
    planta,
    data,
    t,
    producto,
    prodfamilia,
    loading,
    setLoading,
    desde,
    hasta,
    estados,
    filtros,
    refreshCamara,
  }) => {
    const [visibleInfo, setVisibleInfo] = useState(false);
    const [
      visibleListPalletDesasociados,
      setVisibleListPalletDesasociados,
    ] = useState(false);
    const [camara, setCamara] = useState([]);
    const [pallet, setPallet] = useState(null);
    const [msg, setMsg] = useState('');
    const [position, setPosition] = useState({});

    const prevPlanta = usePrevious(planta);
    const prevData = usePrevious(data);
    const prevFiltros = usePrevious(filtros);
    const prevRefreshCamara = usePrevious(refreshCamara);

    const onDragStart = (e) => {
      palletDraging = {...e.currentTarget.dataset};
    };

    const desasociar = (e) => {
      deletePositionPallet(parseInt(e.target.dataset.id)).then(() => {
        setLoading(true);
        generateCamara();
      });
    };

    const apasillo = (e) => {
      setLoading(true);
      setVisibleInfo(false);
      putEstadoPallet(
        parseInt(e.target.dataset.numpal),
        2, // a pasillo
      )
        .then((res) => {
          setPallet(null);
          generateCamara();
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const onDrop = (e) => {
      setMsg('general.guardando');
      e.target.classList.remove(styles.draghover);
      //only drop from pasillo
      if (palletDraging.incamara === undefined) {
        setLoading(true);
        let lote = document.querySelectorAll(
          '#camara [data-position^="' +
            e.target.dataset.position.split(',')[0] +
            ',' +
            e.target.dataset.position.split(',')[1] +
            '"]',
        );
        let altura = [...lote].filter((v) => v.dataset.numpal !== undefined);
        putPositionPallet({
          idPlanta: parseInt(planta),
          numpal: parseInt(palletDraging.numpal),
          usuario: parseInt(store.getState().userid.toString()),
          fecha: dayjs().subtract(new Date().getTimezoneOffset() / 60, 'hour'),
          idCamara: data.id,
          col: parseInt(e.target.dataset.position.split(',')[1]),
          fila: parseInt(e.target.dataset.position.split(',')[0]),
          altura: altura.length + 1,
          estado: false,
          idArea: parseInt(palletDraging.area),
          id: parseInt(palletDraging.id),
        })
          .then((res) => {
            postPositioHistoryPallet({
              idPlanta: parseInt(planta),
              numpal: parseInt(palletDraging.numpal),
              usuario: parseInt(store.getState().userid.toString()),
              fecha: dayjs().subtract(
                new Date().getTimezoneOffset() / 60,
                'hour',
              ),
              idCamara: data.id,
              col: parseInt(e.target.dataset.position.split(',')[1]),
              fila: parseInt(e.target.dataset.position.split(',')[0]),
              altura: altura.length + 1,
              estado: false,
              idArea: parseInt(palletDraging.area),
            })
              .then((res) => {
                generateCamara();
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };

    const onDragLeave = (e) => {
      e.preventDefault();
      e.currentTarget.classList.remove(styles.draghover);
      e.stopPropagation();
    };

    const onDragOver = (e) => {
      e.preventDefault();
      e.currentTarget.classList.add(styles.draghover);
      e.stopPropagation();
    };

    const onDragStartPallet = (e) => {
      palletDraging = {...e.currentTarget.dataset};
    };

    const onDragLeavePallet = (e) => {
      e.preventDefault();
      e.currentTarget.classList.remove(styles.draghoverpallet);
      e.stopPropagation();
    };

    const onDragOverPallet = (e) => {
      e.preventDefault();
      e.currentTarget.classList.add(styles.draghoverpallet);
      e.stopPropagation();
    };

    const onDropPallet = (e) => {
      setLoading(true);
      setMsg('general.guardando');
      let lote = document.querySelectorAll(
        '#camara [data-position^="' +
          palletDraging.position.split(',')[0] +
          ',' +
          palletDraging.position.split(',')[1] +
          '"]',
      );
      let delPromise = [];
      putPositionPallet({
        idPlanta: parseInt(planta),
        numpal: parseInt(palletDraging.numpal),
        usuario: parseInt(store.getState().userid.toString()),
        fecha: dayjs().subtract(new Date().getTimezoneOffset() / 60, 'hour'),
        idCamara: data.id,
        col: parseInt(palletDraging.position.split(',')[1]),
        fila: parseInt(palletDraging.position.split(',')[0]),
        altura: parseInt(palletDraging.position.split(',')[2]),
        estado: true,
        idArea: parseInt(palletDraging.area),
        id: parseInt(palletDraging.id),
      })
        .then((res) => {
          postPositioHistoryPallet({
            idPlanta: parseInt(planta),
            numpal: parseInt(palletDraging.numpal),
            usuario: parseInt(store.getState().userid.toString()),
            fecha: dayjs().subtract(
              new Date().getTimezoneOffset() / 60,
              'hour',
            ),
            idCamara: data.id,
            col: parseInt(palletDraging.position.split(',')[1]),
            fila: parseInt(palletDraging.position.split(',')[0]),
            altura: parseInt(palletDraging.position.split(',')[2]),
            estado: true,
            idArea: parseInt(palletDraging.area),
          })
            .then((hres) => {
              generateCamara();
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const onClickAsociar = (e) => {
      e.stopPropagation();
      setMsg('general.guardando');
      let lote = document.querySelectorAll(
        '#camara [data-position^="' +
          position.split(',')[0] +
          ',' +
          position.split(',')[1] +
          '"]',
      );

      let altura = [...lote].filter((v) => v.dataset.numpal !== undefined);
      setPositionPallet({
        idPlanta: parseInt(planta),
        numpal: parseInt(e.target.dataset.numpal),
        usuario: parseInt(store.getState().userid.toString()),
        fecha: dayjs().subtract(new Date().getTimezoneOffset() / 60, 'hour'),
        idCamara: data.id,
        col: parseInt(position.split(',')[1]),
        fila: parseInt(position.split(',')[0]),
        altura: altura.length + 1,
        estado: false,
        idArea: parseInt(e.target.dataset.area),
      })
        .then((res) => {
          postPositioHistoryPallet({
            idPlanta: parseInt(planta),
            numpal: parseInt(e.target.dataset.numpal),
            usuario: parseInt(store.getState().userid.toString()),
            fecha: dayjs().subtract(
              new Date().getTimezoneOffset() / 60,
              'hour',
            ),
            idCamara: data.id,
            col: parseInt(position.split(',')[1]),
            fila: parseInt(position.split(',')[0]),
            altura: altura.length + 1,
            estado: false,
            idArea: parseInt(e.target.dataset.area),
          })
            .then((res) => {
              setVisibleListPalletDesasociados(false);
              generateCamara();
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const onClick = (e) => {
      e.stopPropagation();
      let lastPosition = e.target.dataset.position;
      searchPalletInCamara(
        e.target.dataset.planta,
        e.target.dataset.numpal,
      ).then((res) => {
        res.data[0].lastPosition = lastPosition;
        res.data[0].pasillo = e.target.dataset.pasillo;
        setPallet(res.data[0]);
        setVisibleInfo(true);
      });
    };

    const hoverPallet = (e) => {
      setPallet(
        listPalletDesasociados.find(
          (v) => parseInt(v.numpal) === parseInt(e.target.dataset.numpal),
        ),
      );
    };

    const onClickEmpty = (e) => {
      e.stopPropagation();
      setVisibleListPalletDesasociados(true);
      listPalletDesasociados = [];
      setPosition(e.target.dataset.position);

      getPalletDesasociados(planta, estados.map((v) => v.valor).join()).then(
        (res) => {
          listPalletDesasociados =
            data.idGrupmat !== 0
              ? res.data.filter((v) => data.idGrupmat === v.id_grpmat)
              : res.data;
          setPallet({});
        },
      );
    };

    const generateCamara = async () => {
      setMsg('greencamaras.regenerando');
      let pallets;
      let palletsInCamara;
      await getAllPalletByPlant(planta)
        .then((res) => {
          pallets = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
      await getPositionPallet(planta, data.id).then((res) => {
        if (
          producto !== '' ||
          desde !== '' ||
          hasta !== '' ||
          prodfamilia !== ''
        ) {
          let dataFiltered = res.data;
          if (producto !== '')
            dataFiltered = dataFiltered.filter(
              (v) => v.codsap === producto.toString(),
            );

          if (prodfamilia !== '')
            dataFiltered = dataFiltered.filter((v) => {
              return v.id_prdfam.toString() === prodfamilia.toString();
            });
          if (desde !== '') {
            dataFiltered = dataFiltered.filter((v) => {
              return dayjs(v.fec_prod).diff(dayjs(desde)) >= 0;
            });
          }
          if (hasta !== '') {
            dataFiltered = dataFiltered.filter((v) => {
              return dayjs(hasta).diff(dayjs(v.fec_prod)) >= 0;
            });
          }
          palletsInCamara = dataFiltered;
        } else {
          palletsInCamara = res.data;
        }

        // let palletsArray = palletsInCamara.map((v) => v.numpal);

        // listPallet = pallets.filter((v) => {
        //   return !palletsArray.includes(v.numpal.toString());
        // });

        listPalletPasillo = palletsInCamara.filter((v) => {
          return (
            v.estado === true &&
            estados.map((v) => parseInt(v.valor)).includes(v.id_estado)
          );
        });
        listPalletAConsumir = palletsInCamara.filter((v) => {
          return v.id_estado === 11;
        });

        palletsInCamara = palletsInCamara.filter((v) =>
          estados.map((v) => parseInt(v.valor)).includes(v.id_estado),
        );

        const rows = [];
        for (let r = 0; r < data.fila; r++) {
          const cols = [];
          for (let c = 1; c < data.col + 1; c++) {
            const height = [];
            if (r === 0) {
              cols.push(
                <div key={'header-c' + c} className={styles.rulerCol}>
                  {c}
                </div>,
              ); //ruler col
            } else {
              if (data.pasillo.split(',').includes(c.toString())) {
                for (let h = 1; h < data.altura + 1; h++) {
                  height.push(
                    <div
                      key={r + ',' + c + ',' + h}
                      data-position={r + ',' + c + ',' + h}
                      className={styles.disable}
                    ></div>,
                  );
                }

                cols.push(
                  <div key={c} className={styles.disable}>
                    {height}
                  </div>,
                );
              } else {
                for (let h = 1; h < data.altura + 1; h++) {
                  let p = palletsInCamara.filter((v) => {
                    return (
                      v.col === c &&
                      v.fila === r &&
                      v.altura === h &&
                      v.estado === false
                    );
                  });
                  if (p.length > 0) {
                    height.push(
                      <div
                        key={r + ',' + c + ',' + h}
                        className={
                          p[0].intervenido
                            ? styles.intervenido
                            : p[0].retenido
                            ? styles.retenido
                            : styles.cellOccupied
                        }
                        style={{
                          color: p[0].color_text,
                          backgroundColor: p[0].color_back,
                        }}
                        draggable="true"
                        onDragStart={onDragStart}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onClick={onClick}
                        data-pasillo={false}
                        data-consumo={false}
                        data-intervenido={p[0].intervenido}
                        data-retenido={p[0].retenido}
                        data-numpal={p[0].numpal}
                        data-area={p[0].id_area}
                        data-id={p[0].id}
                        data-planta={p[0].id_planta}
                        data-position={r + ',' + c + ',' + h}
                        data-incamara={true}
                      >
                        {p.length > 0 ? p[0].numpal : ''}
                      </div>,
                    );
                  } else {
                    height.push(
                      <div
                        key={r + ',' + c + ',' + h}
                        data-position={r + ',' + c + ',' + h}
                        className={styles.cellEmpty}
                        onClick={onClickEmpty}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                      ></div>,
                    );
                  }
                }
                if (c === 1)
                  cols.push(
                    <div key={'header-r' + r} className={styles.rulerRow}>
                      {r}
                    </div>,
                  ); //ruler row
                cols.push(
                  <div key={c} className={styles.column}>
                    {height}
                  </div>,
                );
              }
            }
          }
          rows.push(
            <div key={r} className={r === 0 ? styles.rulerMainCol : styles.row}>
              {cols}
            </div>,
          );
        }
        setCamara(rows);
        setLoading(false);
      });
    };

    useDeepCompareEffect(() => {
      console.log(refreshCamara, prevRefreshCamara);
      if (prevPlanta !== undefined && prevPlanta !== planta) {
        generateCamara();
      } else if (prevData !== data) {
        generateCamara();
      } else if (prevFiltros !== filtros) {
        generateCamara();
      } else if (refreshCamara !== prevRefreshCamara) {
        generateCamara();
      }
    }, [data, filtros]);

    const consumirPallet = (data) => {
      setLoading(true);
      setVisibleInfo(false);
      putEstadoPallet(
        data.numpal,
        11, // a consumir
      ).then((res) => {
        setPallet(null);
        generateCamara();
      });
    };

    const palletVendido = (data) => {
      setLoading(true);
      setVisibleInfo(false);
      putEstadoPallet(
        data.numpal,
        13, // vendido
      ).then((res) => {
        setPallet(null);
        generateCamara();
      });
    };

    return loading ? (
      <Spinner msg={t(msg)} />
    ) : (
      <div className={styles.main}>
        <div
          id="camara"
          className={[styles.container, 'section-to-print'].join(' ')}
        >
          {camara}
        </div>
        <div className={styles.lista}>
          <div className={styles.titlepallets}>
            {t('greencamaras.aconsumir')}
          </div>
          <ul className={styles.pallets}>
            {listPalletAConsumir.map((v) => (
              <li
                key={v.numpal}
                className={styles.pallet}
                data-numpal={v.numpal}
                data-area={v.id_area}
                data-planta={v.id_planta}
                data-position={v.fila + ',' + v.col + ',' + v.altura}
                data-id={v.id}
              >
                <div
                  onClick={onClick}
                  data-pasillo={false}
                  data-consumo={true}
                  data-numpal={v.numpal}
                  data-area={v.id_area}
                  data-planta={v.id_planta}
                  data-position={v.fila + ',' + v.col + ',' + v.altura}
                  data-id={v.id}
                >
                  {v.numpal}
                </div>
                <Icon
                  name="close"
                  id={'quitar-' + v.numpal}
                  className={styles.close}
                  data-id={v.id}
                  data-numpal={v.numpal}
                  onClick={(e) => apasillo(e)}
                />
              </li>
            ))}
          </ul>
          <div className={styles.titlepallets}>{t('greencamaras.pasillo')}</div>
          <ul
            className={styles.pallets}
            onDrop={onDropPallet}
            onDragOver={onDragOverPallet}
            onDragLeave={onDragLeavePallet}
          >
            {listPalletPasillo.map((v) => (
              <li
                key={v.numpal}
                draggable="true"
                onDragStart={onDragStartPallet}
                className={
                  v.intervenido
                    ? styles.intervenidoEnPasillo
                    : v.retenido
                    ? styles.retenidoEnPasillo
                    : styles.pallet
                }
                data-numpal={v.numpal}
                data-area={v.id_area}
                data-intervenido={v.intervenido}
                data-retenido={v.retenido}
                data-planta={v.id_planta}
                data-position={v.fila + ',' + v.col + ',' + v.altura}
                data-id={v.id}
              >
                <div
                  onClick={onClick}
                  data-pasillo={true}
                  data-consumo={false}
                  data-numpal={v.numpal}
                  data-intervenido={v.intervenido}
                  data-retenido={v.retenido}
                  data-area={v.id_area}
                  data-planta={v.id_planta}
                  data-position={v.fila + ',' + v.col + ',' + v.altura}
                  data-id={v.id}
                >
                  {v.numpal}
                </div>
                <Icon
                  name="close"
                  id={'quitar-' + v.numpal}
                  className={styles.close}
                  data-id={v.id}
                  onClick={(e) => desasociar(e)}
                />
              </li>
            ))}
          </ul>
        </div>
        <CSSTransition
          in={visibleInfo}
          timeout={200}
          classNames="alert"
          unmountOnExit
        >
          <div className={styles.modal}>
            <div className={styles.box}>
              <GreenPallet data={pallet}></GreenPallet>
              {pallet?.pasillo === 'true' &&
              pallet?.retenido === false &&
              pallet?.intervenido === false ? (
                <Button
                  width="100%"
                  margin="0 0 10px 0"
                  visible={true}
                  styleType="success"
                  text={t('greencamaras.consumir')}
                  id="consumir"
                  icon="hand-o-right"
                  onPress={() => {
                    consumirPallet(pallet);
                  }}
                ></Button>
              ) : null}
              {pallet?.pasillo === 'true' && pallet?.id_grpmat === 2 ? (
                <Button
                  width="100%"
                  margin="0 0 10px 0"
                  visible={true}
                  styleType="info"
                  text={t('greencamaras.vendido')}
                  id="pesar"
                  icon="usd"
                  onPress={() => {
                    palletVendido(pallet);
                  }}
                ></Button>
              ) : null}
              <Button
                width="100%"
                margin="0"
                visible={true}
                styleType="info"
                text={t('general.cerrar')}
                id="pesar"
                icon="close"
                onPress={() => {
                  setVisibleInfo(false);
                  setPallet(null);
                }}
              ></Button>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={visibleListPalletDesasociados}
          timeout={200}
          classNames="alert"
          unmountOnExit
        >
          <div className={styles.modal}>
            <div className={styles.boxDes}>
              <div className={styles.listaDes}>
                <div className={styles.titlepallets}>
                  {t('greencamaras.desasociados')}
                </div>
                <ul className={styles.listPalletsDes}>
                  {listPalletDesasociados.map((v) => (
                    <li
                      key={v.numpal}
                      onClick={onClickAsociar}
                      onMouseEnter={(e) => hoverPallet(e)}
                      className={styles.palletDes}
                      data-numpal={v.numpal}
                      data-area={v.id_area}
                      data-planta={v.id_planta}
                      data-id={v.id}
                    >
                      {v.numpal}
                    </li>
                  ))}
                </ul>
                <Button
                  width="100%"
                  margin="10px 0"
                  visible={true}
                  styleType="success"
                  text={t('general.cerrar')}
                  id="pesar"
                  icon="close"
                  onPress={() => {
                    setVisibleListPalletDesasociados(false);
                  }}
                ></Button>
              </div>
              <GreenPallet data={pallet}></GreenPallet>
            </div>
          </div>
        </CSSTransition>
      </div>
    );
  },
);

export default withTranslation()(Camaras);
