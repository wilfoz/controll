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
      @Inject(MAT_DIALOG_DATA) public buildingList: Activity) { }

  ngOnInit() {
      this.buildForm();
  }

  buildForm() {
      this.form = new FormGroup({
          id: new FormControl(this.buildingList._id),
          name: new FormControl(this.buildingList.name, Validators.required),
          unity: new FormControl(this.buildingList.unity, Validators.required),
          group: new FormControl(this.buildingList.group, Validators.required)
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
    const { id: _id, name, unity, group } = form;
    return { _id, name, unity, group };
  }

}
