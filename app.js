const root = document.documentElement;
const mode = document.querySelector(".slider");
const mode1 = document.querySelector("#slider1");

mode.addEventListener("click", function () {
  if (root.classList.contains("dark")) {
    root.classList.remove("dark");
  } else {
    root.classList.add("dark");
  }
});
mode1.addEventListener("click", function () {
  if (root.classList.contains("dark")) {
    root.classList.remove("dark");
  } else {
    root.classList.add("dark");
  }
});

// Button event listeners to create new books, add new book to page and close pop-up
const addBtn = document.querySelector(".addBtn");
const addDiv = document.querySelector(".add-div");
const books = document.querySelector(".books");
const popUp = document.querySelector(".pop-up");
const addDiv1 = document.querySelector(".add-div1");
const blur = document.querySelector(".blur");

addDiv.addEventListener("click", function () {
  popUp.style.display = "block";
  addDiv.style.display = "none";
  addDiv1.style.display = "flex";
  blur.style.filter = "blur(2px)";
});

addDiv1.addEventListener("click", closeForm);

function closeForm() {
  popUp.style.display = "none";
  addDiv.style.display = "flex";
  addDiv1.style.display = "none";
  blur.style.filter = "blur(0px)";

}

addBtn.addEventListener("click", addBookToLibrary);

//Book Constructor

class Book {
  constructor(title, author, pages, read) {
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value;
    this.read = form.read.checked;
  }
}

// creates book from constructor, adds to library

let myLibrary = [];

let newBook;

function addBookToLibrary() {
  event.preventDefault();
  closeForm();

  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  setData(); //saves updated array in local storage
  render();
  form.reset();
}

function render() {
  const display = document.getElementById("library-container");
  const books = document.querySelectorAll(".book");
  books.forEach((book) => display.removeChild(book));

  for (i = 0; i < myLibrary.length; i++) {
    createBook(myLibrary[i]);
  }
}

//Creates book DOM elements, to use in render();
function createBook(item) {
  const library = document.querySelector("#library-container");
  const bookDiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  const authDiv = document.createElement("div");
  const pageDiv = document.createElement("div");
  const removeBtn = document.createElement("button");
  const readBtn = document.createElement("button");

  bookDiv.classList.add("book");
  bookDiv.setAttribute("id", myLibrary.indexOf(item));

  titleDiv.textContent = "TITLE: " + item.title;
  titleDiv.classList.add("title");
  bookDiv.appendChild(titleDiv);

  authDiv.textContent = "AUTHOR: " + item.author;
  authDiv.classList.add("author");
  bookDiv.appendChild(authDiv);

  pageDiv.textContent = "PAGES: " + item.pages;
  pageDiv.classList.add("pages");
  bookDiv.appendChild(pageDiv);

  readBtn.classList.add("readBtn");
  bookDiv.appendChild(readBtn);

  if (item.read === false) {
    readBtn.textContent = "NOT READ";
    readBtn.style.background = "#e04f63";
  } else {
    readBtn.textContent = "READ";
    readBtn.style.background = "#63da63";
  }

  removeBtn.textContent = "DELETE";
  removeBtn.setAttribute("id", "removeBtn");
  bookDiv.appendChild(removeBtn);

  library.appendChild(bookDiv);

  removeBtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(item), 1);
    setData();
    render();
  });

  //add toggle ability to each book 'read' button on click
  readBtn.addEventListener("click", () => {
    item.read = !item.read;
    setData();
    render();
  });
}
// setting Library to be stored in local storage
function setData() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls books from local storage when page is refreshed
function restore() {
  if (!localStorage.myLibrary) {
    render();
  } else {
    let objects = localStorage.getItem("myLibrary"); // gets information from local storage to use in below loop to create DOM/display
    objects = JSON.parse(objects);
    myLibrary = objects;
    render();
  }
}

restore();
