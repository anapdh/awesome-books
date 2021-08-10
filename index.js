class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static myBooks = [new Book('Harry Potter', 'J.K. Rowling'), new Book('Macbeth', 'William Shakespeare')];

  static addBook(ttl, auth) {
    const book = new Book(ttl, auth);
    this.myBooks.push(book);
    localStorage.myBooks = JSON.stringify(this.myBooks);
  }

  static deleteBook(index) {
    if (index > -1) {
      this.myBooks.splice(index, 1);
    }
    localStorage.myBooks = JSON.stringify(this.myBooks);
  }
}

if (localStorage.length > 0) {
  Book.myBooks = JSON.parse(localStorage.myBooks);
}

const getBooks = () => {
  const list = document.getElementById('books-list');
  for (let i = 0; i < Book.myBooks.length; i += 1) {
    const row = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    td1.innerHTML = `${Book.myBooks[i].title}`;
    td2.innerHTML = `${Book.myBooks[i].author}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Remove';
    deleteBtn.setAttribute('id', i);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(deleteBtn);
    list.appendChild(row);

    deleteBtn.addEventListener('click', () => {
      Book.deleteBook(i);
      deleteBtn.parentElement.remove();
    });
  }
};

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  Book.addBook(title, author);
  const list = document.getElementById('books-list');
  const row = document.createElement('tr');
  row.innerHTML = `
      <td>${Book.myBooks[Book.myBooks.length - 1].title}</td>
      <td>${Book.myBooks[Book.myBooks.length - 1].author}</td>
    `;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Remove';
  deleteBtn.setAttribute('id', Book.myBooks.length - 1);
  row.appendChild(deleteBtn);
  deleteBtn.addEventListener('click', () => {
    let bookId = parseInt(deleteBtn.getAttribute('id'));
    Book.deleteBook(bookId);
    deleteBtn.parentElement.remove();
  });
  list.appendChild(row);
});

document.addEventListener('DOMContentLoaded', getBooks());
