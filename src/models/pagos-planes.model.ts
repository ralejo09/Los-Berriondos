import {Entity, model, property} from '@loopback/repository';

@model()
export class PagosPlanes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
    required: true,
  })
  fechaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  formaPago: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;


  constructor(data?: Partial<PagosPlanes>) {
    super(data);
  }
}

export interface PagosPlanesRelations {
  // describe navigational properties here
}

export type PagosPlanesWithRelations = PagosPlanes & PagosPlanesRelations;
