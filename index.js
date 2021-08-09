function Book(title, author) {
  this.title = title;
  this.author = author;
}

const books = [new Book("Harry Potter", "J.K. Rowling"), new Book("Macbeth", "William Shakespeare")];

Book.prototype.addBook = function (ttl, auth) {
  let book = new Book(ttl, auth);
  books.push(book);
};

// Book.prototype.removeBook = function (ttl) {

// }

Book.prototype.getBooks = function () {
  const list = document.getElementById('books-list');
  for (let i = 0; i < books.length; i++) {
    let row = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    td1.innerHTML = `${books[i].title}`;
    td2.innerHTML = `${books[i].author}`;
    let deleteBtn = document.createElement('button');
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
  Book.prototype.getBooks();
});

document.addEventListener('DOMContentLoaded', Book.prototype.getBooks());

// Book.prototype.deleteBook().addEventListener('click', (e) => {
// e.target;
// });
