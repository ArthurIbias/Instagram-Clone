import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcessoComponent } from './acesso/acesso.component';
import { AutenticacaoGuardService } from './autenticacao-guard.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: AcessoComponent },
  { path: 'home', component: HomeComponent, canActivate: [AutenticacaoGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
