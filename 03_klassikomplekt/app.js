// Book class - represents a single book with title and author
var Book = /** @class */ (function () {
    function Book(title, // Book title (e.g., "Tõde ja õigus")
    author // Book author (e.g., "A. H. Tammsaare")
    ) {
        this.title = title;
        this.author = author;
    }
    // Returns formatted book information as a string
    Book.prototype.getInfo = function () {
        return "".concat(this.title, " \u2013 ").concat(this.author);
    };
    return Book;
}());
// Library class - manages collection of books (the "container")
var Library = /** @class */ (function () {
    function Library() {
        this.books = []; // Private array to store all Book instances
    }
    // Adds a new book to the library collection
    Library.prototype.addBook = function (book) {
        this.books.push(book); // Push new book to the end of array
    };
    // Returns ALL books in the library (read-only copy)
    Library.prototype.getAllBooks = function () {
        return this.books; // Returns reference to books array
    };
    return Library;
}());
// App logic - main application code
var lib = new Library(); // Create one Library instance
// Pre-populate library with 3 example books (runs once on page load)
lib.addBook(new Book("Tõde ja õigus", "A. H. Tammsaare"));
lib.addBook(new Book("Kevade", "O. Luts"));
lib.addBook(new Book("Rehepapp", "A. Kivirähk"));
function showAll() {
    var out = document.getElementById("output"); // Get output div element
    var books = lib.getAllBooks(); // Get all books from library
    out.innerHTML = books.map(function (b) { return b.getInfo(); }).join("<br>"); // Format and display
}
window.showAll = showAll; // Make function accessible from HTML onclick
