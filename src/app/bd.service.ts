import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { ProgressoService } from './progresso.service';

@Injectable()
export class BdService {
  constructor(public progresso: ProgressoService) {}

  public efetuarPublicacao(email: string, titulo: string, imagem: any, data: string): void {
    // inicialização
    this.progresso.progressoUpload = 'pendente';
    this.progresso.porcentagemUpload = 0;

    // envia o arquivo para o Firebase
    firebase
      .database()
      .ref(`/publicacoes/${btoa(email)}/`)
      .push({ titulo, data })
      .then((value: firebase.database.Reference) => {
        firebase
          .storage()
          .ref()
          .child(`/imagens/${value.key}/`)
          .put(imagem)
          .on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: firebase.storage.UploadTaskSnapshot) => {
              this.progresso.progressoUpload = 'andamento';
              this.progresso.porcentagemUpload = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },
            (error: Error) => {
              this.progresso.progressoUpload = 'erro';
              this.progresso.porcentagemUpload = 0;
            },
            () => {
              this.progresso.progressoUpload = 'concluido';
              this.progresso.porcentagemUpload = 100;
            },
          );
      });
  }

  public consultaPublicacoes(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`publicacoes/${btoa(email)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: firebase.database.DataSnapshot) => {
          const publicacoes: Array<any> = [];

          snapshot.forEach((childSnapshot: firebase.database.DataSnapshot) => {
            const publicacao: any = childSnapshot.val();
            publicacao.key = childSnapshot.key;
            publicacoes.push(publicacao);
          });
          // resolve(publicacoes);
          return publicacoes.reverse();
        })
        .then((publicacoes: any) => {
          publicacoes.forEach((publicacao) => {
            // buscar URL da imagem
            firebase
              .storage()
              .ref()
              .child(`imagens/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url_imagem = url;

                firebase
                  .database()
                  .ref(`usuario_detalhe/${btoa(email)}`)
                  .once('value')
                  .then((userSnapshot: firebase.database.DataSnapshot) => {
                    publicacao.nome_completo = userSnapshot.val().nome_completo;
                  });
              });
          });

          resolve(publicacoes);
        });
    });
  }
}
