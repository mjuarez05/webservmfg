import React, {Component} from 'react';
import Input from '../../../components/Input';
import {withTranslation} from 'react-i18next';
import Flex from '../../../components/Flex';
import styles from './styles.module.scss';
import Column from '../../../components/Column';
import Button from '../../../components/Button';
import GroupForm from '../../../components/GroupForm';

import ComboBox from '../../../components/ComboBox';
import {createProducto} from '../../../services/Planeamiento/Productos';
import {LoaderViewError} from '../../../actions.js';

class AddProductosView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ifYouCan: true,
      producto: {
        proCod: '',
        proCodint: '',
        proDorig: '',
        proDdest: '',
        proClasif: '',
        proTarab: '0.000',
        proTarac: '0.000',
        proLang: '0',
        proUmed: '0',
        proFtoeti: '0',
        proTraza: false,
        proDfvto: '0',
        proMcong: '0',
        proUnxcaj: '0',
        proPesmin: '0.00',
        proPesmax: '0.00',
        proMitad: '0',
        proGrms: '0',
        proEstxcaj: '0',
        proTarae: '0.000',
        proUnpou: '0',
        proUnical1: '0',
        proUnical2: '0',
        proCodcli: null,
        proActivo: true,
        proPeseti: false,
        proCodcli1: null,
        proPesexac: '0.00',
        proNsenasa: null,
        proNrpe: null,
        proTemp: null,
        proMarca: null,
        proEtqvta: false,
        proNomenc: null,
        proDescnom: null,
        proGarron: false,
        proCong: false,
        proLeyenf: null,
        proLeycong: null,
        proImplote: false,
        proImphora: false,
        proCmaxcte: null,
        proCean: '311',
        proCeankb: null,
        proEmbal: null,
        proCalib: false,
        proPminc: '0.000',
        proPmaxc: '0.000',
        proHora: false,
        proPorc: null,
        proLang1: null,
      },
      msg: '',
      wait: false,
    };
  }

  handlerInputChange = (event) => {
    let newProducto = {
      ...this.state.producto,
      [event.target.name]: event.target.value,
    };
    this.setState({producto: newProducto});
  };

  handlerCancelAddProduct = () => {
    this.setState({
      producto: {
        proCod: '',
        proCodint: '',
        proDorig: '',
        proDdest: '',
        proClasif: '',
        proTarab: '0.000',
        proTarac: '0.000',
        proLang: '0',
        proUmed: '0',
        proFtoeti: '0',
        proTraza: false,
        proDfvto: '0',
        proMcong: '0',
        proUnxcaj: '0',
        proPesmin: '0.00',
        proPesmax: '0.00',
        proMitad: '0',
        proGrms: '0',
        proEstxcaj: '0',
        proTarae: '0.000',
        proUnpou: '0',
        proUnical1: '0',
        proUnical2: '0',
        proCodcli: null,
        proActivo: true,
        proPeseti: false,
        proCodcli1: null,
        proPesexac: '0.00',
        proNsenasa: null,
        proNrpe: null,
        proTemp: null,
        proMarca: null,
        proEtqvta: false,
        proNomenc: null,
        proDescnom: null,
        proGarron: false,
        proCong: false,
        proLeyenf: null,
        proLeycong: null,
        proImplote: false,
        proImphora: false,
        proCmaxcte: null,
        proCean: '311',
        proCeankb: null,
        proEmbal: null,
        proCalib: false,
        proPminc: '0.000',
        proPmaxc: '0.000',
        proHora: false,
        proPorc: null,
        proLang1: null,
      },
    });
  };

  handlerAddProduct = () => {
    createProducto(this.state.producto)
      .then((response) => {
        console.log(response.data);
        this.setState(
          {
            msg: this.props.t('planeamiento.productoCreadoOk'),
          },
          () => {
            this.handlerCancelAddProduct();
          },
        );
      })
      .catch((error) => {
        console.error(error.response);
        this.setState({
          msg:
            error.response !== undefined
              ? this.props.t(
                  'planeamiento.' + error.response.data.error.message,
                )
              : this.props.t('planeamiento.error'),
        });
      });
  };

  handlerSelectChange = (e) => {
    this.setState({
      producto: {...this.state.producto, [e.target.name]: e.target.value},
    });
  };

  render() {
    return this.state.ifYouCan ? (
      <Flex direction="row" padding="0" margin="0" wrap="wrap">
        <Column width="100vw">
          <div className={styles.title}>
            <div className={styles.titleText}>
              {this.props.t('planeamiento.nuevoProducto')}
            </div>
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
        <GroupForm
          title={this.props.t('planeamiento.Codificacion')}
          margin="0 0 20px 0"
        >
          <Flex direction="row" padding="0" margin="0" wrap="wrap">
            <Column width="20%" padding="5px" classes={styles.detail}>
              <span className="fa-stack fa-lg">
                <i
                  className={
                    'fa fa-circle fa-stack-2x fa-inverse ' + styles.shadow
                  }
                />
                <i className="fa fa-cube fa-stack-1x " />
              </span>
              <div>
                {this.props.t(
                  'planeamiento.Codificaciones y descripcion general del producto',
                )}
              </div>
            </Column>
            <Column width="80%" padding="5px">
              <Flex direction="row" padding="0" margin="0" wrap="wrap">
                <Column width="20%" padding="5px">
                  <Input
                    id="proCod"
                    label={this.props.t('planeamiento.proCod')}
                    value={this.state.producto.proCod}
                    onChange={this.handlerInputChange}
                    type="text"
                    maxlength="14"
                    size="14"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proCodint"
                    label={this.props.t('planeamiento.proCodint')}
                    type="text"
                    value={this.state.producto.proCodint}
                    onChange={this.handlerInputChange}
                    maxlength="9"
                    size="9"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <ComboBox
                    id="proActivo"
                    label={this.props.t('planeamiento.proActivo')}
                    items={[
                      {id: true, name: this.props.t('general.si')},
                      {id: false, name: this.props.t('general.no')},
                    ]}
                    itemId="id"
                    itemText="name"
                    value={this.state.producto.proActivo}
                    onSelect={this.handlerSelectChange}
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proClasif"
                    label={this.props.t('planeamiento.proClasif')}
                    type="text"
                    value={this.state.producto.proClasif}
                    onChange={this.handlerInputChange}
                    maxlength="30"
                    size="30"
                  />
                </Column>
                <Column width="100%" padding="5px">
                  <Input
                    id="proDorig"
                    label={this.props.t('planeamiento.proDorig')}
                    type="text"
                    value={this.state.producto.proDorig}
                    onChange={this.handlerInputChange}
                    maxlength="50"
                    size="50"
                  />
                </Column>

                <Column width="100%" padding="5px">
                  <Input
                    id="proDdest"
                    label={this.props.t('planeamiento.proDdest')}
                    type="text"
                    value={this.state.producto.proDdest}
                    onChange={this.handlerInputChange}
                    maxlength="50"
                    size="50"
                  />
                </Column>
              </Flex>
            </Column>
          </Flex>
        </GroupForm>

        <GroupForm
          title={this.props.t('planeamiento.Etiqueta')}
          width="100%"
          margin="0 0 20px 0"
        >
          <Flex direction="row" padding="0" margin="0" wrap="wrap">
            <Column width="20%" padding="5px" classes={styles.detail}>
              <span className="fa-stack fa-lg">
                <i
                  className={
                    'fa fa-circle fa-stack-2x fa-inverse ' + styles.shadow
                  }
                />
                <i className="fa fa-ticket fa-stack-1x " />
              </span>
              <div>
                {this.props.t(
                  'planeamiento.Especificaciones de etiqueta e impresiones',
                )}
              </div>
            </Column>
            <Column width="80%" padding="5px">
              <Flex direction="row" padding="0" margin="0" wrap="wrap">
                <Column width="20%" padding="5px">
                  <Input
                    id="proLang"
                    label={this.props.t('planeamiento.proLang')}
                    type="text"
                    value={this.state.producto.proLang}
                    onChange={this.handlerInputChange}
                    maxlength="2"
                    size="2"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <ComboBox
                    id="proEtqvta"
                    label={this.props.t('planeamiento.proEtqvta')}
                    items={[
                      {id: true, name: this.props.t('general.si')},
                      {id: false, name: this.props.t('general.no')},
                    ]}
                    itemId="id"
                    itemText="name"
                    value={this.state.producto.proEtqvta}
                    onSelect={this.handlerSelectChange}
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proFtoeti"
                    label={this.props.t('planeamiento.proFtoeti')}
                    type="text"
                    value={this.state.producto.proFtoeti}
                    onChange={this.handlerInputChange}
                    maxlength="2"
                    size="2"
                  />
                </Column>

                <Column width="20%" padding="5px">
                  <ComboBox
                    id="proImplote"
                    label={this.props.t('planeamiento.proImplote')}
                    items={[
                      {id: true, name: this.props.t('general.si')},
                      {id: false, name: this.props.t('general.no')},
                    ]}
                    itemId="id"
                    itemText="name"
                    onSelect={this.handlerSelectChange}
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <ComboBox
                    id="proImphora"
                    label={this.props.t('planeamiento.proImphora')}
                    items={[
                      {id: true, name: this.props.t('general.si')},
                      {id: false, name: this.props.t('general.no')},
                    ]}
                    itemId="id"
                    itemText="name"
                    onSelect={this.handlerSelectChange}
                  />
                </Column>
              </Flex>
            </Column>
          </Flex>
        </GroupForm>

        <GroupForm
          title={this.props.t('planeamiento.Especificaciones')}
          margin="0 0 20px 0"
        >
          <Flex direction="row" padding="0" margin="0" wrap="wrap">
            <Column width="20%" padding="5px" classes={styles.detail}>
              <span className="fa-stack fa-lg">
                <i
                  className={
                    'fa fa-circle fa-stack-2x fa-inverse ' + styles.shadow
                  }
                />
                <i className="fa fa-table fa-stack-1x " />
              </span>
              <div>
                {this.props.t('planeamiento.Especificaciones generales')}
              </div>
            </Column>
            <Column width="80%" padding="5px">
              <Flex direction="row" padding="0" margin="0" wrap="wrap">
                <Column width="20%" padding="5px">
                  <ComboBox
                    id="proTraza"
                    label={this.props.t('planeamiento.proTraza')}
                    items={[
                      {id: true, name: this.props.t('general.si')},
                      {id: false, name: this.props.t('general.no')},
                    ]}
                    itemId="id"
                    itemText="name"
                    onSelect={this.handlerSelectChange}
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proUmed"
                    label={this.props.t('planeamiento.proUmed')}
                    type="text"
                    value={this.state.producto.proUmed}
                    onChange={this.handlerInputChange}
                    maxlength="2"
                    size="2"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proDfvto"
                    label={this.props.t('planeamiento.proDfvto')}
                    type="number"
                    value={this.state.producto.proDfvto}
                    onChange={this.handlerInputChange}
                    step="0.0001"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proMcong"
                    label={this.props.t('planeamiento.proMcong')}
                    type="number"
                    value={this.state.producto.proMcong}
                    onChange={this.handlerInputChange}
                    step="0.0001"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proUnxcaj"
                    label={this.props.t('planeamiento.proUnxcaj')}
                    type="number"
                    value={this.state.producto.proUnxcaj}
                    onChange={this.handlerInputChange}
                    step="0.01"
                  />
                </Column>

                <Column width="20%" padding="5px">
                  <Input
                    id="proMitad"
                    label={this.props.t('planeamiento.proMitad')}
                    type="number"
                    value={this.state.producto.proMitad}
                    onChange={this.handlerInputChange}
                    step="0.01"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proEstxcaj"
                    label={this.props.t('planeamiento.proEstxcaj')}
                    type="number"
                    value={this.state.producto.proEstxcaj}
                    onChange={this.handlerInputChange}
                    step="0.01"
                  />
                </Column>

                <Column width="20%" padding="5px">
                  <Input
                    id="proUnpou"
                    label={this.props.t('planeamiento.proUnpou')}
                    type="number"
                    value={this.state.producto.proUnpou}
                    onChange={this.handlerInputChange}
                    step="0.01"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proUnical1"
                    label={this.props.t('planeamiento.proUnical1')}
                    type="number"
                    value={this.state.producto.proUnical1}
                    onChange={this.handlerInputChange}
                    step="0.01"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proUnical2"
                    label={this.props.t('planeamiento.proUnical2')}
                    type="number"
                    value={this.state.producto.proUnical2}
                    onChange={this.handlerInputChange}
                    step="0.01"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proCodcli"
                    label={this.props.t('planeamiento.proCodcli')}
                    type="text"
                    value={this.state.producto.proCodcli}
                    onChange={this.handlerInputChange}
                    maxlength="9"
                    size="9"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proCodcli1"
                    label={this.props.t('planeamiento.proCodcli1')}
                    type="text"
                    value={this.state.producto.proCodcli1}
                    onChange={this.handlerInputChange}
                    maxlength="5"
                    size="5"
                  />
                </Column>

                <Column width="60%" padding="5px">
                  <Input
                    id="proNsenasa"
                    label={this.props.t('planeamiento.proNsenasa')}
                    type="text"
                    value={this.state.producto.proNsenasa}
                    onChange={this.handlerInputChange}
                    maxlength="30"
                    size="30"
                  />
                </Column>
                <Column width="40%" padding="5px">
                  <Input
                    id="proNrpe"
                    label={this.props.t('planeamiento.proNrpe')}
                    type="text"
                    value={this.state.producto.proNrpe}
                    onChange={this.handlerInputChange}
                    maxlength="25"
                    size="25"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proTemp"
                    label={this.props.t('planeamiento.proTemp')}
                    type="text"
                    value={this.state.producto.proTemp}
                    onChange={this.handlerInputChange}
                    maxlength="40"
                    size="40"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proMarca"
                    label={this.props.t('planeamiento.proMarca')}
                    type="text"
                    value={this.state.producto.proMarca}
                    onChange={this.handlerInputChange}
                    maxlength="2"
                    size="2"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proNomenc"
                    label={this.props.t('planeamiento.proNomenc')}
                    type="text"
                    value={this.state.producto.proNomenc}
                    onChange={this.handlerInputChange}
                    maxlength="10"
                    size="10"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proDescnom"
                    label={this.props.t('planeamiento.proDescnom')}
                    type="text"
                    value={this.state.producto.proDescnom}
                    onChange={this.handlerInputChange}
                    maxlength="40"
                    size="40"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <ComboBox
                    id="proGarron"
                    label={this.props.t('planeamiento.proGarron')}
                    items={[
                      {id: true, name: this.props.t('general.si')},
                      {id: false, name: this.props.t('general.no')},
                    ]}
                    itemId="id"
                    itemText="name"
                    value={this.state.producto.proGarron}
                    onSelect={this.handlerSelectChange}
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <ComboBox
                    id="proCong"
                    label={this.props.t('planeamiento.proCong')}
                    items={[
                      {id: true, name: this.props.t('general.si')},
                      {id: false, name: this.props.t('general.no')},
                    ]}
                    itemId="id"
                    itemText="name"
                    value={this.state.producto.proCong}
                    onSelect={this.handlerSelectChange}
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proLeyenf"
                    label={this.props.t('planeamiento.proLeyenf')}
                    type="text"
                    value={this.state.producto.proLeyenf}
                    onChange={this.handlerInputChange}
                    maxlength="30"
                    size="30"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proLeycong"
                    label={this.props.t('planeamiento.proLeycong')}
                    type="text"
                    value={this.state.producto.proLeycong}
                    onChange={this.handlerInputChange}
                    maxlength="30"
                    size="30"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proCmaxcte"
                    label={this.props.t('planeamiento.proCmaxcte')}
                    type="number"
                    value={this.state.producto.proCmaxcte}
                    onChange={this.handlerInputChange}
                    step="0.001"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proCean"
                    label={this.props.t('planeamiento.proCean')}
                    type="text"
                    value={this.state.producto.proCean}
                    onChange={this.handlerInputChange}
                    maxlength="20"
                    size="20"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proCeankb"
                    label={this.props.t('planeamiento.proCeankb')}
                    type="number"
                    value={this.state.producto.proCeankb}
                    onChange={this.handlerInputChange}
                    step="0.0000007"
                    max="99"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proEmbal"
                    label={this.props.t('planeamiento.proEmbal')}
                    type="number"
                    value={this.state.producto.proEmbal}
                    onChange={this.handlerInputChange}
                    step="0.000000001"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <ComboBox
                    id="proCalib"
                    label={this.props.t('planeamiento.proCalib')}
                    items={[
                      {id: true, name: this.props.t('general.si')},
                      {id: false, name: this.props.t('general.no')},
                    ]}
                    itemId="id"
                    itemText="name"
                    onSelect={this.handlerSelectChange}
                  />
                </Column>

                <Column width="20%" padding="5px">
                  <ComboBox
                    id="proHora"
                    label={this.props.t('planeamiento.proHora')}
                    items={[
                      {id: true, name: this.props.t('general.si')},
                      {id: false, name: this.props.t('general.no')},
                    ]}
                    itemId="id"
                    itemText="name"
                    onSelect={this.handlerSelectChange}
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proPorc"
                    label={this.props.t('planeamiento.proPorc')}
                    type="number"
                    value={this.state.producto.proPorc}
                    onChange={this.handlerInputChange}
                    step="0.0004"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proLang1"
                    label={this.props.t('planeamiento.proLang1')}
                    type="text"
                    value={this.state.producto.proLang1}
                    onChange={this.handlerInputChange}
                    maxlength="2"
                    size="2"
                  />
                </Column>
              </Flex>
            </Column>
          </Flex>
        </GroupForm>

        <GroupForm
          title={this.props.t('planeamiento.Pesajes')}
          margin="0 0 20px 0"
        >
          <Flex direction="row" padding="0" margin="0" wrap="wrap">
            <Column width="20%" padding="5px" classes={styles.detail}>
              <span className="fa-stack fa-lg">
                <i
                  className={
                    'fa fa-circle fa-stack-2x fa-inverse ' + styles.shadow
                  }
                />
                <i className="fa fa-balance-scale fa-stack-1x " />
              </span>
              <div>
                {this.props.t(
                  'planeamiento.Especificaciones sobre pesos y taras',
                )}
              </div>
            </Column>
            <Column width="80%" padding="5px">
              <Flex direction="row" padding="0" margin="0" wrap="wrap">
                <Column width="20%" padding="5px">
                  <Input
                    id="proPesexac"
                    label={this.props.t('planeamiento.proPesexac')}
                    type="number"
                    value={this.state.producto.proPesexac}
                    onChange={this.handlerInputChange}
                    step="0.0001"
                    max="99"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proPesmin"
                    label={this.props.t('planeamiento.proPesmin')}
                    type="number"
                    value={this.state.producto.proPesmin}
                    onChange={this.handlerInputChange}
                    step="0.0000001"
                    max="99"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proPminc"
                    label={this.props.t('planeamiento.proPminc')}
                    type="number"
                    value={this.state.producto.proPminc}
                    onChange={this.handlerInputChange}
                    step="0.0000001"
                    max="999"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proPmaxc"
                    label={this.props.t('planeamiento.proPmaxc')}
                    type="number"
                    value={this.state.producto.proPmaxc}
                    onChange={this.handlerInputChange}
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proPesmax"
                    label={this.props.t('planeamiento.proPesmax')}
                    type="number"
                    value={this.state.producto.proPesmax}
                    onChange={this.handlerInputChange}
                    step="0.0000001"
                    max="99"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proTarab"
                    label={this.props.t('planeamiento.proTarab')}
                    type="number"
                    value={this.state.producto.proTarab}
                    onChange={this.handlerInputChange}
                    step="0.0000001"
                    max="999"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proTarac"
                    label={this.props.t('planeamiento.proTarac')}
                    type="number"
                    value={this.state.producto.proTarac}
                    onChange={this.handlerInputChange}
                    step="0.0000001"
                    max="999"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <Input
                    id="proTarae"
                    label={this.props.t('planeamiento.proTarae')}
                    type="number"
                    value={this.state.producto.proTarae}
                    onChange={this.handlerInputChange}
                    step="0.0000007"
                    max="999"
                  />
                </Column>
                <Column width="20%" padding="5px">
                  <ComboBox
                    id="proPeseti"
                    label={this.props.t('planeamiento.proPeseti')}
                    items={[
                      {id: true, name: this.props.t('general.si')},
                      {id: false, name: this.props.t('general.no')},
                    ]}
                    itemId="id"
                    itemText="name"
                    value={this.state.producto.proPeseti}
                    onSelect={this.handlerSelectChange}
                  />
                </Column>
              </Flex>
            </Column>
          </Flex>
        </GroupForm>

        <Column width="60%" padding="5px">
          <span>{this.state.msg}</span>
        </Column>
        <Column width="20%" padding="5px">
          <Button
            width="100%"
            visible={true}
            styleType="outline"
            border={true}
            loading={this.state.wait}
            disabled={this.state.wait}
            text={this.props.t('general.cancelar')}
            id="cancelAddProducto"
            icon="eraser"
            onPress={this.handlerCancelAddProduct}
          />
        </Column>
        <Column width="20%" padding="5px">
          <Button
            width="100%"
            visible={true}
            styleType="success"
            loading={this.state.wait}
            disabled={this.state.wait}
            text={this.props.t('general.crear')}
            id="crearAddProducto"
            icon="save"
            onPress={this.handlerAddProduct}
          />
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

export default withTranslation()(AddProductosView);
