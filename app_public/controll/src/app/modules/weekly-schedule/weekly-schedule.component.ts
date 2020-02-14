import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { WeeklyScheduleService } from './weekly-schedule.service'

const headersObsolete = [
  {
    key: 'Domingo',
    header1: 'Domingo: ',
    header2: 'Domingo: ',
    cell: 'sanday'
  } , {
    key: 'Segunda',
    header1: 'Segunda: ',
    header2: 'Segunda: ',
    cell: 'monday'
  }, {
    key: 'Terça',
    header1: 'Terça: ',
    header2: 'Terça: ',
    cell: 'tuesday'
  }, {
    key: 'Quarta',
    header1: 'Quarta: ',
    header2: 'Quarta: ',
    cell: 'fouth'
  }, {
    key: 'Quinta',
    header1: 'Quinta: ',
    header2: 'Quinta: ',
    cell: 'fifth'
  }, {
    key: 'Sexta',
    header1: 'Sexta: ',
    header2: 'Sexta: ',
    cell: 'friday'
  }, {
    key: 'Sabado',
    header1: 'Sabado: ',
    header2: 'Sabado: ',
    cell: 'saturday'
  }
]
@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.scss']
})
export class WeeklyScheduleComponent implements OnInit {

  public headers: any[] = [];

  public dataSource = new MatTableDataSource();

  public displayedColumns: string[] = ['ID', 'Local', 'Atividade', 'Encarregado', 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];

  constructor( 
    private weeklyScheduleService: WeeklyScheduleService 
  ) { }

  ngOnInit() {
    
    this.weeklyScheduleService.getData().subscribe(data =>  this.dataSource.data = data);
    this.headers = this.weeklyScheduleService.getHeaders();
    console.log(this.headers);
    this.weeklyScheduleService.getWeeks('04/02/2020', '05/02/2020');

  }

}
