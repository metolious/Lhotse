import {Component, OnInit} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-menu',
    template: `
        <ul class="layout-menu">
            <li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
        </ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Viper MSC', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'],
                items: [
                    {label: 'Vessel Update', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/vessel']},
                    {label: 'Upload Image', icon: 'pi pi-fw pi-upload', routerLink: ['/uikit/tree']},
                    {label: 'Image Search', icon: 'pi pi-fw pi-search', routerLink: ['/uikit/panel']},
                    {label: 'Search Results', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
                ]
            },
            // {
            //     label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['utilities'],
            //     items: [
            //         {label: 'Icons', icon: 'pi pi-fw pi-compass', routerLink: ['utilities/icons']},
            //     ]
            // },
            {
                label: 'Pages', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'],
                items: [
                    {label: 'Angular CLI', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/angular']},
                ]
            },
            {
                label: 'Start', icon: 'pi pi-fw pi-download',
                items: [
                    {
                        label: 'Version', icon: 'pi pi-fw pi-info-circle', routerLink: ['/version']
                    },
                    {
                    }
                ]
            }
        ];
    }
}
