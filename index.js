function Book(title, author) {
  this.title = title;
  this.author = author;
}

const books = [new Book('Harry Potter', 'J.K. Rowling'), new Book('Macbeth', 'William Shakespeare')];

Book.prototype.addBook = function (ttl, auth) {
  const book = new Book(ttl, auth);
  books.push(book);
};

Book.prototype.getBooks = function () {
  const list = document.getElementById('books-list');
  for (let i = 0; i < books.length; i += 1) {
    const row = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    td1.innerHTML = `${books[i].title}`;
    td2.innerHTML = `${books[i].author}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Remove';
    deleteBtn.setAttribute('id', i);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(deleteBtn);
    list.appendChild(row);

    deleteBtn.addEventListener('click', () => {
      Book.prototype.deleteBook(i);
      deleteBtn.parentElement.remove();
    });
  }
};

Book.prototype.deleteBook = function (index) {
  if (index > -1) {
    books.splice(index, 1);
  }
  console.log(books);
};

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  Book.prototype.addBook(title, author);
  const list = document.getElementById('books-list');
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${books[books.length - 1].title}</td>
      <td>${books[books.length - 1].author}</td>
    `;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Remove';
  deleteBtn.setAttribute('id', books.length - 1);
  row.appendChild(deleteBtn);
  deleteBtn.addEventListener('click', () => {
    Book.prototype.deleteBook(books.length - 1);
    deleteBtn.parentElement.remove();
  });
  list.appendChild(row);
});

document.addEventListener('DOMContentLoaded', Book.prototype.getBooks());
