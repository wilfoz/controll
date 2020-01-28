import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-service-resource';
import { Leader } from './shared/leader';

@Injectable({
  providedIn: 'root'
})
export class LeadersService extends BaseResourceService<Leader> {

  constructor(protected injector: Injector) {
    super('http://localhost:3000/api/leaders', injector, Leader.fromJson);
  }
}
