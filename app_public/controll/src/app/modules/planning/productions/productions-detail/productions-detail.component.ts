import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Production } from '../shared/production';

@Component({
  selector: 'app-productions-detail',
  templateUrl: './productions-detail.component.html',
  styleUrls: ['./productions-detail.component.css']
})
export class ProductionsDetailComponent implements OnInit {

  title = 'Edit Production';
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ProductionsDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public production: Production,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      id: new FormControl(this.production._id),
      date: new FormControl(this.production.date, Validators.required),
      tower: new FormControl(this.production.tower, Validators.required),
      activity: new FormControl(this.production.activity, Validators.required),
      leader: new FormControl(this.production.leader, Validators.required),
      status: new FormControl(this.production.status, Validators.required),
      comment: new FormControl(this.production.comment),
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    const newList = this.setProductionList(this.form.value);
    this.dialogRef.close(newList);
  }

  close() {
    this.dialogRef.close(null);
  }

  setProductionList = (form) => {
    const { id: _id, date, tower, activity, leader, status, comment } = form;
    return { _id, date, tower, activity, leader, status, comment };
  }

}
