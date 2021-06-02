import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Input, Output, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs';
import { ToasterMsg_Service } from 'src/app/services/toasterMsg.service';
import { HttpRedirect_Service } from './httpRedirect.service';
import { Customer } from '../domain/customer';
import { Utilities } from '../classes/shared_classes/utilities.class';

@Injectable()
export class HttpBase
{ 
  @Input ( ) terminateHttp:boolean;
  @Output( ) searchInProgress = new EventEmitter<boolean>(true);  
  @Output( ) securityBanner   = new EventEmitter<string>(true);  

  subscription:        Subscription;

  queryUrl:            string;
  postUrl:             string;
  
  userDn:               string;
  headers:              HttpHeaders;
  options:              object;

  mySecurityBanner:       string  = "";
  confirmSubitMessage:    string  = ""; 
  operationInProgress:    boolean = false;
  confirmForSubmit:       boolean = false;

  showExportDialog:       boolean = false;
  showAllDialog:          boolean = false;
  showMapDialog:          boolean = false;

  dialogs:any= { All:           false,
                 Export:        false,
                 Map:           false }; 
  putUrl: any;

  constructor ( protected http:                   HttpClient,
                protected httpService:            HttpRedirect_Service,
                protected messageService:         ToasterMsg_Service  ) 
  {    

    this.headers = new HttpHeaders({
      //  'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept': '*/*',
        'Access-Control-Request-Headers':'authorization,content-type',
        'Access-Control-Request-Method':'GET'
  
      });
  
      this.options = ({ headers: this.headers,
        withCredentials:  true,
        method: 'GET'
      });
  }

    // Expect Child class to implement these classes
    protected document: Document ;

    protected advertisePostSuccess  ( response:object )  { }
    protected advertiseQuerySuccess ( response:object )  { }
    protected advertisePutSuccess   ( response:object )  { }
    // protected onSubmit              ( event:any, customer:any )                 { }
    protected onSubmit              (  )                 { }
    protected cancel                (  )                 { }
    protected resetChanges          (  )                 { }

    preSubmit ( ) {
            
              let nonConfirmed:string = Utilities.getCount_NonConfirmedValues();
              if ( nonConfirmed.length > 0 )
              {
                this.confirmSubitMessage = "Non-used entries found on the Form [ "+ nonConfirmed + "]";
                this.confirmForSubmit=true;
              }
              else 
              {
                //this.confirmForSubmit=false;
                Utilities.clearNonConfirmedValues ( );
                this.confirmForSubmit=true;
                
                // this.onSubmit( );
              }
        }

        closeConfirmDialog ( ) {
                this.confirmForSubmit=false; 
          }

          protected advertiseFailure ( error:any ) {
               if ( typeof error === "function" )
                 return;
            
               this.advertiseEndOfHttp ();
               // Use a breakpoint
               //debugger;
            
               let errorMsg = this.httpService.handleFailure ( error );
            
               if (( errorMsg === undefined )  || (errorMsg === null ))
                  this.messageService.add ( 'error', 10, `[FAILED - 143]`, error );
               else
                  this.messageService.add ( 'error', 10, `[FAILED - 145]`, errorMsg );
            } 

            public submitToHttpQuery (  )  {

                   this.searchInProgress.emit(true);   
                   this.terminateHttp  = false;
                 
                   this.subscription = this.doHttp_Query (  )
                     .subscribe (
                         response  => this.advertiseQuerySuccess ( response ),
                         error     => this.advertiseFailure ( error )
                     );
              }
               
              private doHttp_Query (   ):Observable<Object>  {
               
                    return ( this.http.get ( this.queryUrl, this.options )
                          //  .do   ( data  => console.log ("Search Data Result: "+ JSON.stringify(data)) ) );
                       //    .catch( this.handleError ) 
                       );
                } 

              public submitToHttpPost ( httpPostData:any )  {

                  
                    this.searchInProgress.emit(true);
                    this.terminateHttp  = false;
                 
                    this.subscription = this.doHttp_Post (  httpPostData )
                  
                        .subscribe (
                            response  => this.advertisePostSuccess ( response ),
                            error     => this.advertiseFailure ( error )
                     //     ()        => {  alert ("Completed Search with no errors !!!!"); }
                        );
                }

