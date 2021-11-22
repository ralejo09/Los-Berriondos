import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DetallesPedido,
  Producto,
} from '../models';
import {DetallesPedidoRepository} from '../repositories';

export class DetallesPedidoProductoController {
  constructor(
    @repository(DetallesPedidoRepository)
    public detallesPedidoRepository: DetallesPedidoRepository,
  ) { }

  @get('/detalles-pedidos/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to DetallesPedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof DetallesPedido.prototype.id,
  ): Promise<Producto> {
    return this.detallesPedidoRepository.producto(id);
  }
}
