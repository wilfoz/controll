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
      project: new FormControl(this.buildingList.project),
      name: new FormControl(this.buildingList.name, Validators.required),
      type: new FormControl(this.buildingList.type, Validators.required),
      locality: new FormControl(this.buildingList.locality, [Validators.required]),
      coords: new FormGroup({
        lat: new FormControl(this.buildingList.coords.coordinates[0], [Validators.required]),
        lng: new FormControl(this.buildingList.coords.coordinates[1], [Validators.required]),
      }),
      forward: new FormControl(this.buildingList.forward, Validators.required),
      height: new FormControl(this.buildingList.height, Validators.required),
      released: new FormControl(this.buildingList.released, Validators.required),
      foundation_MC: new FormControl(this.buildingList.foundation_MC),
      foundation_A: new FormControl(this.buildingList.foundation_A),
      foundation_B: new FormControl(this.buildingList.foundation_B),
      foundation_C: new FormControl(this.buildingList.foundation_C),
      foundation_D: new FormControl(this.buildingList.foundation_D),
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
    const { project, name, type, locality, released, foundation_MC, foundation_A, foundation_B, foundation_C, foundation_D } = form;

    const lat = form.coords.lat;
    const lng = form.coords.lng;

    const list = {
      _id: form.id,
      project,
      name,
      type,
      locality,
      coords: {
        coordinates: [lng, lat]
      },
      forward: +form.forward,
      weight: +form.weight,
      height: +form.height,
      released,
      foundation_MC,
      foundation_A,
      foundation_B,
      foundation_C,
      foundation_D
    };

    return list;
  }

}
