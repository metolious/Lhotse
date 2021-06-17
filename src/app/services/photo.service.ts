import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IImage } from '../shared/interfaces';

@Injectable()
export class PhotoService {

    constructor(private http: HttpClient) { }

    getImageData() {
        return this.http.get<any>('assets/demo/data/image-data.json')
            .toPromise()
            .then(res => res.data as IImage[])
            .then(data => data);
    }
    
    getShipImages() {
        return this.http.get<any>('assets/demo/data/ship-images.json')
            .toPromise()
            .then(res => res.data as IImage[])
            .then(data => data);
    }

    getImageList() {
        return this.http.get<any>('assets/demo/data/image-list.json')
        .toPromise()
        .then(res => res.data as IImage[])
        .then(data => data);
    }

}
