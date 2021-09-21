import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'plantas'}}
})
export class Plantas extends Entity {
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
    postgresql: {columnName: 'empresa', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  empresa: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'sucursal', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  sucursal?: number;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {columnName: 'descripcion', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  descripcion: string;

  @property({
    type: 'string',
    length: 50,
    postgresql: {columnName: 'oncca', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  oncca?: string;

  @property({
    type: 'string',
    length: 50,
    postgresql: {columnName: 'senasa', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  senasa?: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'numplant', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  numplant: number;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {columnName: 'direccion', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  direccion: string;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'id_provincia', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idProvincia: number;

  @property({
    type: 'number',
    required: true,
    precision: 5,
    scale: 0,
    postgresql: {columnName: 'id_ciudad', dataType: 'numeric', dataLength: null, dataPrecision: 5, dataScale: 0, nullable: 'NO'},
  })
  idCiudad: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Plantas>) {
    super(data);
  }
}

export interface PlantasRelations {
  // describe navigational properties here
}

export type PlantasWithRelations = Plantas & PlantasRelations;
