import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent implements OnInit {
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public erro: string = undefined;

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    senha: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  constructor(private autenticacao: AutenticacaoService) {}

  ngOnInit(): void {}

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {
    if (this.formulario.invalid) {
      this.formulario.get('email').markAsTouched();
      this.formulario.get('senha').markAsTouched();
      this.erro = 'Informe o usuário e senha para efetuar o logon';
    } else {
      this.autenticacao
        .autenticarUsuario(this.formulario.value.email, this.formulario.value.senha)
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
