import { Injectable } from "@angular/core";

@Injectable()
export class HttpRedirect_Service {

  constructor(){} 

    private redirectLocation:string = "../viper/html/viper.html?NCAS_Expired=true";
    private errorMsg:string   

    handleFailure ( error:any ):string
    {
  // Use a breakpoint
  //debugger;
  this.errorMsg             = "";
  let bodyContent:string    = error.error; // status = 406, Not Acceptable.

  if ( error.status < 302 )
  {
     console.trace();
     localStorage.setItem("sessionOver", "true"); //save to browser local storage
     this.errorMsg = "Your session has expired";
     window.location.replace ( this.redirectLocation );
     return ( this.errorMsg );
  }

    if ( error.headers !== undefined )
    this.errorMsg = error.headers.get("error-message");

    if (( this.errorMsg == undefined ) || ( this.errorMsg == null ))
    this.errorMsg = bodyContent;

    if (( this.errorMsg == undefined ) || ( this.errorMsg == null ))
    this.errorMsg = error.statusText;

    if (( this.errorMsg == undefined ) || ( this.errorMsg == null ))
    this.errorMsg = error.status;

    return ( this.errorMsg );
}

}