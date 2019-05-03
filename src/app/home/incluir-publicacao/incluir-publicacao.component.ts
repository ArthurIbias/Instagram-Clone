import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as firebase from 'firebase';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BdService } from 'src/app/bd.service';
import { ProgressoService } from 'src/app/progresso.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css'],
})
export class IncluirPublicacaoComponent implements OnInit {
  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>();

  public email: string;
  public imagens: any;
  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null),
  });

  constructor(private bd: BdService, public progresso: ProgressoService) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user: firebase.User) => {
      this.email = user.email;
    });
  }

  public publicar(): void {
    const currentdate: Date = new Date();
    this.bd.efetuarPublicacao(this.email, this.formulario.value.titulo, this.imagens[0], currentdate.toUTCString());

    // para o observable
    const continua = new Subject();
    continua.next(true);

    const acompanhamentoUpload = interval(100);

    acompanhamentoUpload.pipe(takeUntil(continua)).subscribe(() => {
      if (this.progresso.progressoUpload === 'concluido') {
        // emitir evento ao componente PAI
        this.atualizarTimeLine.emit();
        continua.next(false);
      }
    });

    this.progresso.progressoUpload = 'pendente';
    this.progresso.porcentagemUpload = 0;
    this.imagens = undefined;
    this.formulario.reset();
  }

  public preparaImagemUpload(event: Event): void {
    this.imagens = (<HTMLInputElement>event.target).files;

    const img = this.imagens.item(0);
    const x = document.createElement('img');
    x.setAttribute('class', 'rounded mx-auto d-block');
    x.setAttribute('style', 'width: auto; max-height: 400px; overflox: hidden;');
    x.setAttribute('src', window.URL.createObjectURL(img));
    document.getElementById('imgPreview').appendChild(x);
  }

  public popupImage(): void {
    const x = document.getElementById('customFile');
    x.click();
  }
}
