import {Model, model, property, Entity} from '@loopback/repository';

@model()
export class KNA1 extends Entity {
  @property({
    type: 'number',
  })
  MANDT?: number;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  KUNNR?: number;

  @property({
    type: 'number',
  })
  NAME1?: number;

  constructor(data?: Partial<KNA1>) {
    super(data);
  }
}

export interface Kna1Relations {
  // describe navigational properties here
}

export type Kna1WithRelations = KNA1 & Kna1Relations;
