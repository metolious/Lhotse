import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import { IAspect, IImageSource, ISecurityLabel, IFormLabel, IImageData } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';
import { FileService } from '../service/file.service';
import { ToasterMsg_Service } from 'src/app/services/SHARED_SERVICES/toasterMsg.service';
import { HttpRedirect_Service } from 'src/app/forms/SHARED_FORMS/httpRedirect.service';
import { HttpClient } from '@angular/common/http';
import { UploadImageForm } from 'src/app/classes/forms/uploadImageForm.class';
import { HttpBase } from 'src/app/forms/SHARED_FORMS/http.component';

export class UploadForm {
  constructor(
    public securityLabel: string,
    public aspect: string,
    public imageSource: string,
    public sconums: string[],
    public iirNumbers: string[],
    public otherSources: string[],
    public imageDate: string,
    public labels: IFormLabel[]
  ) {  }
}

@Component({
    templateUrl: './upload-image.component.html',
    styles: ['./upload-image.scss']
})
export class UploadImageComponent extends HttpBase implements OnInit { 

@Output( ) searchInProgress = new EventEmitter<boolean>(true);
@ViewChild('fileUpload') fileUpload: any;

    uploadFiles: any[] = [];
    imageData: IImageData[] = [];
    security_labels: ISecurityLabel[];
    formLabels: IFormLabel[] = [];
    aspects: IAspect[];
    image_sources: IImageSource[];
    redirectDialog: boolean;
    uploadSuccess: Boolean;
    httpPostData: FormData;
    url:string = '/viper/resources/upload';   
    saveUrl:string = '/save';   
    model: UploadForm;
    submitted = false;

    constructor(http:                  HttpClient,
                httpService:           HttpRedirect_Service,
                messageService:        ToasterMsg_Service,
                private breadcrumbService: AppBreadcrumbService,
                private primengMessageService: MessageService,
                private confirmationService: ConfirmationService,
                private uploadImageForm:       UploadImageForm,
                private fileService: FileService,
                private route: Router,
                ) {

        super ( http, httpService, messageService );

        this.breadcrumbService.setItems([
            { label: 'Viper MSC' },
            { label: 'Upload Image', routerLink: ['/uikit/tree'] }
        ]);

    }

    onSubmit() {
      this.submitted = true;
    }

    clearForm() {
        this.model = new UploadForm('','','',[],[],[],'',this.formLabels);
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
                  this.route.navigate(['/uikit/table']);
              },
              reject: (type) => {
                this.primengMessageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
              }
        });
    }

    getUrl (): string {

      return ( this.saveUrl  ) ;
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

      // for (i=0; i < this.imageData.length; i++)
      // {
      
      //   console.log(`upload.image.createPostData formData.getAll(this.imageData[i].label) = ${formData.getAll(this.imageData[i].label)}`);
      // }
      // console.log(`upload.image.createPostData formData.getAll('files') = ${formData.getAll('files')}`);

      return ( formData );
    }

      customUploader(event)  {

        for (let file of event.files) {
          if (file.size != 0)
            this.uploadFiles.push(file);
        }      

        for (var i = 0; i < this.model.labels.length; i++) {
          // console.log('upload-image.component.customUploader: model label = ' + this.model.labels[i].label);
          // console.log('upload-image.component.customUploader: model value = ' + this.model[this.model.labels[i].label]);
          this.imageData.push({label:this.model.labels[i].label, value:this.model[this.model.labels[i].label]});
        }

        // for (var i=0; i<this.imageData.length; i++) {
        //   console.log('upload-image.component.customUploader: imageData[i].label = ' + this.imageData[i].label);
        //   console.log('upload-image.component.customUploader: imageData[i].value = ' + this.imageData[i].value);
        // }

        this.confirmForSubmit=false;
        if ( this.uploadImageForm.numInvalidImages > 0 )
        {
          this.messageService.add ( 'error',8, "Some files are INVALID !!!",
                    "Number of invalid files [" + this.uploadImageForm.numInvalidImages + "]" );
          return;
        }
  
        this.searchInProgress.emit(true);
        this.uploadImageForm.isUploadedSubmitted = true;
  
        this.httpPostData  = this.createPostData();
        this.postUrl = this.getUrl();

        // this.fileService.uploadImage(this.httpPostData)
        // this.submitToHttpPost(this.httpPostData);

        // this.fileService.saveFile(this.uploadFiles).subscribe( 
        //   data => {console.log('upload-image.component.customUploader: Upload Successful!!')}, 
        //   error => {console.log('upload-image.component.customUploader: Upload Failed!!')}
        // );

        // this.fileService.getRoot().subscribe( 
        //   data => {console.log('upload-image.component.customUploader: getRoot() Successful!! JSON.stringify(data) = ' + JSON.stringify(JSON.parse(data.toString())))}, 
        //   error => {console.log('upload-image.component.customUploader: getRoot() Failed!! error.message = ' + error.message)}
        // );

        // this.fileService.saveFilePut(this.postUrl, this.httpPostData, this.imageData).subscribe( 
        //   data => {console.log('upload-image.component.customUploader: saveFilePut() Successful!! ' + JSON.stringify(data))}, 
        //   error => {console.log('upload-image.component.customUploader: saveFilePut() Failed!! ' + error.message)}
        // );

        this.fileService.saveFilePost(this.postUrl, this.httpPostData, this.imageData).subscribe( 
          data => {console.log('upload-image.component.customUploader: saveFilePost() Successful!! ' + JSON.stringify(data))}, 
          error => {console.log('upload-image.component.customUploader: saveFilePost() Failed!! ' + error.message)}
        );

        this.clearForm();
        this.initDialog();
      }

    ngOnInit() {

        this.uploadSuccess = false;
        
        this.formLabels = [
          {label: 'securityLabel'},
          {label: 'aspect'},
          {label: 'imageSource'},
          {label: 'sconums'},
          {label: 'iirNumbers'},
          {label: 'otherSources'},
          {label: 'imageDate'}
        ]; 
        this.model = new UploadForm('','','',[],[],[],'',this.formLabels);

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
