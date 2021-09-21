import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'rolemapping'}}
})
export class Rolemapping extends Entity {
  @property({
    type: 'number',
    required: true,
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    postgresql: {columnName: 'principaltype', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  principaltype?: string;

  @property({
    type: 'string',
    postgresql: {columnName: 'principalid', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  principalid?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'roleid', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  roleid?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Rolemapping>) {
    super(data);
  }
}

export interface RolemappingRelations {
  // describe navigational properties here
}

export type RolemappingWithRelations = Rolemapping & RolemappingRelations;
