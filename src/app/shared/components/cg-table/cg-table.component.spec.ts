import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgTableComponent } from './cg-table.component';

describe('CgTableComponent', () => {
  let component: CgTableComponent;
  let fixture: ComponentFixture<CgTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
