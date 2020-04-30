import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BuildingList } from '../shared/models/building-list';
import { BuildingListService } from '../building-list.service';
import { BaseFormsResourceComponent } from '../../../shared/components/common/base-forms-resource/base-forms-resource';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-new.component.html',
  styleUrls: ['./list-new.component.css']
})
export class ListNewComponent extends BaseFormsResourceComponent<BuildingList> implements OnInit {

  public floatPattern = /^-?(0|[1-9]\d*)(\.\d+)?$/;
  public list: BuildingList;

  constructor(
    protected buildingListService: BuildingListService,
    protected injector: Injector
  ) {
    super(injector, new BuildingList(), buildingListService, BuildingList.fromJson);
  }

  public submitForm(listFormValue) {
    if (this.resourceForm.valid) {
      this.executeListAction(listFormValue);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resourceForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.router.navigate(['building-list']);
  }

  // PROTECTED METHODS
  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      project: [null],
      name: [null, [Validators.required, Validators.maxLength(10)]],
      type: [null, [Validators.required, Validators.maxLength(8)]],
      locality: [null, [Validators.required, Validators.maxLength(30)]],
      coords: this.formBuilder.group({
        lat: [null, [Validators.required, Validators.pattern(this.floatPattern)]],
        lng: [null, [Validators.required, Validators.pattern(this.floatPattern)]],
      }),
      forward: [null, [Validators.required, Validators.minLength(1)]],
      height: [null, [Validators.required, Validators.minLength(1)]],
      released: [null, [Validators.required]],
      foundation_MC: null,
      foundation_A: null,
      foundation_B: null,
      foundation_C: null,
      foundation_D: null,
    });
  }

  protected executeListAction(listFormValue) {

    const { project, name, type, locality, released, foundation_MC, foundation_A, foundation_B, foundation_C, foundation_D } = listFormValue;

    const lat = listFormValue.coords.lat;
    const lng = listFormValue.coords.lng;

    this.list = {
      project,
      name,
      type,
      locality,
      coords: {
        coordinates: [lng, lat]
      },
      forward: +listFormValue.forward,
      weight: +listFormValue.weight,
      height: +listFormValue.height,
      released,
      foundation_MC,
      foundation_A,
      foundation_B,
      foundation_C,
      foundation_D,
    };

    this.createResource(this.list);
    this.router.navigate(['building-list']);
  }

}
