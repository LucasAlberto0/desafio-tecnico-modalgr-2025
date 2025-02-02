import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../service/toast/toast.service';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, FormsModule, HttpClientModule, ToastComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  nome: string = '';
  cpf: string = '';
  dataNascimento: string = '';
  email: string = '';
  cep: string = '';
  logradouro: string = '';
  bairro: string = '';
  cidade: string = '';
  estado: string = '';
  dados: Array<{ nome: string, cpf: string, dataNascimento: string, email: string, cep: string, logradouro: string, bairro: string, cidade: string, estado: string }> = [];

  constructor(private http: HttpClient, private toastService: ToastService) { }

  consultarCEP() {
    if (this.cep && this.cep.length === 9) {
      const url = `https://viacep.com.br/ws/${this.cep.replace("-", "")}/json/`;

      this.http.get<any>(url).subscribe(
        (response) => {
          if (response && !response.erro) {
            this.logradouro = response.logradouro || '';
            this.bairro = response.bairro || '';
            this.cidade = response.localidade || '';
            this.estado = response.uf || '';
          } else {
            this.toastService.showToast('CEP não encontrado.');
          }
        },
        (error) => {
          this.toastService.showToast('Erro ao consultar CEP.');
        }
      );
    }
  }
  formatarCPF(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');

    if (valor.length <= 3) {
      this.cpf = valor;
    } else if (valor.length <= 6) {
      this.cpf = valor.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (valor.length <= 9) {
      this.cpf = valor.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else {
      this.cpf = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
  }

  formatarCEP(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');

    if (valor.length <= 5) {
      this.cep = valor;
    } else {
      this.cep = valor.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    input.value = this.cep;
  }

  somenteNumeros(event: KeyboardEvent): void {
    const tecla = event.key;
    const codigoTecla = event.keyCode;
    if (!/\d/.test(tecla) && ![8, 46].includes(codigoTecla)) {
      event.preventDefault();
    }
  }

  cadastrar() {
    if (!this.nome || !this.cpf || !this.dataNascimento || !this.email || !this.cep || !this.logradouro || !this.bairro || !this.cidade || !this.estado) {
      this.toastService.showToast('Todos os campos são obrigatórios.');
      return;
    }
    const novoCadastro = {
      nome: this.nome,
      cpf: this.cpf,
      dataNascimento: this.dataNascimento,
      email: this.email,
      cep: this.cep,
      logradouro: this.logradouro,
      bairro: this.bairro,
      cidade: this.cidade,
      estado: this.estado,
    };

    this.dados.push(novoCadastro);
    this.nome = '';
    this.cpf = '';
    this.dataNascimento = '';
    this.email = '';
    this.cep = '';
    this.logradouro = '';
    this.bairro = '';
    this.cidade = '';
    this.estado = '';
  }

  deletar(index: number) {
    this.dados.splice(index, 1);
  }
}