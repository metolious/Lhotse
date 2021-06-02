import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { ICase, IFile } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = "http://localhost:3000";
  httpPostData: FormData;

  constructor(private http: HttpClient) { }

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

  getRoot(): Observable<IFile[]> {

    let newHeaders = new HttpHeaders({
      'Connection': 'keep-alive',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      // 'Accept': '*/*',
      'Accept': 'application/json',
      // 'Access-Control-Request-Headers': 'authorization,content-type', 
      // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',  
      'Access-Control-Request-Headers': 'content-type',   
      // 'Access-Control-Allow-Origin':'*',
    });

    let httpOptions:object = ({ 
      headers: newHeaders,
      // withCredentials:  true,
      withCredentials:  false,
      method: 'POST',
      responseType: "text"
    });

    return this.http.get<IFile[]>(this.baseUrl+'/', httpOptions);
  }

  saveFilePut(postUrl, httpPostData, imageData): Observable<IFile[]> {
    let newHeaders = new HttpHeaders({
      'Connection': 'keep-alive',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      // 'Accept': '*/*',
      'Accept': 'application/json',
      // 'Access-Control-Request-Headers': 'authorization,content-type', 
      // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',  
      'Access-Control-Request-Headers': 'content-type',   
      // 'Access-Control-Allow-Origin':'*',
    });
    let httpOptions:object = ({ 
      headers: newHeaders,
      // withCredentials:  true,
      withCredentials:  false,
      method: 'POST',
      responseType: "text"
    });
    // return this.http.put<IFile[]>(this.baseUrl+postUrl, httpPostData);
    return this.http.put<IFile[]>(this.baseUrl+postUrl, imageData);
  }

  saveFilePost(postUrl, httpPostData, imageData): Observable<IFile[]> {
    let newHeaders = new HttpHeaders({
      'Connection': 'keep-alive',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      // 'Accept': '*/*',
      'Accept': 'application/json',
      // 'Access-Control-Request-Headers': 'authorization,content-type', 
      // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',  
      'Access-Control-Request-Headers': 'content-type',   
      // 'Access-Control-Allow-Origin':'*',
    });
    let httpOptions:object = ({ 
      headers: newHeaders,
      // withCredentials:  true,
      withCredentials:  false,
      method: 'POST',
      responseType: "text"
    });
    // return this.http.put<IFile[]>(this.baseUrl+postUrl, httpPostData);
    return this.http.post<IFile[]>(this.baseUrl+postUrl, imageData);
  }

  getFiles(): Observable<IFile[]> {
    return this.http.get<IFile[]>(this.baseUrl+'/files-promise');
  }

  getFileById(file): Observable<IFile[]> {
    return this.http.get<IFile[]>(this.baseUrl+'/file/'
    +file.id)
  }

  updateStatus(file): Observable<IFile[]> {
    return this.http.put<IFile[]>(this.baseUrl+'/file/'
    +file.id+'/'
    +file.approval,
    file)
  }
  
  getActionItems(file): Observable<IFile[]> {
    return this.http.get<IFile[]>(this.baseUrl+'/files/poc/'
    +file.login_user)
  }

  getPendingItems(file): Observable<IFile[]> {
    return this.http.get<IFile[]>(this.baseUrl+'/files/author/'
    +file.login_user)
  }

  uploadImage(httpPostData): Observable<IFile[]> {
    return this.http.post<IFile[]>(this.baseUrl+'/viper/resources/upload', httpPostData);
  }

  saveFile(uploadFiles): Observable<IFile[]> {

    let newHeaders = new HttpHeaders({
      'Connection': 'keep-alive',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      // 'Accept': '*/*',
      'Accept': 'application/json',
      // 'Access-Control-Request-Headers': 'authorization,content-type', 
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',  
      'Access-Control-Request-Headers': 'content-type',   
      'Access-Control-Allow-Origin':'*',
    });

    let httpOptions:object = ({ 
      headers: newHeaders,
      // withCredentials:  true,
      withCredentials:  false,
      method: 'POST',
      responseType: "text"
    });

    // return ( this.http.post ( this.postUrl, httpPostData, httpOptions)
    // .do   ( data  => console.log ("Upload Result: "+ JSON.stringify(data)) ) );

    console.log(`file.service.uploadImage uploadFiles[0].name = ${uploadFiles[0].name}`);
    return this.http.post<IFile[]>(this.baseUrl+'/file', uploadFiles, httpOptions);
    // return this.http.post<IFile[]>(this.baseUrl+'/file', uploadFiles);
  }

  createCase(keywords): Observable<ICase[]> {
    return this.http.post<ICase[]>(this.baseUrl+'/case', keywords)
  }
}
