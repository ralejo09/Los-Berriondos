import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {DetallesPedido, DetallesPedidoRelations, Producto, Pedido} from '../models';
import {ProductoRepository} from './producto.repository';
import {PedidoRepository} from './pedido.repository';

export class DetallesPedidoRepository extends DefaultCrudRepository<
  DetallesPedido,
  typeof DetallesPedido.prototype.id,
  DetallesPedidoRelations
> {

  public readonly producto: BelongsToAccessor<Producto, typeof DetallesPedido.prototype.id>;

  public readonly pedido: BelongsToAccessor<Pedido, typeof DetallesPedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(DetallesPedido, dataSource);
    this.pedido = this.createBelongsToAccessorFor('pedido', pedidoRepositoryGetter,);
    this.registerInclusionResolver('pedido', this.pedido.inclusionResolver);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
  }
}
