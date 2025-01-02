// Do your work here...

book = [];
const RENDER_EVENT = "render-todo";
const RENDER_EVENT_SEARCH = "renderSearch-todo";

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

  const bookObject = {
    id: generateID,
    title: bookFormTitle,
    author: bookFormAuthor,
    year: bookFormYear,
    isCompleted: bookFormIsComplete,
  };

  book.push(bookObject);
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

    const editTitleLabel = document.createElement("label");
    editTitleLabel.setAttribute("for", "bookFormTitle");
    editTitleLabel.innerText = "Judul";

    const editTextTitle = document.createElement("input");
    editTextTitle.id = "editBookFormTitle";
    editTextTitle.setAttribute("type", "text");
    editTextTitle.setAttribute("data-testid", "bookFormTitleInput");

    const editTitleContainer = document.createElement("div");
    editTitleContainer.append(editTitleLabel, editTextTitle);

    const editAuthorLabel = document.createElement("label");
    editAuthorLabel.setAttribute("for", "bookFormAuthor");
    editAuthorLabel.innerText = "Penulis";

    const editTextAuthor = document.createElement("input");
    editTextAuthor.id = "editBookFormAuthor";
    editTextAuthor.setAttribute("type", "text");
    editTextAuthor.setAttribute("data-testid", "bookFormAuthorInput");

    const editAuthorContainer = document.createElement("div");
    editAuthorContainer.append(editAuthorLabel, editTextAuthor);

    const editYearLabel = document.createElement("label");
    editYearLabel.setAttribute("for", "bookFormYear");
    editYearLabel.innerText = "Tahun";

    const editYear = document.createElement("input");
    editYear.id = "editBookFormYear";
    editYear.setAttribute("type", "number");
    editYear.setAttribute("data-testid", "bookFormYearInput");

    const editYearContainer = document.createElement("div");
    editYearContainer.append(editYearLabel, editYear);

    const editFormSubmitButton = document.createElement("button");
    editFormSubmitButton.id = "editBookFormSubmit";
    editFormSubmitButton.setAttribute("type", "submit");
    editFormSubmitButton.setAttribute("data-testid", "bookFormSubmitButton");
    editFormSubmitButton.innerText = "Selesai";

    const bookFormEdit = document.createElement("form");
    bookFormEdit.id = "editBookForm";
    bookFormEdit.setAttribute("data-testid", "bookForm");
    bookFormEdit.append(
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
    document.body.appendChild(bookFormEdit);
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
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const isNotCompleteBook = (bookId) => {
  const findIdBook = findBook(bookId);
  if (findIdBook.id === bookId) {
    findIdBook.isCompleted = false;
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const deleteBook = (bookId) => {
  const bookIndex = book.findIndex((bookItem) => bookItem.id === bookId);
  if (bookIndex !== -1) {
    book.splice(bookIndex, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
  }
};

const editBook = (bookId, editTitleQuery, editAuthorQuery, editYearQuery) => {
  const findIdBook = findBook(bookId);
  if (findIdBook.id === bookId) {
    findIdBook.title = editTitleQuery;
    findIdBook.author = editAuthorQuery;
    findIdBook.year = editYearQuery;
  }
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
  if (bookSearchMessage) {
    bookSearchMessage.innerHTML = "";
  }
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
