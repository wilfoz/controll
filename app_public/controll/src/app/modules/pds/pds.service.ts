import { Injectable, Injector } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { map, tap, filter, reduce, find } from 'rxjs/operators';
import { BuildingListService } from '../building-list/shared/building-list.service';
import { ProductionService } from '../productions/production.service';

const URL = 'http://localhost:3000/api/production/';

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

  getForDate(start, end) {
    let apiURL = URL + `?start=${start}&end=${end}`;
    this.http.get(apiURL)
      .pipe(
        map(production => Object.keys(production).map((k) => {
          const { date, activity: { name }, activity: { unity },
                  tower: { name: tower }, tower: { forward }, leader, status } = production[k];
          return ({ date, name, unity, tower, leader, status, forward });
        })),
        map((data) => data.filter((element) => {
          
          let date = new Date(element.date).toLocaleDateString();
  
          let compare = `${element.status} ${date}`

          let textSearchA = `PROGRAMADO ${start}`;
          let textSearchB =  `EXECUTADO ${end}`;
          let textSearchC = `ANDAMENTO ${end}`;

          let isTrue =  compare !== textSearchA && compare !== textSearchB && compare !== textSearchC;
          return isTrue;
        })),
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

  getTotalTowersByActivity = (activity): Observable<number> => {
    return this.productionService.getAll()
      .pipe(
        map((data) => data.filter((element: any) => {
          const { activity: { name }, status } = element;
          return name === activity && status == 'EXECUTADO';
        }).length)
      )
  }

  getTotalKmByActivity = (activity) => {
    return this.productionService.getAll()
      .pipe(
        map((data) => data.filter((element: any) => {
          const { activity: { name }, status } = element;
          return name === activity && status == 'EXECUTADO';
        })),
        map((data) => data.reduce((acc, value) => (Math.round(acc + value.tower['forward'])), 0)),
      )
  }

}
