import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PDS } from './shared/pds';
import { PdsService } from './pds.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pds',
  templateUrl: './pds.component.html',
  styleUrls: ['./pds.component.scss']
})
export class PdsComponent implements OnInit {

  public displayedColumns: string[] = ['activity', 'unity', 'foreseen', 'inDay',
    'previous', 'current', 'accumulated', 'notExecuted', 'executed', 'planned', 'leader'];

  public dataSource = new MatTableDataSource();

  public pdsSub: Subscription;
  public productions = [];
  public totalActivities: number;
  public PDS = [];
  private expectedTowers: number;
  private expectedKm: number;

  constructor(private pdsService: PdsService) { }

  ngOnInit() {
    this.getExpectedTowerTotal();
    this.getExpectedKmTotal();
    this.PDSDataTransform('2020-01-28');


    console.log(this.dataSource.data);

  }

  PDSDataTransform = (date) => {
    this.pdsSub = this.pdsService.getForDate(date)
      .subscribe((data) => {

        const group = this.group(data, 'name');
        Object.keys(group).map((el) => {
          
          const { productions } = group[el];

          let currencyActivity = group[el].name;

          this.pdsService.productionsForActivity(currencyActivity).subscribe((data) => {

            let totalKm = [...productions].reduce((acc, obj) => acc += +((obj.km / 1000).toFixed(1)), 0);
            let totalTowers = [...productions].filter(element => element.status == 'EXECUTADO').length;
            let executed = [...productions].filter(element => element.status == 'EXECUTADO').map(el => el.tower);
            let planned = [...productions].filter(element => element.status == 'PROGRAMADO').map(el => el.tower);
            let foreseen = group[el].unity === 'torre' ? this.expectedTowers : this.expectedKm;
            let inDay = group[el].unity === 'torre' ? totalTowers : totalKm;
            let previous = (foreseen - inDay);

            const isExist = this.PDS.find(data => data.activity == group[el].name);

            if (!isExist) {
              this.PDS.push({
                activity: group[el].name,
                unity: group[el].unity,
                foreseen,
                previous,
                current: 0,
                accumulated: data,
                notExecuted: 0,
                inDay: inDay,
                planned,
                executed,
                leader: group[el].leader
              });
            }
          });
        })
        console.log(this.PDS);
        this.dataSource.data = this.PDS;
      });
  }

  protected flatten = groupBy => (acc, cur) => {
    const getNode = this.find(acc, cur, groupBy);
    getNode
      ? getNode.productions.push({
        tower: cur.tower,
        km: +(cur.forward),
        status: cur.status
      })
      : acc.push({
        [groupBy]: cur[groupBy],
        leader: cur.leader,
        unity: cur.unity,
        productions: [
          {
            tower: cur.tower,
            km: +(cur.forward),
            status: cur.status
          },
        ],
      });
    return acc;
  };


  protected find = (acc, cur, el) => acc.find(obj => obj[el] == cur[el]);

  protected group = (obj, groupBy = 'name') => obj.reduce(this.flatten(groupBy), []);

  protected getExpectedTowerTotal = () => {
    this.pdsService.getTotalTowers().subscribe(data => this.expectedTowers = data);
  }

  protected getExpectedKmTotal = () => {
    this.pdsService.getTotalKm().subscribe(data => this.expectedKm = +((data / 1000).toFixed(0)));
  }

  protected getTotalForActivity = (activity) => {
    this.pdsService.productionsForActivity(activity).subscribe((data) => this.totalActivities = data);
  }

  downloadPDF() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {

      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('PDS.pdf'); // Generated PDF   
    });
  }

  ngOnDestroy() {
    this.pdsSub.unsubscribe();
  }

}
