import { BaseResourceModel } from '../../../shared/model/base-resource.model';

export class Leader extends BaseResourceModel {

  constructor(
    public _id?: string,
    public name?: string,
    public office?: string,
    // tslint:disable-next-line:variable-name
  ) {
    super();
  }

  static fromJson(jsonData: any): Leader {
    return Object.assign(new Leader(), jsonData);
  }

}
