import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Weeks } from './shared/weekly-schedule.model';
import { map } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

const URL = 'http://localhost:3000/api/production/';

@Injectable({
  providedIn: 'root'
})
export class WeeklyScheduleService {

  public headers: any[] = [];
  private arrWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  private initialDate: Date;
  private productionsUpdated$ = new BehaviorSubject<Weeks[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  getWeeks = (start,  end): void => {
    let apiURL = URL + `?start=${start}&end=${end}`;
    this.http.get(apiURL).pipe(
      map((data) => Object.keys(data).map(k => {
        const { date, tower: { locality }, leader,
          status, activity: { name }, tower: { name: tower } } = data[k];
        return ({ date, locality, name, tower, leader, status });
      })))
      .subscribe((data) => {
        this.initialDate = start;
        this.productionsUpdated$.next(this.groupByActivity(data, 'name'));
      });
  }

  getData = (): Observable<Weeks[]> => this.productionsUpdated$.asObservable();

  getHeaders = (initialDate: string): any[] => this.getWeeksHeaders(initialDate);

  protected getWeeksHeaders = (initialDate: string) => {

    const weeksPT = this.setArrayWeeks(initialDate, "pt");
    const weeksUS = this.setArrayWeeks(initialDate, "us");;

    return weeksPT.map((weekPT, i) => {

      const currentDate = moment(initialDate, "DD/MM/YYYY");
      const afterDate = currentDate.add(i, "days").format("DD/MM/YYYY");
      const nextDate = currentDate.add("7", "days").format("DD/MM/YYYY");

      return {
        key: weekPT,
        header1: `${weekPT}: ${afterDate}`,
        header2: `${weekPT}: ${afterDate}`,
        header3: `${weekPT}: ${nextDate}`,
        cell: weeksUS[i]
      }
    })
  }

  protected groupByActivity = (obj, groupBy = 'name'): Weeks[] => obj.reduce((acc, cur) => {
    const activity = acc.find((el) => el[groupBy] == cur[groupBy]);

    const dayOfTheWeek = this.getDayOfTheWeek(cur['date']);
    const prod = this.setPlanningWeek(cur['status'], cur['tower'], cur['date']);
    const isExistProductions = { executed: prod.executed || ' ', planned: prod.planned || ' ', nextPlanned: prod.nextPlanned || ' ' };
    const weekIsTrue = week => dayOfTheWeek === week ? isExistProductions : { executed: ' ', planned: ' ', nextPlanned: ' ' };

    if (activity) {
      
      const planning = activity[dayOfTheWeek];
      
      planning.planned
        ? planning.planned += `${prod.planned || ''}`
        : { executed: ' ', planned: ' ', nextPlanned: ' ' };

      planning.executed
        ? planning.executed += `${prod.executed || ''}`
        : { executed: ' ', planned: ' ', nextPlanned: ' ' };

      planning.nextPlanned
        ? planning.nextPlanned += `${prod.nextPlanned || ''}`
        : { executed: ' ', planned: ' ', nextPlanned: ' ' };

        activity.totalPlanned += (prod.hasOwnProperty('planned') ? 1 : 0);
        activity.totalExecuted += (prod.hasOwnProperty('executed') ? 1 : 0);
        activity.totalNPlanned += (prod.hasOwnProperty('nextPlanned') ? 1 : 0);

    } else {
      acc.push({
        [groupBy]: cur[groupBy],
        locality: cur['locality'],
        leader: cur['leader'],
        Sunday: weekIsTrue('Sunday'),
        Monday: weekIsTrue('Monday'),
        Tuesday: weekIsTrue('Tuesday'),
        Wednesday: weekIsTrue('Wednesday'),
        Thursday: weekIsTrue('Thursday'),
        Friday: weekIsTrue('Friday'),
        Saturday: weekIsTrue('Saturday'),
        totalPlanned: (prod.hasOwnProperty('planned') ? 1 : 0),
        totalExecuted: (prod.hasOwnProperty('executed') ? 1 : 0),
        totalNPlanned: (prod.hasOwnProperty('nextPlanned') ? 1 : 0),
      })
    }
    return acc;
  }, []);

  protected setArrayWeeks = (initialDate, local) => {
    const weeks = [];
    for (let i = 0; i < 7; i++) {
      const nexDayOfTheWeekPT = moment(initialDate, "DD/MM/YYYY", `${local}`).add(i, "days");
      const currentDay = nexDayOfTheWeekPT.format("dddd");
      weeks.push(currentDay);
    }
    return weeks;
  }
  
  protected setPlanningWeek = (status, tower, date) => {
    const currentDate = moment(date).format("DD/MM/YYYY");
    const afterDate = moment(this.initialDate, "DD/MM/YYYY").add("7", "days").format("DD/MM/YYYY");

    if (currentDate < afterDate) {
      return status === 'EXECUTADO' ? { executed: `${tower}, ` } : { planned: `${tower}, ` };
    } 
    return status !== 'EXECUTADO' ? { nextPlanned: `${tower}, ` } : { nextPlanned: ' ' } ;
  }
  
  protected getDayOfTheWeek = (date: Date) => this.arrWeek[new Date(date).getDay()];

}