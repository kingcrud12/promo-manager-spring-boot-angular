import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoldePoints } from './solde-points';

describe('SoldePoints', () => {
  let component: SoldePoints;
  let fixture: ComponentFixture<SoldePoints>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoldePoints],
    }).compileComponents();

    fixture = TestBed.createComponent(SoldePoints);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
