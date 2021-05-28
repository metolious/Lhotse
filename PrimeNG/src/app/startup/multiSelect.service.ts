import { OnInit, Injectable, EventEmitter }      from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListService } from '../classes/listService.class'
import { State_Service } from '../Misc/state.service';
import { ToasterMsg_Service } from '../services/SHARED_SERVICES/toasterMsg.service';
import { LoginUser_Service } from '../services/SHARED_SERVICES/loginUser.service';

@Injectable()
export class MultiSelect_Service {
    data:any;
    superstructureLocation= [ ];
    superstructureRemark  = [ ];
    funnelLocation        = [ ];
    aviationFacility      = [ ];
    cargoRamp             = [ ];
    sternType             = [ ];
    colorCode             = [ ];
    hullType              = [ ];
    vesselDesig           = [ ];
    aspects               = [ ];
    securityLabel         = [ ];
    imageSources          = [ ];
    regexes               = [ ];
    regExp:object         = { };
    ref_Configuration     = [];

    reviewStateCodes= [
        { label: "Uploaded",    value: "0" },
        { label: "Reviewed",    value: "1" },
        { label: "Approved",    value: "2" }];

    pushEmitter       = new EventEmitter<String>(true);
    uploadUrl:string  = '';
    //  baseUrl:string    = 'https://samples:7443/viper/resources/';
    baseUrl:string    =   '/viper/resources/'
    headers: HttpHeaders;
    options: object;

    allListsRetrieved:boolean = false;

  FETCH_SIZE:     number = 4;
  fetch_start:    number = 0;
  fetch_end:      number = this.fetch_start + this.FETCH_SIZE;
  fetchingStarted:boolean= false;

  public getRegexes () {
    return ( this.regExp );
  }
  
