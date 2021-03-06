import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDatepickerInputEvent } from '@angular/material';

import * as jsPDF from 'jspdf';
import * as moment from 'moment';

import html2canvas from 'html2canvas';
import { PdsService } from './pds.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pds',
  templateUrl: './pds.component.html',
  styleUrls: ['./pds.component.scss'],

})
export class PdsComponent implements OnInit {

  public displayedColumns: string[] = ['activity', 'unity', 'foreseen', 'inDay',
    'previous', 'current', 'accumulated', 'notExecuted', 'executed', 'planned', 'leader'];

  public date = new FormControl(new Date());
  public dataSource = new MatTableDataSource();
  private pdsSub: Subscription;
  public totalActivities: number;

  constructor(
    private pdsService: PdsService,
  ) { }

  ngOnInit() {
    this.getAll(this.date);
  }

  getAll = (date: any) =>{
    //const current = new Date(date.value).toLocaleDateString();
    //const previous = moment(current, "DD/MM/YYYY").subtract("1", "day").format("DD/MM/YYYY");
    this.pdsService.getAll('04/02/2020', '05/02/2020').subscribe(data => this.dataSource.data = data);
  }


  changeDate = (event) => {
  }

  /*changeDate = (event: MatDatepickerInputEvent<Date>) => {
    const current = new Date(event.value).toLocaleDateString();
    const previous = moment(current, "DD/MM/YYYY").subtract("1", "day").format("DD/MM/YYYY");
    this.pdsService.getAll(previous, current).subscribe(data => console.log(data))
  }*/

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
    //this.pdsSub.unsubscribe();
  }


}
