import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @ViewChild('start', { static: false }) appDrawer: ElementRef;

  navItems = [
    {
      displayName: 'Produção',
      iconName: 'folder_open',
      route: '',
      children: [
        {
          displayName: 'Cadastrar',
          iconName: 'list',
          route: 'production',
          children: []
        }, {
          displayName: 'PDS',
          iconName: 'list',
          route: 'production/pds',
          children: []
        }, {
          displayName: 'Programação Semanal',
          iconName: 'list',
          route: 'production/week',
          children: []
        }, {
          displayName: 'Acompanhamento',
          iconName: 'view_comfy',
          route: 'production/monitoring',
          children: []
        }
      ]
    }, {
      displayName: 'Projetos',
      iconName: 'folder_open',
      route: '',
      children: [
        {
          displayName: 'Lista Construção',
          iconName: 'list',
          route: 'building-list',
          children: []
        }
      ]
    }, {
      displayName: 'Equipes',
      iconName: 'folder_open',
      route: '',
      children: [
        {
          displayName: 'Encarregados',
          iconName: 'list',
          route: 'leaders-list',
          children: []
        }
      ]
    }, {
      displayName: 'Setup',
      iconName: 'settings',
      route: '',
      children: [
        {
          displayName: 'Atividades',
          iconName: 'add',
          route: 'activities-list',
          children: []
        }
      ]
    },
  ];

  constructor(
    private breakpointObserver: BreakpointObserver) { }
    
    isHandset$: Observable<boolean> = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

  }
