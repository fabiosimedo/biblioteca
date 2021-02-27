function Livros(_titulo, _autor, _numero) {
  this.titulo = _titulo;
  this.autor = _autor;
  this.numero = _numero;
}

function UI() {}
const ui = new UI();

document.querySelector('form').addEventListener('submit', function (e) {
  const nomeLivro = document.querySelector('#nome-do-livro').value,
        autoria = document.querySelector('#autoria').value,
        numeroSerie = document.querySelector('#num-de-serie').value;

  const livro = new Livros(nomeLivro, autoria, numeroSerie);


  if(nomeLivro === '' || autoria === '' || numeroSerie === '') {
    ui.mostraErro('Favor preencher os campos', 'erro');
  } else {
    ui.adicionaLivros(livro);    
    ui.addBooks(livro);    

    ui.mostraErro('Livro adicionado com sucesso', 'sucesso');

    ui.limparCampos(); 
  }

  e.preventDefault()
});


document.querySelector('#lista-livros').addEventListener('click',
function(e) {
  const ui = new UI();
  
  if(e.target.className === 'deletar') {
    ui.deletar(e.target);
    ui.mostraErro('Livro removido da sua lista', 'sucesso');
    ui.removerBook()
  }

  e.preventDefault();
});

UI.prototype.adicionaLivros = function(livro) {
  const lista = document.querySelector('#lista-livros');
  
  const linha =  document.createElement('tr'); 
  linha.innerHTML = `
     <td>${livro.titulo}</td>
     <td>${livro.autor}</td>
     <td>${livro.numero}</td>
     <button class='deletar'>Remover</button>
  `;
  lista.appendChild(linha);
}

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

  setTimeout(() => {
    document.querySelector('.alerta').remove();
  }, 5000);
}

UI.prototype.deletar = function(target) {
  if(target.className === 'deletar') target.parentElement.remove();
  if(target.className === 'deletar') {
    ui.removerBook(target.previousElementSibling.textContent);
  }
}

UI.prototype.getLs = function() {
  let books;
  if(localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
    return books;
}

UI.prototype.displayBooks = function() {
  const books = ui.getLs();
  books.forEach(book => {
    const ui = new UI;
    ui.adicionaLivros(book);
  });
}

UI.prototype.addBooks = function(book) {
  const books = ui.getLs();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

UI.prototype.removerBook = function(numero) {
  const books = ui.getLs();

  books.forEach((book, index) => {
    if(book.numero === numero) {
      books.splice(index, 1)
    }
  });

  localStorage.setItem('books', JSON.stringify(books));
}


document.addEventListener('DOMContentLoaded', ui.displayBooks());
