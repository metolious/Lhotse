import { DateTime } from '../dateTime.class';
import * as cloneDeep from 'lodash';
import { MultiSelect_Service } from 'src/app/startup/multiSelect.service';
import { SearchResults } from '../../classes/searchResults.class'

export class FormUtility {
    private TESTING_MODE:boolean = true;

    private date:DateTime = new DateTime();
  
    constructor (  )
    { }
  
  private doArraysDiffer ( arr1:object[], arr2:object[] ):boolean   {
  
    let changes: boolean = false;
  
    if ( arr1.length !== arr2.length )
      changes = true;
  
    else {
      for (var i = 0; i < arr1.length; i++)
      {
         let foundMatch:boolean = false;
  
         for (var j = 0; j < arr2.length; j++)
         {
             if (arr1[i] === arr2[j] ) {
               foundMatch = true;
               break;
             }
         }
  
         if ( foundMatch === false)
         {
            changes = true;
            break;
         }
  
      } //  for()
    }  // else
  
    return ( changes );
  }
  public anyPaneChanges (  pane:object, pane_Orig:object,
                           collapsed:object, formName:string):   boolean {
    let changes: boolean = false;
  
    if ((pane_Orig !== undefined) && (pane !== undefined)) {
      for (var paneName in collapsed) {
  
        if (collapsed.hasOwnProperty(paneName) == false)
          continue;
  
        for (var i = 0; i < pane[paneName].length; i++)
        {
          if  ( Array.isArray(pane_Orig[paneName][i].value) )
          {
             if ( this.doArraysDiffer ( pane[paneName][i].value, pane_Orig[paneName][i].value) )
             {
                 changes = true;
                 break;
             }
          }
          else if (pane_Orig[paneName][i].value !== pane[paneName][i].value) {
             changes = true;
             break;
          }
        }
      }
    }
  
    if ( changes === true )
      console.log("anyPaneChanges() ..LEAVE [" + formName + "] ==>>" + changes);
  
    return (changes);
  }
  public processMultiSelect (  pane:object, multiSelectService: MultiSelect_Service) {
  
    for (var i = 0; i < pane["select"].length; i++)
    {
      let functionName = pane["select"][i].funcName;
  
      if ( functionName === undefined )
       continue;
  
      pane["select"][i].options = multiSelectService[functionName]();
      pane["select"][i].options.sort(function (a, b) { return a.label - b.label });
  
    //  if (pane["select"][i].required === true)
    //    continue;
  
      if (( pane["select"][i].options[0].label !== "--no value--") &&
          ( Array.isArray ( pane["select"][i].value ) === false ))
      {
        pane["select"][i].options.unshift({ label: "--no value--", value: "" });
      }
    }
  }
  public createPostData ( imageRow:SearchResults, collapsed:object,
                          pane:object, userId: string  ) :object      {
  
      let httpPostData:object = Object.assign({}, imageRow);
  
      // for ( var fieldName in httpPostData )
      // {
      //   if (( typeof httpPostData[fieldName] === 'number') ||
      //       ( typeof httpPostData[fieldName] === 'boolean'))
      //       httpPostData[fieldName] = httpPostData[fieldName].toString();
      // }
  
      // Some forms are only OK/Cancel dialogs. then simply return the imageRow.
      // If the form had user input, that input overrides data in the imageRow.
  
      if (( pane !== undefined ) && ( pane !== null))
      {
        for (var paneName in collapsed)
        {
          if (collapsed.hasOwnProperty(paneName) == false)
            continue;
  
          for (var i = 0; i < pane[paneName].length; i++)
          {
            let fieldName = pane[paneName][i].fieldName;
            let fieldValue = pane[paneName][i].value;
  
            if ((paneName === "regex") && (fieldValue[0] !== undefined))
              fieldValue = fieldValue[0].toString();
            else if ((paneName === "date") && (fieldValue !== undefined))
              fieldValue = this.date.convertToString(fieldValue, true);
  
            if ( fieldValue !== undefined )
              httpPostData[fieldName] = fieldValue.toString();
          }
        }
      }
  
      //debugger;
      // ONIMIE1-1414
      if ((userId !== undefined ) && (userId !== null )) {
        httpPostData["LastModifiedBy"]   = userId;
   //     httpPostData["LastModifiedByDn"] = userDn;
      }
  
        return ( httpPostData );
  }
  public reset (  pane:object, pane_Orig:object ):void {
      pane = cloneDeep ( pane_Orig );
  }
  
  private getFielValue (pane:object, fieldName:string, collapsed:object): string [] {
     let WILDCARD:string     ="*";
     let returnValues:string[] =[WILDCARD];
  
     for ( var section in pane ) {
       for ( var i=0; i < pane[section].length; i++ ){
  
         if ( pane[section][i].fieldName === fieldName )
         {
           if ( collapsed [section] === true )
              break;
           else if ( section === "date") {
             returnValues = this.date.convertMultipleToStrings ( pane[section][i].value );
             break;
           }
           else if ( Array.isArray ( pane[section][i].value ) ) {
              returnValues  = pane[section][i].value;
              break;
           } else {
             returnValues[0] = pane[section][i].value;
             break;
           }
         }
     }}
  
     return ( returnValues );
  }
   public addSingleString ( pane:object, fieldName:string, collapsed:object ) {
      let nameString        = "/" + fieldName +"/";
      let append:string[]   = this.getFielValue (pane, fieldName, collapsed);
  
      return ( nameString + append[0] );
    }
  public addMultipleString (  pane:object, fieldName:string, collapsed:object, qualifier:string ) {
      let WILDCARD:string     ="*";
      let nameString          = "/" + fieldName +"/";
      let appendString        = "";
      let appends:string[]    = this.getFielValue (pane, fieldName, collapsed);
  
      if ( qualifier !== undefined )
        nameString += qualifier + "/";
  
      if (( appends === undefined) || (appends.length === 0))
        appendString = WILDCARD;
      else
      {
        for ( var i=0; i < appends.length; i++)
        {
          appendString += appends[i];
  
          if ( i < (appends.length-1))
              appendString +=  "/";
        }
      }
      return ( nameString + appendString );
    }
  
    public addUrlQualifier ( prefix:string ,fieldName:string, value:string) {
  
        return ( prefix + fieldName + "=" + value );
    }
}