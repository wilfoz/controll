import { BaseResourceModel } from '../../../shared/model/base-resource.model';

export class Activity extends BaseResourceModel {

  constructor(
    public name?: string,
    public unity?: string,
    public group?: string,
    public _id?: string,
  ) {
    super();
  }

  static fromJson(jsonData: any): Activity {
    return Object.assign(new Activity(), jsonData);
  }

}
