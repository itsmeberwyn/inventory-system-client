import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePurchaseComponent } from './delete-purchase.component';

describe('DeletePurchaseComponent', () => {
  let component: DeletePurchaseComponent;
  let fixture: ComponentFixture<DeletePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
