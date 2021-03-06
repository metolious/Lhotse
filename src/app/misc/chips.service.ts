import { OnInit, Injectable          } from '@angular/core';

@Injectable()
    export class Chips_Service {
        public value:string [];

        constructor (   
            public fieldName:       string,
            public label:           string,
            public regexName:       string,
            public regExp:          string,
            public maxEntries:      number,
            public required:        string
          )
{
    let goodRegex:boolean = false;
    let msg:string        = "";
  
    // A 'fake' Chips_Service has to start because 'undefined' kills the Component Construction.
    if ( this.regExp === "?")
      return;
  
    if ( this.regExp  !== undefined )
    {
      this.regExp = "^" + this.regExp  + "$";
  
      try {
        let pattern = new RegExp ( this.regExp );
        goodRegex = true;
        msg = "REGEX ..Found & Valid.. ==> ["+ this.regexName + " / " + this.regExp + "]";
      }
      catch ( error ){
        goodRegex = false;
        msg = "REGEX ..Found & Invalid.. ==> ["+ this.regexName + " / " + this.regExp + "]";
      }
    }
    else
      msg = "REGEX ..Not Found.. ==> ["+ this.regexName  + "]";
  
    if ( goodRegex ){
       console.log ( msg);
    }
    else {
      this.regExp = "."; //Match anything/everything
      console.error( msg );
    }
  
    this.value = [ ];
}
    }