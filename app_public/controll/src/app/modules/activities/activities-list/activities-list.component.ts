import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from '../../../shared/components/commun/base-resource-list/base-resource-list.component';
import { Activity } from '../shared/activity';
import { ActivityService } from '../activity.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivityDetailComponent } from '../activity-detail/activity-detail.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.css']
})
export class ActivitiesListComponent extends BaseListComponent<Activity> implements OnInit {

  displayedColumns: string[] = [
    'Etapa',
    'Atividade',
    'Unidade',
    'details',
    'update',
    'delete'
  ];

  constructor(
    private activityService: ActivityService,
    protected injector: Injector,
    private dialog: MatDialog
  ) { super(injector, activityService); }

  createListForExcel = (activities: any) => {
    activities.map((activity) => {
      if (activity[0] !== undefined) {
        const line: Activity = {
          name: activity[0],
          unity: activity[1],
          group: activity[3],
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
    this.activityService.create(line)
      .pipe(
      ).subscribe(console.log);
  }

  editLeader(element): void {
    const id: string = element._id;
    this.activityService.getById(id).subscribe(data => {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.height = '400px';
      dialogConfig.width = '450px';
      dialogConfig.data = data;

      const dialogRef = this.dialog.open(ActivityDetailComponent, dialogConfig);
      dialogRef.afterClosed()
        .subscribe(result => {
          if (!result) {
            return;
          }
          this.activityService.update(result)
            .pipe(
              tap(() => this.notify('Cadastro Atualizado!'))
            )
            .subscribe(_ => this.getAllResources());
        });
    });
  }

}
