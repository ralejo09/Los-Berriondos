import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {VisitasPyP} from '../models';
import {VisitasPyPRepository} from '../repositories';

export class VisitasPypController {
  constructor(
    @repository(VisitasPyPRepository)
    public visitasPyPRepository : VisitasPyPRepository,
  ) {}

  @post('/visitas-py-ps')
  @response(200, {
    description: 'VisitasPyP model instance',
    content: {'application/json': {schema: getModelSchemaRef(VisitasPyP)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitasPyP, {
            title: 'NewVisitasPyP',
            exclude: ['id'],
          }),
        },
      },
    })
    visitasPyP: Omit<VisitasPyP, 'id'>,
  ): Promise<VisitasPyP> {
    return this.visitasPyPRepository.create(visitasPyP);
  }

  @get('/visitas-py-ps/count')
  @response(200, {
    description: 'VisitasPyP model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VisitasPyP) where?: Where<VisitasPyP>,
  ): Promise<Count> {
    return this.visitasPyPRepository.count(where);
  }

  @get('/visitas-py-ps')
  @response(200, {
    description: 'Array of VisitasPyP model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VisitasPyP, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VisitasPyP) filter?: Filter<VisitasPyP>,
  ): Promise<VisitasPyP[]> {
    return this.visitasPyPRepository.find(filter);
  }

  @patch('/visitas-py-ps')
  @response(200, {
    description: 'VisitasPyP PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitasPyP, {partial: true}),
        },
      },
    })
    visitasPyP: VisitasPyP,
    @param.where(VisitasPyP) where?: Where<VisitasPyP>,
  ): Promise<Count> {
    return this.visitasPyPRepository.updateAll(visitasPyP, where);
  }

  @get('/visitas-py-ps/{id}')
  @response(200, {
    description: 'VisitasPyP model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VisitasPyP, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VisitasPyP, {exclude: 'where'}) filter?: FilterExcludingWhere<VisitasPyP>
  ): Promise<VisitasPyP> {
    return this.visitasPyPRepository.findById(id, filter);
  }

  @patch('/visitas-py-ps/{id}')
  @response(204, {
    description: 'VisitasPyP PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitasPyP, {partial: true}),
        },
      },
    })
    visitasPyP: VisitasPyP,
  ): Promise<void> {
    await this.visitasPyPRepository.updateById(id, visitasPyP);
  }

  @put('/visitas-py-ps/{id}')
  @response(204, {
    description: 'VisitasPyP PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visitasPyP: VisitasPyP,
  ): Promise<void> {
    await this.visitasPyPRepository.replaceById(id, visitasPyP);
  }

  @del('/visitas-py-ps/{id}')
  @response(204, {
    description: 'VisitasPyP DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitasPyPRepository.deleteById(id);
  }
}
