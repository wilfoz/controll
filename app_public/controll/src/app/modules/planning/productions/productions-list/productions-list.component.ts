import { Component, OnInit, Injector } from '@angular/core';
import { Production } from '../shared/production';
import { BaseListComponent } from 'src/app/shared/components/common/base-resource-list/base-resource-list.component';
import { ProductionService } from '../production.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProductionsDetailComponent } from '../productions-detail/productions-detail.component';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-productions-list',
  templateUrl: './productions-list.component.html',
  styleUrls: ['./productions-list.component.css']
})
export class ProductionsListComponent extends BaseListComponent<Production> implements OnInit {

  displayedColumns: string[] = [
    'Date',
    'Tower',
    'Activity',
    'Leader',
    'Status',
    'Comment',
    'update',
    'delete'
  ];

  constructor(
    private productionService: ProductionService,
    protected injector: Injector,
    private dialog: MatDialog,
  ) { 
    super(injector, productionService);

    this.dataSource.filterPredicate = (data: any, filter) => { 
      const dataStr =JSON.stringify(data).toLowerCase(); return dataStr.indexOf(filter) != -1;
    }

  }

  public editLeader(element): void {
    const id: string = element._id;
    this.productionService.getById(id)
      .pipe(
        map((res) => this.setReturnForm(res))
      )
      .subscribe(data => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '500px';
        dialogConfig.width = '450px';
        dialogConfig.data = data;

        const dialogRef = this.dialog.open(ProductionsDetailComponent, dialogConfig);
        dialogRef.afterClosed()
          .subscribe(result => {
            if (!result) {
              return;
            }
            this.productionService.update(result)
              .pipe(
                tap(() => this.notify('Cadastro Atualizado!'))
              )
              .subscribe(_ => this.getAllResources());
          });
      });
  }

  protected setReturnForm = (res) => {
    const { _id, date, tower: { name: tower }, activity: { name: activity }, leader, status, comment } = res;
    return {_id, date, tower, activity, leader, status, comment};
  }

}
