import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, Proveedor, DetallesPedido} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {DetallesPedidoRepository} from './detalles-pedido.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Producto.prototype.id>;

  public readonly detallesPedidos: HasManyRepositoryFactory<DetallesPedido, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('DetallesPedidoRepository') protected detallesPedidoRepositoryGetter: Getter<DetallesPedidoRepository>,
  ) {
    super(Producto, dataSource);
    this.detallesPedidos = this.createHasManyRepositoryFactoryFor('detallesPedidos', detallesPedidoRepositoryGetter,);
    this.registerInclusionResolver('detallesPedidos', this.detallesPedidos.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
  }
}
