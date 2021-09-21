import styles from './styles.module.scss';
import React, {memo, useState, useEffect, useRef} from 'react';
import {
  getCamarasPorPlanta,
  getAllGreenTrzProductos,
  getProdFamilia,
} from '../../../services/GreenTrz';
import Flex from '../../../components/Flex';
import Column from '../../../components/Column';
import ComboBox from '../../../components/ComboBox';
import DatePicker from '../../../components/DatePicker';
import store from '../../../store';
import GroupForm from '../../../components/GroupForm';
import {LoaderViewError} from '../../../actions.js';
import {withTranslation} from 'react-i18next';
import {getPlantas} from '../../../services/General';
import pallet from '../../../assets/pallet.svg';
import Camaras from './camaras';
import useDeepCompareEffect from 'use-deep-compare-effect';
import Button from '../../../components/Button';
import {
  getTrxParamByPlantaAndTrx,
  checkTrxParamsNeed,
} from '../../../services/TrxParam';
// import Button from '../../../components/Button';

const PARAMS_NEEDS = ['Estados'];
const TRX = store.getState().tabList[store.getState().tabActive].id;
const DEFAULT_SELECTED = {
  planta: '',
  camara: '',
  pallets: [],
  producto: '',
  prodfamilia: '',
  prodDesde: '',
  prodHasta: '',
  estados: [],
  filtros: new Date(),
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const GreenCamaras = memo(({t}) => {
  const [ifYouCan, setIfYouCan] = useState(true);
  const [plantas, setPlantas] = useState([]);
  const [camaras, setCamaras] = useState([]);
  const [productos, setProductos] = useState([]);
  const [prodfamilia, setProdfamilia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paramsOk, setParamsOk] = useState(null);
  const [refreshCamara, setRefreshCamara] = useState(null);
  const [selected, setSelected] = useState(DEFAULT_SELECTED);

  useEffect(() => {
    getPlantas()
      .then((values) => {
        setPlantas(values.data);
      })
      .catch((error) => {
        console.error(error);
        if (error.response?.status === 401) {
          setIfYouCan(false);
        }
      });
  }, []);

  const prevData = usePrevious(selected);

  const checkTrxParams = () => {
    getTrxParamByPlantaAndTrx(selected.planta, TRX).then((res) => {
      checkTrxParamsNeed(res.data, PARAMS_NEEDS).then((result) => {
        setParamsOk(result ? result : false);
        setSelected({...selected, estados: res.data});
      });
    });
  };

  useDeepCompareEffect(() => {
    if (prevData !== undefined) {
      console.log(
        prevData.planta !== selected.planta,
        prevData.planta,
        selected.planta,
      );
      if (prevData.planta !== selected.planta) {
        if (selected.planta === '') {
          console.log('limpio');
          setCamaras([]);
          setSelected(DEFAULT_SELECTED);
        } else {
          checkTrxParams();
          getCamarasPorPlanta(selected.planta)
            .then((res) => {
              setCamaras(res.data);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
    }
  }, [selected]);

  const handlerSelectProductoChange = (e) => {
    e.stopPropagation();
    let name = e.target.name;
    let value = e.target.value;

    setSelected({...selected, [name]: value});
  };

  const handlerSelectProdFamiliaChange = (e) => {
    e.stopPropagation();
    let name = e.target.name;
    let value = e.target.value;

    setSelected({...selected, [name]: value});
  };

  const handlerSelectPlantaChange = (e) => {
    e.stopPropagation();
    let name = e.target.name;
    let value = e.target.value;
    if (value !== '') {
      getAllGreenTrzProductos(value).then((res) => {
        setProductos(res.data);
      });
      getProdFamilia(value).then((res) => {
        setProdfamilia(res.data);
      });
    }
    setSelected({...selected, [name]: value});
  };

  const onDateChange = (e) => {
    e.stopPropagation();
    let name = e.target.name;
    let value = e.target.value;
    setSelected({...selected, [name]: value});
  };

  const selectCamara = (e) => {
    e.stopPropagation();
    if (e.target.value !== '') setLoading(true);
    // setSelected({
    //   ...selected,
    //   camara: camaras.find((v) => v.id === parseInt(e.target.dataset.camaraid)),
    // });
    setSelected({
      ...selected,
      camara: e.target.value,
    });
  };

  const aplicarFiltros = () => {
    setLoading(true);
    setSelected({...selected, filtros: new Date()});
  };

  const reloadCamara = () => {
    setRefreshCamara(new Date());
  };

  const limpiarFiltros = () => {
    setLoading(true);
    setSelected({
      ...selected,
      producto: '',
      prodfamilia: '',
      prodDesde: '',
      prodHasta: '',
      filtros: new Date(),
    });
  };

  //set title page
  if (selected.camara !== '')
    if (selected.producto !== '') {
      document.title =
        'MarfrigQFWebApp - Camara ' +
        camaras.find((v) => v.id === parseInt(selected.camara))?.numcam +
        ' - Producto: ' +
        selected.producto +
        ' ' +
        productos.find((v) => v.codsap === selected.producto.toString())
          .descrMat;
    } else {
      document.title =
        'MarfrigQFWebApp - Camara ' +
        camaras.find((v) => v.id === parseInt(selected.camara))?.numcam;
    }

  return ifYouCan ? (
    paramsOk === true || paramsOk === null ? (
      <Flex direction="column" margin="0">
        <Column width="100%">
          <div className={styles.title}>
            <div className={styles.titleText}>
              {t('greencamaras.camaras')}
              <div className={styles.plantaContainer}>
                <ComboBox
                  id="planta"
                  label={t('general.planta')}
                  items={plantas}
                  itemId="id"
                  disabled={loading}
                  margin="0"
                  width="200px"
                  itemText="descripcion"
                  value={selected.planta}
                  onSelect={handlerSelectPlantaChange}
                />
                <ComboBox
                  id="camara"
                  label={t('greencamaras.camaras')}
                  items={camaras}
                  itemId="id"
                  margin="0 0 0 40px"
                  width="200px"
                  disabled={loading}
                  itemText="numcam"
                  value={selected.camara}
                  onSelect={selectCamara}
                />
                <Button
                  visible={true}
                  styleType="outline"
                  padding="0 5px"
                  border={true}
                  classes={styles.btn}
                  loading={loading}
                  disabled={loading}
                  border="0"
                  margin="0 0 0 10px"
                  padding="0 10px"
                  id="refreshCamaraButton"
                  icon="refresh"
                  onPress={reloadCamara}
                />
              </div>
            </div>
          </div>
          <div className={styles.icon}>
            <img src={pallet} alt="box"></img>
          </div>
        </Column>
        <Column width="100%" height="auto" padding="5px" margin="0 0 0 0">
          {selected.camara !== '' ? (
            <Flex direction="row" height="72px" width="100%" margin="0">
              {/* <GroupForm title={t('greencamaras.camaras')} width="50%">
              <Flex
                direction="row"
                margin="0"
                wrap="nowrap"
                overflow="auto hidden"
              >
                {camaras.map((v) => {
                  return (
                    <div
                      key={v.numcam}
                      className={[
                        styles.camaras,
                        selected.camara?.id === v.id ? styles.selected : '',
                        loading ? styles.disabled : '',
                      ].join(' ')}
                      data-camaraid={v.id}
                      onClick={selectCamara}
                    >
                      {t('greencamaras.camara') + ' ' + v.numcam}
                    </div>
                  );
                })}
              </Flex>
            </GroupForm>{' '} */}
              <GroupForm
                title={t('general.filtros')}
                width="100%"
                // margin="0 0 0 10px"
              >
                <Flex direction="row" margin="0">
                  <ComboBox
                    id="producto"
                    label={t('general.producto')}
                    items={productos}
                    itemId="codsap"
                    disabled={loading}
                    itemText={['codsap', 'descrMat']}
                    // disabled={this.state.pesando}
                    value={selected.producto}
                    onSelect={handlerSelectProductoChange}
                  />
                  <ComboBox
                    id="prodfamilia"
                    label={t('general.prodfamilia')}
                    items={prodfamilia}
                    itemId="id"
                    disabled={loading}
                    itemText={'descr'}
                    // disabled={this.state.pesando}
                    value={selected.prodfamilia}
                    onSelect={handlerSelectProdFamiliaChange}
                  />
                  <DatePicker
                    id="prodDesde"
                    type="date"
                    label={t('general.proddesde')}
                    margin={'0 0 0 10px'}
                    disabled={loading}
                    value={selected.prodDesde}
                    onChange={onDateChange}
                  />
                  <DatePicker
                    id="prodHasta"
                    type="date"
                    label={t('general.prodhasta')}
                    margin={'0 0 0 10px'}
                    disabled={loading}
                    value={selected.prodHasta}
                    onChange={onDateChange}
                  />
                  <Button
                    visible={true}
                    styleType="success"
                    border={true}
                    classes={styles.btn}
                    loading={loading}
                    disabled={loading}
                    text={t('general.aplicar')}
                    id="aplicarFiltroCamara"
                    padding="0 10px"
                    icon="filter"
                    onPress={aplicarFiltros}
                  />
                  <Button
                    visible={true}
                    styleType="outline"
                    padding="0 5px"
                    border={true}
                    classes={styles.btn}
                    loading={loading}
                    disabled={loading}
                    text={t('general.limpiar')}
                    id="limpiarFiltroCamara"
                    icon="trash"
                    onPress={limpiarFiltros}
                  />
                </Flex>
              </GroupForm>
            </Flex>
          ) : null}
          {selected.camara !== '' ? (
            <Flex
              direction="row"
              padding="0"
              height="auto"
              margin="20px 0 0 0"
              wrap="nowrap"
              width="100%"
            >
              <Column margin="0 10px 0 0" height="calc(100vh - 310px)">
                <GroupForm
                  disabled={loading}
                  height="calc(100vh - 310px)"
                  classes={loading ? styles.loading : ''}
                  title={
                    t('greencamaras.camara') +
                    ' ' +
                    camaras.find((v) => v.id === parseInt(selected.camara))
                      .numcam
                  }
                >
                  <Camaras
                    numcam={
                      camaras.find((v) => v.id === parseInt(selected.camara))
                        .numcam
                    }
                    planta={selected.planta}
                    data={camaras.find(
                      (v) => v.id === parseInt(selected.camara),
                    )}
                    producto={selected.producto}
                    prodfamilia={selected.prodfamilia}
                    desde={selected.prodDesde}
                    hasta={selected.prodHasta}
                    estados={selected.estados}
                    filtros={selected.filtros}
                    loading={loading}
                    refreshCamara={refreshCamara}
                    setLoading={setLoading}
                  ></Camaras>
                </GroupForm>
              </Column>
            </Flex>
          ) : null}
        </Column>
      </Flex>
    ) : (
      <Flex direction="columns" padding="0" margin="0" wrap="wrap">
        <Column height="100vh">
          <LoaderViewError
            icon="need_param"
            title={t('error.needParamsTitle')}
            message={t('error.needParamsExplain')}
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
          title={t('error.noAuth')}
          message={t('error.noAuthMessage')}
        />
      </Column>
    </Flex>
  );
});

export default withTranslation()(GreenCamaras);
