import { BaseResourceModel } from '../../../shared/model/base-resource.model';

export class Weeks extends BaseResourceModel {

    constructor(
        
        public id?: string,
        public locality?: string,
        public name?: string,
        public leader?: string,
        public monday?: any,
        public tuesday?: any,
        public fourth?: any,
        public fifth?: any,
        public friday?: any,
        public saturday?: any,
 
    ) {
        super();
    }

    public setAtr (atrs: any[]) {
        atrs.map((data) => {
           this[data[0]] = data[1]
        });
    }

    public setWeeksAtr (week: string, status: string, tower: string) {
        const dataWeek = status === 'EXECUTADO' ? { executed: tower } : { planned: tower }
        this[week] = dataWeek;
    }

}
