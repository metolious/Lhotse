import {  NgForm, Form               } from "@angular/forms";
import { NgModule, Injectable } from '@angular/core';
import { BaseForm } from './baseForm.class';
import { ToasterMsg_Service } from '../../services/SHARED_SERVICES/toasterMsg.service';
import { Chips_Service } from '../../Misc/chips.service';
import { MultiSelect_Service } from '../../startup/multiSelect.service';
import { FormUtility } from '../forms/formUtility.class'
import * as cloneDeep from 'lodash';
import { DateTime } from "../dateTime.class";


export class FileParts {

          name:             string;
          size:             number; 
          type:             string; 
          status:           string;
    
          prettyDate:       string;
          lastModified:     Date;
    
          constructor ( name:string, size:number, type: string, status: string, 
                        prettyDate:string, lastModified:Date )
          {
                this.name               = name;
                this.size               = size;
                this.type               = type;
                this.status             = status;
                this.prettyDate         = prettyDate;
                this.lastModified       = lastModified;
          }
    }

@Injectable()
export class UploadImageForm extends BaseForm 
{
    formUtility:FormUtility  = new FormUtility();
    date:DateTime               = new DateTime();

  //  private formName:string   = "UploadImageForm";
    private url:string        = '/viper/resources/upload';   
    
    protected pane_Virgin:    any;

    public validFileType:         string   = 'image/jpeg';   
    public numInvalidImages:      number   = 0;
    public isUploadedSubmitted:   boolean  = false;
    public collapsed = {
        regex:      false,
        select:     false,
        date:       false,
        notVisible: false
  }; 

  public uploadFiles:        File     []    = [];
  public uploadFileParts:    FileParts[]    = [];

  private chipsServiceParams = [
    { fieldName:"Sconum",       label:"Sconum",       regexCode:"sconum",      regex:"",     maxItems:1, required:'true'  },
    { fieldName:"IirNumber",    label:"IIR Number",   regexCode:"iirNumber",   regex:"",     maxItems:1, required:'false' },
    { fieldName:"OtherSource",  label:"Other Source", regexCode:"imageOtherSource", regex:"",maxItems:1, required:'false' }
   ];

   public pane = 
   {
         notVisible: [
               { fieldName:"ReviewStateCode",            value: '0'     },
               { fieldName:"PrimaryImage",               value: 'false' },
               { fieldName:"FileExtension",              value: 'JPG'   },
               { fieldName:"SiteId",                     value: '' },
               { fieldName:"ProcessingRequired:string",  value: 'false' },

               { fieldName:"ValidityPicture",            value: 'false' },
               { fieldName:"DoNotReplicate",             value: 'true'  },
               { fieldName:"Distribution",               value: 'false' },
         
               { fieldName:"InputAnalystId",             value: ''      },
               { fieldName:"InputAnalystIdDn",           value: ''      },

               
               { fieldName:"LastModifiedBy",             value: ''      }
         ],
         
         regex:Chips_Service [4]= [
                new Chips_Service ( undefined, "Sconum",     "?","?","?", 1, 'true' ),   
                new Chips_Service ( undefined, "IIRNumber",  "?","?","?", 1, 'false' ),   
                new Chips_Service ( undefined, "OtherSource","?","?","?", 1, 'false' ) 
         ],
        
         select:  [ 
            { fieldName:"SecurityId",        label:"Security Label",   value: '',   funcName: "getSecurityLabels",  options: [], required:'true' },
            { fieldName:"Aspect",            label:"Aspect",           value: '',   funcName: "getAspects",         options: [], required:'false' },
            { fieldName:"ImageSource",       label:"Image Source",     value: '',   funcName: "getImageSources",    options: [], required:'false' }
         ],
   
         date: [ 
           {      fieldName:"ImageDate",  label:"Image Date",   selectionMode:"single", value: Date[1], 
                  required:'false', start: this.imageMinDate, range: this.imageYearRange }
         ]                   
   }; 

