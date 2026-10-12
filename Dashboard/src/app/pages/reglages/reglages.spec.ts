import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Reglages } from './reglages';

describe('Reglages', () => {
  let component: Reglages;
  let fixture: ComponentFixture<Reglages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reglages],
    }).compileComponents();

    fixture = TestBed.createComponent(Reglages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
