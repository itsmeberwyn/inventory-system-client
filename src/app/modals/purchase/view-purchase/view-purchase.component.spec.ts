import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchaseComponent } from './view-purchase.component';

describe('ViewPurchaseComponent', () => {
  let component: ViewPurchaseComponent;
  let fixture: ComponentFixture<ViewPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
