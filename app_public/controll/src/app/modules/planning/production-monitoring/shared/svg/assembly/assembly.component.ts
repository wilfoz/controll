import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-assembly',
  templateUrl: './assembly.component.html',
  styleUrls: ['./assembly.component.scss']
})
export class AssemblyComponent implements OnInit {

  @Input() data: any;

  public type: string;
  public class: string;

  constructor() { }

  ngOnInit() {

    this.type = this.setType();
    this.class = this.getClassActivity(this.data.assembly.pop());
    
  }

  setType = (): string => {
    const { type } = this.data;
    return type.includes('CR') ? 'ESTAIADA' : 'AUTOPORTANTE';
  } 

  getClassActivity = (activity: string) => {
    return {
      'Revisão/giro e prumo': 'revisao',
      'Içamento de torre': 'icamento',
      'Pré-montagem': 'premontagem',
    }[activity] || ''
  }

}
