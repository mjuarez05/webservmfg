import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'prd_turnos'}}
})
export class PrdTurnos extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 2,
    postgresql: {columnName: 'id_planta', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idPlanta: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {columnName: 'descr', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  descr: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'desde', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  desde?: string;

  @property({
    type: 'date',
    postgresql: {columnName: 'hasta', dataType: 'timestamp without time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  hasta?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PrdTurnos>) {
    super(data);
  }
}

export interface PrdTurnosRelations {
  // describe navigational properties here
}

export type PrdTurnosWithRelations = PrdTurnos & PrdTurnosRelations;