   constructor (  messageService:         ToasterMsg_Service,
                  multiSelectService:     MultiSelect_Service 
               )
    { 
      super( messageService, multiSelectService );
    }

    public initStartup ( regExp:object, userId:string, userDn:string) {
            
             for ( var i =0; i < this.pane.notVisible.length; i++)
             {
                   if ( this.pane.notVisible[i].fieldName === "InputAnalystId")
                      this.pane.notVisible[i].value = userId;
                   if ( this.pane.notVisible[i].fieldName === "InputAnalystIdDn")
                      this.pane.notVisible[i].value = userDn;
                   if ( this.pane.notVisible[i].fieldName === "LastModifiedBy")
                      this.pane.notVisible[i].value = userId;
             }
        
        
             for ( var i=0; i < this.chipsServiceParams.length; i++) 
              {
                    this.pane.regex[i] = new Chips_Service ( 
                                            this.messageService,
                                            this.chipsServiceParams[i].fieldName,
                                            this.chipsServiceParams[i].label,
                                            this.chipsServiceParams[i].regexCode,
                                            regExp [this.chipsServiceParams[i].regexCode],
                                            this.chipsServiceParams[i].maxItems,
                                            this.chipsServiceParams[i].required );
              }
        
              this.formUtility.processMultiSelect (this.pane, this.multiSelectService);
        
              this.pane_Virgin = cloneDeep ( this.pane  );
        } 
        public getUrl (): string 
        {
             return ( this.url  ) ;
        }
        public setSconum ( sconum:string )
        {
            console.log (`Upload transfer/setting SCONUM ${sconum}`);
            this.pane.regex[0].value = [ sconum ];
        }
        public getSconum (  ):string[]
        {
            return ( this.pane.regex[0].value );
        }
        public reset (  ) {
            // this.pane = cloneDeep ( this.pane_Virgin );
            this.uploadFiles          = [];
            this.uploadFileParts      = [];
            this.isUploadedSubmitted  = false;
        }
        
        public createPostData (  ):FormData  {
        
              let formData: FormData = new FormData();
            
              for ( var paneName in this.collapsed ) 
              {
                if (this.collapsed.hasOwnProperty(paneName) == false)
                  continue;
            
                for (var i = 0; i < this.pane[paneName].length; i++) 
                {
                  let fieldName  = this.pane[paneName][i].fieldName;
                  let fieldValue = this.pane[paneName][i].value;
            
                  if(( fieldValue === undefined ) || 
                     ( fieldValue === null      ) || 
                     ( fieldValue === ""        ))
                         continue;
                    
                   if ( Array.isArray(fieldValue)) {
                         if ( fieldValue[0] === undefined)
                         continue;
        
                         fieldValue = fieldValue[0].toString();
                   }
              
                 if (paneName === "date") {  
                       fieldValue = this.date.convertToString(fieldValue, true);
                 }
            
                  formData.append(fieldName, fieldValue );
                  console.log(formData.getAll(fieldName));
                }
              }
        
              for (var i = 0; i < this.uploadFiles.length; i++)
                    formData.append('files', this.uploadFiles[i]);
        
            return ( formData );
        }
        public fieldSetToggle ( fieldSet ) {      
              return;
                    // let oldSetting = this.collapsed[fieldSet];
                    // this.collapsed[fieldSet] = !this.collapsed[fieldSet];
                    // let newSetting = this.collapsed[fieldSet];
                    
                    // console.log("Pane [" + fieldSet + "], changed from [" + oldSetting + "==>>" + newSetting + "]");
                    // console.log("New Collapsed =" + JSON.stringify(this.collapsed));
                    
                    //  if (newSetting === true) {
                    //            let SUMMARY = 'Collapsing Search Form Pane !!!';
                    //            let DETAIL = 'No values entered in a closed pane are used in a query.' +
                    //                          ' All values becomed wildcards -- *';
                    //         this.messageService.add('warn', 10, SUMMARY, DETAIL);
                    //  }
        }
}

