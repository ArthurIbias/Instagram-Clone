import { Component, OnInit, ViewChild } from '@angular/core';

import { ProgressoService } from '../progresso.service';
import { AutenticacaoService } from './../autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('publicacoes', { static: true }) public publicacoes: any;

  constructor(private autenticacao: AutenticacaoService, public progresso: ProgressoService) {}

  ngOnInit(): void {}

  public sair(): void {
    this.autenticacao.sair();
  }

  public resetModal(): void {
    this.progresso.progressoUpload = 'pendente';
    this.progresso.porcentagemUpload = 0;
  }

  public atualizarTimeLine(): void {
    this.publicacoes.atualizarTimeline();
  }
}
