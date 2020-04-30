import { Component, OnInit, Injector } from '@angular/core';
import { BaseFormsResourceComponent } from 'src/app/shared/components/common/base-forms-resource/base-forms-resource';
import { Production } from '../shared/production';
import { ProductionService } from '../production.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-productions-new',
  templateUrl: './productions-new.component.html',
  styleUrls: ['./productions-new.component.css'],
})
export class ProductionsNewComponent extends BaseFormsResourceComponent<Production> implements OnInit {

  public production: Production;
  public productions: any[] = [];
  public towers: any[] = [];
  public leaders: any[] = [];
  public activities: any[] = [];
  public status = ['EXECUTADO', 'PROGRAMADO', 'ANDAMENTO'];

  constructor(
    protected productionService: ProductionService,
    protected injector: Injector,
  ) {
    super(injector, new Production(), productionService, Production.fromJson);
  }

  ngOnInit() {
    super.ngOnInit();
    this.listsActivities();
    this.listsLeaders();
    this.listsTowers();
    this.listsProductions();
  }

  submitForm(listFormValue) {
    if (this.resourceForm.valid) {
      this.executeListAction(listFormValue);
    }
  }

  hasError = (controlName: string, errorName: string) => {
    return this.resourceForm.controls[controlName].hasError(errorName);
  }

  onCancel = () => {
    this.router.navigate(['production']);
  }

  buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      date: [null, [Validators.required]],
      activity: [null, [Validators.required]],
      tower: [null, [Validators.required]],
      leader: [null, [Validators.required]],
      status: [null, [Validators.required]],
      comment: [null],
    });
  }

  executeListAction(listFormValue) {
    this.production = {
      ...listFormValue
    };
    const tower = this.production.tower;
    const activity = this.production.activity;

    const query = element => element.tower === tower && element.name === activity && element.status === 'EXECUTADO';

    const alreadyRegistered = this.productions.find(query);
    
    if (!alreadyRegistered) {
      this.create(this.production)
    } else {
      this.notify(`Produção já cadastrada! ${activity} - torre: ${tower}`);
    }
  }

  create = (production: Production) => {
    this.productionService.create(production).subscribe(
      (res) => {
        this.notify('Cadastrado!')
        this.router.navigate(['production']);
      },
      error => this.actionsForError(error)
    )
  }

  listsProductions = () => {
    this.productionService.getAllProductions().subscribe(
      (data) => data.map((res: any) => {
        const { tower: {name: tower}, activity: { name }} = res
        this.productions.push({tower, name});
      })
    )
  }

  listsActivities = () => {
    this.productionService.getAllActivities().subscribe(
      (res) => this.mapToResource(res, this.activities)
    );
  }

  listsTowers = () => {
    this.productionService.getAllTowers().subscribe(
      (res) => this.mapToResource(res, this.towers)
    );
  }

  listsLeaders = () => {
    this.productionService.getAllLeaders().subscribe(
      (res) => this.mapToResource(res, this.leaders)
    );
  }

  mapToResource = (res, arr) => res.map((resource) => {
    arr.push(resource.name);
  })

}
