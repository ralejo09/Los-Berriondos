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
  Empleado,
  VisitasPyP,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoVisitasPyPController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/visitas-py-ps', {
    responses: {
      '200': {
        description: 'Array of Empleado has many VisitasPyP',
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
    return this.empleadoRepository.visitasPyPS(id).find(filter);
  }

  @post('/empleados/{id}/visitas-py-ps', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(VisitasPyP)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitasPyP, {
            title: 'NewVisitasPyPInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) visitasPyP: Omit<VisitasPyP, 'id'>,
  ): Promise<VisitasPyP> {
    return this.empleadoRepository.visitasPyPS(id).create(visitasPyP);
  }

  @patch('/empleados/{id}/visitas-py-ps', {
    responses: {
      '200': {
        description: 'Empleado.VisitasPyP PATCH success count',
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
    return this.empleadoRepository.visitasPyPS(id).patch(visitasPyP, where);
  }

  @del('/empleados/{id}/visitas-py-ps', {
    responses: {
      '200': {
        description: 'Empleado.VisitasPyP DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(VisitasPyP)) where?: Where<VisitasPyP>,
  ): Promise<Count> {
    return this.empleadoRepository.visitasPyPS(id).delete(where);
  }
}
