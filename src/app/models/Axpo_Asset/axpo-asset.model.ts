export interface AxpoAsset {
    id: string;
    name: string;
    type: string;
    latitude: number;
    longitude: number;
}

export interface AxpoAssetFilter {
    name?: string;
    type?: string[];
    page: number;
}
