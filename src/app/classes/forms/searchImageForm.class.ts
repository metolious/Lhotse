import { Injectable } from '@angular/core';
import { Chips_Service } from '../../misc/chips.service';
import { ToasterMsg_Service } from '../../services/toasterMsg.service';
import { MultiSelect_Service } from '../../startup/multiSelect.service';
import { BaseForm } from './baseForm.class';
import { FormUtility } from './formUtility.class';

import * as cloneDeep from 'lodash';
// import { Paging_Service } from '../paging.class';
import { Authorization } from '../shared_classes/authorization.class';
import { Paging_Service } from '../paging.class';
import { LoginUser_Service } from 'src/app/services/loginUser.service';

@Injectable()
export class SearchImageForm extends BaseForm {

    formUtility: FormUtility = new FormUtility();

    private formName: string = "SearchImageForm";
    public transferFromUpload = false;
    protected pane_Virgin: any;
  
    coreUrl: string = "";
    pagingUrl: string = "";
  
    format: string = "json";
    offset: string = "1";
    limit: string = "15";
    filename: string = "type_In-File_Name";
    filenameRegex: string = "[A-Za-z0-9_-]{3,40}$";
  
    public sort: string = "imageDate";
  
    submit: string = ""
  
    public collapsed = {
      regex: false,
      select: false,
      id: false,
      boolean: false,
      date: false,
      notVisible: false
    };

    private chipsServiceParams = [
        { fieldName: "sconum", label: "Sconum", regexCode: "sconum", regex: "", maxItems: 100 },
        { fieldName: "amidshipsId", label: "Amidships Id", regexCode: "amidshipsId", regex: "", maxItems: 100 },
        { fieldName: "iirNumber", label: "IIR Number", regexCode: "iirNumberSearch", regex: "", maxItems: 100 },
        { fieldName: "otherSource", label: "Other Source", regexCode: "imageOtherSource", regex: "", maxItems: 100 }
      ];
    
      public pane =
        {
          notVisible: [
            { fieldName: "productionType", value: '*' },
            { fieldName: "fileExtension", value: '*' },
            { fieldName: "mimeType", value: '*' },
            { fieldName: "validityPicture", value: '*' },
            { fieldName: "processingRequired", value: '*' }
          ],
    
          regex: Chips_Service[4] = [
            new Chips_Service(undefined, "sconum", "?", "?", "?", 100, 'false'),
            new Chips_Service(undefined, "amidshipsId", "?", "?", "?", 100, 'false'),
            new Chips_Service(undefined, "iirNumber", "?", "?", "?", 100, 'false'),
            new Chips_Service(undefined, "otherSource", "?", "?", "?", 100, 'false')
          ],
    
          select: [
            { fieldName: "aspect", label: "Aspect", value: [], funcName: "getAspects", options: [], required: false },
            { fieldName: "securityId", label: "Security Label", value: [], funcName: "getSecurityLabels", options: [], required: false },
            { fieldName: "reviewStateCode", label: "Review State Code", value: [], funcName: "getReviewStateCodes", options: [], required: false },
            { fieldName: "imageSource", label: "Image Source", value: [], funcName: "getImageSources", options: [], required: false }
          ],
          id: [
            { fieldName: "lastModifiedBy", label: "Last Modified By", value: [], options: [], required: false },
            { fieldName: "approverId", label: "Approved By", value: [], options: [], required: false },
            { fieldName: "reviewerId", label: "Reviewed By", value: [], options: [], required: false },
            { fieldName: "inputAnalystId", label: "Input", value: [], options: [], required: false }
          ],
          boolean: [
    
            { fieldName: "primaryImage", label: "Primary Image", value: '*', display: true },
            { fieldName: "distribution", label: "Distribution", value: '*', display: true },
          ],
          date: [
            { fieldName: "uploadDate", label: "Upload Date", selectionMode: "range", value: Date[2], start: this.minDate, range: this.yearRange },
            { fieldName: "enclosureDate", label: "Enclosure Date", selectionMode: "range", value: Date[2], start: this.minDate, range: this.yearRange },
            { fieldName: "lastModifiedDate", label: "Last Modified Date", selectionMode: "range", value: Date[2], start: this.minDate, range: this.yearRange },
            { fieldName: "approverDate", label: "Approver Date", selectionMode: "range", value: Date[2], start: this.minDate, range: this.yearRange },
            { fieldName: "reviewDate", label: "Review Date", selectionMode: "range", value: Date[2], start: this.minDate, range: this.yearRange },
            { fieldName: "imageDate", label: "Image Date", selectionMode: "range", value: Date[2], start: this.imageMinDate, range: this.imageYearRange }
          ]
        };
    
