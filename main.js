// Do your work here...

// let bookItem = document.getElementById("bookItem");

book = [];
console.log(book);

const generateId = () => {
  return +new Date();
};

// const generateBookObject = (id, title, author, year, isComplete) => {
//   return {
//     id, title, author, year, isComplete
//   }
// };

const addBook = () => {
  const bookFormTitle = document.getElementById("bookFormTitle").value;
  const bookFormAuthor = document.getElementById("bookFormAuthor").value;
  const bookFormYear = document.getElementById("bookFormYear").value;

  const generateID = generateId();
  // const bookObject = generateBookObject(
  //   generateID,
  //   bookFormTitle,
  //   bookFormAuthor,
  //   bookFormYear,
  //   false
  // );
  const bookObject = {
    id: generateID,
    title: bookFormTitle,
    author: bookFormAuthor,
    year: bookFormYear,
    isComplete: false
  }

  bookItem.push(bookObject);
  document.dispatchEvent(new Event(RENDER_EVENT))
  console.log(bookObject);
};

const makeBook = (bookObject) => {
  const {id, title,author, year, isComplete} = bookObject
  const bookItemTitle = document.getElementById("bookItemTitle")
  bookItemTitle.innerText = title
  console.log(title)
}

document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("bookForm");

  submitForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addBook();
  });
});

document.addEventListener("RENDER_EVENT", () => {
   for (bookItem of book) {
    const bookElement = makeBook(bookItem);
    console.log(bookItem)
   }
})
