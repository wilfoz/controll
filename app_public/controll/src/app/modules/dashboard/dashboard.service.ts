import { Injectable, Injector } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/service/base-service-resource';
import { Observable } from 'rxjs';

import { BuildingListService } from '../building-list/shared/building-list.service';
import { Production } from '../planning/productions/shared/production';
import { ProductionService } from '../planning/productions/production.service';



@Injectable({
    providedIn: 'root'
})
export class DashBoardService extends BaseResourceService<Production> {

    public totalKm: number = 0;
    public totalTowers: number = 0;

    constructor(
        protected injector: Injector,
        private buildingListService: BuildingListService,
        private productionService: ProductionService,
    ) {
        super('http://localhost:3000/api/productions', injector, Production.fromJson);
    }

    // BAR
    public dataBar = [

        { data: [], label: 'PREVISTO' },
        { data: [], label: 'EXECUTADO' }
    ]

    public getDataBar = (activities: string[]) => {
        activities.map((data) => {
            this.totalProductions(data).subscribe((res) => {
                this.dataBar[0].data.push(this.totalTowers);
                this.dataBar[1].data.push(res)
            });
        })

        return this.dataBar;
    }

    // CARD
    public dataCards = [{
        label: 'Civil',
        total: 0,
        percentage: '0%',
    }, {
        label: 'Montagem',
        total: 0,
        percentage: '0%',
    }, {
        label: 'Lançamento',
        total: 0,
        percentage: '0%',
    }]

    public getdataCards = () => {
        this.dataCards.map((data) => {

            this.setTotais();

            switch (data.label) {
                case 'Civil':
                    this.totalProductions('Fundação 100%').subscribe(res => {
                        data.total = res;
                        data.percentage = `${Math.round((res / this.totalTowers) * 100)}%`;
                    });
                    break;
                case 'Montagem':
                    this.totalProductions('Montagem 100%').subscribe(res => {
                        data.total = res;
                        data.percentage = `${Math.round((res / this.totalTowers) * 100)}%`;
                    });
                    break
                case 'Lançamento':
                    this.totalProductions('Lançamento 100%').subscribe(res => {
                        data.total = res;
                        data.percentage = `${Math.round((res / this.totalKm) * 100)}%`;
                    });
                    break
                default:
                    break;
            }

        });

        return this.dataCards;
    }

    // PRIVATE METHODS
    private getTotalTowers = (): Observable<number> => {
        return this.buildingListService.getAll()
            .pipe(
                map((data) => data.filter((d) => d.name !== '').length)
            )
    }

    private getTotalKm = (): Observable<number> => {
        return this.buildingListService.getAll()
            .pipe(
                map((data) => data.reduce((acc, value) => acc + value.forward, 0)
                ))
    }

    private setTotais = () => {
        this.getTotalTowers().subscribe(res => this.totalTowers = res);
        this.getTotalKm().subscribe(res => this.totalKm = res)
    }

    private totalProductions = (nameActivity: string): Observable<number> => {
        return this.productionService.getAll()
            .pipe(
                map((data) => data.map((el: any) => {
                    const { name } = el.activity;
                    return name;
                }).filter(element => element == nameActivity).length)
            )
    }


}