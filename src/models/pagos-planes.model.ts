import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plan} from './plan.model';
import {Mascota} from './mascota.model';

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
  @belongsTo(() => Plan)
  planId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<PagosPlanes>) {
    super(data);
  }
}

export interface PagosPlanesRelations {
  // describe navigational properties here
}

export type PagosPlanesWithRelations = PagosPlanes & PagosPlanesRelations;
