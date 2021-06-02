import { Injectable } from "@angular/core";
import { FormUtility } from "./forms/formUtility.class";

Injectable()
export class Paging_Service
{
    formUtility:FormUtility  = new FormUtility();
      
    minPageNumber:    number =1;
    maxPageNumber:    number;

    pageNumber:       number;

    limit:            number;  
    pageSize:         number;

    offset:           number;
    totalRecords:     number;

    pageNumArray:     number[];
    page_Choices:     object[];

    order:             string;
    sort:              string;
    format:            string ="json";

    reUseQuery:       boolean;

    urlQualifiers:string[]= [ "format", "offset", "limit", "sort", "order"];

    page_Sizes=[
          {label: '50',     value: 50    }, 
          {label: '100',    value: 100    },
          {label: '250',    value: 250    }, 
          {label: '1000',   value: 1000   }
    ];

    sortDirections =[
      {label: 'ASC',      value: 'ASC'    }, 
      {label: 'DESC',     value: 'DESC'   }
    ];

constructor (  )  { 

    this.pageNumber    = 1;
    this.pageSize      = 100;
    this.calculate_Offset_And_Limit();
    //  this.offset    = 1;
    //  this.limit     = 6;

    this.order         = "ASC";
    this.sort          = "reviewStateCode";

    this.reUseQuery    = false;
    this.pageNumArray  = [];
    this.page_Choices  = [];
}
public deleteOneRecord ( ) {
      this.totalRecords = this.totalRecords -1;
    }
    public buildUrlQualifiers (  ):string  {
          
      let prefix:string = "?";
      let url:   string = "";
          
          for (var i = 0; i < this.urlQualifiers.length; i++) 
          {
                if (i > 0)
                      prefix = "&";
    
                let name = this.urlQualifiers[i];
                let value = this[name];
    
                url += this.formUtility.addUrlQualifier(prefix, name, value);
          }
    
          return (url); 
    }
    public setSort( newSort:string) {
          this.sort = newSort;
    }
    public setOrder( newOrder:string) {
      this.order = newOrder;
    
    }
    
    // We are here because we got the query response, containg 'total records'
    // It could be the 1st query, or subsequent queires with NEW [pageNum, pageSize]
    public setTotalRecords ( total:number ) {
    
      // If were are re-doing the same query with NEW [pageNum, pageSize]
      // do not reset things.....
      if ( this.reUseQuery === true )
        return;
    
      this.reUseQuery   = true;
      this.totalRecords = total;
      this.pageNumber   = 1;
     
      this.calculate_Max_PageNumber ( );
      this.calculate_Offset_And_Limit   ( );
      this.calculate_Pages    ( ); 
    
    }
    
    //  this.pageNumber set by  [(ngModel)] ="paging.pageNumber"
    public setPageNumber ( event:any ) {
    
       this.pageNumber = event.value;
    
       this.calculate_Offset_And_Limit   ( );
       this.calculate_Pages              ( ); 
    
      console.log ( "Change Page Number ["+ JSON.stringify(event)+"]");
    }
    
    // this.pageSize set by [(ngModel)] ="paging.pageSize" 
    public setPageSize( event:any ) {
    
      // Automatically set page->1, upon choosing new page size.
     // this.pageSize         = event.value;
      this.pageNumber       = 1;
    
      
      this.calculate_Max_PageNumber ( );
      this.calculate_Offset_And_Limit   ( );
      this.calculate_Pages    ( ); 
    
      console.log ( "Change Page Size ["+ JSON.stringify(event)+"]");
    }
    
    private calculate_Offset_And_Limit ( ) {
        this.offset = ( (this.pageNumber-1) * this.pageSize ) + 1;
        this.limit  = this.offset + this.pageSize -1;
    }
    
    private calculate_Max_PageNumber ( ) {
      this.maxPageNumber   = Math.ceil( this.totalRecords / this.pageSize);
    }
    
    private calculate_Pages ( )  {
    
      this.page_Choices = [];
    
    //  if ( this.pageNumber > 1 )
    //     this.page_Choices.push ( {label: ' << ', value: "Previous"} );
    
      if ( this.maxPageNumber  > 1 )
      {
          for ( var i=0; i < this.maxPageNumber; i++ ) 
          {
              let pageNum:      number = i+1;
              let pageNumString:string = pageNum.toString();
        
              this.pageNumArray.push ( pageNum );
              this.page_Choices.push ( {label: pageNumString, value: pageNum } );
          }
      }
    // if ( this.pageNumber <  this.maxPageNumber )
    //     this.page_Choices.push ( {label: ' >>', value: "Next"} );
    }
    
    // Preparing a new query from the using hitting Submit on the "Search Query Form"
    public setFor_NewQuery ( sort:string, order:string) {
    
          this.setPageNumber ( {value: 1} );
    
          this.reUseQuery = false;
          this.sort       = sort;
          this.order      = order;
    }
}