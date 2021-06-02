import {  Inject  } from '@angular/core';
import { DOCUMENT } from "@angular/common";

export class Utilities
{ 
    static clearNonConfirmedValues ( ) {
        let count:number =0;

        try {  
          let xx:HTMLCollection=document.getElementsByClassName ("ui-chips-input-token");
        
          let array = Array.prototype.slice.call(xx);
        
          for ( var i=0; i < array.length; i++) 
          {   
            if (array[i].firstElementChild === undefined )
              continue;
            
            if (array[i].firstElementChild.value.length > 0 )
            {
              array[i].firstElementChild.value = "";
              count++;
            }
          } 
        }
        catch ( error ){
          console.log (" ??? No elements with class ui-chips-input-token found ???");
        }
    }

static getCount_NonConfirmedValues ( ):string {
    let count:number =0;
    let nonConfirmed:string= "";
   
    try {
     let xx:HTMLCollection= document.getElementsByClassName ("ui-chips-input-token");
   
     let array = Array.prototype.slice.call(xx);
   
     for ( var i=0; i < array.length; i++) 
     {   
       if (array[i].firstElementChild === undefined )
         continue;
       
       if (array[i].firstElementChild.value.length > 0 )
       {
         console.log (i + "..  value=["+ array[i].firstElementChild.value + "]" );
         nonConfirmed += array[i].firstElementChild.value + " "
         count++;
       }
       else {
         console.log (i + "UNDEFINED value=["+ array[i].firstElementChild.value + "]" );
       }
     }
   }
   catch ( error ){
      console.log (" ??? No elements with class ui-chips-input-token found ???");
   }
   
     return ( nonConfirmed );
   }

}