import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { IAspect, IImageSource, ISecurityLabel, IFormLabel, IImageData } from 'src/app/shared/interfaces';
import { Customer } from '../domain/customer';
import { Router } from '@angular/router';
import { FileService } from '../service/file.service';
import { ToasterMsg_Service } from 'src/app/services/SHARED_SERVICES/toasterMsg.service';
import { HttpRedirect_Service } from 'src/app/forms/SHARED_FORMS/httpRedirect.service';
import { HttpClient } from '@angular/common/http';
import { UploadImageForm } from 'src/app/classes/forms/uploadImageForm.class';
import { HttpBase } from 'src/app/forms/SHARED_FORMS/http.component';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { FormUtility } from 'src/app/classes/forms/formUtility.class';
import { DateTime } from 'src/app/classes/dateTime.class';

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
@Input ( ) terminateHttp: boolean;
@Output( ) securityBanner   = new EventEmitter<string>(true);
@Output( ) searchInProgress = new EventEmitter<boolean>(true);
@Output( ) activeButton   = new EventEmitter<string>(true);

@ViewChild('fileUpload') fileUpload: any;
@ViewChild('securityLabel') securityLabel: any;
@ViewChild('classLabel') classLabel: any;
@ViewChild('sconum') sconum: any;
    uploadFiles: any[] = [];
    security_labels: ISecurityLabel[];
    formLabels: IFormLabel[] = [];
    imageData: IImageData[] = [];
    // imageData: any[] = [];
    aspects: IAspect[];
    image_sources: IImageSource[];
    redirectDialog: boolean;
    customer: Customer;
    uploadSuccess: Boolean;
    httpPostData: FormData;
    file: any;
    url:string = '/viper/resources/upload';   
    formUtility: FormUtility = new FormUtility();
    date: DateTime = new DateTime();
    model: UploadForm;
    private fileList = [];
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

    resetArray(event) {
        this.uploadFiles = [];
        event.files = [];
        }

    clearForm() {

        this.fileUpload.clear();
        this.model = new UploadForm('','','',[],[],[],'',[]);
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

      return ( this.url  ) ;
    }

    createPostData ():FormData  {

      let formData: FormData = new FormData();

      for (var i = 0; i < this.uploadFiles.length; i++)
      formData.append('files', this.uploadFiles[i]);

      for (var i = 0; i < this.imageData.length; i++) 
      {
        var fieldValue = this.imageData[i].label;
        var fieldLabel = this.imageData[i].value;

        if(( fieldValue == undefined ) || 
        ( fieldValue == null      ) || 
        ( fieldValue == ""        ))
            fieldValue = "9999";

        if(( fieldLabel == undefined ) || 
        ( fieldLabel == null      ) || 
        ( fieldLabel == ""        ))
          fieldLabel = "9999";

        // if (fieldName === "imageDate") {  
        //     var datePipe = new DatePipe('en-US');
        //     fieldValue = datePipe.transform(fieldValue, 'MM/dd/yyyy');
        // }

        formData.append(fieldLabel, fieldValue);
        formData.append(fieldValue, fieldLabel);
      }
      return ( formData );
    }

      customUploader(event)  {

        for (let file of event.files) {
          if (file.size != 0)
            this.uploadFiles.push(file);
        }      

        for (var i = 0; i < this.model.labels.length; i++) {
          this.imageData.push({label:this.model.labels[i].label, value:this.model[this.model.labels[i].label]});
        }

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
        //   data => {console.log('upload-image.component.customUploader: Upload Successful')}, 
        //   Error => {console.log('upload-image.component.customUploader: Upload Failed')}
        // );

        // this.resetArray(event);
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
