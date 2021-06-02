import {Component} from '@angular/core';
import {AppComponent} from './app.component';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
            <a id="footerlogolink">
                <img style="height:60px;width:60px;" id="footer-logo"
                     [src]="'assets/layout/images/' + (app.layoutMode === 'light' ? 'NIMITZ' : 'NIMITZ') + '.png'" alt="Loading Image...">
            </a>
            <div class="social-icons">
                <a><i class="pi pi-github"></i></a>
                <a><i class="pi pi-facebook"></i></a>
                <a><i class="pi pi-twitter"></i></a>
            </div>
        </div>
    `
})
export class AppFooterComponent {

    constructor(public app: AppComponent) {}


}