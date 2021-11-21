import {Entity, model, property} from '@loopback/repository';

@model()
export class ConsultaVeterinaria extends Entity {
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
  fechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaConsulta: string;

  @property({
    type: 'string',
    required: true,
  })
  pagado: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;


  constructor(data?: Partial<ConsultaVeterinaria>) {
    super(data);
  }
}

export interface ConsultaVeterinariaRelations {
  // describe navigational properties here
}

export type ConsultaVeterinariaWithRelations = ConsultaVeterinaria & ConsultaVeterinariaRelations;
