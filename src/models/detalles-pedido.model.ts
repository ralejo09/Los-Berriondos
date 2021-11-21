import {Model, model, property} from '@loopback/repository';

@model()
export class DetallesPedido extends Model {
  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  precioRegular: number;

  @property({
    type: 'number',
    required: true,
  })
  precioSIM: number;

  @property({
    type: 'number',
    required: true,
  })
  precioVenta: number;


  constructor(data?: Partial<DetallesPedido>) {
    super(data);
  }
}

export interface DetallesPedidoRelations {
  // describe navigational properties here
}

export type DetallesPedidoWithRelations = DetallesPedido & DetallesPedidoRelations;
