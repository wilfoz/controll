import { BaseResourceModel } from '../../../shared/model/base-resource.model';

export class Leader extends BaseResourceModel {

  constructor(
    public name?: string,
    public office?: string,
    // tslint:disable-next-line:variable-name
    public _id?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): Leader {
    return Object.assign(new Leader(), jsonData);
  }

}
