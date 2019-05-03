import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { LoginComponent } from './acesso/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutenticacaoGuardService } from './autenticacao-guard.service';
import { AutenticacaoService } from './autenticacao.service';
import { BdService } from './bd.service';
import { HomeComponent } from './home/home.component';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { ProgressoService } from './progresso.service';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, ReactiveFormsModule, FormsModule, MatIconModule],
  providers: [AutenticacaoService, AutenticacaoGuardService, BdService, ProgressoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
