import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { IFile } from 'src/app/shared/interfaces';
import { RouteService } from './route.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  httpPostData: FormData;

  constructor(private http: HttpClient) 
    { }

  form: FormGroup = new FormGroup({
    //$key: new FormControl(null),
    id: new FormControl(''),
    securityLabel: new FormControl(''),
    aspect: new FormControl(''),
    imageSource: new FormControl(''),
    sconums: new FormControl(''),
    iirNumbers: new FormControl(''),
    otherSources: new FormControl(''),
    imageDate: new FormControl(new Date()),
    request_approval: new FormControl(null),
    request_termination: new FormControl(null),
  })

  initFormGroup() {
    this.form.setValue({
      id: '',
      securityLabel: '',
      aspect: '',
      imageSource:  '',
      sconums: '',
      iirNumbers: '',
      otherSources: '',
      imageDate: '', 
      request_approval: null,
      request_termination: null,
    })
  } 

  getImageData(route): Observable<IFile[]> {
    let newHeaders = new HttpHeaders({
      'Connection': 'keep-alive',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': '*/*',  
      'Access-Control-Request-Headers': 'authorization,content-type',   
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', 
    });
    let httpOptions:object = ({ 
      headers: newHeaders,
      withCredentials:  false,
      method: 'GET',
      responseType: "text"
    });
    const httpsRoute = route.url + route.colon + route.port + route.endpoint;
    console.log (`file.service getImageData() httpRoute = ${httpsRoute}`);
    return this.http.get<IFile[]>( httpsRoute, httpOptions );
  }

  saveImageDataPost(route, httpPostData, imageData): Observable<IFile[]> {
    let newHeaders = new HttpHeaders({
      'Connection': 'keep-alive',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': 'application/json',
      'Access-Control-Request-Headers': 'content-type',   
    });
    let httpOptions:object = ({ 
      headers: newHeaders,
      withCredentials:  false,
      method: 'POST',
      responseType: "text"
    });
    const httpRoute = route.url + route.colon + route.port + route.endpoint;
    console.log (`file.service saveImageDataPost() httpRoute = ${httpRoute}`);
    return this.http.post<IFile[]>( httpRoute, imageData );
  }

  saveImageDataPut(route, httpPostData, imageData): Observable<IFile[]> {
    let newHeaders = new HttpHeaders({
      'Connection': 'keep-alive',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': 'application/json',
      'Access-Control-Request-Headers': 'content-type',   
    });
    let httpOptions:object = ({ 
      headers: newHeaders,
      withCredentials:  false,
      method: 'POST',
      responseType: "text"
    });
    const httpRoute = route.url + route.colon + route.port + route.endpoint;
    console.log (`file.service saveImageDataPut() httpRoute = ${httpRoute}`);
    return this.http.put<IFile[]>( httpRoute, imageData );
  }

  getRouteData(route): Observable<IFile[]> {
    let newHeaders = new HttpHeaders({
      'Connection': 'keep-alive',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': 'application/json',
      'Access-Control-Request-Headers': 'content-type', 
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'ETag': 'W/"33-5xXlO7EpA1r3Ya9pdFbQSrvIH0E"',
      // 'Access-Control-Allow-Origin' : '*',
    });
    let httpOptions:object = ({ 
      headers: newHeaders,
      withCredentials:  false,
      method: 'PUT',
      responseType: "text"
    });
    const httpRoute = route.url + route.colon + route.port + route.endpoint;
    console.log (`file.service getRouteData() httpRoute = ${httpRoute}`);
    return this.http.get<IFile[]>( httpRoute, httpOptions );
  }

  getVesselData(route): Observable<IFile[]> {
    let newHeaders = new HttpHeaders({
      'Connection': 'keep-alive',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': '*/*',  
      'Access-Control-Request-Headers': 'authorization,content-type',   
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', 
    });
    let httpOptions:object = ({ 
      headers: newHeaders,
      withCredentials:  false,
      method: 'GET',
      responseType: "text"
    });
    const httpsRoute = route.url + route.colon + route.port + route.endpoint;
    console.log (`file.service getVesselData() httpRoute = ${httpsRoute}`);
    return this.http.get<IFile[]>( httpsRoute, httpOptions );
  }

}
