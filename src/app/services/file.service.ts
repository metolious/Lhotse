import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { ICase, IFile, IRoute } from 'src/app/shared/interfaces';
import { RouteService } from './route.service';

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

  saveImageData(route, httpPostData, imageData): Observable<IFile[]> {
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
    return this.http.post<IFile[]>( route.url + route.endpoint, imageData );
  }

  getVesselData(route): Observable<IFile[]> {
    let newHeaders = new HttpHeaders({
      'Connection': 'keep-alive',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': '*/*',  
      'Access-Control-Request-Headers': 'authorization,content-type',   
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept', 
    });
    let httpOptions:object = ({ 
      headers: newHeaders,
      withCredentials:  false,
      method: 'GET',
      responseType: "text"
    });
    return this.http.get<IFile[]>( route.url + route.endpoint, httpOptions );
  }

}
