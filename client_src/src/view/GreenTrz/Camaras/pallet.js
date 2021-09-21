import React, {memo} from 'react';
import {withTranslation} from 'react-i18next';
import dayjs from 'dayjs';
import styles from './styles.module.scss';
import Spinner from '../../../components/Spinner/index';

const GreenPallet = memo(({t, data}) => {
  return data === null ? (
    <Spinner />
  ) : (
    <div className={styles.boxinfo}>
      <div className={styles.infoTitle}>Informacion del Pallet</div>
      <ul>
        <li>
          {t('greenpallet.numpal')}: <strong>{data.numpal}</strong>
        </li>
        <li>
          {t('greenpallet.idProd')}: <strong>{data.codsap}</strong>
        </li>
        <li>
          {t('greencamaras.descMatr')}: <strong>{data.descr_mat}</strong>
        </li>
        <li>
          {t('greenpallet.unidades')}: <strong>{data.unidades}</strong>
        </li>
        <li>
          {t('greenpallet.kneto')}:{' '}
          <strong>{Intl.NumberFormat('es-ES').format(data.kneto)}</strong>
        </li>
        <li>
          {t('greenpallet.kbruto')}:{' '}
          <strong>{Intl.NumberFormat('es-ES').format(data.kbruto)}</strong>
        </li>
        <li>
          {t('greenpallet.fecProd')}:{' '}
          <strong>{dayjs(data.fec_prod).format('DD/MM/YYYY')}</strong>
        </li>
        <li>
          {t('greenpallet.fecVenc')}:{' '}
          <strong>{dayjs(data.fec_venc).format('DD/MM/YYYY')}</strong>
        </li>
        {data.fecha ? (
          <li>
            {t('greenpallet.ultimomovimiento')}:{' '}
            <strong>{dayjs(data.fecha).format('DD/MM/YYYY HH:mm:ss')}</strong>
          </li>
        ) : null}

        {data.lastPosition !== undefined ? (
          <ul>
            <li>{t('greenpallet.ultimaposicion')}: </li>
            <li>
              {t('greencamaras.fila')}:{' '}
              <strong>{parseInt(data.lastPosition.split(',')[0]) + 1}</strong>
            </li>
            <li>
              {t('greencamaras.columna')}:{' '}
              <strong>{parseInt(data.lastPosition.split(',')[1]) + 1}</strong>
            </li>
            <li>
              {t('greencamaras.altura')}:{' '}
              <strong>{parseInt(data.lastPosition.split(',')[2]) + 1}</strong>
            </li>
          </ul>
        ) : null}
        <li>
          {t('greenpallet.obspallet')}: <strong>{data.obspallet}</strong>
        </li>
        <li>
          {t('greenpallet.intervenido')}:{' '}
          <strong>{data.intervenido ? 'SI' : 'NO'}</strong>
        </li>
        <li>
          {t('greenpallet.obsintervenido')}:{' '}
          <strong>{data.obsintervenido}</strong>
        </li>
        <li>
          {t('greenpallet.retenido')}:{' '}
          <strong>{data.retenido ? 'SI' : 'NO'}</strong>
        </li>
        <li>
          {t('greenpallet.obsretenido')}: <strong>{data.obsretenido}</strong>
        </li>
      </ul>
    </div>
  );
});
export default withTranslation()(GreenPallet);
