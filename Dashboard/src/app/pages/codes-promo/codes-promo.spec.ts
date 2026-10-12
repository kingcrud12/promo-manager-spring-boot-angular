import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodesPromo } from './codes-promo';

describe('CodesPromo', () => {
  let component: CodesPromo;
  let fixture: ComponentFixture<CodesPromo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodesPromo],
    }).compileComponents();

    fixture = TestBed.createComponent(CodesPromo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
