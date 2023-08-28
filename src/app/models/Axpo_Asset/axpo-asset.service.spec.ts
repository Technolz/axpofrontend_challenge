import { TestBed } from '@angular/core/testing';

import { AxpoAssetService } from './axpo-asset.service';

describe('AxpoAssetService', () => {
  let service: AxpoAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxpoAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
