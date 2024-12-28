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
  const bookFormIsComplete = document.getElementById("bookFormIsComplete").checked;

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
  isCompleteButton.innerText = "Selesai dibaca";

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
  
  if(isCompleted === false) {
      deleteButton.addEventListener('click', (event) => {
      event.preventDefault()
      isCompleteBook(isCompleted)
    })
  } else {
     console.log("False")
  }

  return container;
};

 const isCompleteBook = (isCompleted) => {
   isCompleted = true
   document.dispatchEvent(new Event(RENDER_EVENT))
 }

 const deleteBook = () => {

 }

 const editBook = () => {

 }

// const findBook = (bookId) => {
//   return book.find((bookItem) => bookItem.id === bookId) || null;
// };

document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("bookForm");

  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
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
