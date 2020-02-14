import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Weeks } from './shared/weekly-schedule.model';
import { ProductionService } from '../productions/production.service';
import { map, tap, reduce } from 'rxjs/operators';
import { Subject } from 'rxjs';

const URL = 'http://localhost:3000/api/production/';

@Injectable({
  providedIn: 'root'
})
export class WeeklyScheduleService {

  private arrWeek = ['sanday', 'monday', 'tuesday', 'fourth', 'fifth', 'friday', 'saturday'];

  private weeksHeaders = [];
  private productionsUpdated$ = new Subject<any[]>();

  constructor(
    private http: HttpClient,
  ) { }

  getWeeks = (start, end) => {
    let apiURL = URL + `?start=${start}&end=${end}`;
    this.http.get(apiURL).pipe(
      map((data) => Object.keys(data).map(k => {

        const { date, tower: { locality }, leader,
          status, activity: { name }, tower: { name: tower } } = data[k];
        return ({ date, locality, name, tower, leader, status });
      })))
      .subscribe((data) => {
        this.weeksHeaders.push(this.getWeeksHeaders(new Date(start)));
        this.productionsUpdated$.next(this.groupByActivity(data, 'name'));
      });
  }

  getHeaders = () => {
    console.log('service: ', this.weeksHeaders)
    return this.weeksHeaders;
  }

  getData = () => {
    return this.productionsUpdated$.asObservable();
  }

  protected getWeeksHeaders = (initialDate: Date): any[] => {

    const weeksPT = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado']

    return weeksPT.map((weekPT, i) => {

      const afterDate = new Date();
      afterDate.setDate(initialDate.getDate() + i);

      const beforeDate = new Date();
      beforeDate.setDate(afterDate.getDate() - 7);

      return {
        key: weekPT,
        header1: `${weekPT}: ${beforeDate.toLocaleDateString()}`,
        header2: `${weekPT}: ${afterDate.toLocaleDateString()}`,
        cell: this.arrWeek[i]
      }

    })
  }

  protected groupByActivity = (obj, groupBy = 'name') => obj.reduce((acc, cur) => {
    const week = acc.find((obj) => obj[groupBy] == cur[groupBy]);

    const dayOfTheWeek = this.getDayOfTheWeek(cur.date);

    let prod = cur['status'] === 'EXECUTADO' ? { executed: `${cur['tower']}, ` } : { planned: `${cur['tower']}, ` };

    if (week) {

      week[dayOfTheWeek] && week[dayOfTheWeek].planned
        ? week[dayOfTheWeek].planned += `${prod.planned || ''}`
        : null;

      week[dayOfTheWeek] && week[dayOfTheWeek].executed
        ? week[dayOfTheWeek].executed += `${prod.executed || ''}`
        : null;

      if (!week.hasOwnProperty(dayOfTheWeek))
        week[dayOfTheWeek] = { planned: prod.planned || ' ', executed: prod.executed || ' ' }

    } else {
      acc.push({
        [groupBy]: cur[groupBy],
        locality: cur['locality'],
        leader: cur['leader'],
        [dayOfTheWeek]: { planned: prod.planned || ' ', executed: prod.executed || ' ' },
      })
    }

    return acc;

  }, []);

  protected getDayOfTheWeek = (date: Date) => {
    const day = new Date(date);
    return this.arrWeek[day.getDay()];
  }

}