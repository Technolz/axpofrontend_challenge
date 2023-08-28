import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AxpoAsset } from 'src/app/models/Axpo_Asset/axpo-asset.model';

import { AxpoAssetService } from 'src/app/models/Axpo_Asset/axpo-asset.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
    selector: 'app-asset-restrictions',
    templateUrl: './asset-restrictions.component.html',
    styleUrls: ['./asset-restrictions.component.scss']
})
export class AssetRestrictionsComponent implements OnInit, OnDestroy {
    private assetSubscription: Subscription | undefined;
    private languageSubscription: Subscription | undefined;

    loading: boolean = false;

    id: string = '';

    asset!: AxpoAsset;

    results: any;

    language = 'en';

    constructor(
        private router: Router,
        private currentRoute: ActivatedRoute,
        private languageService: LanguageService,
        private axpoAssetService: AxpoAssetService
    ) { }

    ngOnInit(): void {
        this.id = this.currentRoute.snapshot.paramMap.get('id') || '';

        this.loading = true;

        this.__subscribeToAssetItem();

        this.languageSubscription = this.languageService.getCurrentLanguage().subscribe((lang: string) => this.language = lang);
    }

    ngOnDestroy(): void {
        this.assetSubscription?.unsubscribe();
        this.languageSubscription?.unsubscribe();
    }

    private __subscribeToAssetItem() {
        this.assetSubscription = this.axpoAssetService.getSelectedAsset().subscribe((asset: AxpoAsset | undefined) => {
            if (!asset) {
                this.router.navigateByUrl('/assets');
                return;
            }

            this.asset = asset;
            this.__loadAssetDetails();
        });
    }

    private __loadAssetDetails() {
        const layers = 'all:ch.bazl.einschraenkungen-drohnen';

        const request = this.axpoAssetService.getAssetDetails(layers, {
            latitude: this.asset.latitude,
            longitude: this.asset.longitude,
        });

        request.pipe(
            finalize(() => {
                this.loading = false;
            })
        ).subscribe((response: any) => {
            this.results = response.results;

            if (!this.results || this.results.length === 0) return;
        });
    }

    getRestrictionPeriod(restriction: any): string {
        if (restriction.attributes.time_permanent) return 'Permanent Restriction';

        return 'Restriction dates: ' + restriction.attributes.time_start + ' to ' + restriction.attributes.time_end;
    }
}
