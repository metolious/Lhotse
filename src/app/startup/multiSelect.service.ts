import { OnInit, Injectable, EventEmitter }      from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListService } from '../classes/listService.class'
import { State_Service } from '../misc/state.service';

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
                        this.regExp = this.regexes.reduce ( function ( result, item )
                        {
                            var labelAttr = Object.keys(item)[1];
                            var valueAttr = Object.keys(item)[0];
                            var label     = item [labelAttr];
                            var value     = item [valueAttr];
                            result[label] = value;
                            return ( result )
                        }, {} );
                    
                            }

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