      urlParams = [
        { name: "sconum", type: "multiple" },
        { name: "imageGuid", type: "multiple" },
        { name: "fileExtension", type: "single" },
        { name: "aspect", type: "multiple" },
        { name: "amidshipsId", type: "multiple" },
        { name: "iirNumber", type: "multiple" },
        { name: "imageSource", type: "multiple" },
        { name: "otherSource", type: "multiple" },
        { name: "mimeType", type: "single" },
        { name: "reviewStateCode", type: "multiple" },
        { name: "imageDate", type: "multiple" },
        { name: "uploadDate", type: "multiple" },
        { name: "inputAnalystId", type: "multiple" },
        { name: "enclosureDate", type: "multiple" },
        { name: "approverId", type: "multiple" },
        { name: "approverDate", type: "multiple" },
        { name: "reviewerId", type: "multiple" },
        { name: "reviewDate", type: "multiple" },
        { name: "lastModifiedBy", type: "multiple" },
        { name: "lastModifiedDate", type: "multiple" },
        { name: "securityId", type: "multiple" },
        { name: "productionType", type: "single" },
    
        { name: "validityPicture", type: "single" },
        { name: "processingRequired", type: "single" },
        { name: "primaryImage", type: "single" },
        { name: "distribution", type: "single" },
      ];
    
      public sortBy = [
    
        { label: "Sconum", value: "sconum" },
        { label: "Aspect", value: "aspect" },
    
        { label: "Image Source", value: "imageSource" },
        { label: "Other Source", value: "otherSource" },
    
        { label: "Review State Code", value: "reviewStateCode" },
    
        { label: "Image Date", value: "imageDate" },
        { label: "First Review Date", value: "firstReviewDate" },
        { label: "Last Modified Date", value: "lastModifiedDate" },
        { label: "Upload Date", value: "uploadDate" },
        { label: "Enclosure Date", value: "enclosureDate" },
        { label: "Approver Date", value: "approverDate" },
    
        { label: "Input Analyst Id", value: "inputAnalystId" },
        { label: "Last Modified By", value: "lastModifiedBy" },
    
        { label: "Security Id", value: "securityId" },
    
        { label: "Production Type", value: "productionType" },
    
        { label: "Validity Picture", value: "validityPicture" },
        { label: "Processing Required", value: "processingRequired" },
        { label: "Primary Image", value: "primaryImage" },
        { label: "Distributed", value: "distribution" }];
    
      public triBooleans = [
        { label: 'True', value: "true" },
        { label: 'False', value: "false" },
        { label: 'Both', value: "*" }
      ];
    
      public submitType: boolean = true;
      public orderDirection: string = "DESC";
      public ReviewForMe: boolean = false;

