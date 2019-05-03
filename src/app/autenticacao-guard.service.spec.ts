import { TestBed } from '@angular/core/testing';

import { AutenticacaoGuardService } from './autenticacao-guard.service';

describe('AutenticacaoGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutenticacaoGuardService = TestBed.get(AutenticacaoGuardService);
    expect(service).toBeTruthy();
  });
});
