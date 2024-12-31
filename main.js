// Do your work here...

book = [];
const RENDER_EVENT = "render-todo";
console.log(book);

const generateId = () => {
  return +new Date();
};

const addBook = () => {
  const generateID = generateId();
  const bookFormTitle = document.getElementById("bookFormTitle").value;
  const bookFormAuthor = document.getElementById("bookFormAuthor").value;
  const bookFormYear = document.getElementById("bookFormYear").value;
  const bookFormIsComplete =
    document.getElementById("bookFormIsComplete").checked;

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

  const textTitle = document.createElement("h3");
  textTitle.setAttribute("data-testid", "bookItemTitle");
  textTitle.innerText = title;

  const textAuthor = document.createElement("p");
  textAuthor.setAttribute("data-testid", "bookItemAuthor");
  textAuthor.innerText = author;

  const textYear = document.createElement("p");
  textYear.setAttribute("data-testid", "bookItemYear");
  textYear.innerText = year;

  const isCompleteButton = document.createElement("button");
  isCompleteButton.setAttribute("data-testid", "bookItemIsCompleteButton");

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("data-testid", "bookIteDeleteButton");
  deleteButton.innerText = "Hapus buku";

  const editButton = document.createElement("button");
  editButton.setAttribute("data-testid", "bookItemEditButton");
  editButton.innerText = "Edit buku";

  const buttonContainer = document.createElement("div");
  buttonContainer.append(isCompleteButton, deleteButton, editButton);

  const container = document.createElement("div");
  container.setAttribute("data-bookid", id);
  container.setAttribute("data-testid", "bookItem");
  container.append(textTitle, textAuthor, textYear, buttonContainer);

  console.log(container);

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
    editBook(id);
  });

  return container;
};

const findBook = (bookId) => {
  return book.find((bookItem) => bookItem.id === bookId) || null;
};

const isCompleteBook = (bookId) => {
  const findIdBook = findBook(bookId);
  if (findIdBook.id === bookId) {
    bookItem.isCompleted = true;
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const isNotCompleteBook = (bookId) => {
  const findIdBook = findBook(bookId);
  if (findIdBook.id === bookId) {
    bookItem.isCompleted = false;
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const deleteBook = (bookId) => {
  for (index in book) {
    if (bookItem.id === bookId) {
      book.splice(index, 1);
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const searchBookList = () => {
  const searchBookList = document.getElementById("searchBook");
  const searchBookInput = document.getElementById("searchBookTitle").value;

  searchBookList.innerText = "";

  console.log(`Input Search: ${searchBookInput}`)

  const searchResult = book.filter((bookItem) => {
     return bookItem.title.toLowerCase().includes(searchBookInput.toLowerCase());
  });

  if (searchResult.length > 0) {
    for (const result of searchResult) {
      const resultElement = makeBook(result);
      searchBookList.append(resultElement);
    }
  } else {
    const noResultMessage = document.createElement("p");
    noResultMessage.innerText = "Buku tidak ditemukan.";
    searchBookList.append(noResultMessage);
  }
};

const editBook = (bookId) => {
  const findIdBook = findBook(bookId);
  if (findIdBook.id === bookId) {
    return findIdBook;
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
};

document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("bookForm");
  const searchSubmit = document.getElementById("searchSubmit");

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
