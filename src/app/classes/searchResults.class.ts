export class SearchResults {
    ImageChoice:            string; // added after http response

    Sconum:                 string;
    ImageGuid:              string;
    AspectCode:             string;
    SiteId:                 string;
    ProductionType:         string;

    ImageSource:            string;
    OtherSource:            string;

    ReviewStateCode:        string;
    ReviewState:            string;          
    IirNumber:              string;

    ImageDate:              string;
    LastModifiedDate:       string;
    EnclosureDate:          string;
    ApproverDate:           string;
    FirstReviewDate:        string;
    CreatedDate:            string;
    Declassification:       string;
    UploadDate:             string;

    Url: {
       ORIG:                string,
       PROD:                string,
       THUMB:               string   
    };

    UrlThumb:               string;
    ThumbTitle:             string;

 //   Primary_Radio_Id:       string;
 //  Distribute_Radio_Id:    string;

    Selected:               boolean;   // Created for internal/web processing.
    PrimaryImage:           boolean;   
    Distribution:           boolean;
    ProcessingRequired:     string
    DoNotReplicate:         string;    // boolean
    ValidityPicture:        string;    // boolean
    AmidshipsId:            number;
    SecurityId:             number;
    LastModifiedBy:         string;
    InputAnalystId:         string;
    FirstReviewerId:        string;
    ApproverId:             string;

    FileExtension:          string;
    FileSizeKb:             number;
    MimeType:               string;
}