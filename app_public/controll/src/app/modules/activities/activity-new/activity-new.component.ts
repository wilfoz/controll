import { Component, OnInit, Injector } from '@angular/core';
import { Activity } from '../shared/activity';
import { BaseFormsResourceComponent } from '../../../shared/components/commun/base-forms-resource/base-forms-resource'
import { ActivityService } from '../activity.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-activity-new',
  templateUrl: './activity-new.component.html',
  styleUrls: ['./activity-new.component.css']
})
export class ActivityNewComponent extends BaseFormsResourceComponent<Activity> implements OnInit {

  public activity: Activity;
  public groups = ['CIVIL', 'MONTAGEM', 'LANÇAMENTO', 'COMISSIONAMENTO'];

  constructor(
    protected activityService: ActivityService,
    protected injector: Injector
  ) {
    super(injector, new Activity(), activityService, Activity.fromJson);
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
    this.router.navigate(['activities-list']);
  }

  // PROTECTED METHODS
  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      unity: [null, [Validators.required, Validators.maxLength(5)]],
      group: [null, [Validators.required]],
    });
  }

  protected executeListAction(listFormValue) {
    this.activity = {
      ...listFormValue
    };
    this.createResource(this.activity);
    this.router.navigate(['activities-list']);
  }

}
