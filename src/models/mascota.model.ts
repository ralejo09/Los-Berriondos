import {Entity, model, property} from '@loopback/repository';

@model()
export class Mascota extends Entity {
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
  nombre: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estadoPlan: boolean;

  @property({
    type: 'string',
    required: true,
  })
  motivoInactivo: string;

  @property({
    type: 'string',
    required: true,
  })
  especie: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  sexo: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaDeNacimiento: string;

  @property({
    type: 'number',
    required: true,
  })
  peso: number;

  @property({
    type: 'string',
    required: true,
  })
  enfermedadesPreexistentes: string;

  @property({
    type: 'string',
    required: true,
  })
  observacionesEnfPre: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;


  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
