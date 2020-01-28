import { BaseResourceModel } from '../../../shared/model/base-resource.model';

export class Production extends BaseResourceModel {

  constructor(
    public date?: Date,
    public leader?: string,
    public tower?: string,
    public activity?: string,
    public status?: string,
    // tslint:disable-next-line:variable-name
    public _id?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): Production {
    return Object.assign(new Production(), jsonData);
  }
}
