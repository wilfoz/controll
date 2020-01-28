import { BaseResourceModel } from '../../../../shared/model/base-resource.model';

export class BuildingList extends BaseResourceModel {

  constructor(
    public name?: string,
    public type?: string,
    public locality?: string,
    public coords?: {
      coordinates: string[]
    },
    public forward?: number,
    public weight?: number,
    public height?: number,
    public released?: string,
    // tslint:disable-next-line:variable-name
    public _id?: string,
  ) {
  super();
}

static fromJson(jsonData: any): BuildingList {
  return Object.assign( new BuildingList(), jsonData);
}

}
