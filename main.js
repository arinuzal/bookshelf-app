// Do your work here...

// let bookItem = document.getElementById("bookItem");

bookItem = [];
console.log(bookItem);
const generateId = () => {
  return +new Date();
};

const generateBookObject = (id, title, author, year, isComplete) => {
  {
    id, title, author, year, isComplete;
  }
};

const addBook = () => {
  const bookFormTitle = document.getElementById("bookFormTitle").value;
  const bookFormAuthor = document.getElementById("bookFormAuthor").value;
  const bookFormYear = document.getElementById("bookFormYear").value;

  const generateID = generateId();
  const bookObject = generateBookObject(
    generateID,
    bookFormTitle,
    bookFormAuthor,
    bookFormYear,
    false
  );
  bookItem.push(bookObject);
  console.log(bookFormTitle, bookFormAuthor, bookFormYear);
};

document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("bookForm");

  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
  });
});
