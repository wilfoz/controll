import { Injectable, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/service/base-service-resource';
import { BuildingList } from '../building-list/shared/models/building-list';
import { BuildingListService } from '../building-list/shared/building-list.service';

@Injectable({
  providedIn: 'root'
})
export class PieService extends BaseResourceService<BuildingList> {

  constructor(
    protected injector: Injector,
    private buildingListService: BuildingListService,
  ) { 
    super('http://localhost:3000/api/productions', injector, BuildingList.fromJson);
  }

  private getRealeased(arg: string) {
    return this.buildingListService.getAll()
      .pipe(
        map((data) => data.filter((d) => d.released == arg).length)
      )
  }

  public pie = () => {
    const arr = []
    const args = ['LIBERADO', 'EMBARGO', 'ARQUEOLOGIA']

    args.map((res) => {
      this.getRealeased(res)
        .subscribe((data) => {
          arr.push(data)
        })
    })
    return arr;
  }

}