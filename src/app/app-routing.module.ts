import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {IconsComponent} from './utilities/icons.component';
import { UploadImageComponent } from './view/upload-image.component';
import { SearchResultsComponent } from './view/search-results.component';
import { ImageSearchComponent } from './view/image-search.component';
import { AngularComponent } from './view/angular.component';
import { VersionComponent } from './view/version.component';

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
                    {path: 'angular', component: AngularComponent},
                    {path: 'version', component: VersionComponent}
                ]
            },
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
