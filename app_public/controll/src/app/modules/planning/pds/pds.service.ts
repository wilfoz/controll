import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductionService } from '../productions/production.service';
import { PDS } from './shared/pds';
import { BuildingListService } from '../../building-list/shared/building-list.service';

const URL = 'http://localhost:3000/api/production/';

@Injectable({
  providedIn: 'root'
})
export class PdsService {

  private expectedTowers: number;
  private expectedKm: number;
  private productionsUpdated$ = new Subject<any>();

  constructor(
    private http: HttpClient,
    private buildingListService: BuildingListService,
    private productionService: ProductionService
  ) { }

  getAll (start, end) {
    let apiURL = URL + `?start=${start}&end=${end}`;
    this.http.get(apiURL)
      .pipe(
        map(production => Object.keys(production).map((k) => {
          const { date, activity: { name }, activity: { unity },
            tower: { name: tower }, tower: { forward }, leader, status } = production[k];
          return ({ date, name, unity, tower, leader, status, forward });
        })),
        map((data) => data.filter((element) => {

          const date = new Date(element.date).toLocaleDateString();
          const compare = `${element.status} ${date}`

          const textSearchA = `PROGRAMADO ${start}`;
          const textSearchB = `EXECUTADO ${end}`;
          const textSearchC = `ANDAMENTO ${end}`;

          const isTrue = compare !== textSearchA && compare !== textSearchB && compare !== textSearchC;
          return isTrue;
        }))
      )
      .subscribe(
        (data) => {
          this.getTotalTowers();
          this.getTotalKm();
          const group = this.group(data, 'name');

          const pds = group.map((element) => {
            let activity = element.name;
            const obj = this.setOthersAtrs(element, activity);
            return obj;
          })
          this.productionsUpdated$.next(pds);
        }
      );
      return this.productionsUpdated$.asObservable();
  }

  getPDS = () => this.productionsUpdated$.asObservable();

  protected flatten = groupBy => (acc, cur) => {
    const activity = this.find(acc, cur, groupBy);

    const progress = cur['status'] === 'ANDAMENTO' ? `(And: ${cur['tower']}),` : '';
    const executed = cur['status'] === 'EXECUTADO' ? `${cur['tower']},` : '';
    const planned = cur['status']  === 'PROGRAMADO' ? `${cur['tower']},` : '';
    const foreseen = cur['unity']  === 'torre' ? this.expectedTowers : this.expectedKm;
    const inDay = this.totalExecutedInDay(cur['unity'], cur['status'], cur['forward']);

    if (activity) {

      executed || progress ? activity.executed += `${executed || progress}` : '';
      planned  || progress ? activity.planned  += `${planned || progress}` : '';

      activity.inDay += (inDay || 0);

    } else {
      acc.push({
        [groupBy]: cur[groupBy],
        leader: cur['leader'],
        unity: cur['unity'],
        executed,
        planned,
        foreseen,
        previous: 0,
        current: 0,
        accumulated: '',
        notExecuted: 0,
        inDay: (inDay || 0),
      });
    }
    return acc;
  };

  protected setOthersAtrs = ((group, activity): Object => {

    if (group.unity === 'torre') {
      this.getTotalTowersByActivity(activity).subscribe(total => {

        group.current = total;
        group.notExecuted = +(group.foreseen - total);
        group.previous = total - group.inDay;
        group.accumulated = `${(+(group.foreseen - total) / group.foreseen).toFixed(0)}%`;

      });
    } else {
      this.getTotalKmByActivity(activity).subscribe(total => {
        const km = (total / 1000);

        group.current = +(km).toFixed(1);
        group.notExecuted = +(group.foreseen - km).toFixed(1);
        group.previous = +((km - group.inDay).toFixed(1));
        group.accumulated = `${(+(group.foreseen - km).toFixed(1) / group.foreseen).toFixed(0)}%`;

      });
    }
    return group;
  });

  protected find = (acc, cur, el) => acc.find(obj => obj[el] == cur[el]);

  protected group = (obj, groupBy = 'name') => obj.reduce(this.flatten(groupBy), []);

  protected totalExecutedInDay = (unity, status, km) => {
    if (status === 'EXECUTADO') {
      const result = unity === 'torre' ? 1 : +(km / 1000).toFixed(1);
      return result;
    }
  }

  protected getTotalTowers = () => {
    this.buildingListService.getAll()
      .pipe(
        map((data) => data.filter((d) => d.name !== '').length)
      ).subscribe(data => this.expectedTowers = data)
  }

  protected getTotalKm = () => {
    this.buildingListService.getAll()
      .pipe(
        map((data) => data.reduce((acc, value) => (Math.round(acc + value.forward)), 0)
        )).subscribe(data => this.expectedKm = +((data / 1000).toFixed(0)))
  }

  protected getTotalTowersByActivity = (activity): Observable<number> => {
    return this.productionService.getAll()
      .pipe(
        map((data) => data.filter((element: any) => {
          const { activity: { name }, status } = element;
          return name === activity && status == 'EXECUTADO';
        }).length)
      )
  }

  protected getTotalKmByActivity = (activity): Observable<number> => {
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
