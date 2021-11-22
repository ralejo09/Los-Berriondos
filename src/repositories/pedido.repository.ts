import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, DetallesPedido, Cliente} from '../models';
import {DetallesPedidoRepository} from './detalles-pedido.repository';
import {ClienteRepository} from './cliente.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly detallesPedidos: HasManyRepositoryFactory<DetallesPedido, typeof Pedido.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DetallesPedidoRepository') protected detallesPedidoRepositoryGetter: Getter<DetallesPedidoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Pedido, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.detallesPedidos = this.createHasManyRepositoryFactoryFor('detallesPedidos', detallesPedidoRepositoryGetter,);
    this.registerInclusionResolver('detallesPedidos', this.detallesPedidos.inclusionResolver);
  }
}
