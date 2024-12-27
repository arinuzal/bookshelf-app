// Do your work here...

book = [];
const RENDER_EVENT = 'render-todo';
console.log(book);

const generateId = () => {
  return +new Date();
};

const addBook = () => {
  const generateID = generateId();
  const bookFormTitle = document.getElementById("bookFormTitle").value;
  const bookFormAuthor = document.getElementById("bookFormAuthor").value;
  const bookFormYear = document.getElementById("bookFormYear").value;
  const bookFormIsComplete = document.getElementById('bookFormIsComplete').checked;

  const bookObject = {
    id: generateID,
    title: bookFormTitle,
    author: bookFormAuthor,
    year: bookFormYear,
    isCompleted: bookFormIsComplete
  }

  book.push(bookObject);
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const makeBook = (bookObject) => {
  const { id, title, author, year, isCompleted } = bookObject;

  const textTitle = document.createElement('h3');
  textTitle.innerText = title;

  const textAuthor = document.createElement('p');
  textAuthor.innerText = author;

  const textYear = document.createElement('p');
  textYear.innerText = year;

  // Bungkus elemen teks ke dalam kontainer
  const textContainer = document.createElement('div');
  textContainer.setAttribute('data-bookid', id);
  textContainer.setAttribute('data-testid', 'bookItem');
  textContainer.append(textTitle, textAuthor, textYear);

  return textContainer;
};

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
  const incompleteBookList = document.getElementById('incompleteBookList')
  const completeBookList = document.getElementById('completeBookList')
  
  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

   for (bookItem of book) {
    const bookElement = makeBook(bookItem);
    if (bookItem.isCompleted) {
      completeBookList.append(bookElement)
    } else {
      incompleteBookList.append(bookElement)
      }
  }
})
