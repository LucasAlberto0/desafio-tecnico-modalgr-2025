# Desafio Técnico Modal GR 2025

Teste técnico para seguir na candidatura da trilha de desenvolvimento Front-End na Modal GR no 1º semestre de 2025.

![image](https://github.com/user-attachments/assets/7a34f53b-608a-4ade-94dd-16bd6c02f844)


## Tecnologias utilizadas:
- Angular
- Typescript
- Sass
- TailwindCSS

## Deploy do projeto:
https://desafiomodalgr25.vercel.app/

## Comandos para rodar o projeto na sua máquina:
(Certifique-se que o node, angular e git estejam instalados na sua máquina!)


## 1º
```bash
npm i
```

## 2º 

```bash
ng s -o
```

## Critérios de aceite do teste técnico:

A equipe de RH da ModalGR solicitou o desenvolvimento de um sistema de cadastro de pessoas utilizando
TypeScript/JavaScript, sendo preferencialmente desenvolvido em Angular. o sistema deverá conter os seguintes
campos e validações. O sistema deve estar devidamente estilizado e realizar uma integração com a API
ViaCEP para preenchimento automático do endereço com base no CEP informado. Campos do
formulário e validações

1. **Nome**
- Deve conter até 150 caracteres, permitindo apenas letras (incluindo espaços e caracteres
acentuados, se aplicável).
- Campo obrigatório.
3. **CPF**
- Deve ser um CPF com 11 dígitos numéricos e ser formatado automaticamente para 000.000.000-00.
- Deve ser validado para garantir que o CPF é valido.
- Campo obrigatório.
5. **Data de nascimento**
- Deve ser uma data válida.
- Campo obrigatório.
7. **E-mail**
- Deve conter até 200 caracteres.
- Deve seguir o formato padrão de e-mail (exemplo: nome@dominio.com).
- Campo obrigatório.
9. **CEP**
- Deve conter 8 dígitos numéricos e ser formatado automaticamente para 00000-000. o Deve ser
validado para garantir que o CEP existe. o Campo obrigatório.
- Integração com a API ViaCEP:
- Após a inserção do CEP, o sistema deve consultar a API ViaCEP para preencher os campos de
logradouro, bairro, cidade e estado.


## Funcionamento
- Ao clicar no botão Cadastrar, o sistema deve:
1. Validar os campos preenchidos.
2. Consultar a API ViaCEP para obter o endereço correspondente ao CEP informado.
3. Exibir os dados cadastrados em uma tabela contendo:
- Nome
- E-mail
- Idade (calculada com base na data de nascimento e o momento atual)
- CPF ▪ CEP
- Logradouro
- Bairro
- Cidade
- Estado

O sistema deve ser estilizado e garantir uma experiência amigável ao usuário.
