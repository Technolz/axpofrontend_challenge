import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRestrictionsComponent } from './asset-restrictions.component';

describe('AssetRestrictionsComponent', () => {
  let component: AssetRestrictionsComponent;
  let fixture: ComponentFixture<AssetRestrictionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetRestrictionsComponent]
    });
    fixture = TestBed.createComponent(AssetRestrictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
