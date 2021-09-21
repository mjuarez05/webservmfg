import {Request, RestBindings, get,put, param,requestBody} from '@loopback/rest';

import {AsHdetipalRepository} from '../repositories/as-hdetipal.repository';
import {inject} from '@loopback/context';
import {AsHdetipal} from '../models';
import {repository} from '@loopback/repository';

export class AsHDetipalExtendController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @repository(AsHdetipalRepository)
    public asHdetipalRepository: AsHdetipalRepository,
  ) {}



}
