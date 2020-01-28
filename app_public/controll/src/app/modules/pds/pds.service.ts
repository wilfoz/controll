import { Injectable, Injector } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { BuildingListService } from '../building-list/shared/building-list.service';
import { ProductionService } from '../productions/production.service';

const URL = 'http://localhost:3000/api/production';

@Injectable({
  providedIn: 'root'
})
export class PdsService {

  private productions = [];
  private productionsUpdated = new Subject<any[]>();

  constructor(
    private http: HttpClient,
    private buildingListService: BuildingListService,
    private productionService: ProductionService
  ) { }


  getForDate(date) {
    let apiURL = URL + `?date=${date}`;
    this.http.get(apiURL)
    .pipe(
      map(production => Object.keys(production).map((k) => {
        const { 
                activity: { name }, 
                activity: { unity }, 
                tower: { name: tower }, 
                tower: { forward }, 
                leader, 
                status 
              } = production[k];

        return ({ name, unity, tower, leader, status, forward });
      }))
    )
    .subscribe((data) => {
      this.productions = data;
      this.productionsUpdated.next(this.productions);
    });
    return this.productionsUpdated.asObservable();
  }

  
  getTotalTowers = (): Observable<number> => {
    return this.buildingListService.getAll()
      .pipe(
        map((data) => data.filter((d) => d.name !== '').length)
      )
  }

  getTotalKm = (): Observable<number> => {
    return this.buildingListService.getAll()
      .pipe(
        map((data) => data.reduce((acc, value) => (Math.round(acc + value.forward)), 0)
        ))
  }

  productionsForActivity = (activity) => {
    return this.productionService.getAll()
    .pipe(
      map((data) => data.filter((element: any) => {
        const { activity: { name } } = element;
        return name === activity;
      }).length)
    )
  }

}
