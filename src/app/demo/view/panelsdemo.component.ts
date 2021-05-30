import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AppBreadcrumbService} from 'src/app/app.breadcrumb.service';
import { IAspect, IImageSource, ISecurityLabel, IUser } from 'src/app/shared/interfaces';

@Component({
    templateUrl: './panelsdemo.component.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
            margin-left: .25em;
        }

        :host ::ng-deep .p-splitbutton button {
            margin-right: 0;
            margin-left: 0;
        }

        @media screen and (max-width: 960px) {
            .card.toolbar-demo {
                overflow: auto;
            }
        }
    `]
})
export class PanelsDemoComponent implements OnInit {

    users: IUser[];
    security_labels: ISecurityLabel[];
    aspects: IAspect[];
    image_sources: IImageSource[];
    
    sortFields: any[];
    sortOptions: any[];
    pageOptions: any[];
    imageOptions: any[];
    distOptions: any[];
    valSelect1: string;
    valSelect2: string;

    items: MenuItem[];

    cardMenu: MenuItem[];

    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Viper MSC' },
            { label: 'Search Form', routerLink: ['/uikit/panel'] }
        ]);
    }

    ngOnInit() {
        this.users = [
            { label: 'JMORIARTY', value: 'JMORIARTY' },
            { label: 'JWATSON', value: 'JWATSON' },
        ];

        this.security_labels = [
            {value: 'CONFIDENTIAL_REL_TO_USA_FVEY', label: 'CONFIDENTIAL//REL TO USA, FVEY'},
            {value: 'CONFIDENTIAL_REL_TO_USA_GMIF', label: 'CONFIDENTIAL//REL TO USA, GMIF'},
            {value: 'SECRET_REL_TO_USA_CMFC_CMFP_GMIF', label: 'SECRET//REL TO USA, CMFC, CMFP, GMIF'},
            {value: 'SECRET_REL_TO_USA_FVEY', label: 'SECRET//REL TO USA, FVEY'},
            {value: 'SECRET_REL_TO_USA_CMFC_GMIF', label: 'SECRET//REL TO USA, CMFC, GMIF'},
            {value: 'TOP_SECRET_REL_TO_USA_FVEY', label: 'TOP SECRET//REL TO USA, FVEY'},
            {value: 'UNCLASSIFIED', label: 'UNCLASSIFIED'},
            {value: 'UNCLASSIFIED_DEVELOPMENT_SYSTEM_HIGH', label: 'UNCLASSIFIED//DEVELOPMENT SYSTEM HIGH'},
            {value: 'UNCLASSIFIED_DEVELOPMENT_SYSTEM_LOW', label: 'UNCLASSIFIED//DEVELOPMENT SYSTEM LOW'},
            ];
            
            this.image_sources = [
            {value: 'MALTA', label: 'MALTA'},
            {value: 'MEDIA', label: 'MEDIA'},
            {value: 'MISC', label: 'MISC'},
            {value: 'OPEN_SOURCE', label: 'OPEN SOURCE'},
            {value: 'OPMARINE', label: 'OPMARINE'},
            {value: 'OTHER', label: 'OTHER'},
            {value: 'PANAMA', label: 'PANAMA'},
            {value: 'R.A.F.', label: 'R.A.F.'},
            {value: 'SINGAPORE', label: 'SINGAPORE'},
            {value: 'SUEZ', label: 'SUEZ'},
            {value: 'THOMAS_B_ELLSWORTH', label: 'THOMAS B. ELLSWORTH'},
            {value: 'U.S.C.G.', label: 'U.S.C.G.'},
            {value: 'VP', label: 'VP'},
            {value: 'WIM', label: 'WIM'},
            ];
            
            this.aspects = [
            {value: 'ARIAL_OVERHEAD', label: 'ARIAL OVERHEAD'},
            {value: 'BOW', label: 'BOW'},
            {value: 'BOW_QUARTER', label: 'BOW QUARTER'},
            {value: 'BROADSIDE', label: 'BROADSIDE'},
            {value: 'CAPACITY_PLANS', label: 'CAPACITY_PLANS'},
            {value: 'CLOSEUP', label: 'CLOSEUP'},
            {value: 'CREW_LIST', label: 'CREW LIST'},
            {value: 'CREW_PHOTO', label: 'CREW PHOTO'},
            {value: 'DECKHOUSE', label: 'DECKHOUSE'},
            {value: 'ELECTRONICS_RADAR', label: 'ELECTRONICS RADAR'},
            {value: 'FIRE_SAFETY_PLANS', label: 'FIRE SAFETY PLANS'},
            {value: 'FLIR', label: 'FLIR'},
            {value: 'GENERAL_ARRANGEMENT_PLANS', label: 'GENERAL ARRANGEMENT PLANS'},
            {value: 'GENERAL_ARRANGEMENT_PROFILE', label: 'GENERAL ARRANGEMENT PROFILE'},
            {value: 'LIST', label: 'LIST'},
            {value: 'LOFARGRAM', label: 'LOFARGRAM'},
            {value: 'OTHER', label: 'OTHER'},
            {value: 'OTHER_PLANS', label: 'OTHER PLANS'},
            {value: 'PORT_BOW_QUARTER', label: 'PORT BOW QUARTER'},
            {value: 'PORT_STERN_QUARTER', label: 'PORT STERN QUARTER'},
            {value: 'STARBOARD_BOW_QUARTER', label: 'STARBOARD BOW QUARTER'},
            {value: 'STARBOARD_STERN_QUARTER', label: 'STARBOARD STERN QUARTER'},
            {value: 'STERN_QUARTER', label: 'STERN QUARTER'},
            {value: 'STERN', label: 'STERN'},
            {value: 'TEST', label: 'TEST'},
            ];

            this.sortFields = [
                {value: 'Sconum', label: 'Sconum'},
                {value: 'IIR_Number', label: 'IIR Number'},
                {value: 'Image_Source', label: 'Image Source'},
                {value: 'Image_Aspect', label: 'Image Aspect'},
                {value: 'Upload Date', label: 'Upload Date'},
                {value: 'Classification_Label', label: 'Classification'},
                ];

        this.pageOptions = [
            {name: '50',   value:50},
            {name: '100',  value:100},
            {name: '250',  value:250},
            {name: '1000', value:1000},
        ];

        this.sortOptions = [
            {name: 'Ascending',   value:'ASC'},
            {name: 'Decending',   value:'DESC'},
        ];

        this.imageOptions = [
            {name: 'True',  value: 1},
            {name: 'False', value: 2},
            {name: 'Both',  value: 3}
        ];

        this.items = [
            {label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io'},
            {label: 'Theming', icon: 'pi pi-bookmark', routerLink: ['/theming']}
        ];

        this.cardMenu = [
            {
                label: 'Save', icon: 'pi pi-fw pi-check'
            },
            {
                label: 'Update', icon: 'pi pi-fw pi-refresh'
            },
            {
                label: 'Delete', icon: 'pi pi-fw pi-trash'
            },
        ];
    }
}
