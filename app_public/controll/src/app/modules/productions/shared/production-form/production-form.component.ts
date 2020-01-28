import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductionService } from '../../production.service';

@Component({
  selector: 'app-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.css']
})
export class ProductionFormComponent implements OnInit {

  public towers: any[] = [];
  public leaders: any[] = [];
  public activities: any[] = [];
  public status = ['PROGRAMADO', 'EXECUTADO', 'ANDAMENTO'];

  @Input() form: FormGroup;

  constructor(
    private productionService: ProductionService,
  ) { }

  ngOnInit() {
    this.listsActivities();
    this.listsLeaders();
    this.listsTowers();
  }

  listsActivities = () => {
    this.productionService.getAllActivities().subscribe(
      (res) => this.mapToResource(res, this.activities)
    );
  }

  listsTowers = () => {
    this.productionService.getAllTowers().subscribe(
      (res) => this.mapToResource(res, this.towers)
    );
  }

  listsLeaders = () => {
    this.productionService.getAllLeaders().subscribe(
      (res) => this.mapToResource(res, this.leaders)
    );
  }

  mapToResource = (res, arr) => res.map((resource) => {
    arr.push(resource.name);
  })

}
