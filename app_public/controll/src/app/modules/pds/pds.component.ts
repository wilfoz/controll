import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PdsService } from './pds.service';
import { PDS } from './shared/pds';

@Component({
  selector: 'app-pds',
  templateUrl: './pds.component.html',
  styleUrls: ['./pds.component.scss'],

})
export class PdsComponent implements OnInit {

  public displayedColumns: string[] = ['activity', 'unity', 'foreseen', 'inDay',
    'previous', 'current', 'accumulated', 'notExecuted', 'executed', 'planned', 'leader'];

  public dataSource = new MatTableDataSource();
  public totalActivities: number;
  private expectedTowers: number;
  private expectedKm: number;

  constructor(
    private pdsService: PdsService,
  ) { }

  ngOnInit() {
    this.getExpectedTowerTotal();
    this.getExpectedKmTotal();
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

  changeDate = (event: MatDatepickerInputEvent<Date>) => {

    const current = new Date(event.value);
    const previous = new Date();
    previous.setDate(current.getDate() - 1);

    const formatedCurrent = current.toLocaleDateString();
    const formatedPrevious = previous.toLocaleDateString();

    this.PDSDataTransform(formatedPrevious, formatedCurrent);
  }

  protected PDSDataTransform = (start, end) => {
    this.pdsService.getForDate(start, end)
      .subscribe((data) => {
        const group = this.group(data, 'name');
        const pds: PDS[] = Object.keys(group).map((el) => {
          const { productions } = group[el];
          
          let totalKm = [...productions].filter(element => element.status == 'EXECUTADO')
                                          .reduce((acc, obj) => acc += +((obj.km / 1000).toFixed(1)), 0);                              
          let executed = this.filtered([...productions], 'EXECUTADO');
          let planned = this.filtered([...productions], 'PROGRAMADO');
          let progress = this.filtered([...productions], 'ANDAMENTO');
          let foreseen = group[el].unity === 'torre' ? this.expectedTowers : this.expectedKm;
          let inDay = group[el].unity === 'torre' ? executed.length : totalKm;
        
          const obj = {
            activity: group[el].name,
            unity: group[el].unity,
            foreseen,
            previous: 0,
            current: 0,
            accumulated: '',
            notExecuted: 0,
            inDay: inDay,
            planned: planned.join(', ') + (progress.length > 0 ? `, ${progress}` : ''),
            executed: executed.join(', ') + (progress.length > 0 ? `, ${progress} (And),` : ''),
            leader: group[el].leader
          }

          let currencyActivity = group[el].name;

          const refactoryObj = this.setOthersAtrs(obj, currencyActivity);

          return refactoryObj;
        });

        this.dataSource.data = pds;
      });
  }

  protected setOthersAtrs = (obj: PDS, activity) => {

    if(obj.unity === 'torre') {
      this.pdsService.getTotalTowersByActivity(activity).subscribe(total => {
        obj.current = total;
        obj.notExecuted = +(obj.foreseen - total);
        obj.previous = total - obj.inDay;
        obj.accumulated = `${(obj.notExecuted / obj.foreseen).toFixed(0)}%`
      });
    }else {
      this.pdsService.getTotalKmByActivity(activity).subscribe(total => {
        let km = (total/1000)
        obj.current = +(km).toFixed(1);
        obj.notExecuted = +(obj.foreseen - km).toFixed(1);
        obj.previous = +((km - obj.inDay).toFixed(1));
        obj.accumulated = `${(obj.notExecuted / obj.foreseen).toFixed(0)}%`
      });
    }

    return obj;
  };

  protected flatten = groupBy => (acc, cur) => {
    const getNode = this.find(acc, cur, groupBy);

    getNode
      ? getNode.productions.push({
        tower: cur.tower,
        km: +(cur.forward),
        date: cur.date,
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
            date: cur.date,
            status: cur.status
          },
        ],
      });
    return acc;
  };

  protected filtered = (data, status) => data.filter(element => element.status == status).map(el => el.tower);
  
  protected find = (acc, cur, el) => acc.find(obj => obj[el] == cur[el]);

  protected group = (obj, groupBy = 'name') => obj.reduce(this.flatten(groupBy), []);

  protected getExpectedTowerTotal = () => {
    this.pdsService.getTotalTowers().subscribe(data => this.expectedTowers = data);
  }

  protected getExpectedKmTotal = () => {
    this.pdsService.getTotalKm().subscribe(data => this.expectedKm = +((data / 1000).toFixed(0)));
  }

}
