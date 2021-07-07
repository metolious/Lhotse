import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import { IAspect, IImageSource, ISecurityLabel, IFormLabel, IImageData, IRoute, request } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../services/file.service';
import { HttpRedirect_Service } from '../forms/httpRedirect.service';
import { RouteService } from '../services/route.service';

export class UploadForm {

  formLabels: IFormLabel[];
  sconums: string[];
  iirNumbers: string[];
  otherSources: string[];
  labels: IFormLabel[];
  securityLabel: string;
  aspect: string;
  imageSource: string;
  imageDate: string;

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
    templateUrl: './upload-image.component.html',
    styles: ['./upload-image.scss']
})
export class UploadImageComponent implements OnInit { 

@Output( ) searchInProgress = new EventEmitter<boolean>(true);
@ViewChild('fileUpload', {static: false}) fileUpload: any;

    uploadFiles: any[] = [];
    imageData: IImageData[] = [];
    security_labels: ISecurityLabel[];
    formLabels: IFormLabel[] = [];
    aspects: IAspect[];
    image_sources: IImageSource[];
    redirectDialog: Boolean = false;
    httpPostData: FormData;
  
    model: UploadForm;
    submitted = false;
    routes: IRoute[] = [];
    activeRoute: IRoute = {};

    constructor(private breadcrumbService:      AppBreadcrumbService,
                private primengMessageService:  MessageService,
                private confirmationService:    ConfirmationService,
                private fileService:    FileService,
                private router:         Router,
                private routeService:   RouteService
                ) {

        this.model = new UploadForm();

        this.routeService.getRoutes().then(routes => {
          this.routes = routes
        });

        this.breadcrumbService.setItems([
            { label: 'Viper MSC' },
            { label: 'Upload Image', routerLink: ['/uikit/tree'] }
        ]);
    }

    clearForm() {
        this.model = new UploadForm();
        this.uploadFiles = [];
        this.imageData = [];
        this.fileUpload.clear();
      }

    initDialog() {
        this.confirmationService.confirm({
            header: 'File Upload Successful',
            key: 'confirm1',
            message: 'Go to Search Results page to view results?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                  this.primengMessageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
                  this.router.navigate(['/uikit/table']);
              },
              reject: (type) => {
                this.primengMessageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
              }
        });
    }

    createPostData ():FormData  {

      let formData: FormData = new FormData();

      for (var i = 0; i < this.imageData.length; i++) 
      {
        var fieldLabel = this.imageData[i].label;
        var fieldValue = this.imageData[i].value;

        if(( fieldLabel === undefined ) || 
        ( fieldLabel === null      ) || 
        ( fieldLabel === ""        ))
          continue;

        // if (fieldName === "imageDate") {  
        //     var datePipe = new DatePipe('en-US');
        //     fieldValue = datePipe.transform(fieldValue, 'MM/dd/yyyy');
        // }

        formData.append(fieldLabel, fieldValue);
      }

      for (var i = 0; i < this.uploadFiles.length; i++) {
        formData.append('files', this.uploadFiles[i]);
      }

      return ( formData );
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

    onSubmit() {
      this.submitted = true;
    }

    showDialog() {
      this.redirectDialog = true;
    }

    hideDialog() {
      this.redirectDialog = false;
    }
    
    redirectSearchResults() {
      this.router.navigate(['/uikit/table']);
    }

    customUploader(event)  {

      for (let file of event.files) {
        if (file.size != 0)
          this.uploadFiles.push(file);
      }      

      for (var i = 0; i < this.model.labels.length; i++) {
        this.imageData.push({label:this.model.labels[i].label, value:this.model[this.model.labels[i].label]});
      }

      this.searchInProgress.emit(true);
      this.httpPostData  = this.createPostData();
      this.setActiveRoute();

      // this.confirmForSubmit=false;
      // if ( this.uploadImageForm.numInvalidImages > 0 )
      // {
      //   this.messageService.add ( 'error',8, "Some files are INVALID !!!",
      //             "Number of invalid files [" + this.uploadImageForm.numInvalidImages + "]" );
      //   return;
      // }

      if (this.activeRoute.method == request.GET) {
        this.fileService.getImageData(this.activeRoute).subscribe(
          data => { console.log('upload-image.customUploader: getImageData() Successful!! ' + data)
                    this.showDialog();
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
        this.fileService.saveImageDataPut(this.activeRoute, this.httpPostData, this.imageData).subscribe( 
          data => { console.log('upload-image.customUploader: saveImagePut() Successful!! ' + JSON.stringify(data));
                    this.showDialog();
                  }, 
          error => { console.log('upload-image.customUploader: saveImagePut() Failed!! ' + error.message) }
        );
      }

      if (this.activeRoute.method == request.POST) {
        this.fileService.saveImageDataPost(this.activeRoute, this.httpPostData, this.imageData).subscribe( 
          data => { console.log('upload-image.customUploader: saveImagePost() Successful!! ' + JSON.stringify(data));
                    this.showDialog();
                  }, 
          error => { console.log('upload-image.customUploader: saveImagePost() Failed!! ' + error.message) }
        );
      }

      this.clearForm();
      this.initDialog();
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
    }
}
