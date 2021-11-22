import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, VisitasPyP, Mascota} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {VisitasPyPRepository} from './visitas-py-p.repository';
import {MascotaRepository} from './mascota.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Empleado.prototype.id>;

  public readonly visitasPyPS: HasManyRepositoryFactory<VisitasPyP, typeof Empleado.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('VisitasPyPRepository') protected visitasPyPRepositoryGetter: Getter<VisitasPyPRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Empleado, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.visitasPyPS = this.createHasManyRepositoryFactoryFor('visitasPyPS', visitasPyPRepositoryGetter,);
    this.registerInclusionResolver('visitasPyPS', this.visitasPyPS.inclusionResolver);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
