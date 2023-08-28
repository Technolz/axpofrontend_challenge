import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './shared/material/material.module';
import { ChartModule } from 'angular-highcharts';

import { AutoHeightDirective } from './directives/auto-height.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssetListComponent } from './pages/asset-list/asset-list.component';
import { AssetPopulationComponent } from './pages/asset-population/asset-population.component';
import { AssetRestrictionsComponent } from './pages/asset-restrictions/asset-restrictions.component';

@NgModule({
    declarations: [
        AppComponent,
        AssetListComponent,
        AutoHeightDirective,
        AssetPopulationComponent,
        AssetRestrictionsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MaterialModule,
        ChartModule,
        TranslateModule.forRoot(),
        AppRoutingModule
    ],
    providers: [provideAnimations()],
    bootstrap: [AppComponent]
})
export class AppModule { }
