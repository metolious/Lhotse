import * as cloneDeep from 'lodash';

export class DateTime {
    public convertMultipleToStrings ( dates:Date []) {
              let dateStrings:string [] = [];
        
              if (( dates !== undefined ) && (dates !== null ))
              {
                    if (( dates[1] === undefined ) || (dates[1] === null ))
                    {
                          dateStrings[0] = this.convertToString (dates[0],true);
                          dateStrings[1] = this.convertToString (dates[0],true,true);
                    }
                    else
                    {
                          dateStrings[0] = this.convertToString (dates[0],true);
                          dateStrings[1] = this.convertToString (dates[1],true,true);
                    }
              }
                       
              return ( dateStrings );
        }
        public getThisTwentyFourHours ( ):Date[] {
        
              let datePair:Date[] = [ new Date(), new Date() ];
        
              let first:Date = new Date();
              first.setHours          (0); 
              first.setMinutes        (0);
              first.setSeconds        (0);
              first.setMilliseconds   (0);
        
            //   let second:Date = cloneDeep ( first  );
            //   second.setDate(second.getDate( ) + 1);
        
              datePair[0] = first;
            //   datePair[1] = second;
        
              console.log ( `DATE:getThisTwentyFourHours[ ${datePair[0]}, ${datePair[1]} ]` );
              return ( datePair );
        }
        public convertToString ( date:Date, useSeconds:boolean, endDate:boolean = false) {
              let dateString: string = "";
        
              if ((date !== undefined) && (date !== null))
              {
                    let year:number     = date.getFullYear();
                    let getMonth:number = date.getMonth() + 1;
                    let month:string    = this.pad2(getMonth);
                    let day:string  = this.pad2(date.getDate());
             
                    dateString += year  + "-";
                    dateString += month + "-";
                    dateString += day;
        
                    if ( useSeconds && !endDate){
        
                          dateString += "T00:00:00Z";
        
                    }else if(useSeconds && endDate){
        
                          dateString += "T23:59:59Z";
                    }
                    
              }
         
              console.log ( "DATE:convertToString[ " + date + "==>>" + dateString + " ]" );
              return ( dateString  );
        }
        private pad2 (number: number):string {
        
             return (  number < 10   ?   ("0" + number) : ("" + number)  );
        }
        
        // Example dateString [  2018-04-06T08:04:46-04:00  ]
        public convertStringToDate ( dateString:string ):Date {
          let date:Date = new Date();
              
          if ((dateString !== undefined) && (dateString !== null))
          {
              let workString:string   = dateString;
              let dashLoc:number      = workString.indexOf ("-");
              let year:string         = workString.substring (0, dashLoc );
        
              workString              = workString.substring( dashLoc + 1 );
              dashLoc                 = workString.indexOf ("-");
              let month:string        = workString.substring ( 0,2 );
        
              workString              = workString.substring( 3 );
              let day:string          = workString.substring ( 0,2 );
        
              date.setFullYear ( parseInt(year) );
              date.setMonth    ( parseInt(month) - 1);
              date.setDate     ( parseInt(day));
          }
              
          console.log ( "DATE:convertStringToDate[ " + dateString + "==>>" + date + " ]" );
          return ( date  );
        }
}