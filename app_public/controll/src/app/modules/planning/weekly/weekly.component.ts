import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { WeeklyScheduleService } from './weekly.service'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss'],

})
export class WeeklyComponent implements OnInit {

  public headers: any[] = [];
  public date = new FormControl(new Date());
  private weeklyScheduleSub: Subscription;
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['LOCAL', 'ATIVIDADE', 'ENCARREGADO', 'STATUS'];

  constructor( 
    private weeklyScheduleService: WeeklyScheduleService 
  ) { }

  ngOnInit() {
    this.setData(this.date);
    this.weeklyScheduleSub = this.getData();
  } 

  getData = () => this.weeklyScheduleService.getData().subscribe(data => this.dataSource.data = data);
  
  setData = (date: any) => {
    const dates = this.setDate(date);
    this.weeklyScheduleService.getWeeks(dates.current, dates.afterDate);
    this.headers = this.weeklyScheduleService.getHeaders(dates.current);
    this.setHeaders(this.headers);
    this.getData();
  }

  changeDate = (event: MatDatepickerInputEvent<Date>) => this.setData(event);
  
  setDate = (date: any) => {
    const current = (date.value).toLocaleDateString();
    const afterDate = moment(current, "DD/MM/YYYY").add("14", "days").format("DD/MM/YYYY");
    return {
      current,
      afterDate
    }
  }

  protected insertWeeksInHeaders = data => data.map(header => this.displayedColumns.push(header.key));

  protected setHeaders = (data) => {
    this.displayedColumns = ['LOCAL', 'ATIVIDADE', 'ENCARREGADO', 'STATUS']
    this.insertWeeksInHeaders(data);
    this.displayedColumns.push('TOTAIS')
  }

  ngOnDestroy() {
    this.weeklyScheduleSub.unsubscribe();
  }

}
