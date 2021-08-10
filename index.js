function Book(title, author) {
  this.title = title;
  this.author = author;
}

let myBooks = [new Book('Harry Potter', 'J.K. Rowling'), new Book('Macbeth', 'William Shakespeare')];

if (localStorage.length > 0) {
  myBooks = JSON.parse(localStorage.myBooks);
}

function updateLocalStorage() {
  localStorage.myBooks = JSON.stringify(myBooks);
}

Book.prototype.addBook = function (ttl, auth) {
  const book = new Book(ttl, auth);
  myBooks.push(book);
  updateLocalStorage();
};

Book.prototype.getBooks = function () {
  const list = document.getElementById('books-list');
  for (let i = 0; i < myBooks.length; i += 1) {
    const row = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    td1.innerHTML = `${myBooks[i].title}`;
    td2.innerHTML = `${myBooks[i].author}`;
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
    myBooks.splice(index, 1);
  }
  updateLocalStorage();
};

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  Book.prototype.addBook(title, author);
  const list = document.getElementById('books-list');
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${myBooks[myBooks.length - 1].title}</td>
      <td>${myBooks[myBooks.length - 1].author}</td>
    `;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Remove';
  deleteBtn.setAttribute('id', myBooks.length - 1);
  row.appendChild(deleteBtn);
  deleteBtn.addEventListener('click', () => {
    Book.prototype.deleteBook(myBooks.length - 1);
    deleteBtn.parentElement.remove();
  });
  list.appendChild(row);
});

document.addEventListener('DOMContentLoaded', Book.prototype.getBooks());
