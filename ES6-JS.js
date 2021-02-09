class Livros{
  constructor(_titulo, _autor, _numSerie) {
    this.titulo = _titulo;
    this.autor = _autor;
    this.numSerie = _numSerie;
  }
}

class UI {
  adicionaLivros(livro) {
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

  mostraErro(menssagem, className) {
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

  deletaLivro(target) {
    if(target.className === 'deletar') {
      target.parentElement.remove();
      Store.removerBook(target.target.textContent);
    }
  }

  limparCampos() {
    const foc =  document.querySelector('#nome-do-livro');
    document.querySelector('#autoria').value = '';
    document.querySelector('#num-de-serie').value = '';
    foc.value = '';
    foc.focus();
  }

}

//local storage class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => {
      const ui = new UI;
      ui.adicionaLivros(book);
    });
  }

  static addBooks(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removerBook(numero) {
    console.log(numero);
  }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);




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

      // adiciona ao local storage
      Store.addBooks(livro);
  
      ui.mostraErro('Livro adicionado com sucesso', 'sucesso');
  
    //lipmar campos
      ui.limparCampos(); 
    }

    document.querySelector('.deletar').addEventListener('click',
    function(e) {
    const ui = new UI();
    ui.deletaLivro(e.target.parentElement);
    ui.mostraErro('Livro removido da sua lista', 'sucesso');
    
    //remover do local storage
  });

  
  console.log(ui);
  
  e.preventDefault()
});
  
  