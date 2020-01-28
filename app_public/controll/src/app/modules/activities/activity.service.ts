import { Injectable, Injector } from '@angular/core';
import { Activity } from './shared/activity';
import { BaseResourceService } from 'src/app/shared/service/base-service-resource';

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends BaseResourceService<Activity> {

  constructor(protected injector: Injector) {
    super('http://localhost:3000/api/activities', injector, Activity.fromJson);
  }
}
