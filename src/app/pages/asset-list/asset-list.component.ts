import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subscription, filter, map, pairwise, throttleTime } from 'rxjs';

import { AxpoAsset, AxpoAssetFilter } from 'src/app/models/Axpo_Asset/axpo-asset.model';
import { AxpoAssetService } from 'src/app/models/Axpo_Asset/axpo-asset.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-asset-list',
    templateUrl: './asset-list.component.html',
    styleUrls: ['./asset-list.component.scss']
})
export class AssetListComponent implements OnInit, OnDestroy, AfterViewInit {
    private assetListSubscription: Subscription | undefined;
    private assetTypeSubscription: Subscription | undefined;

    @ViewChild('scroller')
    scroller!: CdkVirtualScrollViewport;

    loading: boolean = false;

    assetList: AxpoAsset[] = [];
    assetTypes: string[] = [];

    currentPage = 1;

    searchFilter: string = '';
    typeFilter: string[] = [];

    constructor(private router: Router, private axpoAssetService: AxpoAssetService) { }

    ngOnInit(): void {
        const filters = this.axpoAssetService.getComponentFilters();

        this.searchFilter = filters.name || '';

        this.typeFilter = filters.type || [];

        this.__subscribeToAssetList();
    }

    ngOnDestroy(): void {
        this.assetListSubscription?.unsubscribe();
        this.assetTypeSubscription?.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.scroller.elementScrolled().pipe(
            map(() => this.scroller.measureScrollOffset('bottom')),
            pairwise(),
            filter(([y1, y2]) => (y2 < y1 && y2 < 375)),
            throttleTime(50)
        ).subscribe(() => this.__paginateList());
    }

    private __subscribeToAssetList() {
        this.assetListSubscription = this.axpoAssetService.getAssetList().subscribe((list) => {
            this.assetList = list;

            this.loading = false;
        });

        this.assetTypeSubscription = this.axpoAssetService.getAssetTypeList().subscribe((list) => this.assetTypes = list);
    }

    private __paginateList() {
        this.loading = true;

        this.currentPage++;

        this.axpoAssetService.paginateAssetList({ page: this.currentPage, });
    }

    handleFilter() {
        this.loading = true;

        this.currentPage = 1;

        const filter: AxpoAssetFilter = { page: this.currentPage, };

        if (this.searchFilter && this.searchFilter !== '') filter.name = this.searchFilter;

        if (this.typeFilter && this.typeFilter.length > 0) filter.type = this.typeFilter;

        this.axpoAssetService.filterAssetList(filter);

        this.scroller.scrollTo({ top: 0 });
    }

    handleSelect(asset: AxpoAsset, type: string) {
        this.axpoAssetService.setSelectedAsset(asset);

        this.router.navigateByUrl(`/assets/${asset.id}/${type}`);
    }
}
