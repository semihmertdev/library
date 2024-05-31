const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);

Book.prototype.toggleReadStatus = function() {
  this.isRead = !this.isRead;
};

function capitalize(str) {
  return str.replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function displayBooks() {
  const bookContainer = document.querySelector('#book-container');
  bookContainer.innerHTML = "";

  myLibrary.forEach(function(book, index) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");

    if (book.isRead) {
      bookDiv.style.backgroundColor = '#DFF0D8';
    } else {
      bookDiv.style.backgroundColor = '';
    }

    const bookHTML = `<h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.isRead ? "Yes" : "No"}</p>
      <div class="button-container">
        <button class="remove-book" data-index="${index}">Remove</button>
        <button class="toggle-read" data-index="${index}">Read</button>
      </div>`;

    bookDiv.innerHTML = bookHTML;
    bookContainer.appendChild(bookDiv);
  });

  const removeButtons = document.querySelectorAll('.remove-book');
  removeButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      const index = event.target.getAttribute('data-index');
      showRemoveDialog(index);
    });
  });

  const toggleReadButtons = document.querySelectorAll('.toggle-read');
  toggleReadButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      const index = event.target.getAttribute('data-index');
      myLibrary[index].toggleReadStatus();
      displayBooks();
    });
  });
}

function showDialog() {
  document.querySelector('#dialog').style.display = 'block';
}

function closeDialog() {
  document.querySelector('#dialog').style.display = 'none';
}

document.querySelector('.close').onclick = closeDialog;

document.querySelector('#closeRemoveDialog').addEventListener('click', function() {
  document.querySelector('#removeDialog').style.display = 'none';
});

window.onclick = function(event) {
  if (event.target === document.querySelector('#dialog')) {
    closeDialog();
  }
}

function showSuccessDialog() {
  document.querySelector('#successDialog').style.display = 'block';
}

function closeSuccessDialog() {
  document.querySelector('#successDialog').style.display = 'none';
}

document.querySelector('#closeSuccessButton').addEventListener('click', closeSuccessDialog);

document.querySelector('#closeSuccessDialog').addEventListener('click', closeSuccessDialog);

document.querySelector('#bookForm').onsubmit = function(event) {
  event.preventDefault();
  
  const title = capitalize(document.querySelector('#title').value.trim());
  const author = capitalize(document.querySelector('#author').value.trim());
  let pages = parseInt(document.querySelector('#pages').value);
  const isRead = document.querySelector('#isRead').checked;

  if (title && author && !isNaN(pages) && pages >= 1) {
    addBookToLibrary(title, author, pages, isRead);
    displayBooks();
    closeDialog();
    showSuccessDialog();
    document.querySelector('#bookForm').reset();
  } else {
    alert('Please fill in all fields correctly.');
  }
}

document.querySelector('#addButton').onclick = showDialog;

function showRemoveDialog(index) {
  const removeDialog = document.querySelector('#removeDialog');
  removeDialog.style.display = 'block';

  document.querySelector('#confirmRemoveButton').onclick = function() {
    removeBookFromLibrary(index);
    displayBooks();
    removeDialog.style.display = 'none';
  };

  document.querySelector('#cancelRemoveButton').onclick = function() {
    removeDialog.style.display = 'none';
  };
}

window.onload = displayBooks;
