import { Component, OnInit, Input } from '@angular/core';
import { Diagram } from '../../models/diagram';

@Component({
  selector: 'app-embargoes',
  templateUrl: './embargoes.component.html',
  styleUrls: ['./embargoes.component.scss']
})
export class EmbargoesComponent implements OnInit {

  @Input() data: Diagram;

  constructor() { }

  ngOnInit() {
  }

  
}