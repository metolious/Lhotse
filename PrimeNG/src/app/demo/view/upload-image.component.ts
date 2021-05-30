import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { IAspect, IImageSource, ISecurityLabel } from 'src/app/shared/interfaces';
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

export class UploadForm {

  constructor(
    public securityLabel: string,
    public aspect: string,
    public imageSource: string,
    public upload: any,
    public sconums: string[],
    public iirNumbers: string[],
    public otherSources: string[],
    public imageDate: string
  ) {  }

}

@Component({
    templateUrl: './upload-image.component.html',
    styles: ['./upload-image.scss']
})
export class UploadImageComponent extends HttpBase implements OnInit {

model = new UploadForm('', '', '', '', [], [], [], '');

submitted = false;

@Input ( ) terminateHttp: boolean;
@Output( ) securityBanner   = new EventEmitter<string>(true);
@Output( ) searchInProgress = new EventEmitter<boolean>(true);
@Output( ) activeButton   = new EventEmitter<string>(true);

@ViewChild('fileUpload') fileUpload: any;
@ViewChild('securityLabel') securityLabel: any;
@ViewChild('classLabel') classLabel: any;
@ViewChild('sconum') sconum: any;
    uploadedFiles: any[] = [];
    security_labels: ISecurityLabel[];
    aspects: IAspect[];
    image_sources: IImageSource[];
    redirectDialog: boolean;
    customer: Customer;
    uploadSuccess: Boolean;
    httpPostData: FormData;
    // file: any = this.fileService.form.value;
    file: any;

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
            { label: 'Ui Kit' },
            { label: 'Upload Image', routerLink: ['/uikit/tree'] }
        ]);
    }

    separatorKeysCodes = [ENTER, COMMA];


    onSubmit() {
      this.submitted = true;
    }

    resetArray(event) {
        this.uploadedFiles = [];
        event.files = [];
        }

    clearInput() {

        this.fileUpload.clear();
        this.model = new UploadForm('', '', '', '', [], [], [], '');
      
        // this.fileUpload.clear();
        // file.imageDate = null;
        // file.imageDate.updateInputfield("");
        // this.file.securityLabel = '';
        // this.file.aspect = '';    
        // this.file.reset();

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

      customUploader(event)  {
        for(let file of event.files) {
          if (file.size != 0)
            this.uploadedFiles.push(file);
            // use customUploader for testing
            // use onUpload() Callback to invoke when file upload is complete
            // event.originalEvent: Http Event 
            // event.files: Uploaded files.
            // this.customer = {...customer};
            // this.redirectDialog = true;
            // console.log(`uploadImage.component.customUploader event.files.length = ${event.files.length}`);
        }
  
        // if (this.uploadedFiles.length)
        //     this.uploadSuccess = true;
        
            // this.file = this.fileService.form.value;
            var datePipe = new DatePipe('en-US');
            var imageDate = datePipe.transform(this.model.imageDate, 'MM/dd/yyyy');

            console.log(`uploadImage.component.customUploader this.model.securityLabel = ${this.model.securityLabel}`);
            console.log(`uploadImage.component.customUploader this.model.aspect = ${this.model.aspect}`);
            console.log(`uploadImage.component.customUploader this.model.imageSource = ${this.model.imageSource}`);
            // for (let item in this.model.upload){
            //   console.log(`uploadImage.component.customUploader this.model.upload item = ${item}`);
            // }
            console.log(`uploadImage.component.customUploader this.model.upload = ${this.model.upload}`);            
            console.log(`uploadImage.component.customUploader this.model.sconums = ${this.model.sconums}`);
            console.log(`uploadImage.component.customUploader this.model.iirNumbers = ${this.model.iirNumbers}`);
            console.log(`uploadImage.component.customUploader this.model.otherSources = ${this.model.otherSources}`);
            console.log(`uploadImage.component.customUploader this.model.imageDate = ${imageDate}`);

            this.confirmForSubmit=false;
            if ( this.uploadImageForm.numInvalidImages > 0 )
            {
             this.messageService.add ( 'error',8, "Some files are INVALID !!!",
                       "Number of invalid files [" + this.uploadImageForm.numInvalidImages + "]" );
             return;
            }
      
            // this.searchInProgress.emit(true);
            // this.uploadImageForm.isUploadedSubmitted = true;
      
            // this.httpPostData  = this.uploadImageForm.createPostData (  );
            // this.postUrl = this.uploadImageForm.getUrl();
            // this.submitToHttpPost(this.httpPostData);

            // .subscribe( 
            //   data => {console.log(`uploadImage.component.customUploader upload success`)}, 
            //   Error => {console.log(`uploadImage.component.customUploader upload fail`)
            // });

        this.resetArray(event);
        this.clearInput();
        this.initDialog();
    }

    ngOnInit() {

      this.uploadSuccess = false;

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