      constructor(messageService: ToasterMsg_Service,
        multiSelectService: MultiSelect_Service,
        private loginUserService: LoginUser_Service,
        private paging: Paging_Service) {
        super(messageService, multiSelectService);
      }

public initStartup(regExp: object, userDnId: Authorization[]) {
  let required = "false";

  for (var i = 0; i < this.chipsServiceParams.length; i++) {
    this.pane.regex[i] = new Chips_Service(
      this.messageService,
      this.chipsServiceParams[i].fieldName,
      this.chipsServiceParams[i].label,
      this.chipsServiceParams[i].regexCode,
      regExp[this.chipsServiceParams[i].regexCode],
      this.chipsServiceParams[i].maxItems, required);
  }

  this.formUtility.processMultiSelect(this.pane, this.multiSelectService);

  for (var idNum = 0; idNum < this.pane.id.length; idNum++) {
    for (var user = 0; user < userDnId.length; user++) {
      this.pane["id"][idNum].options.push({ label: userDnId[user].ID, value: userDnId[user].ID });
    }
    this.pane["id"][idNum].options.sort(this.compare);
  }

  this.pane_Virgin = cloneDeep(this.pane);

}
compare(a, b) {
  if (a.label < b.label)
    return (-1);
  else if (a.label > b.label)
    return (1);

  return (0);
}
public setSconum(sconum: string) {
  console.log(`Search Form Set SCONUM ${sconum}`);
  this.pane.regex[0].value = [sconum];
}
public getSconums(): string[] {
  return (this.pane.regex[0].value);
}

public setUploadDates(dates: Date[]) {
  console.log(`Search Form Set Upload Dates ${dates}`);
  this.pane.date[0].value = dates;
}
public getUploadDates(): Date[] {

  return (this.pane.date[0].value);
}
public fieldSetToggle(fieldSet) {
  let oldSetting = this.collapsed[fieldSet];
  this.collapsed[fieldSet] = !this.collapsed[fieldSet];
  let newSetting = this.collapsed[fieldSet];

  console.log("Pane [" + fieldSet + "], changed from [" + oldSetting + "==>>" + newSetting + "]");
  console.log("New Collapsed =" + JSON.stringify(this.collapsed));

  if (newSetting === true) {
    let SUMMARY = 'Collapsing Search Form Pane !!!';
    let DETAIL = 'No values entered in a closed pane are used in a query.' +
      ' All values becomed wildcards -- *';
    this.messageService.add('warn', 10, SUMMARY, DETAIL);
  }
}
public reset() {
  this.ReviewForMe = false;

  this.pane_Virgin['select'][2].value = [];
  this.pane_Virgin['id'][2].value = [];

  // this.pane = cloneDeep(this.pane_Virgin);
}
public testForFormEdits(): boolean {
  let formEditsFound: boolean = false;

  if (this.buildCoreUrl(this.pane) === this.buildCoreUrl(this.pane_Virgin))
    formEditsFound = false;
  else
    formEditsFound = true;

  if ((formEditsFound === false) && (this.ReviewForMe === true))
    formEditsFound = true;

  return (formEditsFound);
}
public toggleImagesToApprove(event: any) {
  let value = event.target.checked;

  this.pane['select'][2].value = [];
  this.pane['id'][2].value = [];

  if (value === true) {
    this.pane['select'][2].value.push('1'); // '1' === Review, [2]=="reviewStateCode"
    this.pane['id'][2].value.push(this.loginUserService.getUserId()); // '1' === Review, [2]=="reviewerId"
  }

}
public buildCoreUrl(paneToUse: object): string {
  let buildUrl = "";

  for (var i = 0; i < this.urlParams.length; i++) {
    let fieldName: string = this.urlParams[i].name;
    let qualifier: string = undefined;

    if ((fieldName === "reviewStateCode") && (this.ReviewForMe === true)) {
      // this query give big hits, large # of page buttons in footer & messes up the table columns.
      // Temporary fix is to force a large/1000 page size.
      this.paging.pageSize = 1000;
    }

    if (fieldName === "reviewerId") {
      if (this.ReviewForMe === true) {
        qualifier = "NOT";
      }
      else
        qualifier = "IN";
    }

    if (this.urlParams[i].type === "single")
      buildUrl += this.formUtility.addSingleString(paneToUse, fieldName, this.collapsed);
    else if (this.urlParams[i].type === "multiple")
      buildUrl += this.formUtility.addMultipleString(paneToUse, fieldName, this.collapsed, qualifier);
  }

  console.log("..CORE.. URL ==>> " + buildUrl);
  return (buildUrl);
}
public getUrl(): string {
  this.pagingUrl = "";

  if (this.submitType === true) {
    if (this.paging.reUseQuery === false)
      this.coreUrl = "";

    this.paging.setSort(this.sort);
    this.paging.setOrder(this.orderDirection);
    this.pagingUrl += this.paging.buildUrlQualifiers();
  }
  else {
    this.coreUrl = "/export";
    this.paging.reUseQuery = false;

    this.pagingUrl += this.formUtility.addUrlQualifier("?", "format", "json");
    this.pagingUrl += this.formUtility.addUrlQualifier("&", "filename", this.filename);
  }

  // Not exporting (Doing query) & not simply doing next/previous paging.
  if (this.paging.reUseQuery === false) {
    this.coreUrl = this.coreUrl + this.buildCoreUrl(this.pane);
  }

  console.log("URL ==>> " + this.coreUrl + this.pagingUrl);

  return (this.coreUrl + this.pagingUrl);
}

};  // export SearchImageForm
