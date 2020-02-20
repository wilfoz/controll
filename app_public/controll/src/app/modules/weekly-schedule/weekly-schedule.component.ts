import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { WeeklyScheduleService } from './weekly-schedule.service'
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss'],

})
export class WeeklyScheduleComponent implements OnInit {

  public headers: any[] = [];
  public date = new FormControl(new Date());
  private weeklyScheduleSub: Subscription;
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['LOCAL', 'ATIVIDADE', 'ENCARREGADO', 'STATUS'];

  constructor( 
    private weeklyScheduleService: WeeklyScheduleService 
  ) { }

  ngOnInit() {
    this.setInitialDate();
    this.weeklyScheduleSub = this.weeklyScheduleService.getData().subscribe(data =>  {
      this.dataSource.data = data;
    });
  } 

  setInitialDate = () => {
    const current = (this.date.value).toLocaleDateString();
    const beforeDate = moment(current, "DD/MM/YYYY").subtract("7", "days").format("DD/MM/YYYY");
    const afterDate = moment(current, "DD/MM/YYYY").add("7", "days").format("DD/MM/YYYY");
    
    this.weeklyScheduleService.getWeeks(beforeDate, current ,afterDate);
    this.headers = this.weeklyScheduleService.getHeaders(current);
    
    this.setDisplayedColumns(this.headers);
    
  }
  
  changeDate = (event: MatDatepickerInputEvent<Date>) => {
    this.displayedColumns = ['LOCAL', 'ATIVIDADE', 'ENCARREGADO', 'STATUS']
    
    const current = event.value.toLocaleDateString();
    const beforeDate = moment(current, "DD/MM/YYYY").subtract("7", "days").format("DD/MM/YYYY");
    const afterDate = moment(current, "DD/MM/YYYY").add("7", "days").format("DD/MM/YYYY");
    
    this.weeklyScheduleService.getWeeks(beforeDate, current, afterDate);
    this.headers = this.weeklyScheduleService.getHeaders(current);
    this.setDisplayedColumns(this.headers);
    
  }
  
  protected setDisplayedColumns = data => data.map(header => this.displayedColumns.push(header.key));

  ngOnDestroy() {
    this.weeklyScheduleSub.unsubscribe();
  }

}
