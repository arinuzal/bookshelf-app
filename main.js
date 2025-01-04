book = [];
const RENDER_EVENT = "render-book";
const SAVED_BOOK_EVENT = "saved-book";
const STORAGE_KEY = "BOOK_APPS";

const generateId = () => {
  return +new Date();
};

const addBook = () => {
  const generateID = generateId();
  const bookFormTitleInput = document.getElementById("bookFormTitle");
  const bookFormAuthorInput = document.getElementById("bookFormAuthor");
  const bookFormYearInput = document.getElementById("bookFormYear");
  const bookFormIsCompleteInput = document.getElementById("bookFormIsComplete");

  const bookFormTitle = bookFormTitleInput.value;
  const bookFormAuthor = bookFormAuthorInput.value;
  const bookFormYear = bookFormYearInput.value;
  const bookFormIsComplete = bookFormIsCompleteInput.checked;

  bookFormTitleInput.value = "";
  bookFormAuthorInput.value = "";
  bookFormYearInput.value = "";
  bookFormIsCompleteInput.checked = false;

  if (bookFormTitle.length <= 1 || bookFormAuthor.length <= 1 || bookFormYear.length <= 1) {
      alert("Harap mengisi dengan benar!!!")
      return
  }

  const bookObject = {
    id: generateID,
    title: bookFormTitle,
    author: bookFormAuthor,
    year: bookFormYear,
    isCompleted: bookFormIsComplete,
  };

  book.push(bookObject);
  saveBook();
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const makeBook = (bookObject) => {
  const { id, title, author, year, isCompleted } = bookObject;

  const bookTitle = document.createElement("h3");
  bookTitle.setAttribute("data-testid", "bookItemTitle");
  bookTitle.innerText = title;

  const bookAuthor = document.createElement("p");
  bookAuthor.setAttribute("data-testid", "bookItemAuthor");
  bookAuthor.innerText = author;

  const bookYear = document.createElement("p");
  bookYear.setAttribute("data-testid", "bookItemYear");
  bookYear.innerText = year;

  const isCompleteButton = document.createElement("button");
  isCompleteButton.setAttribute("data-testid", "bookItemIsCompleteButton");

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
  deleteButton.innerText = "Hapus buku";

  const editButton = document.createElement("button");
  editButton.setAttribute("data-testid", "bookItemEditButton");
  editButton.innerText = "Edit buku";

  const buttonContainer = document.createElement("div");
  buttonContainer.append(isCompleteButton, deleteButton, editButton);

  const container = document.createElement("div");
  container.setAttribute("data-bookid", id);
  container.setAttribute("data-testid", "bookItem");
  container.append(bookTitle, bookAuthor, bookYear, buttonContainer);

  if (isCompleted === false) {
    isCompleteButton.innerText = "Selesai dibaca";
    isCompleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      isCompleteBook(id);
    });
  } else {
    isCompleteButton.innerText = "Belum selesai dibaca";
    isCompleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      isNotCompleteBook(id);
    });
  }

  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    deleteBook(id);
  });

  editButton.addEventListener("click", (event) => {
    event.preventDefault();

    const editBook = document.createElement("h2")
    editBook.innerText = "Edit Buku"

    const editTitleLabel = document.createElement("label");
    editTitleLabel.setAttribute("for", "editBookFormTitle");
    editTitleLabel.innerText = "Judul";

    const editTextTitle = document.createElement("input");
    editTextTitle.id = "editBookFormTitle";
    editTextTitle.setAttribute("type", "text");
    editTextTitle.setAttribute("required", "");
    editTextTitle.setAttribute("data-testid", "editBookFormTitleInput");

    const editTitleContainer = document.createElement("div");
    editTitleContainer.append(editTitleLabel, editTextTitle);

    const editAuthorLabel = document.createElement("label");
    editAuthorLabel.setAttribute("for", "editBookFormAuthor");
    editAuthorLabel.innerText = "Penulis";

    const editTextAuthor = document.createElement("input");
    editTextAuthor.id = "editBookFormAuthor";
    editTextAuthor.setAttribute("type", "text");
    editTextAuthor.setAttribute("required", "");
    editTextAuthor.setAttribute("data-testid", "editBookFormAuthorInput");

    const editAuthorContainer = document.createElement("div");
    editAuthorContainer.append(editAuthorLabel, editTextAuthor);

    const editYearLabel = document.createElement("label");
    editYearLabel.setAttribute("for", "editBookFormYear");
    editYearLabel.innerText = "Tahun";

    const editYear = document.createElement("input");
    editYear.id = "editBookFormYear";
    editYear.setAttribute("type", "number");
    editYear.setAttribute("required", "");
    editYear.setAttribute("data-testid", "editBookFormYearInput");

    const editYearContainer = document.createElement("div");
    editYearContainer.append(editYearLabel, editYear);

    const editFormSubmitButton = document.createElement("button");
    editFormSubmitButton.id = "editBookFormSubmit";
    editFormSubmitButton.setAttribute("type", "submit");
    editFormSubmitButton.setAttribute(
      "data-testid",
      "editBookFormSubmitButton"
    );
    editFormSubmitButton.innerText = "Selesai";

    const bookFormEdit = document.createElement("form");
    bookFormEdit.id = "editBookForm";
    bookFormEdit.setAttribute("data-testid", "bookForm");
    bookFormEdit.append(
      editBook,
      editTitleContainer,
      editAuthorContainer,
      editYearContainer,
      editFormSubmitButton
    );

    editFormSubmitButton.addEventListener("click", (event) => {
      bookFormEdit.innerHTML = "";

      event.preventDefault();
      editTitleQuery = editTextTitle.value;
      editAuthorQuery = editTextAuthor.value;
      editYearQuery = editYear.value;
      editBook(id, editTitleQuery, editAuthorQuery, editYearQuery);
    });
    const mainElement = document.querySelector("main");
    mainElement.appendChild(bookFormEdit);
  });

  return container;
};

