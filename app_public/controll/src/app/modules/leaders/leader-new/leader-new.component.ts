import { Component, OnInit, Injector } from '@angular/core';
import { Leader } from '../shared/leader';
import { BaseFormsResourceComponent } from '../../../shared/components/common/base-forms-resource/base-forms-resource';
import { LeadersService } from '../leaders.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-leader-new',
  templateUrl: './leader-new.component.html',
  styleUrls: ['./leader-new.component.css']
})
export class LeaderNewComponent extends BaseFormsResourceComponent<Leader> implements OnInit {

  public leader: Leader;

  constructor(
    protected leadersService: LeadersService,
    protected injector: Injector
  ) {
    super(injector, new Leader(), leadersService, Leader.fromJson);
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
    this.router.navigate(['leaders-list']);
  }

  // PROTECTED METHODS
  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(15)]],
      office: [null, [Validators.required, Validators.maxLength(15)]],
    });
  }

  protected executeListAction(listFormValue) {
    this.leader = {
      ...listFormValue
    };
    this.createResource(this.leader);
    this.router.navigate(['leaders-list']);
  }

}
