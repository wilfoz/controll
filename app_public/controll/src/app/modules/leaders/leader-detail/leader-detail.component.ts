import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-leader-detail',
  templateUrl: './leader-detail.component.html',
  styleUrls: ['./leader-detail.component.css']
})
export class LeaderDetailComponent implements OnInit {
  title = 'Edit Leader';
  form: FormGroup;

  constructor(
      private dialogRef: MatDialogRef<LeaderDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public buildingList: Leader) { }

  ngOnInit() {
      this.buildForm();
  }

  buildForm() {
      this.form = new FormGroup({
          id: new FormControl(this.buildingList._id),
          name: new FormControl(this.buildingList.name, Validators.required),
          office: new FormControl(this.buildingList.office, Validators.required),
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
    const list = {
      _id: form.id,
      name: form.name,
      office: form.office,
    };
    return list;
  }

}
