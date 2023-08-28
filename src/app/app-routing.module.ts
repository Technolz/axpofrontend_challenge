import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetListComponent } from './pages/asset-list/asset-list.component';
import { AssetPopulationComponent } from './pages/asset-population/asset-population.component';
import { AssetRestrictionsComponent } from './pages/asset-restrictions/asset-restrictions.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/assets',
        pathMatch: 'full'
    }, {
        path: 'assets',
        component: AssetListComponent
    }, {
        path: 'assets/:id/population',
        component: AssetPopulationComponent,
    }, {
        path: 'assets/:id/restrictions',
        component: AssetRestrictionsComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
