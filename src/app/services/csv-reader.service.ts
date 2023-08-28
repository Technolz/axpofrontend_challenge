import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AxpoAsset } from '../models/Axpo_Asset/axpo-asset.model';

@Injectable({
    providedIn: 'root'
})
export class CsvReaderService {
    private file = './assets/data/assets.csv';

    private assetList: BehaviorSubject<AxpoAsset[]> = new BehaviorSubject<AxpoAsset[]>([]);
    private assetTypeList: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    constructor(private http: HttpClient) { }

    initAssets() {
        this.http.get(this.file, { responseType: 'text' }).subscribe((data) => {
            let csvToRowArray = data.split('\n');

            let assets: AxpoAsset[] = [];
            let types: any = {};

            for (let index = 0; index < csvToRowArray.length; index++) {
                if (index === 0) continue;

                let row = csvToRowArray[index].split(';');

                if (!row[0]) continue;

                if (!types[row[2]]) types[row[2]] = true;

                assets.push({
                    id: row[0],
                    name: row[1],
                    type: row[2],
                    latitude: parseFloat(row[3]),
                    longitude: parseFloat(row[4]),
                })
            }

            this.assetList.next(assets);
            this.assetTypeList.next(Object.keys(types));
        });
    };

    getAssetList(): BehaviorSubject<AxpoAsset[]> {
        return this.assetList;
    }

    getAssetTypeList(): BehaviorSubject<string[]> {
        return this.assetTypeList;
    }
}
