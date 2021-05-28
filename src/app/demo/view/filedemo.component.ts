import {AppBreadcrumbService} from '../../app.breadcrumb.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { DOCUMENT } from '@angular/common';
import { MultiSelect_Service } from 'src/app/startup/multiSelect.service';
import { ToasterMsg_Service } from 'src/app/services/SHARED_SERVICES/toasterMsg.service';
import { IAspect, IImageSource, ISecurityLabel } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { HttpRedirect_Service } from '../SHARED_FORMS/httpRedirect.service';
import { UploadImageForm } from 'src/app/classes/forms/uploadImageForm.class';
import { SearchImageForm } from 'src/app/classes/forms/searchImageForm.class';
import { State_Service } from 'src/app/Misc/state.service';
import { LoginUser_Service } from 'src/app/services/SHARED_SERVICES/loginUser.service';
import { HttpBase } from '../SHARED_FORMS/http.component';
import { MessageService, SelectItem, SelectItemGroup } from 'primeng/api';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { Dropdown } from 'primeng/dropdown';
import { Chips } from 'primeng/chips';

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
  }

@Component({
    templateUrl: './filedemo.component.html',
    providers: [MessageService]
})
export class FileDemoComponent extends HttpBase implements OnInit {

    tiles: Tile[] = [
        {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
        {text: 'Three', cols: 2, rows: 1, color: 'lightpink'},
      ];
  
    cities: SelectItem[];
    selectedDrop: SelectItem;
    uploadedFiles: any[] = [];

    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;

      isMyStateActive:boolean      = false;
      filesSelected;boolean        = false;
      transferDialog               = false;
    
      imageSource: IImageSource;
      aspect: IAspect;
      security_labels: ISecurityLabel[];
      aspects: IAspect[];
      image_sources: IImageSource[];
      values1: string[];
      
      @ViewChild('fileUpload') fileUpload: any;
      @ViewChild('securityLabel') securityLabel: any;
      @ViewChild('classLabel') classLabel: any;
      @ViewChild('sconum') sconum: any;
      baseUrl:string            = '/viper/resources/upload';
      fullUrl:string            = 'https://cloud03.amsproj.com:7443/viper/resources/upload';

      constructor(private breakpointObserver:   BreakpointObserver,
        private multiSelectService:   MultiSelect_Service,
        messageService:       ToasterMsg_Service,
        http:                  HttpClient,
        httpService:          HttpRedirect_Service,
        private uploadImageForm:      UploadImageForm,
        private searchImageForm:      SearchImageForm,
        private stateService:         State_Service,
        private loginUserService:     LoginUser_Service,
        private breadcrumbService: AppBreadcrumbService,
        @Inject(DOCUMENT) protected document: Document
)  
{
super ( http, httpService, messageService );

this.breadcrumbService.setItems([
  { label: 'Viper MSC' },
  { label: 'Upload Image', routerLink: ['/uikit/formlayout'] }
]);

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

separatorKeysCodes = [ENTER, COMMA];

cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  map(({ matches }) => {
    if (true) {
      return [
        { title: 'Input-Form', viewName: 'File Composer', cols: 2, rows: 4, color: 'lightblue' },
        { title: 'Upload-Files', viewName: 'Upoad Files', cols: 2, rows: 4, color: 'lightblue' },
      ];
    }

    return [
      { title: 'Card 1', cols: 2, rows: 1 },
      { title: 'Card 2', cols: 1, rows: 1 },
      { title: 'Card 3', cols: 1, rows: 2 },
      { title: 'Card 4', cols: 1, rows: 1 }
    ];
  })
);

selectedState: any = null;

ngOnInit(): void {

}

resetArray(event) {

  this.uploadedFiles = [];
  event.files = [];
  }

  clearInput() {
    this.fileUpload.clear();
    this.classLabel.resetFilter();
    this.classLabel.value = [];
    this.sconum.value = [];
    this.sconum.label = '';
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
  }
  this.messageService.add('info',  1, 'File Uploaded', '');  
}

onBasicUpload(event) {
  for(let file of event.files) {
      this.uploadedFiles.push(file);
  }

  this.messageService.add('info',  1, 'File Uploaded', '');
}

onBasicUploadAuto(event) {
  for(let file of event.files) {
      this.uploadedFiles.push(file);
  }
    this.messageService.add('info',  1, 'File Uploaded', '');
}
}

