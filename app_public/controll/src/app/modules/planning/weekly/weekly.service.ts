import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Weeks } from './shared/weekly-schedule.model';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
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

  getWeeks = (start, end): void => {
    let apiURL = URL + `?start=${start}&end=${end}`;
    this.http.get(apiURL).pipe(
      map((data) => Object.keys(data).map(k => {
        const { date, tower: { locality }, leader, activity: { unity },
          status, activity: { name }, tower: { name: tower }, tower: { forward } } = data[k];
        return ({ date, locality, name, tower, leader, status, unity, forward });
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
    const weekIsTrue = week => dayOfTheWeek === week ? isExistProductions : { executed: ' ', planned: ' ', nextPlanned: ' ' };
    const isExistProductions = { executed: prod.executed || ' ', planned: prod.planned || ' ', nextPlanned: prod.nextPlanned || ' ' };

    if (activity) {

      const planning = activity[dayOfTheWeek];
      const arrObj = ['planned', 'executed', 'nextPlanned']

      for (let item of arrObj) {
        planning[item]
          ? planning[item] += `${prod[item] || ''}`
          : { executed: ' ', planned: ' ', nextPlanned: ' ' };
      }

      activity.totalExecuted += this.addExecuted(cur);
      activity.totalPlanned += this.addPlanned(activity, cur)
      activity.totalNPlanned += this.addNextPlanned(activity, cur);

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

  protected addPlanned = (obj, currObj) => {
    const { Sunday: { planned: sunday }, Monday: { planned: monday }, Tuesday: { planned: tuesday },
      Wednesday: { planned: wednesday }, Thursday: { planned: thursday }, Friday: { planned: friday } } = obj;
    const arr = [sunday, monday, tuesday, wednesday, thursday, friday];
    const towersFiltered = this.applyStringMethods(arr, currObj['tower']);
    let total: number;

    if (towersFiltered.length === 1) {
      total = currObj['unity'] === 'torre' ? 1 : +((currObj['forward'] / 1000).toFixed(1));
    } else {
      total = 0;
    }
    return total;
  }

  protected addNextPlanned = (obj, currObj) => {
    
    const { Sunday: { nextPlanned: sunday }, Monday: { nextPlanned: monday }, Tuesday: { nextPlanned: tuesday },
      Wednesday: { nextPlanned: wednesday }, Thursday: { nextPlanned: thursday }, Friday: { nextPlanned: friday } } = obj;

    const arr = [sunday, monday, tuesday, wednesday, thursday, friday];
    const towersFiltered = this.applyStringMethods(arr, currObj['tower']);
    let total: number;

    if (towersFiltered.length === 1) {
      total = currObj['unity'] === 'torre' ? 1 : +((currObj['forward'] / 1000).toFixed(1));
    } else {
      total = 0;
    }
    return total;
  }

  protected addExecuted = (currObj) => {
    const isTrue = currObj['status'] === 'EXECUTADO';
    let total: number;
    if (isTrue) {
      total = currObj['unity'] === 'torre' ? 1 : +((currObj['forward'] / 1000).toFixed(1));
    } else {
      total = 0
    }
    return total
  }

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
    const currentDate = moment(date).format("YYYY-MM-DD");
    const afterDate = moment(this.initialDate, "DD/MM/YYYY").add("7", "days").format("YYYY-MM-DD");
    const isTrue = moment(currentDate).isBefore(afterDate);

    if (isTrue) {
      return status === 'EXECUTADO' ? { executed: `${tower}, ` } : { planned: `${tower}, ` };
    }
    return status !== 'EXECUTADO' ? { nextPlanned: `${tower}, ` } : { nextPlanned: ' ' };
  }

  protected applyStringMethods = (arr, tower) => this.filteredTowers(arr).map(data => {
    if (data.length > 0) {
      return data.trim().split(',').filter(el => el === tower)
    }
  })

  protected filteredTowers = (arr: any): any[] => arr.filter(element => element !== " ");

  protected getDayOfTheWeek = (date: Date) => this.arrWeek[new Date(date).getDay()];

}