import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {VisitasPyP, VisitasPyPRelations, Mascota, Empleado} from '../models';
import {MascotaRepository} from './mascota.repository';
import {EmpleadoRepository} from './empleado.repository';

export class VisitasPyPRepository extends DefaultCrudRepository<
  VisitasPyP,
  typeof VisitasPyP.prototype.id,
  VisitasPyPRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof VisitasPyP.prototype.id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof VisitasPyP.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(VisitasPyP, dataSource);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
