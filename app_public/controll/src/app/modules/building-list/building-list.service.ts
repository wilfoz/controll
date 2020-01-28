import { Injectable, Injector } from '@angular/core';
import { BuildingList } from './shared/models/building-list';
import { BaseResourceService } from '../../shared/service/base-service-resource';

@Injectable({
  providedIn: 'root'
})
export class BuildingListService extends BaseResourceService<BuildingList> {

  constructor(protected injector: Injector) {
    super('http://localhost:3000/api/towers', injector, BuildingList.fromJson);
  }

}
