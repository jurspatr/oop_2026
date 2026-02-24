// Book klass
var Book = /** @class */ (function () {
    function Book(title, author) {
        this.title = title;
        this.author = author;
    }
    Book.prototype.getInfo = function () {
        return "".concat(this.title, " \u2013 ").concat(this.author);
    };
    return Book;
}());
// Library klass  
var Library = /** @class */ (function () {
    function Library() {
        this.books = [];
    }
    Library.prototype.addBook = function (book) {
        this.books.push(book);
    };
    Library.prototype.getAllBooks = function () {
        return this.books;
    };
    Library.prototype.findByAuthor = function (author) {
        return this.books.filter(function (b) { return b.author === author; });
    };
    return Library;
}());
// App loogika
var lib = new Library();
lib.addBook(new Book("Tõde ja õigus", "A. H. Tammsaare"));
lib.addBook(new Book("Kevade", "O. Luts"));
lib.addBook(new Book("Rehepapp", "A. Kivirähk"));
function showAll() {
    var out = document.getElementById("output");
    var books = lib.getAllBooks();
    out.innerHTML = books.map(function (b) { return b.getInfo(); }).join("<br>");
}
window.showAll = showAll;
