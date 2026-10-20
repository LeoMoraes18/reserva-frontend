import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspacoCard } from './espaco-card';

describe('EspacoCard', () => {
  let component: EspacoCard;
  let fixture: ComponentFixture<EspacoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspacoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(EspacoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
