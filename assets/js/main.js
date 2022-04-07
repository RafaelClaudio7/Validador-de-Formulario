class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector(".form");

    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener(
      "submit",
      function (e) {
        this.handleSubmit(e);
      }.bind(this)
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if (camposValidos && senhasValidas) {
      alert("Formulário enviado");
      this.formulario.submit();
    }
  }

  camposSaoValidos() {
    let valid = true;

    for (let errorTxt of this.formulario.querySelectorAll(".error-text")) {
      errorTxt.remove();
    }

    for (let campo of this.formulario.querySelectorAll(".validar")) {
      const label = campo.previousElementSibling.innerText;
      if (!campo.value) {
        this.criaErro(campo, `Campo ${label} não pode estar em branco`);
        valid = false;
      }

      if (campo.classList.contains("cpf")) {
        if (!this.validaCpf(campo)) valid = false;
      }

      if (campo.classList.contains("usuario")) {
        if (!this.validaUsuario(campo)) valid = false;
      }
    }

    return valid;
  }

  senhasSaoValidas() {
    let valid = true;

    const senha = this.formulario.querySelector(".senha");
    const repetirSenha = this.formulario.querySelector(".repetirsenha");

    if (senha.value !== repetirSenha.value) {
      valid = false;
      this.criaErro(senha, "Campos Senha e Repetir Senha devem ser iguais");
      this.criaErro(
        repetirSenha,
        "Campos Senha e Repetir Senha devem ser iguais"
      );
    }

    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, "A senha deve conter entre 6 e 12 caracteres");
    }

    return valid;
  }
  senhasSaoValidas() {
    let valid = true;

    const senha = this.formulario.querySelector(".senha");
    const repetirSenha = this.formulario.querySelector(".repetirsenha");

    if (senha.value !== repetirSenha.value) {
      valid = false;
      this.criaErro(senha, "Campos Senha e Repetir Senha devem ser iguais");
      this.criaErro(
        repetirSenha,
        "Campos Senha e Repetir Senha devem ser iguais"
      );
    }

    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, "A senha deve conter entre 6 e 12 caracteres");
    }

    return valid;
  }

  validaUsuario(campo) {
    let valid = true;

    if (campo.value.length < 3 || campo.value.length > 12) {
      this.criaErro(campo, `O tamanho do usuário não é permito`);
      valid = false;
    }

    if (!campo.value.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, "Usuário deve conter apenas letras e números");
    }

    return valid;
  }

  validaCpf(campo) {
    const cpf = new ValidaCPF(campo.value);

    if (!cpf.valida()) {
      this.criaErro(campo, `CPF inválido`);
      return false;
    }

    return true;
  }

  criaErro(campo, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");
    campo.insertAdjacentElement("afterend", div);
  }
}

const valida = new ValidaFormulario();
