import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { HttpRedirect_Service } from "src/app/forms/SHARED_FORMS/httpRedirect.service";
import { State_Service } from "src/app/misc/state.service";
import { HttpRedirect_Service } from "src/app/shared/httpRedirect.service";
import { Authorization } from "../classes/shared_classes/authorization.class";

@Injectable()
export class LoginUser_Service {

    getUserURL:string = '/viper/resources/application/authorization?format=json';
    getUserPreferencesURL:string = '/mie/resources/user/preferences';
  
    headers: HttpHeaders;
    options: object;
    authorization: Authorization;
    SecurityRollup:   string;
    getUserAttempts:number = 0;
  
    userPreferences:object;
    
    constructor(    private http:           HttpClient,
                    private stateService:   State_Service,
                    private httpService:    HttpRedirect_Service) {
                        
    this.headers = new HttpHeaders({
        'Cache-Control':   'max-age=0',
        'Connection':      'keep-alive',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept':           '*/*'
        });

        this.options = ({ headers: this.headers} );

        // this.getUser ();
        // this.getUserPreferences();         
    }

    private getUser () {
            this.getHttpUser ( this.getUserURL )
            .then ( responseAsString =>
            {
              console.log ( "LOGIN USER,, finds UserDn,, "+
                            "Report NCAAS is Alive to other Startup Modules"+
                            " !!! AttemptCount=["+ this.getUserAttempts+"]");
        
              this.authorization = new Authorization(responseAsString.Authorization[0]);
              this.SecurityRollup= responseAsString.SecurityRollup;
        
              this.stateService.reportState ( 'loginUser', true );
            })
            .catch (error => {
              // Use a breakpoint
              //debugger;
              if ( this.getUserAttempts++  < 20 )
                this.getUser();
              else {
                alert ( "[FAILURE] Get ..MY.. User Roles -->> \n" +
                        "You will be directed to the Splash Page.\n" +
                        "Re-attempsts will fail. Contact your Admin.");
                let errorMsg = this.httpService.handleFailure ( error );
                window.location.replace ( "../viper/html/viper.html");
              }
        
            } );
          }

          public getAuthorization ( ) {
            return this.authorization;
          }
          public getSecurityRollup ( ) {
            return this.SecurityRollup;
          }
          public getUserId( ) {
            return ( this.authorization.ID );
          }
          public getUserDn( ) {
            return ( this.authorization.DN );
          }
          public getUserDnHash( ) {
            return ( this.authorization.DNHash );
          }
      
          public getUserEmail() {
            return this.authorization.userEmail;
          }
      
          public getUserPreferencesObject(){
            return (this.userPreferences);
          };
          
          private getHttpUser  ( URL:string ): Promise<any>  {
                return this.http
                 .get ( URL, this.options)
                //  .timeout (15000)
                 .toPromise()
                //.then ( response => JSON.parse ( response['_body']))
              //  .catch (this.handleError1);
              }

              private getUserPreferences () {
                    this.getHttpUser ( this.getUserPreferencesURL )
                    .then ( responseAsString =>
                    {
                      this.userPreferences = responseAsString;
                    })
                    .catch (error => {
                      if ( this.getUserAttempts++  < 20 ){
                        this.getUserPreferences();
                      }
              
                      console.log("Unable to retrieve user preferences");
              
                    } );
                  }
}