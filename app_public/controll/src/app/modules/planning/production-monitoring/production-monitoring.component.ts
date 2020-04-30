import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Diagram } from './shared/models/diagram';
import { ProductionMonitoringService } from './production-monitoring.service';
import { MatDialog } from '@angular/material';
import { InfoDetailComponent } from './shared/modal/info/app-info-detail.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Civil } from './shared/models/civil';

@Component({
  selector: 'app-production-monitoring',
  templateUrl: './production-monitoring.component.html',
  styleUrls: ['./production-monitoring.component.scss']
})
export class ProductionMonitoringComponent implements OnInit {

  public cards: Diagram[];
  public cols: number;

  public buildingListSub: Subscription;
  public productions: any[] = [];

  private foundations = ['(MC-E)', '(MC-F)', '(A)', '(B)', '(C)', '(D)'];

  constructor(
    private productionsMonitoringService: ProductionMonitoringService,
    public breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.changeBreakpoints();

    this.productionsMonitoringService.getBuildingList();

    this.productions = this.route.snapshot.data.prod;

    this.buildingListSub = this.productionsMonitoringService.getBuildingListUpdated().subscribe((data) => {

      this.cards = data.map((element: Diagram) => {

        const civil = this.setCivil(element['name'], element['type']);
        const assembly = this.setAssembly(element['name']);
        const status = assembly[0] ? 'MONTAGEM' : 'CIVIL';
        const comment = this.getComments(element['name']);

        const result = Object.assign(element, { status }, { assembly: assembly || '' }, { civil: civil }, { comments: comment || ''} );

        return result;

      })

    });
  }

  changeBreakpoints = () => {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {

      if (result.breakpoints[Breakpoints.XSmall]) this.cols = 10;

      if (result.breakpoints[Breakpoints.Small]) this.cols = 10;

      if (result.breakpoints[Breakpoints.Medium]) this.cols = 12;

      if (result.breakpoints[Breakpoints.Large]) this.cols = 18;

      if (result.breakpoints[Breakpoints.XLarge]) this.cols = 20;
    });
  }

  openDialog(card: any): void {

    const dialogRef = this.dialog.open(InfoDetailComponent, {
      width: '500px',
      height: 'auto',
      data: card
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  setAssembly = tower => this.filter(tower, 'MONTAGEM').map(data => data.activity);

  setCivil = (tower, type) => {

    const filtered = this.filter(tower, 'CIVIL');
    const handleCivil = this.handleFoundations(filtered, type);
    const findMethods = Object.keys(handleCivil).filter(key => handleCivil[key] !== undefined);

    const result = filtered !== undefined
            ? handleCivil[`${findMethods[0]}`]
            : this.handleBlankCivil(type);

    return result;

  }

  handleFoundations = (filtered, type) => {
    return {
      conclued: this.handleConclued(filtered, type),
      byFoundations: this.handleByFoundations(filtered, type),
    }
  }

  handleBlankCivil = (type) => {

    const obj = type.includes('CR')
                ? { MCE: '', MCF: '', A: '', B: '', C: '', D: '' }
                : { A: '', B: '', C: '', D: '' };

    return obj;
  }

  handlePreliminaryServices = (filtered, type): Object => {

    const obj = {};
    let status = this.verifyActivitiesCivil(filtered, 'Locação de cavas e pts de fincamentos');
    let activity = status[0] ? status[0].activity : '';

    this.foundations.map(foundation => {
      let name = foundation.replace('(', '').replace(')', '').replace('-', '');
      Object.assign(obj, { [name]: activity });
    })

    !type.includes('CR')
      ? delete obj['MCE'] && delete obj['MCF']
      : null;

    return obj;

  }

  handleByFoundations = (filtered, type): Object => {

    const obj = {};
    const search = this.foundations.map((element) => filtered.filter(el => el.activity.indexOf(element) > -1)).map(data => data.pop());
    const activityFiltered = Object.values(search).filter(value => value !== undefined);
    const preliminary = this.handlePreliminaryServices(filtered, type);

    this.foundations.map(foundation => {
      let name = foundation.replace('(', '').replace(')', '').replace('-', '');
      let result = activityFiltered.find(element => element.activity.indexOf(foundation) > -1);

      let current = result !== undefined ? result.activity : preliminary[name];
      return Object.assign(obj, { [name]: current });

    })

    !type.includes('CR')
      ? delete obj['MCE'] && delete obj['MCF']
      : null;
      
    if (Object.entries(obj).length > 0) return obj;

  }

  handleConclued = (filtered, type): Object => {

    const obj = {};
    const completed = ['Concreto in loco - concluído', 'Ancoragem em rocha concluído', 'Fundação 100% concluído'];

    completed.map((element) => {
      
      let status = this.verifyActivitiesCivil(filtered, element);
      let activity = status[0] ? status[0].activity : '';

      if (activity) Object.assign(obj, this.getConclued(activity));

    })

    !type.includes('CR')
      ? delete obj['MCE'] && delete obj['MCF']
      : null;

    if (Object.entries(obj).length > 0) return obj;

  }

  getConclued = (status): Civil => {
    return {
      'Fundação 100% concluído': {
        'MCE': 'Fundação 100% concluído',
        'MCF': 'Fundação 100% concluído',
        'A': 'Fundação 100% concluído',
        'B': 'Fundação 100% concluído',
        'C': 'Fundação 100% concluído',
        'D': 'Fundação 100% concluído'
      },
      'Concreto in loco - concluído': {
        'MCE': 'Concreto in loco - concluído',
        'MCF': 'Concreto in loco - concluído',
        'A': 'Concreto in loco - concluído',
        'B': 'Concreto in loco - concluído',
        'C': 'Concreto in loco - concluído',
        'D': 'Concreto in loco - concluído'
      },
      'Ancoragem em rocha concluído': {
        'MCE': 'Ancoragem em rocha concluído',
        'MCF': 'Ancoragem em rocha concluído',
        'A': 'Ancoragem em rocha concluído',
        'B': 'Ancoragem em rocha concluído',
        'C': 'Ancoragem em rocha concluído',
        'D': 'Ancoragem em rocha concluído'
      }
    }[status] || ''
  }

  filter = (tower, status) => this.productions.filter(prod => prod['tower'] === tower && prod['group'] === status && prod['mark'] === 'SIM');

  verifyActivitiesCivil = (filtered, activity) => filtered.filter(element => element.activity === activity);

  filterComments = tower => this.productions.filter((element => element['tower'] === tower && element.comment));

  getComments = (tower: {activity: string, comment: string}) => this.filterComments(tower).map( data=> ({ activity: data.activity, comment: data.comment }));

  ngOnDestroy(): void {
    this.buildingListSub.unsubscribe();
  }

}
