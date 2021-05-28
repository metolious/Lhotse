import { OrgListMember } from "./orgListMember.class";
import { Role } from "./role.class";


export class Authorization {
    public  ID:             string;
    public  DN:             string;
    public  CN:             string;
    public  DNHash:         string;
    public  userEmail:      string;
    ​​​
    public permissions:     Permissions;
    public orgListMember:   OrgListMember[];
    public roles:           Role        [];


    public allRoleFlags:    number       [] = [];
    public allOrgFlags:     string       [] = [];
    public allOrgListNames: string       [] = [];

    public updateEnabled:   boolean        = false;
    public hasFocus:        boolean        = false;

    constructor (data: any) {
        this.orgListMember = data.OrganizationLists;
        this.roles         = data.Roles;

        this.ID            = data.CN;  // ONIMIE1-1497  this.getUserID(data.DN).toUpperCase();
        this.DN            = data.DN;
        this.DNHash        = data.DNHash;
        this.userEmail     = data.UserEmail;

        this.permissions = new Permissions();

        for ( var field in this.permissions ) 
              this.permissions[field]= data[field];
              
        this.permissions['CanEditAlert'  ]   = this.permissions['CanCreateAlert'];
        this.permissions['CanExpireAlert']   = this.permissions['CanCreateAlert'];
        this.permissions['CanAcceptAlert']   = this.permissions['CanCreateAlert'];
        this.permissions['CanRejectAlert']   = this.permissions['CanCreateAlert'];

        this.permissions['hasAdminRole'] = false;

        for ( var i=0; i < this.roles.length; i++ )
        {  
           if ( this.isAdmin ( this.roles[i].Name ) ) 
              this.permissions['hasAdminRole'] = true;
        }

 //       this.allOrgListNames = ["ONI VOI", "REPLACEONE", "REPLACEEIGHT", "EBOLA VESSEL" ];
        for ( var i=0; i < this.orgListMember.length; i++ )
        {
              let listName = this.orgListMember[i].ListName;

              if ( this.allOrgListNames.indexOf(listName) < 0 ) {
                    this.allOrgListNames.push (listName);
              }
        }
    }

    private isAdmin(name: string): boolean {
        let isNameAdmin:boolean = false;
        let adminRoles:string[] = [ "SILO Administrator", "MSC Administrator", 
                                   "VIPER Administrator", "Reserve Photo Analyst Lead" ];
  
        for ( var i=0; i < adminRoles.length; i++) 
        {
              if ( name == adminRoles[i] )
                  isNameAdmin =  true;
        }
                                 
        return ( isNameAdmin );
    } 

    public createOrgFlagSelections (  ) {
              for ( var i=0; i < this.orgListMember.length; i++ )
              {
                    let orgId   = this.orgListMember[i].OrganizationId;
        
                    if ( this.allOrgFlags.indexOf(orgId) < 0 ) 
                          this.allOrgFlags.push (orgId);
              }
         }
        
        public createRoleFlagSelections (   ) {
              for ( var i=0; i < this.roles.length; i++ )
              {
                    let roleId   = this.roles[i].RoleId;
              
                    if ( this.allRoleFlags.indexOf(roleId) < 0 ) 
                                this.allRoleFlags.push (roleId);
              }
         }
}