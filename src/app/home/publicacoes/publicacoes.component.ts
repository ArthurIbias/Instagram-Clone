import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { BdService } from 'src/app/bd.service';
import { ProgressoService } from 'src/app/progresso.service';
import { Publicacao } from 'src/app/shared/publicacao.model';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css'],
})
export class PublicacoesComponent implements OnInit {
  public email: string;
  public publicacoes: Publicacao[] = [];

  constructor(private bd: BdService, public progresso: ProgressoService) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      this.email = user.email;
      this.atualizarTimeline();
    });
  }

  public atualizarTimeline(): void {
    this.bd.consultaPublicacoes(this.email).then((publicacoes: Publicacao[]) => {
      this.publicacoes = publicacoes;
    });
  }
}
