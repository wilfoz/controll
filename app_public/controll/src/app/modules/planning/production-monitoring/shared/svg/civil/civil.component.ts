import { Component, OnInit, Input } from '@angular/core';
import { Diagram } from '../../models/diagram';

@Component({
  selector: 'app-civil',
  templateUrl: './civil.component.html',
  styleUrls: ['./civil.component.scss']
})
export class CivilComponent implements OnInit {

  @Input() data: Diagram;

  public type: string;
  public textFundation: any;
  public colorFundation: any;
  public embargoes: string = '';

  constructor() { }

  ngOnInit() {

    this.type = this.setType();
    this.textFundation = this.handleTextFundations();
    this.colorFundation = this.setColorsFundations();
  }

  handleEmbargoes = (): void => {
    const { realeased } = this.data;
    this.embargoes = realeased;
  }

  setType = (): string => {
    const { type } = this.data;
    return type.includes('CR') ? 'ESTAIADA' : 'AUTOPORTANTE';
  } 

  setColorsFundations = (): any => {
    return this.getColorFundation();
  }

  handleTextFundations = (): any => {
    return this.type === 'ESTAIADA' 
            ? this.getTextFundationEst()
            : this.getTextFundationAut();
  }

  getStyle = (activity) => {
    return {
      'Locação de cavas e pts de fincamentos': 'locacao',
      'Escavação - (MC-E)': 'escavacao',
      'Escavação - (MC-F)': 'escavacao',
      'Escavação - (A)': 'escavacao',
      'Escavação - (B)': 'escavacao',
      'Escavação - (C)': 'escavacao',
      'Escavação - (D)': 'escavacao',
      'Ancoragem em rocha pérna - (A)': 'ancoragem',
      'Ancoragem em rocha pérna - (B)': 'ancoragem',
      'Ancoragem em rocha pérna - (C)': 'ancoragem',
      'Ancoragem em rocha pérna - (D)': 'ancoragem',
      'Concreto in loco para (MC-E)': 'concreto',
      'Concreto in loco para (MC-F)': 'concreto',
      'Concreto in loco - (A)': 'concreto',
      'Concreto in loco - (B)': 'concreto',
      'Concreto in loco - (C)': 'concreto',
      'Concreto in loco - (D)': 'concreto',
      'Concreto in loco - concluído' : 'concreto'
    }[activity] || 'noActivities'
  }

  protected getTextFundationEst = (): any => {
    const { foundation_MCE, foundation_MCF,  foundation_A, foundation_B, foundation_C, foundation_D} = this.data;
    return {
      foundation_MCE,
      foundation_MCF,
      foundation_A,
      foundation_B,
      foundation_C,
      foundation_D,
    }
  }

  protected getTextFundationAut = (): any => {
    const { foundation_A, foundation_B, foundation_C, foundation_D } = this.data;
    return {
      foundation_A,
      foundation_B,
      foundation_C,
      foundation_D,
    }
  }

  protected getColorFundation = (): any => {
    const data = this.data.civil;
    const obj = {}
    Object.keys(data).map(key => {
      obj[key] = this.getStyle(data[key])
    });
    
    
    return obj;
  }


}
