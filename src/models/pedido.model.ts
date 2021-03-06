import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {DetallesPedido} from './detalles-pedido.model';
import {Cliente} from './cliente.model';

@model()
export class Pedido extends Entity {
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
  fechaPedido: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaEntrega: string;

  @property({
    type: 'string',
    required: true,
  })
  formaDePago: string;

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
  @hasMany(() => DetallesPedido)
  detallesPedidos: DetallesPedido[];

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
