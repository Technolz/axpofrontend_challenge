import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { Chart } from 'angular-highcharts';

import { AxpoAsset } from 'src/app/models/Axpo_Asset/axpo-asset.model';

import { AxpoAssetService } from 'src/app/models/Axpo_Asset/axpo-asset.service';

@Component({
    selector: 'app-asset-population',
    templateUrl: './asset-population.component.html',
    styleUrls: ['./asset-population.component.scss']
})
export class AssetPopulationComponent implements OnInit, OnDestroy {
    private assetSubscription: Subscription | undefined;

    loading: boolean = false;

    id: string = '';

    asset!: AxpoAsset;

    results: any;

    chart!: Chart;

    constructor(
        private router: Router,
        private currentRoute: ActivatedRoute,
        private axpoAssetService: AxpoAssetService
    ) { }

    ngOnInit(): void {
        this.id = this.currentRoute.snapshot.paramMap.get('id') || '';

        this.loading = true;

        this.__subscribeToAssetItem();
    }

    ngOnDestroy(): void {
        this.assetSubscription?.unsubscribe();
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
        const layers = 'all:ch.bfs.volkszaehlung-bevoelkerungsstatistik_einwohner';

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

            const xAxis = this.results.map((r: any) => r.attributes['i_year']);
            const series = this.results.map((r: any) => r.attributes['number']);

            this.chart = new Chart({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Population (residents)'
                },
                xAxis: {
                    categories: xAxis,
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Residents'
                    }
                },
                series: [{
                    name: 'Population',
                    data: series,
                }]
            } as any);
        });
    }
}
