import React, {PureComponent, memo} from 'react';
import Flex from '../../../components/Flex';
import Column from '../../../components/Column';
import {getGreenTrxAllPalletByDay} from '../../../services/GreenTrz';
import {withTranslation} from 'react-i18next';
import {LoaderViewError} from '../../../actions.js';
import 'react-table/react-table.css';
import styles from './styles.module.scss';
import Button from '../../../components/Button';
import dayjs from 'dayjs';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
// Dictionaries for German and Russian languages
import esMessages from 'devextreme/localization/messages/es.json';
import enMessages from 'devextreme/localization/messages/en.json';
import {locale, loadMessages} from 'devextreme/localization';
import store from '../../../store';
import DataGrid, {
  // Scrolling,
  Sorting,
  Grouping,
  Pager,
  Paging,
  FilterRow,
  ColumnChooser,
  Summary,
  TotalItem,
  GroupItem,
  ColumnFixing,
  Export,
  LoadPanel,
  ValueFormat,
  GroupPanel,
  HeaderFilter,
  SearchPanel,
  Column as Col,
} from 'devextreme-react/data-grid';

const columns = (t) => {
  return [
    {
      caption: t('greenpallet.numpal'),
      dataField: 'numpal',
      dataType: 'number',
      fixed: true,
    },
    {
      caption: t('greenpallet.idProd'),
      dataField: 'id_prod',
      dataType: 'number',
      fixed: false,
    },
    {
      caption: t('greenpallet.descrMat'),
      dataField: 'descr_mat',
      fixed: false,
    },
    {
      caption: t('greenpallet.idFamilia'),
      dataField: 'id',
      dataType: 'number',
      fixed: false,
    },
    {
      caption: t('greenpallet.descFamilia'),
      dataField: 'descr',
      fixed: false,
    },
    {
      caption: t('greenpallet.idPlanta'),
      dataField: 'id_planta',
      dataType: 'number',
      fixed: false,
    },
    {
      caption: t('greenpallet.idArea'),
      dataField: 'id_area',
      dataType: 'number',
      fixed: false,
    },
    {
      caption: t('greenpallet.ptoPes'),
      dataField: 'pto_pes',
      dataType: 'number',
      fixed: false,
    },
    {
      caption: t('greenpallet.fechorPes'),
      dataField: 'fechoe_pes',
      dataType: 'date',
      format: 'dd/MM/yyyy',
      fixed: false,
    },
    {
      caption: t('greenpallet.idTurno'),
      dataField: 'id_turno',
      dataType: 'number',
      fixed: false,
    },
    {
      caption: t('greenpallet.unidades'),
      dataField: 'unidades',
      dataType: 'number',
      fixed: false,
    },
    {
      caption: t('greenpallet.taraPal'),
      dataField: 'tara_pal',
      dataType: 'number',
      fixed: false,
    },
    {
      caption: t('greenpallet.taraBolsa'),
      dataField: 'tara_bolsa',
      dataType: 'number',
      fixed: false,
    },
    {
      caption: t('greenpallet.kneto'),
      dataField: 'kneto',
      dataType: 'number',
      fixed: false,
    },
    {
      caption: t('greenpallet.kbruto'),
      dataField: 'kbruto',
      dataType: 'number',
      fixed: false,
    },
    {
      caption: t('greenpallet.fecProd'),
      dataField: 'fec_prod',
      dataType: 'date',
      format: 'dd/MM/yyyy',
      fixed: false,
    },
    {
      caption: t('greenpallet.fecCong'),
      dataField: 'fec_cong',
      dataType: 'date',
      format: 'dd/MM/yyyy',
    },
    {
      caption: t('greenpallet.fecVenc'),
      dataField: 'fec_venc',
      dataType: 'date',
      format: 'dd/MM/yyyy',
      fixed: false,
    },
    {
      caption: t('greenpallet.idUsuario'),
      dataField: 'id_usuario',
      fixed: false,
    },
    {
      caption: t('greenpallet.lote'),
      dataField: 'lote',
      fixed: false,
    },
    {
      caption: t('greenpallet.horAper'),
      dataField: 'hora_aper',
      dataType: 'datetime',
      format: 'HH:mm:ss',
      fixed: false,
    },
    {
      caption: t('greenpallet.horaCierre'),
      dataField: 'hora_cierre',
      dataType: 'datetime',
      format: 'HH:mm:ss',
      fixed: false,
    },
    {
      caption: t('greenpallet.idEstado'),
      dataField: 'descr',
      fixed: false,
    },
    {
      caption: t('greenpallet.obspallet'),
      dataField: 'obspallet',
      fixed: false,
    },
    {
      caption: t('greenpallet.intervenido'),
      dataField: 'intervenido',
      dataType: 'boolean',
      fixed: false,
    },
    {
      caption: t('greenpallet.obsintervenido'),
      dataField: 'obsintervenido',
      fixed: false,
    },
    {
      caption: t('greenpallet.retenido'),
      dataField: 'retenido',
      dataType: 'boolean',
      fixed: false,
    },
    {
      caption: t('greenpallet.obsretenido'),
      dataField: 'obsretenido',
      fixed: false,
    },
  ];
};

