import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Activity } from '../shared/activity';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {

  title = 'Edit Activity';
  form: FormGroup;

  constructor(
      private dialogRef: MatDialogRef<ActivityDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public activity: Activity) { }

  ngOnInit() {
      this.buildForm();
  }

  buildForm() {
      this.form = new FormGroup({
          id: new FormControl(this.activity._id),
          name: new FormControl(this.activity.name, Validators.required),
          unity: new FormControl(this.activity.unity, Validators.required),
          group: new FormControl(this.activity.group, Validators.required),
          mark: new FormControl(this.activity.group, Validators.required),
      });
  }

  save() {
      if (this.form.invalid) {
          return;
      }
      const newList = this.setLeaderList(this.form.value);
      this.dialogRef.close(newList);
  }

  close() {
      this.dialogRef.close(null);
  }

  setLeaderList = (form) => {
    const { id: _id, name, unity, group, mark } = form;
    return { _id, name, unity, group, mark };
  }

}
