import { Component, Inject, OnInit, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { BuildingList } from '../shared/models/building-list';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  title = 'Edit List';
  form: FormGroup;

  constructor(
      private dialogRef: MatDialogRef<ListDetailComponent>,
      @Inject(MAT_DIALOG_DATA) public buildingList: BuildingList) { }

  ngOnInit() {
      this.buildForm();
  }

  buildForm() {
      this.form = new FormGroup({
          id: new FormControl(this.buildingList._id),
          name: new FormControl(this.buildingList.name, Validators.required),
          type: new FormControl(this.buildingList.type, Validators.required),
          locality: new FormControl(this.buildingList.locality, [Validators.required]),
          coords:  new FormGroup({
            lat: new FormControl(this.buildingList.coords.coordinates[0], [Validators.required]),
            lng: new FormControl(this.buildingList.coords.coordinates[1], [Validators.required]),
           }),
          forward: new FormControl(this.buildingList.forward, Validators.required),
          weight: new FormControl(this.buildingList.weight, Validators.required),
          height: new FormControl(this.buildingList.height, Validators.required),
          released: new FormControl(this.buildingList.released, Validators.required)
      });
  }

  save() {
      if (this.form.invalid) {
          return;
      }
      const newList = this.setBuildingList(this.form.value);
      this.dialogRef.close(newList);
  }

  close() {
      this.dialogRef.close(null);
  }

  setBuildingList = (form) => {
    const lat = form.coords.lat;
    const lng = form.coords.lng;

    const list = {
      _id: form.id,
      name: form.name,
      type: form.type,
      locality: form.locality,
      coords: {
        coordinates: [lng, lat]
      },
      forward: +form.forward,
      weight: +form.weight,
      height: +form.height,
      released: form.released,
    };

    return list;
  }

}
