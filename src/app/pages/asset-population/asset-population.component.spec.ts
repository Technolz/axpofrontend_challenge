import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetPopulationComponent } from './asset-population.component';

describe('AssetPopulationComponent', () => {
  let component: AssetPopulationComponent;
  let fixture: ComponentFixture<AssetPopulationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetPopulationComponent]
    });
    fixture = TestBed.createComponent(AssetPopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
