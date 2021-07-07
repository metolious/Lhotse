import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppBreadcrumbService } from '../app.breadcrumb.service';
import { FileService } from '../services/file.service';
import { RouteService } from '../services/route.service';
import { IAspect, IFormLabel, IImageData, IImageSource, IRoute, ISecurityLabel, IUser, request } from '../shared/interfaces';

export class VesselForm {

  formLabels: IFormLabel[];
  securityLabel: string;
  aspect: string;
  imageSource: string;
  sconums: string[];
  amidshipsId: string[];
  iirNumbers: string[];
  otherSources: string[];
  labels: IFormLabel[];
  imageDate: string;
  primeImage: string;
  distribution: string;
  pageSize: string;
  sortSelect: string;
  sortOrder: string;
  sortField: string;
  valCheck: string;
  imoNumber: string[];
  mmsiNumber: string[];
  callSign: string[];
  vesselName: string[];
  modifiedBy: string;
  approvedBy: string;
  uploadedBy: string;

  constructor()
  {
    this.formLabels = [
      {label: 'securityLabel'},
      {label: 'aspect'},
      {label: 'imageSource'},
      {label: 'sconums'},
      {label: 'iirNumbers'},
      {label: 'otherSources'},
      {label: 'imageDate'},
      {label: 'amidshipsId'},
      {label: 'primeImage'},
      {label: 'distribution'},
      {label: 'pageSize'},
      {label: 'sortSelect'},
      {label: 'sortOrder'},
      {label: 'sortField'},
      {label: 'valCheck'},
      {label: 'imoNumber'},
      {label: 'mmsiNumber'},
      {label: 'callSign'},
      {label: 'vesselName'},
      {label: 'modifiedBy'},
      {label: 'approvedBy'},
      {label: 'uploadedBy'},
    ];
    this.securityLabel = '';
    this.aspect = '';
    this.imageSource = ''
    this.sconums      = [];
    this.iirNumbers   = [];
    this.otherSources = [];
    this.imageDate = '';
    this.amidshipsId  = [];
    this.primeImage = '';
    this.distribution = '';
    this.pageSize = '';
    this.sortSelect = '';
    this.sortOrder = '';
    this.sortField = '';
    this.valCheck = '';
    this.imoNumber    = [];
    this.mmsiNumber   = [];
    this.callSign     = [];
    this.vesselName   = [];
    this.modifiedBy = '';
    this.approvedBy = '';
    this.uploadedBy = '';
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

    security_labels: ISecurityLabel[];
    formLabels: IFormLabel[] = [];
    aspects: IAspect[];
    image_sources: IImageSource[];
    imageOptions: any[];
    users: IUser[];
    redirectDialog: Boolean = false;
    httpPostData: FormData;
    sortFields: any[];
    sortOptions: any[];
    pageOptions: any[];
    model: VesselForm;
    submitted = false;
    routes: IRoute[] = [];
    activeRoute: IRoute = {};

  constructor(  private breadcrumbService: AppBreadcrumbService,
                private routeService: RouteService,
                private fileService: FileService,
             )
  {
    this.model = new VesselForm();

    this.routeService.getRoutes().then(routes => {
      this.routes = routes
    });

    this.breadcrumbService.setItems([
        { label: 'Viper MSC' },
        { label: 'Vessel Update', routerLink: ['/uikit/tree'] }
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

  onSubmit(event) {

    for (var i = 0; i < this.model.labels.length; i++) {
      var label = this.model.labels[i].label;
      var value = this.model[this.model.labels[i].label];
      console.log (`vessel-update.onSubmit() : label => ${label}`);
      if (typeof value === 'string' || value instanceof String) {
        console.log (`vessel-update.onSubmit() : value is a string => ${value}`);
      } else {
        console.log (`vessel-update.onSubmit() : value is not a string => ${value}`);
      }
      if (value != '')
        break;
    }

    this.setActiveRoute();

    if (this.activeRoute.method == request.GET) {
      this.fileService.getImageData(this.activeRoute).subscribe(
        data => { console.log('upload-image.customUploader: getImageData() Successful!! ' + data)
                },
        error => { console.log('upload-image.customUploader: getImageData() Failed!! ' + error.message) }
      )
    // this.fileService.getVesselData(this.amsVesselServiceRoute).subscribe(
    //   data => {  console.log('upload-image.component.customUploader: getVesselData() Successful!! ' + JSON.stringify(data));
    //              this.redirectDialog = true;
    //           },
    //
    //   error => { console.log('upload-image.component.customUploader: getVesselData() Failed!! ' + error.message) }
    // );
    }

    if (this.activeRoute.method == request.PUT) {
      this.fileService.saveImageDataPut(this.activeRoute, this.httpPostData, this.model).subscribe(
        data => { console.log('upload-image.customUploader: saveImagePut() Successful!! ' + JSON.stringify(data));
                },
        error => { console.log('upload-image.customUploader: saveImagePut() Failed!! ' + error.message) }
      );
    }

    if (this.activeRoute.method == request.POST) {
      this.fileService.saveImageDataPost(this.activeRoute, this.httpPostData, this.model).subscribe(
        data => { console.log('upload-image.customUploader: saveImagePost() Successful!! ' + JSON.stringify(data));
                },
        error => { console.log('upload-image.customUploader: saveImagePost() Failed!! ' + error.message) }
      );
    }
    this.clearForm();
  }

  clearForm() {
    this.model = new VesselForm();
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
