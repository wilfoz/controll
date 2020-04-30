import { OnInit, Injector, ViewChild } from '@angular/core';
import { BaseResourceModel } from '../../../model/base-resource.model';
import { BaseResourceService } from '../../../service/base-service-resource';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export abstract class BaseListComponent<T extends BaseResourceModel> implements OnInit {

  public dataSource = new MatTableDataSource();
  private subscribe$: Subscription;
  public snackBar: MatSnackBar;
  public isLoading = false;

  // MatPaginator
  public length = 235;
  public pageSize = 10;
  public currentPage = 1;
  public pageSizeOptions: number[] = [10, 25, 100];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    protected injector: Injector,
    private resourceService: BaseResourceService<T>,
  ) {
    this.snackBar = this.injector.get(MatSnackBar);
  }

  ngOnInit() {
    this.isLoading = true;
    this.getAllResources();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllResources() {
    this.subscribe$ = this.resourceService.getAll(this.pageSize, this.currentPage)
      .subscribe((data: T[]) => {
        this.isLoading = false;
        this.dataSource.data = data;
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.getAllResources();
  }

  deleteResource(resource: T) {
    const mustDelete = confirm('Deseja realmente excluir este item?');
    this.isLoading = true;
    if (mustDelete) {
      this.resourceService.delete(resource._id)
        .pipe(
          tap(() => {
            this.isLoading = false;
            this.notify('Deletado!')
          })
        )
        .subscribe(
          () => this.dataSource.data = this.dataSource.data.filter(element => element !== resource),
          (err) => () => console.log(err),
        );
    }
  }
  
  protected notify(msg: string) {
    this.snackBar.open(msg, 'OK', { duration: 3000 });
  }

  ngOnDestroy() {
    if (this.subscribe$)
      this.subscribe$.unsubscribe()
  }
}
