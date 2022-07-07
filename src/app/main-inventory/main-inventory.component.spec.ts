import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInventoryComponent } from './main-inventory.component';

describe('MainInventoryComponent', () => {
  let component: MainInventoryComponent;
  let fixture: ComponentFixture<MainInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
