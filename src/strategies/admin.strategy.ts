import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import { HttpErrors, Request } from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {AutenticacionService} from '../services';



/*export class EstrategiaAdministrador implements AuthenticationStrategy{
  name: string = 'admin';

  /*constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ){

  }*/
  /*async authenticate(request: Request): Promise<UserProfile | undefined>{

  }*/
//}