  constructor ( 
                // private http: HttpClient,
                // private stateService: State_Service,
                // private messageService: ToasterMsg_Service,
                // private loginUser_Service: LoginUser_Service
                ) {

                this.headers = new HttpHeaders({
                    'Cache-Control':   'max-age=0',
                    'Connection':      'keep-alive',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept':           '*/*'
                });

                this.options = ({ headers: this.headers} );

                this.reviewStateCodes.sort (this.compare);

                // this.stateService.pushEmitter.subscribe
                // (
                //    (data)=>
                //    {
                //     console.error ( "MultiSelect_Service "+ JSON.stringify(data));

                //     if ( data === "NCAAS_Alive")
                //     {
                //         // this.getAllLists ();
                //         this.getListJunk();
                //     }

                //    }
                // );

            }

            compare ( a,b )
            {
            //    console.log ( `${a} : ${b}`);
                if ( a.label < b.label )
                return (-1);
                else if ( a.label > b.label )
                return (1);
        
                return (0);
            }

            public getListJunk ( ) {
                    if (this.fetchingStarted === false )
                        this.fetchingStarted = true;
                    else
                    {
                        if ( this.fetch_end === this.codes.length )
                        return;
                
                        this.fetch_start += this.FETCH_SIZE;
                        this.fetch_end    =this.fetch_start + this.FETCH_SIZE;
                
                        if ( this.fetch_end > this.codes.length )
                        this.fetch_end = this.codes.length;
                    }
                
                    for ( var i = this.fetch_start; i < this.fetch_end; i++ )
                        // this.getList ( this.codes[i] );
                
                    console.log ("INITIAL STARTUP FETCHING: Fetching indexes ["+ this.fetch_start + " ===>>" + this.fetch_end + "]");
                }

                public isJunkComplete( ):boolean {
                      let complete:boolean = true;
                    
                        for ( var i = this.fetch_start; i < this.fetch_end; i++ )
                        {
                          if ( this.codes[i].fetchStatus === undefined ) {
                            complete = false;
                            break;
                          }
                        }
                    
                      return ( complete );
                    }

                // private getList ( code ) {
                //             this.getHttpListItem ( code.url, code.dataField )
                //             .then ( response =>
                //             {
                //             code.fetchStatus = true;
                //             if ( this.isJunkComplete( ) )
                //                 this.getListJunk();
                    
                //             let data         = response [code.dataField];
                //             let storeArray   = code.storeTo;
                //             let value        = code.value;
                    
                //             for ( var i=0; i < data.length; i++ )
                //             {
                //                 var totalLabel ="";
                    
                //                 for ( var piece=0; piece < code.label.length; piece++ )
                //                 {
                //                 let labelPiece = code.label[piece];
                //                 totalLabel    += data[i][labelPiece];
                    
                //                 if (( code.label.length > 1) && ( piece < code.label.length-1 ))
                //                 totalLabel += " - ";
                //                 }
                    
                //                 storeArray.push ({ value: data[i][value],
                //                                     label: totalLabel     });
                //             }
                    
                //             if ( data.length === 0)
                //             {
                //                 let title = "FAILURE [" + code.Comment + "]";
                //                 let msg   = "Http Get Response has an empty array. PhotoScrub Initialization will not complete !!!!";
                //                 // this.messageService.add   ( 'error', 8, title, msg );
                //             }
                //             else {
                //                 storeArray.sort (this.compare);
                //             }
                    
                //             this.allListsRetrieved = this.isListRetrievalComplete();
                    
                //             // if ( this.allListsRetrieved === true )
                //             //     this.stateService.reportState ( 'fetchSelectLists', true );
                    
                //             })
                //             .catch (error => {
                //             code.fetchStatus = false;
                //             if ( this.isJunkComplete( ) )
                //                 this.getListJunk();
                    
                //             let title = "FAILURE [" + code.Comment + "]";
                //             let msg   = `Http Get Response ERROR [${error}]. PhotoScrub Initialization recording a FAILURE !!!!`;
                //             // this.messageService.add   ( 'error', 8, title, msg );
                //             } );
                //         }

                        private isListRetrievalComplete ( )
                        {
                           let flag = true;
                    
                           for ( var i=0; i < this.codes.length; i++) {
                             if  ( this.codes[i].storeTo.length === 0 ){
                               flag = false;
                               break;
                             }
                           }
                    
                           if ( flag === true )
                           {
                            this.convertRegexes ();
                         //   this.verifyRegExes  ();
                           }
                    
                           return ( flag );
                        }

                private convertRegexes ()  {
                    //=====================================================================
                    
                    //alert ("Enter convertRegexes()");
                        // https://stackoverflow.com/questions/4215737/convert-array-to-object
                        this.regExp = this.regexes.reduce ( function ( result, item )
                        {
                            var labelAttr = Object.keys(item)[1];
                            var valueAttr = Object.keys(item)[0];
                            var label     = item [labelAttr];
                            var value     = item [valueAttr];
                            result[label] = value;
                            return ( result )
                        }, {} );
                    
                    // Override for Bad Values that Rob B. has to correct.
                                                            // [A-Za-z0-9\s.-,/#]{1,20}
                    //     this.regExp ['iirNumber']          = "[A-Za-z0-9\s.,/#]{1,20}";
                                                            // [A-Za-z0-9\s.-/&_,'%$!@#()]{1,20}
                    //   this.regExp ['imageOtherSource'] =  "[A-Za-z0-9\s.-/&_,'%$!@#()]{1,20}";
                    //========== OK,, keep this guy================================
                    // BAD SHIT "^([A-Za-z][0-9]{5})|([!][A-Za-z0-9]{5})$"
                    //      this.regExp ['sconum'] = "^[A-Za-z][0-9]{5}$";
                    //========== OK,, keep this guy================================
                            }
                
                // private getHttpListItem ( url, dataField ): Promise<any>  {
                            // return this.http
                            // .get (url + "?format=json&offset=1&limit=1000", this.options)
                            // .toPromise()

                            // keep the lines below commented out
                            //.then ( response => JSON.parse ( response['_body']))
                            //.catch (this.handleError );
                        //}

                codes:ListService [ ] =
                [{ Comment:	 	    "Reference --  Image Aspects",
                fetchStatus:    undefined,
                url:            "../mie/resources/reference/aspect/code",
                  dropdownList:   false,
                  storeTo:        this.aspects,
                  dataField: 	    "AspectCode",
                  value: 	        "AspectCode",
                  label:          ["AspectCodeDescription"]	},
            
                  { Comment:	 	    "Reference --  Image Sources",
                  fetchStatus:    undefined,
                  url:            "/viper/resources/image/source/reference",
                  dropdownList:   false,
                  storeTo:        this.imageSources,
                  dataField: 	    "ImageSource",
                  value: 	        "Source",
                  label:         ["SourceCode"]	},
            
                  { Comment:	 	    "Reference --  Security Labels",
                  fetchStatus:    undefined,
                  url:            "/viper/resources/security/reference/photos",
                  dropdownList:   false,
                  storeTo:        this.securityLabel,
                  dataField: 	    "Security",
                  value: 	        "SecurityId",
                  label:          ["SecurityDisplay"]	},
            
                  { Comment:	 	    "Reference --  Regex Expressions",
                  fetchStatus:    undefined,
                  url:            "../mie/resources/application/regex",
                  dropdownList:   false,
                  storeTo:        this.regexes,
                  dataField: 	    "ApplicationRegex",
                      value: 	        "Regex",
                  label:          ["Name"]	},
            
                  { Comment:	 	    "Reference --  Vessel Designations",
                  fetchStatus:    undefined,
                  url:            "../mie/resources/reference/vessel/type/designations",
                  dropdownList:   false,
                  storeTo:        this.vesselDesig,
                  dataField: 	    "VesselTypeDesignation",
                  value: 	        "VesselTypeCode",
                  label:          ["VesselTypeDesignationCode",
                                   "VesselTypeCategory",
                                   "VesselTypeDesignation"]	},
            
                { Comment:	 	    "Reference --  Hull Types",
                  fetchStatus:    undefined,
                  url:            "../mie/resources/reference/hull/type/code",
                  dropdownList:   false,
                  storeTo:        this.hullType,
                  dataField: 	    "HullTypeCode",
                  value: 	        "HullTypeCode",
                  label:           ["HullType"]	},
            
                { Comment:	 	    "Reference --  Colors",
                  fetchStatus:    undefined,
                  url:            "../mie/resources/reference/color/code",
                  dropdownList:   false,
                  storeTo:        this.colorCode,
                    dataField: 	    "ColorCode",
                  value: 	        "ColorCode",
                  label:          ["ColorCodeDescription"]	},
            
                { Comment:	 	    "Reference --  Cargo Ramp Locations",
                  fetchStatus:    undefined,
                  url:            "../mie/resources/reference/cargo/ramp/location/code",
                  dropdownList:   false,
                  storeTo:        this.cargoRamp,
                  dataField: 	    "CargoRampLocationCode",
                  value: 	        "CargoRampLocationCode",
                  label:          ["CargoRampLocation"]	},
            
                { Comment:	 	    "Reference --  Stern Types",
                  fetchStatus:    undefined,
                  url:            "../mie/resources/reference/stern/type/code",
                  dropdownList:   false,
                  storeTo:        this.sternType,
                  dataField: 	    "SternTypeCode",
                  value: 	        "SternTypeCode",
                  label:          ["SternType"]	},
            
                { Comment:	 	    "Reference --  Aircraft Facilities",
                  fetchStatus:    undefined,
                  url: 	          "../mie/resources/reference/aircraft/facility/code",
                  dropdownList:   false,
                  storeTo:        this.aviationFacility,
                  dataField: 	    "AircraftFacilityCode",
                  value: 	        "AircraftFacilityCode",
                  label:          ["AircraftFacility"]	},
            
                { Comment:	 	    "Reference --  Funnel Locations",
                  fetchStatus:    undefined,
                  url: 			      "../mie/resources/reference/funnel/location/code",
                  dropdownList:   false,
                  storeTo:        this.funnelLocation,
                  dataField: 	    "FunnelLocationCode",
                  value: 	        "FunnelLocationCode",
                  label:          ["FunnelLocation"]	},
            
                { Comment:	 	    "Reference --  SuperStructure Locations",
                  fetchStatus:    undefined,
                  url: 			      "../mie/resources/reference/superstructure/location/code",
                  dropdownList:   false,
                  storeTo:        this.superstructureLocation,
                  dataField: 	    "SuperstructureLocationCode",
                  value: 	        "SuperstructureLocationCode",
                  label:          ["SuperstructureLocation"]	},
            
                { Comment:	 	    "Reference --  SuperStructure Remarks",
                  fetchStatus:    undefined,
                  url:			      "../mie/resources/reference/number/superstructure/remarks/code",
                  dropdownList:   false,
                  storeTo:        this.superstructureRemark,
                  dataField: 	    "NumSuperstructureRemarksCode",
                  value: 	        "NumberSuperstructureRemarksCode",
                  label:          ["NumberSuperstructureRemarks"]	},
            
                {
                  Comment:        "Reference --  Config Properties",
                  fetchStatus:    undefined,
                  url:            "../mie/resources/configuration/properties",
                  dropdownList:   false,
                  storeTo:        this.ref_Configuration,
                  dataField:      "AmsConfigurationProperties",
                  value:          "Domain",
                  label:          ["AmsConfigurationProperties"] }
            
              ];
}