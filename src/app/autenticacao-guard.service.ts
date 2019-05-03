import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AutenticacaoService } from './autenticacao.service';

@Injectable()
export class AutenticacaoGuardService {
  constructor(private autenticacao: AutenticacaoService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.autenticacao.autenticado();
  }
}
