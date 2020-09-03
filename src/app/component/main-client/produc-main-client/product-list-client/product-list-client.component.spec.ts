import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListClientComponent } from './product-list-client.component';

describe('ProductListClientComponent', () => {
  let component: ProductListClientComponent;
  let fixture: ComponentFixture<ProductListClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
