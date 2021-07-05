import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppBreadcrumbService } from '../app.breadcrumb.service';
import { RouteService } from '../services/route.service';
import { IAspect, IFormLabel, IImageData, IImageSource, IRoute, ISecurityLabel } from '../shared/interfaces';

export class VesselForm {

  formLabels: IFormLabel[] = [];
  sconums: string[] = [];
  iirNumbers: string[] = [];
  otherSources: string[] = [];
  labels: IFormLabel[] = [];
  securityLabel: string = '';
  aspect: string = '';
  imageSource: string = ''
  imageDate: string = '';

  constructor() 
  {  
    this.formLabels = [
      {label: 'securityLabel'},
      {label: 'aspect'},
      {label: 'imageSource'},
      {label: 'sconums'},
      {label: 'iirNumbers'},
      {label: 'otherSources'},
      {label: 'imageDate'}
    ]; 
    this.securityLabel = '';
    this.aspect = '';
    this.imageSource = ''
    this.sconums = [];
    this.iirNumbers = [];
    this.otherSources = [];
    this.imageDate = '';
    this.labels = this.formLabels;
  }
}

@Component({
  selector: 'app-vessel-update',
  templateUrl: './vessel-update.component.html',
  styles: [`
  :host ::ng-deep button {
      margin-right: .25em;
      margin-left: .25em;
  }

  :host ::ng-deep .p-splitbutton button {
      margin-right: 0;
      margin-left: 0;
  }

  @media screen and (max-width: 960px) {
      .card.toolbar-demo {
          overflow: auto;
      }
  }
`]
})

export class VesselUpdateComponent implements OnInit {

@Output( ) searchInProgress = new EventEmitter<boolean>(true);
// @ViewChild('vesselUpdate', {static: false}) vesselUpdate: any;

    uploadFiles: any[] = [];
    imageData: IImageData[] = [];
    security_labels: ISecurityLabel[];
    formLabels: IFormLabel[] = [];
    aspects: IAspect[];
    image_sources: IImageSource[];
    redirectDialog: Boolean = false;
    httpPostData: FormData;
  
    model: VesselForm;
    submitted = false;
    routes: IRoute[];
    activeRoute: IRoute = {};
    
  constructor(  private routeService: RouteService,
                private breadcrumbService: AppBreadcrumbService
             ) 
  {  
    this.model = new VesselForm();

    this.routeService.getRoutes().then(routes => {
      this.routes = routes
    console.log (`vessel-update constructor() this.routes.length = ${this.routes.length}`);

    });
    
    this.breadcrumbService.setItems([
        { label: 'Viper MSC' },
        { label: 'Upload Image', routerLink: ['/uikit/tree'] }
    ]);
  }

  setActiveRoute() {
      
    for (let i = 0; i < this.routes.length; i++) {
      if (this.routes[i].isActive == true) {
        this.activeRoute.name = this.routes[i].name;
        this.activeRoute.url = this.routes[i].url;
        this.activeRoute.endpoint = this.routes[i].endpoint;
        this.activeRoute.colon = this.routes[i].colon;
        this.activeRoute.port = this.routes[i].port;
        this.activeRoute.method = this.routes[i].method;
        this.activeRoute.name = this.routes[i].name;
      }
    } 
  } 

  clearForm() {
    this.model = new VesselForm();
    this.uploadFiles = [];
    this.imageData = [];
    // this.vesselUpdate.clear();
  }

  ngOnInit() {

    // this.setActiveRoute();
    // console.log (`vessel-update onOnInit() this.activeRoute.name = ${this.activeRoute.name}`);

  }

}
