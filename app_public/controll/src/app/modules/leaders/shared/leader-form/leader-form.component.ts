import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-leader-form',
  templateUrl: './leader-form.component.html',
  styleUrls: ['./leader-form.component.css']
})
export class LeaderFormComponent implements OnInit {

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
