import { BaseResourceModel } from '../../../shared/model/base-resource.model';

export class Weeks extends BaseResourceModel {

    constructor(
        
        public id?: string,
        public locality?: string,
        public name?: string,
        public leader?: string,
        public monday?: string,
        public tuesday?: string,
        public fourth?: string,
        public fifth?: string,
        public friday?: string,
        public saturday?: string,
        public sanday?: string,
 
    ) {
        super();
    }

}
