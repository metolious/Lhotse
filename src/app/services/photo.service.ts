import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IImage } from '../shared/interfaces';

@Injectable()
export class PhotoService {

    constructor(private http: HttpClient) { }

    getImageData() {
        return this.http.get<any>('/assets/config/image-data.json')
        // return this.http.get<any>('/photoApp/assets/config/image-data.json')
            .toPromise()
            .then(res => res.data as IImage[])
            .then(data => data);
    }
    
    getShipImages() {
        return this.http.get<any>('/assets/config/ship-images.json')
        // return this.http.get<any>('/photoApp/assets/config/ship-images.json')
            .toPromise()
            .then(res => res.data as IImage[])
            .then(data => data);
    }

    getImageList() {
        return this.http.get<any>('/assets/config/image-list.json')
        // return this.http.get<any>('/photoApp/assets/config/image-list.json')
        .toPromise()
        .then(res => res.data as IImage[])
        .then(data => data);
    }

}
