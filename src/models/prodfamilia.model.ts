import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'prodfamilia'}}
})
export class Prodfamilia extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
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
    type: 'string',
    length: 10,
    postgresql: {columnName: 'color_back', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  colorBack?: string;

  @property({
    type: 'string',
    length: 10,
    postgresql: {columnName: 'color_text', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  colorText?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Prodfamilia>) {
    super(data);
  }
}

export interface ProdfamiliaRelations {
  // describe navigational properties here
}

export type ProdfamiliaWithRelations = Prodfamilia & ProdfamiliaRelations;
