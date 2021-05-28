import { OnInit, Injectable, EventEmitter }         from '@angular/core';

@Injectable()
export class State_Service  
{ 
    startSuccess = {
        loginUser:          false,
        fetchSelectLists:   false 
    };

    startupComplete:boolean = false;

    pushEmitter  = new EventEmitter<String>(true);

    constructor() {}

    reportState ( startProcess: string, status:boolean )
    {
    this.startSuccess [ startProcess ] = status;
    console.log ("REPORT..Startup Complete [" + startProcess + "/" +status +"]");

    if ( startProcess === "loginUser") 
        this.pushEmitter.emit("NCAAS_Alive");

    if ( this.startupComplete === false )
    {
        if ( this.isStartupComplete () ) 
        {
    //     alert ("!!! ALL Startup Modules have  Completed !!!");
            this.startupComplete = true;
            this.turnOnState ("Product Ready");
        }
    }
    }

    isStartupComplete () {

        let startupComplete = true;
      
        for ( var state in this.startSuccess) {
            if ( this.startSuccess[state] === false ) {
              startupComplete = false;
              console.warn ("!!! REPORT..Startup Waiting !!![" + state + "/" +startupComplete +"]");
              break;
            }
        }
      
        return ( startupComplete );
      }
      
    turnOnState ( stateName:any ) 
    {
    //  this.states[stateName] = true;
    //  setTimeout ( this.pushEmitter.emit(stateName), 2000);
    this.pushEmitter.emit(stateName);

    //  this.pushEmitter.emit(stateName);
    }
    turnOffState ( stateName:any ) 
    {
    // this.states[stateName] = false;
    this.pushEmitter.emit("__");
    }
}