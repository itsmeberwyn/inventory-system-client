import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPointofsaleComponent } from './main-pointofsale.component';

describe('MainPointofsaleComponent', () => {
  let component: MainPointofsaleComponent;
  let fixture: ComponentFixture<MainPointofsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPointofsaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPointofsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
