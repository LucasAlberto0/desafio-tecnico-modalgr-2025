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
          }
        },
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

  formatarNome(): void {
    if (this.nome) {
      this.nome = this.nome
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
    }
  }
  calcularIdade(dataNascimento: string): number {
    const dataNascimentoSelecionada = new Date(dataNascimento);
    const dataAtual = new Date();

    let idade = dataAtual.getFullYear() - dataNascimentoSelecionada.getFullYear();
    const mesAtual = dataAtual.getMonth();
    const mesNascimento = dataNascimentoSelecionada.getMonth();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && dataAtual.getDate() < dataNascimentoSelecionada.getDate())) {
      idade--;
    }

    return idade;
  }
  cadastrar() {

    const dataNascimentoSelecionada = new Date(this.dataNascimento);
    const dataAtual = new Date();

    if (dataNascimentoSelecionada > dataAtual) {
      this.toastService.showToast('A data de nascimento não pode ser no futuro.');
      return;
    }

    if (dataNascimentoSelecionada.getFullYear() < 1900) {
      this.toastService.showToast('A data de nascimento não pode ser antes de 1900.');
      return;
    }

    let idade = dataAtual.getFullYear() - dataNascimentoSelecionada.getFullYear();
    const mesAtual = dataAtual.getMonth();
    const mesNascimento = dataNascimentoSelecionada.getMonth();

    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && dataAtual.getDate() < dataNascimentoSelecionada.getDate())) {
      idade--;
    }

    if (idade < 10) {
      this.toastService.showToast('A pessoa precisa ter pelo menos 10 anos.');
      return;
    }

    if (this.dados.length >= 3) {
      this.toastService.showToast('Limite de 3 cadastros atingido!');
      return;
    }

    if (!this.logradouro || !this.bairro || !this.cidade || !this.estado) {
      this.toastService.showToast('CEP não encontrado. Verifique o CEP ou tente outro.');
      return;
    }

    if (!this.nome || !this.cpf || !this.dataNascimento || !this.email || !this.cep || !this.logradouro || !this.bairro || !this.cidade || !this.estado) {
      this.toastService.showToast('Todos os campos são obrigatórios.');
      return;
    }

    const cpfValido = this.cpf.replace(/\D/g, '').length === 11;
    if (!cpfValido) {
      this.toastService.showToast('CPF inválido. Certifique-se de inserir 11 dígitos.');
      return;
    }

    const emailValido = this.email.length <= 200 && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email);
    if (!emailValido) {
      this.toastService.showToast('E-mail inválido ou maior que 200 caracteres.');
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