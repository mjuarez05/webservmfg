import React from 'react';
import DataGrid, {
  Column,
  // RowDragging,
  Scrolling,
  // Lookup,
  Editing,
  Button,
  Summary,
  TotalItem,
} from 'devextreme-react/data-grid';
import esMessages from 'devextreme/localization/messages/es.json';
import enMessages from 'devextreme/localization/messages/en.json';
import {locale, loadMessages} from 'devextreme/localization';
import store from '../../../store';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    loadMessages(enMessages);
    loadMessages(esMessages);
    locale(store.getState().lang);
    this.dataSource = {
      store: this.props.pallets,
      reshapeOnPush: true,
    };

    this.filterExpr = ['status', '=', this.props.status];

    this.onAdd = this.onAdd.bind(this);
  }

  onAdd = (e) => {
    console.log(e);
    var key = e.row.data.numpal,
      values = {status: 2};
    console.log('1', values);
    this.props.pallets.update(key, values).then(() => {
      console.log('2', values);
      this.props.pallets.push([
        {
          type: 'update',
          key: key,
          data: values,
        },
      ]);
    });
  };
  onRemove = (e) => {
    console.log(e);
    var key = e.row.data.numpal,
      values = {status: 1};

    console.log('1', values);
    this.props.pallets.update(key, values).then(() => {
      console.log('2', values);
      this.props.pallets.push([
        {
          type: 'update',
          key: key,
          data: values,
        },
      ]);
    });
  };

  onChangesValues = (e) => {
    console.log(e);
    this.props.pallets.update(e.key, e.data).then(() => {
      this.props.pallets.push([
        {
          type: 'update',
          key: e.key,
          data: e.data,
        },
      ]);
    });
  };

  render() {
    return (
      <DataGrid
        dataSource={this.dataSource}
        // height={440}
        showBorders={true}
        filterValue={this.filterExpr}
        onRowUpdated={this.onChangesValues}
      >
        {/* <RowDragging
          data={this.props.status}
          group="status"
          onAdd={this.onAdd}
        /> */}
        <Editing
          mode="cell"
          allowUpdating={this.props.status === 2}
          allowDeleting={false}
          allowAdding={false}
          onChangesChange={this.onChangesValues}
        />
        <Scrolling mode="virtual" />
        <Column
          dataField="numpal"
          caption="Pallet"
          dataType="number"
          allowEditing={false}
        />
        <Column
          dataField="hora_cierre"
          caption="Fecha"
          dataType="date"
          allowEditing={false}
        />
        <Column dataField="descr_mat" caption="Material" allowEditing={false} />
        <Column
          dataField="unidades"
          caption="Bolsas"
          dataType="number"
          allowEditing={false}
        />
        <Column
          dataField="usadas"
          caption="Bolsas para Consumir"
          dataType="number"
          visible={false}
          allowEditing={false}
        />
        <Column
          dataField="kneto"
          caption="Kg.Netos"
          dataType="number"
          allowEditing={false}
        />
        <Column
          dataField="kusados"
          caption="Kg.Netos a Utilizar"
          dataType="number"
          visible={this.props.status === 2}
          allowEditing={true}
        />
        <Column
          dataField="status"
          dataType="number"
          visible={false}
          allowEditing={false}
        />
        <Column type="buttons" width={110}>
          <Button
            text="CONSUMIR"
            visible={this.props.status === 1}
            onClick={this.onAdd}
          />
          <Button
            text="QUITAR"
            visible={this.props.status === 2}
            onClick={this.onRemove}
          />
        </Column>
        {this.props.status === 2 ? (
          <Summary>
            {/* <TotalItem
              column="usadas"
              summaryType="sum"
              customizeText={(data) => {
                return `Total: ${data.value}`;
              }}
            /> */}
            <TotalItem
              column="kusados"
              summaryType="sum"
              customizeText={(data) => {
                return `${data.value} Kg.`;
              }}
            />
          </Summary>
        ) : null}
      </DataGrid>
    );
  }
}

export default Grid;
