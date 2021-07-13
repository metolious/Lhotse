import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppBreadcrumbService } from '../app.breadcrumb.service';
import { VesselModel } from '../classes/models/VesselModel';
import { FileService } from '../services/file.service';
import { RouteService } from '../services/route.service';
import { IAspect, IFormData, IFormLabel, IImageData, IImageSource, IParams, IRoute, ISecurityLabel, IUser, request } from '../shared/interfaces';

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

    vesselData: IFormData[] = [];
    params: IParams[] = [];
    security_labels: ISecurityLabel[];
    aspects: IAspect[];
    image_sources: IImageSource[];
    imageOptions: any[];
    users: IUser[];
    redirectDialog: Boolean = false;
    httpPostData: FormData;
    sortFields: any[];
    sortOptions: any[];
    pageOptions: any[];
    model: VesselModel;
    submitted = false;
    routes: IRoute[] = [];
    activeRoute: IRoute = {};
    awsRoute: IRoute = {};
    localSconumRoute: IRoute = {};
    param: string = "0000000";

  constructor(  private breadcrumbService: AppBreadcrumbService,
                private routeService: RouteService,
                private fileService: FileService,
             )
  {
    this.model = new VesselModel();

    this.routeService.getRoutes().then(routes => {
      this.routes = routes
    });

    this.breadcrumbService.setItems([
        { label: 'Viper MSC' },
        { label: 'Vessel Update', routerLink: ['/uikit/tree'] }
    ]);
  }

  populateComponent(data) {

    this.model = new VesselModel();

    // console.log('vessel-update.populateComponent() : data = ' + data)

    var dataObject = JSON.parse(data);

    for (var i = 0; i < this.model.labels.length; i++) {
      
      var label = this.model.labels[i].label;

      for (var prop in dataObject) {
        // console.log("label = " + label);
        // console.log("prop = " + prop);

        if (label == prop) {
          // console.log("Value = " + dataObject[prop]);

          this.model[this.model.labels[i].label] = dataObject[prop];

        }
      }
    }

    for (var i = 0; i < this.model.labels.length; i++) {

      // console.log('vessel-update.populateComponent() : label = ' + this.model.labels[i].label)
      // console.log('vessel-update.populateComponent() : value = ' + this.model[this.model.labels[i].label])
    }

    }

  getSconumRoute() {

    this.params = [{sconum: this.model.sconum, Imo: "", Mmsi: "",CallSign: "", Name: "", Flag: ""}];

    for (let i = 0; i < this.routes.length; i++) {
      if (this.routes[i].name == "Localhost_Get_Vessel_Update") {
        this.localSconumRoute.name = this.routes[i].name;
        this.localSconumRoute.url = this.routes[i].url;
        this.localSconumRoute.endpoint = this.routes[i].endpoint;
        this.localSconumRoute.colon = this.routes[i].colon;
        this.localSconumRoute.port = this.routes[i].port;
        this.localSconumRoute.method = this.routes[i].method;
        this.localSconumRoute.params = this.params;
      }
    }
  }

  setActiveRoute() {

    this.params = [{sconum: this.model.sconum, Imo: "", Mmsi: "",CallSign: "", Name: "", Flag: ""}];

    for (let i = 0; i < this.routes.length; i++) {
      if (this.routes[i].isActive == true) {
        this.activeRoute.name = this.routes[i].name;
        this.activeRoute.url = this.routes[i].url;
        this.activeRoute.endpoint = this.routes[i].endpoint;
        this.activeRoute.colon = this.routes[i].colon;
        this.activeRoute.port = this.routes[i].port;
        this.activeRoute.method = this.routes[i].method;
        this.activeRoute.params = this.params;

      }
    }
  }

  onSearch() {

    this.createVesselData();

    this.getSconumRoute();

    if (this.localSconumRoute.method == request.GET) {
      this.fileService.getJsonData(this.localSconumRoute).subscribe(
        data => { 
                  // console.log('vessel-update.onSearch() : getJsonData() Successful!! : ' + data)
                  this.populateComponent(data);
                },
        error => { console.log('vessel-update.onSearch() : getJsonData() Failed!! : ' + error.message) }
      )
    }

    this.clearForm();
  }

  createVesselData() {
    for (var i = 0; i < this.model.labels.length; i++) {
      if ( typeof this.model[this.model.labels[i].label] === 'string' || 
           this.model[this.model.labels[i].label] instanceof String) 
      {
          // add to vesselData
      } else {
          // if not a string, convert to json, add to vesselData
      }
      
      // console.log('vessel-update.createVesselData() : label = ' + this.model.labels[i].label)
      // console.log('vessel-update.createVesselData() : value = ' + this.model[this.model.labels[i].label])

      this.vesselData.push({ label: this.model.labels[i].label, 
                             value: this.model[this.model.labels[i].label]});

      // if (value != '') // break after first value 
      //   break;
    }
  }

  onSubmit(event) {

    this.createVesselData();

    this.setActiveRoute();

    if (this.activeRoute.method == request.GET) {
      this.fileService.getJsonData(this.activeRoute).subscribe(
        data => { console.log('vessel-update.onSubmit() : getJsonData() Successful!! : ' + data)
                },
        error => { console.log('vessel-update.onSubmit() : getJsonData() Failed!! : ' + error.message) }
      )
    // this.fileService.getVesselData(this.amsVesselServiceRoute).subscribe(
    //   data => {  console.log('vessel-update.component.onSubmit(): getVesselData() Successful!! ' + JSON.stringify(data));
    //              this.redirectDialog = true;
    //           },
    //
    //   error => { console.log('vessel-update.component.onSubmit(): getVesselData() Failed!! ' + error.message) }
    // );
    }

    if (this.activeRoute.method == request.PUT) {
      this.fileService.saveJsonPut(this.activeRoute, this.httpPostData, this.vesselData).subscribe(
        data => { console.log('vessel-update.onSubmit() : saveJsonPut() Successful!! : ' + JSON.stringify(data));
                },
        error => { console.log('vessel-update.onSubmit() : saveJsonPut() Failed!! ' + error.message) }
      );
    }

    if (this.activeRoute.method == request.POST) {
      this.fileService.saveJsonPost(this.activeRoute, this.httpPostData, this.vesselData).subscribe(
        data => { console.log('vessel-update.onSubmit() : saveJsonPost() Successful!! : ' + JSON.stringify(data));
                },
        error => { console.log('vessel-update.onSubmit() : saveJsonPost() Failed!! : ' + error.message) }
      );
    }
    this.clearForm();
  }

  clearForm() {
    this.model = new VesselModel();
    this.vesselData = [];
  }

  onReset() {
    this.clearForm();
  }

  onCancel() {
    this.clearForm();
  }

  ngOnInit() {

    this.security_labels = [
      {value: 'CONFIDENTIAL_REL_TO_USA_FVEY', label: 'CONFIDENTIAL//REL TO USA, FVEY'},
      {value: 'CONFIDENTIAL_REL_TO_USA_GMIF', label: 'CONFIDENTIAL//REL TO USA, GMIF'},
      {value: 'SECRET_REL_TO_USA_CMFC_CMFP_GMIF', label: 'SECRET//REL TO USA, CMFC, CMFP, GMIF'},
      {value: 'SECRET_REL_TO_USA_FVEY', label: 'SECRET//REL TO USA, FVEY'},
      {value: 'SECRET_REL_TO_USA_CMFC_GMIF', label: 'SECRET//REL TO USA, CMFC, GMIF'},
      {value: 'TOP_SECRET_REL_TO_USA_FVEY', label: 'TOP SECRET//REL TO USA, FVEY'},
      {value: 'UNCLASSIFIED', label: 'UNCLASSIFIED'},
      {value: 'UNCLASSIFIED_DEVELOPMENT_SYSTEM_HIGH', label: 'UNCLASSIFIED//DEVELOPMENT SYSTEM HIGH'},
      {value: 'UNCLASSIFIED_DEVELOPMENT_SYSTEM_LOW', label: 'UNCLASSIFIED//DEVELOPMENT SYSTEM LOW'},
      ];

      this.image_sources = [
      {value: 'MALTA', label: 'MALTA'},
      {value: 'MEDIA', label: 'MEDIA'},
      {value: 'MISC', label: 'MISC'},
      {value: 'OPEN_SOURCE', label: 'OPEN SOURCE'},
      {value: 'OPMARINE', label: 'OPMARINE'},
      {value: 'OTHER', label: 'OTHER'},
      {value: 'PANAMA', label: 'PANAMA'},
      {value: 'R.A.F.', label: 'R.A.F.'},
      {value: 'SINGAPORE', label: 'SINGAPORE'},
      {value: 'SUEZ', label: 'SUEZ'},
      {value: 'THOMAS_B_ELLSWORTH', label: 'THOMAS B. ELLSWORTH'},
      {value: 'U.S.C.G.', label: 'U.S.C.G.'},
      {value: 'VP', label: 'VP'},
      {value: 'WIM', label: 'WIM'},
      ];

      this.aspects = [
      {value: 'ARIAL_OVERHEAD', label: 'ARIAL OVERHEAD'},
      {value: 'BOW', label: 'BOW'},
      {value: 'BOW_QUARTER', label: 'BOW QUARTER'},
      {value: 'BROADSIDE', label: 'BROADSIDE'},
      {value: 'CAPACITY_PLANS', label: 'CAPACITY_PLANS'},
      {value: 'CLOSEUP', label: 'CLOSEUP'},
      {value: 'CREW_LIST', label: 'CREW LIST'},
      {value: 'CREW_PHOTO', label: 'CREW PHOTO'},
      {value: 'DECKHOUSE', label: 'DECKHOUSE'},
      {value: 'ELECTRONICS_RADAR', label: 'ELECTRONICS RADAR'},
      {value: 'FIRE_SAFETY_PLANS', label: 'FIRE SAFETY PLANS'},
      {value: 'FLIR', label: 'FLIR'},
      {value: 'GENERAL_ARRANGEMENT_PLANS', label: 'GENERAL ARRANGEMENT PLANS'},
      {value: 'GENERAL_ARRANGEMENT_PROFILE', label: 'GENERAL ARRANGEMENT PROFILE'},
      {value: 'LIST', label: 'LIST'},
      {value: 'LOFARGRAM', label: 'LOFARGRAM'},
      {value: 'OTHER', label: 'OTHER'},
      {value: 'OTHER_PLANS', label: 'OTHER PLANS'},
      {value: 'PORT_BOW_QUARTER', label: 'PORT BOW QUARTER'},
      {value: 'PORT_STERN_QUARTER', label: 'PORT STERN QUARTER'},
      {value: 'STARBOARD_BOW_QUARTER', label: 'STARBOARD BOW QUARTER'},
      {value: 'STARBOARD_STERN_QUARTER', label: 'STARBOARD STERN QUARTER'},
      {value: 'STERN_QUARTER', label: 'STERN QUARTER'},
      {value: 'STERN', label: 'STERN'},
      {value: 'TEST', label: 'TEST'},
      ];

      this.sortFields = [
        {value: 'Sconum', label: 'Sconum'},
        {value: 'IIR_Number', label: 'IIR Number'},
        {value: 'Image_Source', label: 'Image Source'},
        {value: 'Image_Aspect', label: 'Image Aspect'},
        {value: 'Upload Date', label: 'Upload Date'},
        {value: 'Classification_Label', label: 'Classification'},
        ];

      this.imageOptions = [
        {name: 'True',  value: 1},
        {name: 'False', value: 2},
        {name: 'Both',  value: 3}
    ];

      this.pageOptions = [
        {name: '50',   value: 50},
        {name: '100',  value: 100},
        {name: '250',  value: 250},
        {name: '1000', value: 1000},
    ];

    this.users = [
      {label: 'JMORIARTY', value: 'JMORIARTY'},
      {label: 'JWATSON', value: 'JWATSON'},
    ];

    this.sortOptions = [
        {name: 'Ascending',   value:'ASC'},
        {name: 'Decending',   value:'DESC'},
    ];
  }

}
