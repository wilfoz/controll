import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

const DATA = [
  {
    activity: 'Locação de Cavas', leader: 'WILERSON', 
    monday: {
      planned: '0/1', 
      executed: '0/2'
    }, 
    tuesday: {
      planned: '0/1, 0/2, 0/3', 
      executed: '0/2'
    },
    fourth: {
      planned: '0/1, 1/1, 1/3', 
      executed: '0/2'
    },  
    fifth: {
      planned: '0/1', 
      executed: '0/2'
    },  
    friday: {
      planned: '0/1', 
      executed: '0/2'
    },
    saturday: {
      planned: '0/1', 
      executed: '0/2'
    }
  },
]

@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnInit {

  constructor() { }

  public displayedColumns: string[] = ['Encarregado', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

  public dataSource = new MatTableDataSource(DATA);

  ngOnInit() {
  }



}
