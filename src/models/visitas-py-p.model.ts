import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Empleado} from './empleado.model';

@model()
export class VisitasPyP extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  horaInicio: string;

  @property({
    type: 'string',
    required: true,
  })
  horaFin: string;

  @property({
    type: 'string',
    required: true,
  })
  alimento: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;
  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  constructor(data?: Partial<VisitasPyP>) {
    super(data);
  }
}

export interface VisitasPyPRelations {
  // describe navigational properties here
}

export type VisitasPyPWithRelations = VisitasPyP & VisitasPyPRelations;
