import { Utilities } from "../SHARED_CLASSES/utilities.class";

export class HttpBase
{ 

    confirmForSubmit:       boolean = false;
    confirmSubitMessage:    string  = ""; 

    protected document: Document ;

protected advertisePostSuccess  ( response:object )  { }
protected advertiseQuerySuccess ( response:object )  { }
protected advertisePutSuccess   ( response:object )  { }
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
            
            this.onSubmit( );
          }
    }

}