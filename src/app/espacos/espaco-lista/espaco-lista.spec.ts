import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspacoLista } from './espaco-lista';

describe('EspacoLista', () => {
  let component: EspacoLista;
  let fixture: ComponentFixture<EspacoLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspacoLista],
    }).compileComponents();

    fixture = TestBed.createComponent(EspacoLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
