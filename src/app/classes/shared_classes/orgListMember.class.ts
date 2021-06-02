
export class OrgListMember {
    public ListId:                      string;
    public ListName:                    string;
    public OrganizationId:              string;
    public OrganizationName:            string;
    public SecurityLabel:               string;

    public AlertList:                   string; //	      "NAVCENT WATCH (UNCLASSIFIED//FOUO)"
                                                //==>>	"NAVCENT WATCH (U//FOUO)"
    public AlertListCode:               string; //	Mon Apr-29, waiting on Emily
    public AlertListSecurityLabel:      string; //	"UNCLASSIFIED//FOUO"
}