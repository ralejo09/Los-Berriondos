import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Producto} from './producto.model';
import {Pedido} from './pedido.model';

@model()
export class DetallesPedido extends Entity {
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
  @belongsTo(() => Producto)
  productoId: string;

  @belongsTo(() => Pedido)
  pedidoId: string;

  constructor(data?: Partial<DetallesPedido>) {
    super(data);
  }
}

export interface DetallesPedidoRelations {
  // describe navigational properties here
}

export type DetallesPedidoWithRelations = DetallesPedido & DetallesPedidoRelations;
