import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetlocationsComponent } from './getlocations.component';

describe('GetlocationsComponent', () => {
  let component: GetlocationsComponent;
  let fixture: ComponentFixture<GetlocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetlocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetlocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
