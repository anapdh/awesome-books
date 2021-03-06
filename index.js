const { DateTime } = luxon; // eslint-disable-line
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
    this.myBooks.splice(index, 1);
    localStorage.myBooks = JSON.stringify(this.myBooks);
  }
}

if (localStorage.myBooks !== undefined) {
  Book.myBooks = JSON.parse(localStorage.myBooks);
}

const getBooks = () => {
  const list = document.getElementById('books-list');
  for (let i = 0; i < Book.myBooks.length; i += 1) {
    const row = document.createElement('tr');
    if (i % 2 === 0) {
      row.setAttribute('class', 'color-gray');
    }
    const td1 = document.createElement('td');
    td1.setAttribute('class', 'td1');
    td1.innerHTML = `<strong>"${Book.myBooks[i].title}"</strong> by ${Book.myBooks[i].author}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Remove';
    deleteBtn.setAttribute('id', i);
    row.appendChild(td1);
    row.appendChild(deleteBtn);
    list.appendChild(row);

    deleteBtn.addEventListener('click', () => {
      Book.deleteBook(i);
      deleteBtn.parentElement.remove();
    });
  }
};

const isUnique = (t, a) => {
  for (let i = 0; i < Book.myBooks.length; i += 1) {
    if (t === Book.myBooks[i].title && a === Book.myBooks[i].author) {
      return false;
    }
  }
  return true;
};

const list = document.getElementById('books-table');
const addForm = document.getElementById('form-wrapper');
const contact = document.getElementById('contact-info');
const currentTime = document.querySelector('.current-time');
const dt = DateTime.now();

currentTime.textContent = dt.toLocaleString(DateTime.DATETIME_MED);

const displayList = () => {
  list.style.display = 'block';
  addForm.style.display = 'none';
  contact.style.display = 'none';
};

const displayForm = () => {
  list.style.display = 'none';
  addForm.style.display = 'block';
  contact.style.display = 'none';
};

const displayContact = () => {
  list.style.display = 'none';
  addForm.style.display = 'none';
  contact.style.display = 'block';
};

document.getElementById('list').addEventListener('click', () => displayList());
document.getElementById('add').addEventListener('click', () => displayForm());
document.getElementById('contact').addEventListener('click', () => displayContact());

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  if (isUnique(title.value, author.value)) {
    Book.addBook(title.value, author.value);
    title.value = '';
    author.value = '';
    const list = document.getElementById('books-list');
    const row = document.createElement('tr');
    if ((Book.myBooks.length - 1) % 2 === 0) {
      row.setAttribute('class', 'color-gray');
    }
    row.innerHTML += `
    <td><strong>"${Book.myBooks[Book.myBooks.length - 1].title}"</strong> by ${Book.myBooks[Book.myBooks.length - 1].author}</td>
    <button class="delete" onclick="Book.deleteBook(${Book.myBooks.length - 1})">Remove</button>
    `;
    const deleteBtn = row.getElementsByClassName('delete')[0];
    deleteBtn.addEventListener('click', () => {
      deleteBtn.parentElement.remove();
    });
    list.appendChild(row);
    displayList();
  }
});

document.addEventListener('DOMContentLoaded', getBooks());
