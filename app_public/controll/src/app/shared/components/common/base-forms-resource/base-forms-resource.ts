import { OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResourceModel } from '../../../model/base-resource.model';
import { BaseResourceService } from '../../../service/base-service-resource';
import { MatSnackBar } from '@angular/material';

export abstract class BaseFormsResourceComponent<T extends BaseResourceModel> implements OnInit {

  public resourceForm: FormGroup;
  public pageTitle = 'Novo';
  public serverErrorMessages: string[] = null;
  public submittingForm = false;
  public snackBar: MatSnackBar;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourcefn: (jsonData) => T
  ) {
    this.route = this.injector.get(ActivatedRoute),
    this.router = this.injector.get(Router),
    this.formBuilder = this.injector.get(FormBuilder);
    this.snackBar = this.injector.get(MatSnackBar);
  }

  ngOnInit() {
    this.buildResourceForm();
  }

  // PRIVATE METHODS

  protected createResource(resource: T) {
    this.resourceService.create(resource)
      .subscribe(
        res => this.actionsForSuccess('Cadastrado!'),
        error => this.actionsForError(error)
      );
  }

  protected actionsForSuccess(msg) {
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;
    this.notify(msg);

    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true})
      .then(
        () => this.router.navigate([baseComponentPath, 'create'])
      );
  }

  protected actionsForError(error) {
    this.submittingForm = false;
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com servidor. Por favor tente mais tarde!'];
    }
  }

  protected notify(msg: string) {
    this.snackBar.open(msg, 'OK', {duration: 3000});
  }

  protected abstract buildResourceForm(): void;
}
