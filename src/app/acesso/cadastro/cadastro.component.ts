import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/autenticacao.service';

import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  animations: [
    trigger('animacao-erro', [
      state('erro', style({ opacity: 1 })),
      transition('void => erro', [
        style({ opacity: 1 }),
        animate(
          '1s 0s ease-in-out',
          keyframes([
            style({ offset: 0.1, opacity: 1, transform: 'translateY(0)' }),
            style({ offset: 0.4, opacity: 1, transform: 'translateY(-10px)' }),
            style({ offset: 0.42, opacity: 1, transform: 'translateY(10px)' }),
            style({ offset: 0.44, opacity: 1, transform: 'translateY(-10px)' }),
            style({ offset: 0.46, opacity: 1, transform: 'translateY(10px)' }),
            style({ offset: 0.48, opacity: 1, transform: 'translateY(-10px)' }),
            style({ offset: 0.5, opacity: 1, transform: 'translateY(10px)' }),
            style({ offset: 0.52, opacity: 1, transform: 'translateY(-10px)' }),
            style({ offset: 0.54, opacity: 1, transform: 'translateY(10px)' }),
            style({ offset: 0.58, opacity: 1, transform: 'translateY(-10px)' }),
            style({ offset: 0.6, opacity: 1, transform: 'translateY(10px)' }),
            style({ offset: 1, opacity: 1, transform: 'translateY(0)' }),
          ]),
        ),
      ]),
    ]),
  ],
})
export class CadastroComponent implements OnInit {
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public erro: string = undefined;

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    nome_completo: new FormControl(null, [Validators.required]),
    nome_usuario: new FormControl(null, [Validators.required]),
    senha: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  constructor(private autenticacao: AutenticacaoService) {}

  ngOnInit(): void {}

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    if (this.formulario.invalid) {
      this.formulario.get('email').markAsTouched();
      this.formulario.get('nome_completo').markAsTouched();
      this.formulario.get('nome_usuario').markAsTouched();
      this.formulario.get('senha').markAsTouched();
      this.erro = 'Todos os campos devem ser preenchidos';
    } else {
      const usuario: Usuario = new Usuario(
        this.formulario.value.email,
        this.formulario.value.nome_completo,
        this.formulario.value.nome_usuario,
        this.formulario.value.senha,
      );

      this.autenticacao
        .cadastrarUsuario(usuario)
        .then(() => {
          this.erro = undefined;
        })
        .catch((error: Error) => {
          this.formulario.reset();
          this.erro = error.message;
        });
    }
  }
}
