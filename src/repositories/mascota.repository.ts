import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, ConsultaVeterinaria, PagosPlanes, Empleado, VisitasPyP} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ConsultaVeterinariaRepository} from './consulta-veterinaria.repository';
import {PagosPlanesRepository} from './pagos-planes.repository';
import {EmpleadoRepository} from './empleado.repository';
import {VisitasPyPRepository} from './visitas-py-p.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  public readonly consultaVeterinarias: HasManyRepositoryFactory<ConsultaVeterinaria, typeof Mascota.prototype.id>;

  public readonly pagosPlanes: HasManyRepositoryFactory<PagosPlanes, typeof Mascota.prototype.id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Mascota.prototype.id>;

  public readonly visitasPyPS: HasManyRepositoryFactory<VisitasPyP, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ConsultaVeterinariaRepository') protected consultaVeterinariaRepositoryGetter: Getter<ConsultaVeterinariaRepository>, @repository.getter('PagosPlanesRepository') protected pagosPlanesRepositoryGetter: Getter<PagosPlanesRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('VisitasPyPRepository') protected visitasPyPRepositoryGetter: Getter<VisitasPyPRepository>,
  ) {
    super(Mascota, dataSource);
    this.visitasPyPS = this.createHasManyRepositoryFactoryFor('visitasPyPS', visitasPyPRepositoryGetter,);
    this.registerInclusionResolver('visitasPyPS', this.visitasPyPS.inclusionResolver);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.pagosPlanes = this.createHasManyRepositoryFactoryFor('pagosPlanes', pagosPlanesRepositoryGetter,);
    this.registerInclusionResolver('pagosPlanes', this.pagosPlanes.inclusionResolver);
    this.consultaVeterinarias = this.createHasManyRepositoryFactoryFor('consultaVeterinarias', consultaVeterinariaRepositoryGetter,);
    this.registerInclusionResolver('consultaVeterinarias', this.consultaVeterinarias.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
