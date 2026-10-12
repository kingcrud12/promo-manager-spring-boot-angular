import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgrammeFidelite } from './programme-fidelite';

describe('ProgrammeFidelite', () => {
  let component: ProgrammeFidelite;
  let fixture: ComponentFixture<ProgrammeFidelite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeFidelite],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgrammeFidelite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
