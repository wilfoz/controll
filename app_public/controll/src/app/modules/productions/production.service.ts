import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/service/base-service-resource';
import { Production } from './shared/production';
import { BuildingListService } from '../building-list/building-list.service';
import { ActivityService } from '../activities/activity.service';
import { LeadersService } from '../leaders/leaders.service';
import { Observable } from 'rxjs';
import { Activity } from '../activities/shared/activity';
import { BuildingList } from '../building-list/shared/models/building-list';
import { Leader } from '../leaders/shared/leader';

@Injectable({
  providedIn: 'root'
})
export class ProductionService extends BaseResourceService<Production> {
  
  constructor(
    protected injector: Injector,
    private buildingListService: BuildingListService,
    private activityService: ActivityService,
    private leadersService: LeadersService,
    ) {
    super('http://localhost:3000/api/productions', injector, Production.fromJson);
  }

  getAllProductions(): Observable<Production[]> {
    return this.getAll();
  }

  getAllTowers(): Observable<BuildingList[]> {
   return this.buildingListService.getAll();
  }

  getAllActivities(): Observable<Activity[]> {
    return this.activityService.getAll();
  }

  getAllLeaders(): Observable<Leader[]> {
    return this.leadersService.getAll();
  }

}