const findBook = (bookId) => {
  return book.find((bookItem) => bookItem.id === bookId) || null;
};

const isCompleteBook = (bookId) => {
  const findIdBook = findBook(bookId);
  if (findIdBook.id === bookId) {
    findIdBook.isCompleted = true;
  }
  saveBook();
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const isNotCompleteBook = (bookId) => {
  const findIdBook = findBook(bookId);
  if (findIdBook.id === bookId) {
    findIdBook.isCompleted = false;
  }
  saveBook();
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const deleteBook = (bookId) => {
  const existingEditForm = document.getElementById("editBookForm");
  if (existingEditForm) {
    existingEditForm.remove();
  }  

  const bookIndex = book.findIndex((bookItem) => bookItem.id === bookId);
  if (bookIndex !== -1) {
    book.splice(bookIndex, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
  saveBook();
};

const editBook = (bookId, editTitleQuery, editAuthorQuery, editYearQuery) => {
  const findIdBook = findBook(bookId);
  if (findIdBook.id === bookId) {
    findIdBook.title = editTitleQuery;
    findIdBook.author = editAuthorQuery;
    findIdBook.year = editYearQuery;
  }
  saveBook();
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const searchBookList = () => {
  const searchBookList = document.getElementById("searchBook");
  const searchBookInput = document.getElementById("searchBookTitle");
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");
  const searchQuery = searchBookInput.value;

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";
  searchBookInput.value = "";

  const existingMessage = document.getElementById("bookSearchMessage");
  if (existingMessage) {
    existingMessage.remove();
  }

  const searchBook = book.filter((bookItem) => {
    return bookItem.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (searchBook.length > 0) {
    for (const bookItem of searchBook) {
      const bookElement = makeBook(bookItem);
      if (bookItem.isCompleted) {
        completeBookList.append(bookElement);
      } else {
        incompleteBookList.append(bookElement);
      }
    }
  } else {
    const noResultMessage = document.createElement("p");
    noResultMessage.id = "bookSearchMessage";
    noResultMessage.innerText = "Buku tidak ditemukan.";
    searchBookList.append(noResultMessage);
  }
};

const isStorageExist = () => {
  if (typeof Storage === undefined) {
    alert("Browser anda tidak mendukung local storage");
    return false;
  }
  return true;
};

const saveBook = () => {
  if (isStorageExist()) {
    const dataParsed = JSON.stringify(book);
    localStorage.setItem(STORAGE_KEY, dataParsed);
    document.dispatchEvent(new Event(SAVED_BOOK_EVENT));
  }
};

const loadDataFromStorage = () => {
  const getBook = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(getBook);

  if (data !== null) {
    for (bookData of data) {
      book.push(bookData);
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
};

document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("bookForm");
  const searchSubmit = document.getElementById("searchSubmit");
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();

    addBook();
  });

  searchSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    searchBookList();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVED_BOOK_EVENT, () => {
  console.log(localStorage.getItem(STORAGE_KEY));
});

document.addEventListener(RENDER_EVENT, () => {
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  for (bookItem of book) {
    const bookElement = makeBook(bookItem);
    if (bookItem.isCompleted) {
      completeBookList.append(bookElement);
    } else {
      incompleteBookList.append(bookElement);
    }
  }
});
