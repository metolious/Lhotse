import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ImageSearchComponent} from './demo/view/image-search.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {SearchResultsComponent} from './demo/view/search-results.component';
import {UploadImageComponent} from './demo/view/upload-image.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {IconsComponent} from './utilities/icons.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    // {path: '', component: DashboardComponent},
                    {path: '', component: UploadImageComponent},
                    {path: 'uikit/table', component: SearchResultsComponent},
                    {path: 'uikit/tree', component: UploadImageComponent},
                    {path: 'uikit/panel', component: ImageSearchComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'documentation', component: DocumentationComponent}
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
