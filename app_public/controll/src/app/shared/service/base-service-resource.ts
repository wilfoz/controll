import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { BaseResourceModel } from '../model/base-resource.model';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;
  private resources: T[] = [];
  private resourcesUpdated = new Subject<T[]>();

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  getAll(resPerPage?: number, currentPage?: number): Observable<T[]> {
    let queryParams = ''

    if ( resPerPage && currentPage ) {
      queryParams = `?pagesize=${resPerPage}&page=${currentPage}`;
    }
    
    this.http.get(this.apiPath + queryParams)
      .pipe(
        map(this.jsonDataToResources.bind(this)),
        catchError(this.handleError)
      )
      .subscribe((dataTransformed) => {
        this.resources = dataTransformed;
        this.resourcesUpdated.next(this.resources)
      })

      return this.resourcesUpdated.asObservable(); 
  }

  getById(id: string): Observable<T> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  update(resource: any): Observable<T> {
    const url = `${this.apiPath}/${resource._id}`;
    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  // PROTECTED METHODS

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(this.jsonDataToResourceFn(element)));
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any[]): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }

}
