import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plan, PlanRelations, PagosPlanes} from '../models';
import {PagosPlanesRepository} from './pagos-planes.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly pagosPlanes: HasManyRepositoryFactory<PagosPlanes, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PagosPlanesRepository') protected pagosPlanesRepositoryGetter: Getter<PagosPlanesRepository>,
  ) {
    super(Plan, dataSource);
    this.pagosPlanes = this.createHasManyRepositoryFactoryFor('pagosPlanes', pagosPlanesRepositoryGetter,);
    this.registerInclusionResolver('pagosPlanes', this.pagosPlanes.inclusionResolver);
  }
}
