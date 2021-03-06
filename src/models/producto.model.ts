import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Proveedor} from './proveedor.model';
import {DetallesPedido} from './detalles-pedido.model';

@model()
export class Producto extends Entity {
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
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  presentacion: string;

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
  precionVenta: number;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  @hasMany(() => DetallesPedido)
  detallesPedidos: DetallesPedido[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
