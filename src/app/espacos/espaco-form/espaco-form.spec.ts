import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspacoForm } from './espaco-form';

describe('EspacoForm', () => {
  let component: EspacoForm;
  let fixture: ComponentFixture<EspacoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspacoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EspacoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
