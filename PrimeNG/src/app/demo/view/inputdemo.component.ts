import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { AppBreadcrumbService } from 'src/app/app.breadcrumb.service';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { IAspect, IImageSource, ISecurityLabel } from 'src/app/shared/interfaces';
import { ToasterMsg_Service } from 'src/app/services/SHARED_SERVICES/toasterMsg.service';

@Component({
    templateUrl: './inputdemo.component.html',
    styles: [`:host ::ng-deep .p-multiselect {
		min-width: 15rem;
	}

	:host ::ng-deep .multiselect-custom-virtual-scroll .p-multiselect {
		min-width: 20rem;
	}

	:host ::ng-deep .multiselect-custom .p-multiselect-label {
		padding-top: .25rem;
		padding-bottom: .25rem;

	}

	:host ::ng-deep .multiselect-custom .country-item.country-item-value {
		padding: .25rem .5rem;
		border-radius: 3px;
		display: inline-flex;
		margin-right: .5rem;
		background-color: var(--primary-color);
		color: var(--primary-color-text);
	}

	:host ::ng-deep .multiselect-custom .country-item.country-item-value img.flag {
		width: 17px;
	}

	:host ::ng-deep .multiselect-custom .country-item {
		display: flex;
		align-items: center;
	}

	:host ::ng-deep .multiselect-custom .country-item img.flag {
		width: 18px;
		margin-right: .5rem;
	}

	:host ::ng-deep .multiselect-custom .country-placeholder {
		padding: 0.25rem;
	}

	:host ::ng-deep .p-colorpicker {
		width: 2.5em
	}
    `]
})
export class InputDemoComponent implements OnInit{

@ViewChild('fileUpload') fileUpload: any;
@ViewChild('securityLabel') securityLabel: any;
@ViewChild('classLabel') classLabel: any;
@ViewChild('sconum') sconum: any;

    uploadedFiles: any[] = [];
    security_labels: ISecurityLabel[];
    aspects: IAspect[];
    image_sources: IImageSource[];
    
    countries: any[];
    filteredCountries: any[];
    selectedCountryAdvanced: any[];
    valSlider = 50;
    valColor = '#424242';
    valRadio: string;
    valCheck: string[] = [];
    valSwitch: boolean;
    cities: SelectItem[];
    selectedList: SelectItem;
    selectedDrop: SelectItem;
    selectedMulti: string[] = [];
    valToggle = false;
    paymentOptions: any[];
    valSelect1: string;
    valSelect2: string;
    valueKnob = 20;

    constructor(
                private breadcrumbService: AppBreadcrumbService,
                private messageService:       ToasterMsg_Service,
                ) {
        this.breadcrumbService.setItems([
            { label: 'Viper MSC' },
            { label: 'Upload Image', routerLink: ['/uikit/input'] }
        ]);
    }
    
    separatorKeysCodes = [ENTER, COMMA];

    clearInput() {
        this.fileUpload.clear();
      }

      resetArray(event) {

        this.uploadedFiles = [];
        event.files = [];
    
        }

      myUploader(event)  {
        for(let file of event.files) {
          if (file.size != 0)
            this.uploadedFiles.push(file);
        }
    
        if (this.uploadedFiles.length == 0)
          console.log(`upload-new.component.myUploader (before reset) length=0`);
        else {
          for(let file of this.uploadedFiles) {
        }
      }
    
        this.resetArray(event);
        this.clearInput();
    
        if (event.files.length == 0)
          console.log(`upload-new.component.myUploader (after reset) event.files.length = ${event.files.length}`);
        else {
          for(let file of event.files) {
        }
      }
    
        if (this.uploadedFiles.length == 0)
          console.log(`upload-new.component.myUploader (after reset) uploadedFiles.length = ${this.uploadedFiles.length}`);
        else {
          for(let file of this.uploadedFiles) {
        }
      }
    }
    
      onUpload(event) {
        for(let file of event.files) {
            // this.uploadedFiles.push(file);
        }
        this.messageService.add('info',  1, 'File Uploaded', '');  
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
