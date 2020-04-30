import { BaseResourceModel } from 'src/app/shared/model/base-resource.model';

export class WeeksHeader extends BaseResourceModel {

    constructor(
        
        public key?: string,
        public header1?: string,
        public header2?: string,
        public cell?: string,
 
    ) {
        super();
    }

}