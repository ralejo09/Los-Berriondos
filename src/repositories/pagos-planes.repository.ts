import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PagosPlanes, PagosPlanesRelations, Plan, Mascota} from '../models';
import {PlanRepository} from './plan.repository';
import {MascotaRepository} from './mascota.repository';

export class PagosPlanesRepository extends DefaultCrudRepository<
  PagosPlanes,
  typeof PagosPlanes.prototype.id,
  PagosPlanesRelations
> {

  public readonly plan: BelongsToAccessor<Plan, typeof PagosPlanes.prototype.id>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof PagosPlanes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(PagosPlanes, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
  }
}
