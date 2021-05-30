import { OnInit, Injectable     } from '@angular/core';
// import { MessageService         } from 'primeng/components/common/messageservice';
import { MessageService         } from 'primeng/api';
import { Observable, Subject    } from 'rxjs';

@Injectable()
export class ToasterMsg_Service {

    private subject = new Subject<any>();
    timeToGrowl:number = 8000;

    // constructor (private messageService: MessageService) {};
    constructor () {};

    add ( Severity:string, Seconds:number, Summary:string, Detail:string ) {
        this.timeToGrowl = Seconds * 1000;

        // this.messageService.add( {severity: Severity, 
        //     summary:  Summary, 
        //     detail:   Detail });

    // Send to Position Search and Vessel Search so
    // Map coordinates can be captured
    if (Summary.includes("Shape Query")) {
        this.sendMessage( Detail );
        }
    }

    public createMsgAsList ( list:object ) {
    let msg = "<ul>";

    for ( var item in list ) 
    {
    if (list[item].length === 0)
        continue;

    msg += "<li>" + item +"-->"+ list[item] + "</li>";
    }
    
    msg += "</ul>";

    return ( msg );
}

public extractErrorHtml ( error:string ) {
         let start:number = error.indexOf("<b>");
         let end:  number = error.indexOf("</b>");
      
         let returnString = "";
      
         if (( start !== -1 ) && ( end !== -1 ) && ( end > start ))
           returnString = error.substring (start,end);
      
         return ( returnString );
         
      }

    // Support for Vessel Search and Position Search paramater passing from AMS Map
    private sendMessage(message: string) {
    this.subject.next({ text: message });
    }

    // Support for Vessel Search and Position Search paramater passing from AMS Map
    public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
  
}