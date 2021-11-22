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
  Plan,
  PagosPlanes,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanPagosPlanesController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/pagos-planes', {
    responses: {
      '200': {
        description: 'Array of Plan has many PagosPlanes',
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
    return this.planRepository.pagosPlanes(id).find(filter);
  }

  @post('/plans/{id}/pagos-planes', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(PagosPlanes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagosPlanes, {
            title: 'NewPagosPlanesInPlan',
            exclude: ['id'],
            optional: ['planId']
          }),
        },
      },
    }) pagosPlanes: Omit<PagosPlanes, 'id'>,
  ): Promise<PagosPlanes> {
    return this.planRepository.pagosPlanes(id).create(pagosPlanes);
  }

  @patch('/plans/{id}/pagos-planes', {
    responses: {
      '200': {
        description: 'Plan.PagosPlanes PATCH success count',
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
    return this.planRepository.pagosPlanes(id).patch(pagosPlanes, where);
  }

  @del('/plans/{id}/pagos-planes', {
    responses: {
      '200': {
        description: 'Plan.PagosPlanes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PagosPlanes)) where?: Where<PagosPlanes>,
  ): Promise<Count> {
    return this.planRepository.pagosPlanes(id).delete(where);
  }
}
