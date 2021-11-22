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
  Pedido,
} from '../models';
import {DetallesPedidoRepository} from '../repositories';

export class DetallesPedidoPedidoController {
  constructor(
    @repository(DetallesPedidoRepository)
    public detallesPedidoRepository: DetallesPedidoRepository,
  ) { }

  @get('/detalles-pedidos/{id}/pedido', {
    responses: {
      '200': {
        description: 'Pedido belonging to DetallesPedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async getPedido(
    @param.path.string('id') id: typeof DetallesPedido.prototype.id,
  ): Promise<Pedido> {
    return this.detallesPedidoRepository.pedido(id);
  }
}
