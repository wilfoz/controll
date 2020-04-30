import { Component, OnInit, Injector } from '@angular/core';
import { BaseListComponent } from '../../../shared/components/common/base-resource-list/base-resource-list.component';
import { Leader } from '../shared/leader';
import { LeadersService } from '../leaders.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { tap } from 'rxjs/operators';
import { LeaderDetailComponent } from '../leader-detail/leader-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leader-list',
  templateUrl: './leader-list.component.html',
  styleUrls: ['./leader-list.component.css']
})
export class LeaderListComponent extends BaseListComponent<Leader> implements OnInit {

  displayedColumns: string[] = [
    'Name',
    'Occupation',
    'details',
    'update',
    'delete'
  ];

  constructor(
    private leadersService: LeadersService,
    protected injector: Injector,
    private dialog: MatDialog,
    private router: Router
  ) { super(injector, leadersService); }

  editLeader(element): void {
    const id: string = element._id;
    this.leadersService.getById(id).subscribe(data => {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.height = '400px';
      dialogConfig.width = '450px';
      dialogConfig.data = data;

      const dialogRef = this.dialog.open(LeaderDetailComponent, dialogConfig);
      dialogRef.afterClosed()
        .subscribe(result => {
          if (!result) {
            return;
          }
          this.leadersService.update(result)
            .pipe(
              tap(() => this.notify('Cadastro Atualizado!'))
            )
            .subscribe(_ => this.getAllResources());
        });
    });
  }

  createListForExcel = (list: any) => {
    list.map((l) => {
      if (l[0] !== undefined) {
        const line: Leader = {
          name: l[0],
          office: l[1],
        };
        this.createListItem(line);
      }
    });
  }

  receiverData(event) {
    this.createListForExcel(event);
    this.notify('Atualizado');
    this.getAllResources();
  }

  createListItem(line: any) {
    this.leadersService.create(line).subscribe(data => data);
  }

}
