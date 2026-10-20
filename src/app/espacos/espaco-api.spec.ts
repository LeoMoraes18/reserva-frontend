import { TestBed } from '@angular/core/testing';
import { EspacoApi } from './espaco-api';

describe('EspacoApi', () => {
  let service: EspacoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspacoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
