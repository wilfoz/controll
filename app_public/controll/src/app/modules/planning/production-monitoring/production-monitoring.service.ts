import { Injectable, Injector } from '@angular/core';
import { Production } from '../productions/shared/production';
import { BaseResourceService } from '../../../shared/service/base-service-resource';
import { BuildingListService } from '../../building-list/shared/building-list.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { BuildingList } from '../../building-list/shared/models/building-list';

@Injectable({
  providedIn: 'root'
})
export class ProductionMonitoringService extends BaseResourceService<Production> {

  private buildingList$ = new BehaviorSubject<BuildingList[]>([]);

  constructor(
    protected injector: Injector,
    private buildingListService: BuildingListService
    ) {
    super('http://localhost:3000/api/productions', injector, Production.fromJson);
  }

  public getBuildingList = () => {

    this.buildingListService.getAll().pipe(
     map((data) => {

      let list = data.map((element) => {
        const { project, name, type, foundation_MC, foundation_A, foundation_B, foundation_C, foundation_D, released } = element;

        return {
          project,
          name,
          type,
          released,
          foundation_MCE: foundation_MC,
          foundation_MCF: foundation_MC,
          foundation_A,
          foundation_B,
          foundation_C, 
          foundation_D
        }
      })
      return list;
    }), map(data => data.sort((a, b) => a.project - b.project))
   ).subscribe(
      (data) => this.buildingList$.next(data),
      (error) =>  console.log(error)
   )
  }

  public getBuildingListUpdated = () => this.buildingList$.asObservable();

}
