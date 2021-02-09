// função livro (primeiro)
function Livros(_titulo, _autor, _numero) {
  this.titulo = _titulo;
  this.autor = _autor;
  this.numero = _numero;
}

// UI constructor (segundo)
function UI() {}

//função prototipo pega objeto livro como parametro (nono)
UI.prototype.adicionaLivros = function(livro) {
  const lista = document.querySelector('#lista-livros');
  
//criar um tr element
  const linha =  document.createElement('tr'); 
  linha.innerHTML = `
     <td>${livro.titulo}</td>
     <td>${livro.autor}</td>
     <td>${livro.numero}</td>
     <button class='deletar'>Remover</button>
  `;
  lista.appendChild(linha);
}
//limpar campos
UI.prototype.limparCampos = function() {
  const foc =  document.querySelector('#nome-do-livro');
  document.querySelector('#autoria').value = '';
  document.querySelector('#num-de-serie').value = '';
  foc.value = '';
  foc.focus();
}

UI.prototype.mostraErro = function(menssagem, className) {
  const div = document.createElement('div');
  div.className = `alerta ${className}`;
  div.appendChild(document.createTextNode(menssagem));
  const sec = document.querySelector('section');
  const field = document.querySelector('fieldset');
  sec.insertBefore(div, field);

  setTimeout(function() {
    document.querySelector('.alerta').remove();
  }, 5000);
}

UI.prototype.deletar = function(target) {
  if(target.className === 'deletar') {
    target.parentElement.remove();
  }
}


// event listeners adicionar livro (terceiro)

document.querySelector('form').addEventListener('submit', function (e) {
//pegando os valores inseridos no form (quarto) 
  const nomeLivro = document.querySelector('#nome-do-livro').value,
        autoria = document.querySelector('#autoria').value,
        numeroSerie = document.querySelector('#num-de-serie').value;

//instanciando o constructor (quinto)      
  const livro = new Livros(nomeLivro, autoria, numeroSerie);
//console.log(livro);//retorna um objeto livro (sexto)

//instanciando o UI (sétimo)
  const ui = new UI();

  //validar 
  if(nomeLivro === '' || autoria === '' || numeroSerie === '') {
    ui.mostraErro('Favor preencher os campos', 'erro');
  } else {
  //adicionar livro a lista (oitavo)
    ui.adicionaLivros(livro);

    ui.mostraErro('Livro adicionado com sucesso', 'sucesso');

  //lipmar campos
    ui.limparCampos(); 
  }

  console.log(ui);

  e.preventDefault()
});


// event listener deletar livro

document.querySelector('#lista-livros').addEventListener('click',
function(e) {
  const ui = new UI();
  ui.deletar(e.target);
  ui.mostraErro('Livro removido da sua lista', 'sucesso');
  

  e.preventDefault();
});