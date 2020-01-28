import { BaseResourceModel } from '../../../shared/model/base-resource.model';

export class PDS extends BaseResourceModel {

    constructor(
        public activity?: string,
        public unity?: string,
        public foreseen?: number,
        public inDay?: number,
        public previous?: number,
        public current?: number,
        public accumulated?: string,
        public notExecuted?: number,
        public executed?: string[],
        public planned?: string[],
        public leader?: string[],
    ) {
        super();
    }

    static fromJson(jsonData: any): PDS {
        return Object.assign(new PDS(), jsonData);
    }

}
