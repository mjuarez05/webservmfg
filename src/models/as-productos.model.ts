import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'greentrz', table: 'as_productos'}}
})
export class AsProductos extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id_planta', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idPlanta: number;

  @property({
    type: 'string',
    required: true,
    length: 10,
    id: 2,
    postgresql: {columnName: 'codsap', dataType: 'character varying', dataLength: 10, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  codsap: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {columnName: 'descr_mat', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  descrMat: string;

  @property({
    type: 'string',
    required: true,
    length: 100,
    postgresql: {columnName: 'descr_gen', dataType: 'character varying', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  descrGen: string;

  @property({
    type: 'number',
    required: true,
    precision: 3,
    scale: 0,
    postgresql: {columnName: 'cantcaj', dataType: 'numeric', dataLength: null, dataPrecision: 3, dataScale: 0, nullable: 'NO'},
  })
  cantcaj: number;

  @property({
    type: 'number',
    required: true,
    precision: 6,
    scale: 3,
    postgresql: {columnName: 'tara_bolsa', dataType: 'numeric', dataLength: null, dataPrecision: 6, dataScale: 3, nullable: 'NO'},
  })
  taraBolsa: number;

  @property({
    type: 'number',
    required: true,
    precision: 6,
    scale: 3,
    postgresql: {columnName: 'tara_caja', dataType: 'numeric', dataLength: null, dataPrecision: 6, dataScale: 3, nullable: 'NO'},
  })
  taraCaja: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'id_unimed', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idUnimed: number;

  @property({
    type: 'number',
    required: true,
    scale: 0,
    postgresql: {columnName: 'id_ftoetq', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  idFtoetq: number;

  @property({
    type: 'number',
    required: true,
    precision: 4,
    scale: 0,
    postgresql: {columnName: 'dias_venc', dataType: 'numeric', dataLength: null, dataPrecision: 4, dataScale: 0, nullable: 'NO'},
  })
  diasVenc: number;

  @property({
    type: 'number',
    required: true,
    precision: 6,
    scale: 3,
    postgresql: {columnName: 'pesmin', dataType: 'numeric', dataLength: null, dataPrecision: 6, dataScale: 3, nullable: 'NO'},
  })
  pesmin: number;

  @property({
    type: 'number',
    required: true,
    precision: 6,
    scale: 3,
    postgresql: {columnName: 'pesmax', dataType: 'numeric', dataLength: null, dataPrecision: 6, dataScale: 3, nullable: 'NO'},
  })
  pesmax: number;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {columnName: 'activo', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  activo: boolean;

  @property({
    type: 'string',
    length: 50,
    postgresql: {columnName: 'nsenasa', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  nsenasa?: string;

  @property({
    type: 'string',
    length: 50,
    postgresql: {columnName: 'temp', dataType: 'character varying', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  temp?: string;

  @property({
    type: 'boolean',
    required: true,
    postgresql: {columnName: 'ctrl_pesomm', dataType: 'boolean', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  ctrlPesomm: boolean;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'id_grpmat', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  idGrpmat?: number;

  @property({
    type: 'number',
    precision: 6,
    scale: 3,
    postgresql: {columnName: 'pesfijo', dataType: 'numeric', dataLength: null, dataPrecision: 6, dataScale: 3, nullable: 'YES'},
  })
  pesfijo?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'estibamax', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  estibamax?: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'id_prdfam', dataType: 'smallint', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  idPrdfam?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AsProductos>) {
    super(data);
  }
}

export interface AsProductosRelations {
  // describe navigational properties here
}

export type AsProductosWithRelations = AsProductos & AsProductosRelations;
