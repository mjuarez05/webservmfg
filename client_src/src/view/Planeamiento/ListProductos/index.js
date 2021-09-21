import React, {Component} from 'react';
import Flex from '../../../components/Flex';
import Column from '../../../components/Column';
import {
  getProductos,
  // setValueProductos
} from '../../../services/Planeamiento/Productos';
import {withTranslation} from 'react-i18next';
import i18n from 'i18next';
import {LoaderViewError} from '../../../actions.js';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ListProductosView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ifYouCan: true,
      productos: [],
      msg: '',
      wait: false,
    };
  }

  getData = () => {
    let t = this;
    getProductos()
      .then((response) => {
        t.setState({productos: response.data});
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

  // change = e => {
  //   console.log(e.target.getAttribute("row"));
  //   console.log(e.target.getAttribute("col"));
  //   console.log(e.target.textContent);
  //   setValueProductos(
  //     e.target.getAttribute("row"),
  //     e.target.getAttribute("col"),
  //     e.target.textContent
  //   ).then(response => {
  //     console.log(response.data);
  //   });
  // };

  // renderEditable = cellInfo => {
  //   return (
  //     <div
  //       col={cellInfo.column.id}
  //       row={cellInfo.row.proCod}
  //       onKeyUp={this.change}
  //       style={{
  //         backgroundColor: "#fafafa",
  //         borderBottom: "1px solid var(--primary)"
  //       }}
  //       contentEditable
  //       suppressContentEditableWarning
  //       onBlur={e => {
  //         const productos = [...this.state.productos];
  //         productos[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
  //         this.setState({ productos });
  //       }}
  //       dangerouslySetInnerHTML={{
  //         __html: this.state.productos[cellInfo.index][cellInfo.column.id]
  //       }}
  //     />
  //   );
  // };

  render() {
    return this.state.ifYouCan ? (
      <Flex direction="columns" padding="1rem" margin="0" wrap="wrap">
        <Column height="100%" padding="0" width="98%" auto={true}>
          <ReactTable
            className="-striped -highlight"
            data={this.state.productos}
            columns={[
              {
                Header: i18n.t('planeamiento.productos'),
                foldable: true,
                columns: [
                  {Header: i18n.t('planeamiento.proCod'), accessor: 'proCod'},
                  {
                    Header: i18n.t('planeamiento.proCodint'),
                    accessor: 'proCodint',
                  },
                  {
                    Header: i18n.t('planeamiento.proDorig'),
                    accessor: 'proDorig',
                    width: 400,
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proDdest'),
                    accessor: 'proDdest',
                    width: 400,
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proClasif'),
                    accessor: 'proClasif',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proTarab'),
                    accessor: 'proTarab',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proTarac'),
                    accessor: 'proTarac',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proLang'),
                    accessor: 'proLang',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proUmed'),
                    accessor: 'proUmed',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proFtoeti'),
                    accessor: 'proFtoeti',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proTraza'),
                    accessor: 'proTraza',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proDfvto'),
                    accessor: 'proDfvto',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proMcong'),
                    accessor: 'proMcong',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proUnxcaj'),
                    accessor: 'proUnxcaj',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proPesmin'),
                    accessor: 'proPesmin',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proPesmax'),
                    accessor: 'proPesmax',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proMitad'),
                    accessor: 'proMitad',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proGrms'),
                    accessor: 'proGrms',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proEstxcaj'),
                    accessor: 'proEstxcaj',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proTarae'),
                    accessor: 'proTarae',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proUnpou'),
                    accessor: 'proUnpou',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proUnical1'),
                    accessor: 'proUnical1',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proUnical2'),
                    accessor: 'proUnical2',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proCodcli'),
                    accessor: 'proCodcli',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proActivo'),
                    accessor: 'proActivo',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proPeseti'),
                    accessor: 'proPeseti',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proCodcli1'),
                    accessor: 'proCodcli1',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proPesexac'),
                    accessor: 'proPesexac',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proNsenasa'),
                    accessor: 'proNsenasa',
                    width: 200,
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proNrpe'),
                    accessor: 'proNrpe',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proTemp'),
                    accessor: 'proTemp',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proMarca'),
                    accessor: 'proMarca',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proEtqvta'),
                    accessor: 'proEtqvta',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proNomenc'),
                    accessor: 'proNomenc',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proDescnom'),
                    accessor: 'proDescnom',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proGarron'),
                    accessor: 'proGarron',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proCong'),
                    accessor: 'proCong',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proLeyenf'),
                    accessor: 'proLeyenf',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proLeycong'),
                    accessor: 'proLeycong',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proImplote'),
                    accessor: 'proImplote',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proImphora'),
                    accessor: 'proImphora',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proCmaxcte'),
                    accessor: 'proCmaxcte',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proCean'),
                    accessor: 'proCean',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proCeankb'),
                    accessor: 'proCeankb',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proEmbal'),
                    accessor: 'proEmbal',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proCalib'),
                    accessor: 'proCalib',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proPminc'),
                    accessor: 'proPminc',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proPmaxc'),
                    accessor: 'proPmaxc',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proHora'),
                    accessor: 'proHora',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proPorc'),
                    accessor: 'proPorc',
                    //Cell: this.renderEditable
                  },
                  {
                    Header: i18n.t('planeamiento.proLang1'),
                    accessor: 'proLang1',
                    //Cell: this.renderEditable
                  },
                ],
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
export default withTranslation()(ListProductosView);
