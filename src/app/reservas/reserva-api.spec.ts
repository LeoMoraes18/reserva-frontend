import { TestBed } from '@angular/core/testing';
import { ReservaApi } from './reserva-api';

describe('ReservaApi', () => {
  let service: ReservaApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