const ds = new DataSource({
  store: new CustomStore({
    key: 'numpal',

    load: function (loadOptions) {
      return getGreenTrxAllPalletByDay(
        1041,
        dayjs('1790-01-01').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD'),
      )
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log('error', err);
        });
    },
  }),
  sort: [{selector: 'numpal', desc: true}],
});

class ListPalletView extends PureComponent {
  constructor(props) {
    super(props);
    loadMessages(enMessages);
    loadMessages(esMessages);
    locale(store.getState().lang);

    this.state = {
      ifYouCan: true,
      wait: true,
      pallets: [],
    };
  }

  refreshPallets = () => {
    // this.getData();

    ds.reload();
  };

  render() {
    return this.state.ifYouCan ? (
      <Flex direction="row" padding="0" margin="0" wrap="wrap">
        <Column width="100%" height="77px">
          <div className={styles.title}>
            <div className={styles.titleText}>
              {this.props.t('greenpallet.listarPallet')}
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
          </div>
        </Column>
        <Column width="100%" padding="10px" height="calc(100vh - 183px)">
          <DataGrid
            dataSource={ds}
            // defaultColumns={columns}
            columnMinWidth={50}
            columnAutoWidth={true}
            height="100%"
            showBorders={false}
          >
            <ColumnChooser enabled={true} />
            <ColumnFixing enabled={true} />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <SearchPanel visible={true} width={240} placeholder="Buscar..." />
            <Grouping autoExpandAll={false} />
            <GroupPanel visible={true} />
            {/* <Scrolling mode="virtual" columnRenderingMode="virtual" /> */}
            <Sorting mode="multiple" />

            {columns(this.props.t).map((v, i) => {
              return (
                <Col
                  key={v.dataField + i}
                  dataField={v.dataField}
                  caption={v.caption}
                  dataType={v.dataType ? v.dataType : null}
                  format={v.format ? v.format : null}
                  fixed={v.fixed}
                />
              );
            })}

            <LoadPanel enabled={true} />
            <Paging enabled={true} defaultPageSize={25} />
            <Pager
              visible={true}
              showInfo={true}
              showPageSizeSelector={true}
              allowedPageSizes={[25, 50, 100, 200]}
            />
            <Export enabled={true} allowExportSelectedData={true} />
            <Summary>
              <TotalItem column="numpal" summaryType="count">
                <ValueFormat type="decimal" />
              </TotalItem>

              <TotalItem column="kneto" summaryType="sum">
                <ValueFormat type="fixedPoint" precision={3} />
              </TotalItem>
              <TotalItem column="kbruto" summaryType="sum">
                <ValueFormat type="fixedPoint" precision={3} />
              </TotalItem>

              <GroupItem column="numpal" summaryType="count">
                <ValueFormat type="fixedPoint" />
              </GroupItem>

              <GroupItem column="kneto" summaryType="sum">
                <ValueFormat type="fixedPoint" precision={3} />
              </GroupItem>
            </Summary>
          </DataGrid>
        </Column>
      </Flex>
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
export default withTranslation()(memo(ListPalletView));
