import {Component, OnInit, ViewChild} from '@angular/core';
import {CountryService} from '../service/countryservice';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { IAspect, IImageSource, ISecurityLabel } from 'src/app/shared/interfaces';
import { Customer } from '../domain/customer';
import { Router } from '@angular/router';

@Component({
    templateUrl: './treedemo.component.html',
    styles: ['./treedemo.component.scss']
})
export class TreeDemoComponent implements OnInit {

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

    constructor(private breadcrumbService: AppBreadcrumbService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private route: Router
                ) {
        this.breadcrumbService.setItems([
            { label: 'Ui Kit' },
            { label: 'Upload Image', routerLink: ['/uikit/tree'] }
        ]);
    }

    separatorKeysCodes = [ENTER, COMMA];

    resetArray(event) {

        this.uploadedFiles = [];
        event.files = [];
        }

    clearInput() {
        this.fileUpload.clear();
      }

      initDialog() {
        this.confirmationService.confirm({
            header: 'File Upload Successful',
            key: 'confirm1',
            message: 'Go to Search Results page to view results?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                  this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
                  this.route.navigate(['/uikit/table']);
              },
              reject: (type) => {
                this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
              }
        });
    }

      customUploader(event, customer)  {
        for(let file of event.files) {
          if (file.size != 0)
            this.uploadedFiles.push(file);
            // use customUploader for testing
            // use onUpload() Callback to invoke when file upload is complete
            // event.originalEvent: Http Event 
            // event.files: Uploaded files.
            this.customer = {...customer};
            // this.redirectDialog = true;

          // console.log(`treedemo.component.customUploader event.files.length = ${event.files.length}`);
        }

        if (this.uploadedFiles.length)
            this.uploadSuccess = true;

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
