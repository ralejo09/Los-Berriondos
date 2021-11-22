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
  Mascota,
} from '../models';
import {VisitasPyPRepository} from '../repositories';

export class VisitasPyPMascotaController {
  constructor(
    @repository(VisitasPyPRepository)
    public visitasPyPRepository: VisitasPyPRepository,
  ) { }

  @get('/visitas-py-ps/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to VisitasPyP',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof VisitasPyP.prototype.id,
  ): Promise<Mascota> {
    return this.visitasPyPRepository.mascota(id);
  }
}