              protected doHttp_Post (  httpPostData:any ):Observable<Object>  {

                    console.log ("POST Data/Action:==>["+ JSON.stringify(httpPostData) + "]");
              
                    let newHeaders = new HttpHeaders({
                        'Connection': 'keep-alive',
                        'Accept-Language': 'en-US,en;q=0.5',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Accept': '*/*',
                        'Access-Control-Request-Headers':'authorization,content-type',    
                      });
                  
                      let httpOptions:object = ({ 
                        headers: newHeaders,
                        withCredentials:  true,
                        method: 'POST',
                        responseType: "text"
                      });
                      
                    return ( this.http.post ( this.postUrl, httpPostData, httpOptions)
                          // .do   ( data  => console.log ("Upload Result: "+ JSON.stringify(data)) ) );
                          //.catch( this.handlePostError 
                          );
              } 
              
              public submitToHttpPut ( httpPutData?:any )  {
                    
                      this.searchInProgress.emit(true);
                      this.terminateHttp  = false;
                   
                      this.subscription = this.doHttp_Put (  httpPutData )
                          .subscribe (
                              response  => this.advertisePutSuccess ( response ),
                              error     => this.advertiseFailure ( error )
                          );
                  }
                protected doHttp_Put (  httpPutData?:any ):Observable<Object>  {
                      console.log ("PUT Data/Action:==>["+ JSON.stringify(httpPutData) + "]");
                        
                      return ( this.http.put ( this.putUrl, httpPutData)
                            //  .do   ( data  => console.log ("Put Result: "+ JSON.stringify(data)) ) )
                            // .catch( this.handlePostError 
                            );
                } 
              
              public handlePostError = (error:Response) => { 
                this.advertiseEndOfHttp ();
                //this.siloAlertForm.submitType = true;
              
              
                let errorMsg = this.httpService.handleFailure (  error );
              
                console.error ("HTTP.POST ERROR [" +  errorMsg + "]");
                this.messageService.add ( 'error', 10, 'FAILURE', errorMsg );
              
                //  return ( Observable.throw (error.json )); 
                 return ( (error.json ) ); 
              }
              
              protected advertiseEndOfHttp (  ) { 
                 this.operationInProgress = false;
                 this.mySecurityBanner    = "";
                 this.searchInProgress.emit  (false);
                 this.securityBanner.emit    (this.mySecurityBanner); 
              }
              protected checkForHttpTerminateRequest ( changes: {[propKey: string]: SimpleChange })  {
              
              for (let propName in changes) 
              {
                let changedProp = changes[propName];
                let to   = JSON.stringify(changedProp.currentValue );
                let from = JSON.stringify(changedProp.previousValue);
              
                if (((from === undefined) || (from === "false")) && (to === "true")) 
                {
                  console.info(`[Vessel Results Table] ...${propName} changed from ${from} to ${to}`);
              
                  if (( propName          === "terminateHttp" )  &&
                      ( to                === "true"          )  &&
                      ( this.subscription !== undefined       )  && 
                      ( this.subscription !== null            ))
                  {
                    this.searchInProgress.emit(false);
                    this.subscription.unsubscribe();
                    console.info ("!!!! [Vessel Results Table] User Terminated Http Post for Search !!!!")
                  }
                }
              }
              
              }
              
              removeModal ( ) {
                  // Use a breakpoint
                  //debugger;
              
                  this.document.getElementById ("modalShadow").classList.remove ( 'ui-dialog-mask'    );
                  this.document.getElementById ("modalShadow").classList.remove ( 'ui-widget-overlay' );
                  this.document.getElementById ("modalShadow").classList.remove ( 'low-Z' );
              } 
              
              activateModal ( ) {
                  this.document.getElementById ("modalShadow").classList.add ( 'ui-widget-overlay' );
                  this.document.getElementById ("modalShadow").classList.add ( 'ui-widget-mask'    );
                  this.document.getElementById ("modalShadow").classList.add ( 'low-Z' );
              }
               
              doExport ( form:HttpBase ) {
              //alert ("Using doExport() from HttpBase ... Good Job !!!!!");
                  this.removeModal();
                  this.dialogs['Export'] = false;
              
                  form['submitType']    = false;
                  this.showExportDialog = false; 
                
                  form['paging']['reUseQuery'] = true;
              
                  this.queryUrl = form['getUrl'](  );
              
                  form['submitType']=  true;
              
                  // This is passing the ALREADY BUILT QUERY URL, NOT the form values.
                  // The QUERY URL has Query Param already set as format=json
                  // Set format=json to passed in value from form
                  if ( form['format'] === undefined ){
                    form['format'] = 'json';
                  }
              
                  // ONIMIE1-2828 
                  // WDH: This WAS A BAD PIECE OF CODE I ADDED LONG AGO -- 
                  // It's now turning "format=geojson" to "format=geogeojson"
                  //this.queryUrl = this.queryUrl.replace('json',form['format']);
                  this.queryUrl = this.queryUrl.replace('=json','='+form['format']);
              
                  let win:any = window.open ( this.queryUrl, '_blank' );	
                      
                  if ( win )
                      window.focus();
                  else
                      alert (" Please allow popups for this website !!! ");  
              }
              showExport ( form:HttpBase ) {
                  //this.showExportDialog = true;
                  this.dialogs['Export'] = true;
              
                  if ( form['format'] === undefined )
                    form['format'] = 'json';
              
                  this.activateModal (  );
              }   
}