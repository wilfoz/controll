import { Component, OnInit } from '@angular/core';
import { DashBoardService } from './dashboard.service';
import { PieService } from './pie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public cardsDaTa = [];
  public pieChartData = [];
  public barChartDataCivil = [];

  public civil = ['Locação de cavas', 'Escavação 100%', 'Concretagem 100%'];
  public montagem = ['Pré-montagem', 'Içamento', 'Revisão'];
  public lancamento = ['Lançamento cabo condutor', 'Lançamento cabo para-raio', 'Lançamento cabo OPGW'];

  constructor(
    private pieService: PieService,
    private dashBoardService: DashBoardService
  ) { }

  ngOnInit() {
    this.cardsDaTa = this.dashBoardService.getdataCards();
    this.pieChartData = this.pieService.pie();
    this.barChartDataCivil = this.dashBoardService.getDataBar(this.civil);
  }

}
