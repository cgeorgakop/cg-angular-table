import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarWarsFilmsComponent } from './star-wars-films.component';

describe('StarWarsFilmsComponent', () => {
  let component: StarWarsFilmsComponent;
  let fixture: ComponentFixture<StarWarsFilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarWarsFilmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarWarsFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
