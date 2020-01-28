import { Component, Injector, ViewChild, OnInit } from '@angular/core';
import { BuildingList } from '../shared/models/building-list';
import { BuildingListService } from '../building-list.service'
import { BaseListComponent } from '../../../shared/components/commun/base-resource-list/base-resource-list.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ListDetailComponent } from '../list-detail/list-detail.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseListComponent<BuildingList> implements OnInit {

  displayedColumns: string[] = [
    'torre',
    'tipo',
    'altura',
    'coords',
    'vão',
    'peso(kg)',
    'localidade',
    'status',
    'details',
    'update',
    'delete'
  ];

  constructor(
    private buildingListService: BuildingListService,
    protected injector: Injector,
    private dialog: MatDialog
  ) { super(injector, buildingListService); }

  createListForExcel = (list: any) => {
    list.map((l) => {
      if (l[0] !== undefined) {
        const line: BuildingList = {
          name: l[0],
          type: l[1],
          locality: l[2],
          coords: {
            coordinates: [l[3], l[4]]
          },
          weight: l[5],
          height: l[6],
          forward: l[7],
          released: l[8],
        };
        this.createListItem(line);
      }
    });
  }

  receiverData(event) {
    this.createListForExcel(event);
    this.notify('Atualizado');
  }

  createListItem(line: any) {
    this.buildingListService.create(line).subscribe(console.log);
  }

  editContact(element): void {
    const id: string = element._id;
    this.buildingListService.getById(id).subscribe(data => {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '450px';
        dialogConfig.width = '450px';
        dialogConfig.data = data;

        const dialogRef = this.dialog.open(ListDetailComponent, dialogConfig);
        dialogRef.afterClosed()
        .pipe(tap(console.log))
        .subscribe(result => {
            if (!result) {
                return;
            }
            this.buildingListService.update(result)
            .pipe(
              tap(() => this.notify('Cadastro Atualizado!'))
            )
                .subscribe(_ => this.getAllResources());
        });
    });
}

}
