import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Mascota,
  VisitasPyP,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaVisitasPyPController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/visitas-py-ps', {
    responses: {
      '200': {
        description: 'Array of Mascota has many VisitasPyP',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(VisitasPyP)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<VisitasPyP>,
  ): Promise<VisitasPyP[]> {
    return this.mascotaRepository.visitasPyPS(id).find(filter);
  }

  @post('/mascotas/{id}/visitas-py-ps', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(VisitasPyP)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitasPyP, {
            title: 'NewVisitasPyPInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) visitasPyP: Omit<VisitasPyP, 'id'>,
  ): Promise<VisitasPyP> {
    return this.mascotaRepository.visitasPyPS(id).create(visitasPyP);
  }

  @patch('/mascotas/{id}/visitas-py-ps', {
    responses: {
      '200': {
        description: 'Mascota.VisitasPyP PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitasPyP, {partial: true}),
        },
      },
    })
    visitasPyP: Partial<VisitasPyP>,
    @param.query.object('where', getWhereSchemaFor(VisitasPyP)) where?: Where<VisitasPyP>,
  ): Promise<Count> {
    return this.mascotaRepository.visitasPyPS(id).patch(visitasPyP, where);
  }

  @del('/mascotas/{id}/visitas-py-ps', {
    responses: {
      '200': {
        description: 'Mascota.VisitasPyP DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VisitasPyP)) where?: Where<VisitasPyP>,
  ): Promise<Count> {
    return this.mascotaRepository.visitasPyPS(id).delete(where);
  }
}
