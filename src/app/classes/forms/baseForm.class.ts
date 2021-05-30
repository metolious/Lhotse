
import { ToasterMsg_Service } from '../../services/SHARED_SERVICES/toasterMsg.service';
import { MultiSelect_Service } from '../../startup/multiSelect.service';

export class BaseForm {
    protected baseUrl:    string    = '/viper/resources/';
    
    maxProjectDate:Date   =  new Date();
    todaysDate:Date       =  new Date();

    private ONE_SECOND: number = 1000;
    private ONE_MINUTE: number = 60 * this.ONE_SECOND;
    private ONE_HOUR:   number = 60 * this.ONE_MINUTE;
    private ONE_DAY:    number = 24 * this.ONE_HOUR;
    private ONE_MONTH:  number = 30 * this.ONE_DAY;
    private ONE_YEAR:   number = 365* this.ONE_DAY; 
    
    minDate:Date          = new Date( new Date().setTime ( this.todaysDate.getTime() - (20*this.ONE_YEAR) ));
    maxDate:Date          = this.todaysDate;
    minYear:number        = this.minDate.getFullYear();
    maxYear:number        = this.maxDate.getFullYear();
    yearRange:string      = this.minYear + ":" + this.maxYear;
    imageYearRange:string = "1900:" + this.maxYear;
    imageMinDate:string   = "1900-01-01";_YEAR:   number = 365* this.ONE_DAY;

    datePlaceholder:string=  "Click for Date";
    showDateIcon:string   =  "false";
    showButtonBar:string  =   "true";
    hourFormat:string     =   "24";
    dateFormat:string     =   "yy-mm-dd";
    yearNavigator:string  =   "true";
    monthNavigator:string =   "true";
    filenameRegex:string  = "[A-Za-z0-9_-]{3,40}$";
    filenameRegexTitle:string  = "Valid Length [3-40]";

    constructor ( protected messageService:         ToasterMsg_Service,
        protected multiSelectService:     MultiSelect_Service )
{  }


}