import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInventoryComponent } from './login-inventory.component';

describe('LoginInventoryComponent', () => {
  let component: LoginInventoryComponent;
  let fixture: ComponentFixture<LoginInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
