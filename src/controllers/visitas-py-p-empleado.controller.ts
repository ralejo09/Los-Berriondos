import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  VisitasPyP,
  Empleado,
} from '../models';
import {VisitasPyPRepository} from '../repositories';

export class VisitasPyPEmpleadoController {
  constructor(
    @repository(VisitasPyPRepository)
    public visitasPyPRepository: VisitasPyPRepository,
  ) { }

  @get('/visitas-py-ps/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to VisitasPyP',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof VisitasPyP.prototype.id,
  ): Promise<Empleado> {
    return this.visitasPyPRepository.empleado(id);
  }
}
