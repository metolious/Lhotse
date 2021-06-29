import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TreeNode } from 'primeng/api';

@Injectable()
export class NodeService {

    constructor(private http: HttpClient) { }

    getFiles() {
    return this.http.get<any>('/assets/config/files.json')
    // return this.http.get<any>('/photoApp/assets/config/files.json')
      .toPromise()
      .then(res => res.data as TreeNode[]);
    }

    getLazyFiles() {
    return this.http.get<any>('/assets/config/files-lazy.json')
    // return this.http.get<any>('/photoApp/assets/config/files-lazy.json')
      .toPromise()
      .then(res => res.data as TreeNode[]);
    }

    getFilesystem() {
    return this.http.get<any>('/assets/config/filesystem.json')
    // return this.http.get<any>('/photoApp/assets/config/filesystem.json')
      .toPromise()
      .then(res => res.data as TreeNode[]);
    }

    getLazyFilesystem() {
    return this.http.get<any>('/assets/config/filesystem-lazy.json')
    // return this.http.get<any>('/photoApp/assets/config/filesystem-lazy.json')
      .toPromise()
      .then(res => res.data as TreeNode[]);
    }
}
