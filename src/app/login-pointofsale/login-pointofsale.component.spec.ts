import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPointofsaleComponent } from './login-pointofsale.component';

describe('LoginPointofsaleComponent', () => {
  let component: LoginPointofsaleComponent;
  let fixture: ComponentFixture<LoginPointofsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPointofsaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPointofsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
