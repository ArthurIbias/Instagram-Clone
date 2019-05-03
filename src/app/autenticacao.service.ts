import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { Usuario } from './acesso/usuario.model';

@Injectable()
export class AutenticacaoService {
  public token_id: string;

  constructor(private router: Router) {}

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then(() => {
        // removendo senha do objeto
        delete usuario.senha;
        // subindo os dados
        firebase
          .database()
          .ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set({
            email: usuario.email,
            nome_completo: usuario.nome_completo,
            nome_usuario: usuario.nome_usuario,
          });
      });
  }

  public autenticarUsuario(email: string, senha: string): Promise<any> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, senha)
      .then(() => {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((idToken: string) => {
            this.token_id = idToken;
            localStorage.setItem('idToken', idToken);
            this.router.navigate(['/home']);
          });
      });
  }

  public autenticado(): boolean {
    if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
      this.token_id = localStorage.getItem('idToken');
    }

    if (this.token_id === undefined) {
      this.router.navigate(['/']);
    }

    return this.token_id !== undefined;
  }

  public sair(): void {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem('idToken');
        this.token_id = undefined;
        this.router.navigate(['/']);
      });
  }
}
