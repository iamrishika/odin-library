const myLibrary = [];

function Book(title, author, pages, read, uid) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uid = uid;
}

function addBookToLibrary() {
    let title = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;
    let uid = crypto.randomUUID();
    let newBook = new Book(title, author, pages, read, uid);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const display = document.querySelector('.display-books');
    display.textContent = '';
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let bookInfo = document.createElement('div');
        bookInfo.classList.add('books');

        const bookTitle = document.createElement('h4');
        bookTitle.textContent = `Title: ${book.title}`;

        const bookAuthor = document.createElement('h4');
        bookAuthor.textContent = `Author: ${book.author}`;
        
        const bookPages = document.createElement('h4');
        bookPages.textContent = `Pages: ${book.pages}`;

        const bookStatus = document.createElement('h4');
        bookStatus.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => removeBook(book.uid));

        const statusButton = document.createElement('button');
        statusButton.textContent = 'Read';
        statusButton.addEventListener('click', () => statusBook(book.uid));
        
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookPages);
        bookInfo.appendChild(bookStatus);
        bookInfo.appendChild(deleteButton);
        bookInfo.appendChild(statusButton);

        display.appendChild(bookInfo);
    }   
}

function removeBook(uid) {
    const index = myLibrary.findIndex(book => book.uid === uid);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

function statusBook(uid) {
    const book = myLibrary.find(book => book.uid === uid);
    if (book) {
        book.read = !book.read;
        displayBooks();
    }
}

let addBook = document.getElementById('book-form');
addBook.addEventListener('submit', function() {
    event.preventDefault();
    addBookToLibrary();
    console.log(myLibrary);
})

const dialog = document.querySelector('dialog');
const showButton = document.querySelector('.add-new-book');
const closeButton = document.querySelector('.close-buttton');

showButton.addEventListener('click', () => {
    dialog.showModal();
})

closeButton.addEventListener('click', () => {
    dialog.close();
})