import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { CsvReaderService } from 'src/app/services/csv-reader.service';
import { AxpoAsset, AxpoAssetFilter } from './axpo-asset.model';

@Injectable({
    providedIn: 'root'
})
export class AxpoAssetService {
    private PER_PAGE = 25;

    private componentFilters: AxpoAssetFilter = { page: 0 };

    private assetList: BehaviorSubject<AxpoAsset[]> = new BehaviorSubject<AxpoAsset[]>([]);

    private assetTypeList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    private filteredAssetList: BehaviorSubject<AxpoAsset[]> = new BehaviorSubject<AxpoAsset[]>([]);

    private paginatedList: BehaviorSubject<AxpoAsset[]> = new BehaviorSubject<AxpoAsset[]>([]);

    private selectedAsset: BehaviorSubject<AxpoAsset | undefined> = new BehaviorSubject<AxpoAsset | undefined>(undefined);

    constructor(private http: HttpClient, private csvReader: CsvReaderService) {
        this.__subscribeToAssetList();
    }

    private __subscribeToAssetList() {
        this.csvReader.getAssetList().subscribe((list) => {
            this.assetList.next(list);

            this.filterAssetList({ page: 1 });
        });

        this.csvReader.getAssetTypeList().subscribe((list) => {
            this.assetTypeList.next(list);
        });
    }

    private __paginateAssetList(tmpList: AxpoAsset[], assetFilter: AxpoAssetFilter): AxpoAsset[] {
        const initialRecord = this.PER_PAGE * (assetFilter.page - 1);
        const finalRecord = this.PER_PAGE * assetFilter.page;

        return tmpList.slice(initialRecord, finalRecord);
    }

    paginateAssetList(assetFilter: AxpoAssetFilter) {
        const currentList = this.paginatedList.value;
        const tmpList = this.__paginateAssetList(this.filteredAssetList.value, assetFilter);

        this.paginatedList.next([...currentList, ...tmpList]);
    }

    filterAssetList(assetFilter: AxpoAssetFilter) {
        this.paginatedList.next([]);

        const filteredList = this.assetList.value.filter((asset: AxpoAsset) => {
            if (asset.name && assetFilter.name && assetFilter.name !== '') {
                if (!asset.name.toLowerCase().includes(assetFilter.name.toLowerCase())) return false;
            }

            if (asset.type && assetFilter.type && assetFilter.type.length > 0) {
                if (!assetFilter.type.includes(asset.type)) return false;
            }

            return asset;
        });

        this.filteredAssetList.next(filteredList);

        this.paginateAssetList(assetFilter);

        this.componentFilters = assetFilter;
    }

    getAssetList(): BehaviorSubject<AxpoAsset[]> {
        return this.paginatedList;
    }

    getAssetTypeList(): BehaviorSubject<string[]> {
        return this.assetTypeList;
    }

    getComponentFilters(): AxpoAssetFilter {
        return this.componentFilters;
    }

    getSelectedAsset(): BehaviorSubject<AxpoAsset | undefined> {
        return this.selectedAsset;
    }

    setSelectedAsset(asset: AxpoAsset) {
        this.selectedAsset.next(asset);
    }

    getAssetDetails(layerType: string, geometry: { longitude: number, latitude: number }) {
        const url = 'https://api3.geo.admin.ch/rest/services/api/MapServer/identify';

        const headers = new HttpHeaders();
        const params = new HttpParams({
            fromObject: {
                layers: layerType,
                geometryType: 'esriGeometryPoint',
                sr: 4326,
                lang: 'en',
                returnGeometry: false,
                tolerance: 0,
                geometry: JSON.stringify({ x: geometry.longitude, y: geometry.latitude })
            }
        });

        return this.http.get(url, { headers, params });
    }
}
