import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartesCadeaux } from './cartes-cadeaux';

describe('CartesCadeaux', () => {
  let component: CartesCadeaux;
  let fixture: ComponentFixture<CartesCadeaux>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartesCadeaux],
    }).compileComponents();

    fixture = TestBed.createComponent(CartesCadeaux);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
