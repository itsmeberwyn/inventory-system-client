import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSalesreportComponent } from './main-salesreport.component';

describe('MainSalesreportComponent', () => {
  let component: MainSalesreportComponent;
  let fixture: ComponentFixture<MainSalesreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSalesreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSalesreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
