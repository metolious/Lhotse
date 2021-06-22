import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRoute } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) { }

  getRoutes() {
  return this.http.get<any>('/photoApp/assets/config/routes.json')
    .toPromise()
    .then(res => res.data as IRoute[])
    .then(data => data);
  }
}
