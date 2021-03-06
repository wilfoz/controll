import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as XLSX from 'xlsx';
import { BuildingList } from '../../modules/building-list/shared/models/building-list';


@Component({
  selector: 'app-filereader',
  templateUrl: './filereader.component.html',
  styleUrls: ['./filereader.component.css']
})
export class FilereaderComponent {

  @Output() data = new EventEmitter<BuildingList[]>();

  onFileChange(evt: any) {

    /* wire up file reader */
    const target: DataTransfer = evt.target as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data.emit((XLSX.utils.sheet_to_json(ws, { header: 1 })));

    };
    reader.readAsBinaryString(target.files[0]);
  }

}

