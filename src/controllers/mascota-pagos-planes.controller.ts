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
  PagosPlanes,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPagosPlanesController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/pagos-planes', {
    responses: {
      '200': {
        description: 'Array of Mascota has many PagosPlanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PagosPlanes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PagosPlanes>,
  ): Promise<PagosPlanes[]> {
    return this.mascotaRepository.pagosPlanes(id).find(filter);
  }

  @post('/mascotas/{id}/pagos-planes', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(PagosPlanes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosPlanes, {
            title: 'NewPagosPlanesInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) pagosPlanes: Omit<PagosPlanes, 'id'>,
  ): Promise<PagosPlanes> {
    return this.mascotaRepository.pagosPlanes(id).create(pagosPlanes);
  }

  @patch('/mascotas/{id}/pagos-planes', {
    responses: {
      '200': {
        description: 'Mascota.PagosPlanes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosPlanes, {partial: true}),
        },
      },
    })
    pagosPlanes: Partial<PagosPlanes>,
    @param.query.object('where', getWhereSchemaFor(PagosPlanes)) where?: Where<PagosPlanes>,
  ): Promise<Count> {
    return this.mascotaRepository.pagosPlanes(id).patch(pagosPlanes, where);
  }

  @del('/mascotas/{id}/pagos-planes', {
    responses: {
      '200': {
        description: 'Mascota.PagosPlanes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PagosPlanes)) where?: Where<PagosPlanes>,
  ): Promise<Count> {
    return this.mascotaRepository.pagosPlanes(id).delete(where);
  }
}
