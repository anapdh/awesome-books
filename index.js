function Book(title, author){
  this.title = title;
  this.author = author;
}

const books = [new Book("Harry Potter", "J.K. Rowling"), new Book("Macbeth", "William Shakespeare")];

Book.prototype.addBook = function(ttl, auth){
  let book = new Book(ttl, auth);
  books.push(book);
};

Book.prototype.removeBook = function (ttl){
  
}

Book.prototype.getBooks = function(){
  const list = document.getElementById('books-list');
  for(let i=0; i<books.length; i++){
    let row = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    td1.innerHTML = books[i].title;
    td2.innerHTML = books[i].author;
    row.appendChild(td1);
    row.appendChild(td2);
    list.appendChild(row);
  }
  document.body.table
}

document.addEventListener('DOMContentLoaded', Book.prototype.getBooks())
