import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSalesreportComponent } from './login-salesreport.component';

describe('LoginSalesreportComponent', () => {
  let component: LoginSalesreportComponent;
  let fixture: ComponentFixture<LoginSalesreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSalesreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSalesreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
