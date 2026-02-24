// Book class - represents a single book with title and author
class Book {
    constructor(
        public title: string,    // Book title (e.g., "Tõde ja õigus")
        public author: string    // Book author (e.g., "A. H. Tammsaare")
    ) {}

    // Returns formatted book information as a string
    getInfo(): string {
        return `${this.title} – ${this.author}`;
    }
}

// Library class - manages collection of books (the "container")
class Library {
    private books: Book[] = [];  // Private array to store all Book instances

    // Adds a new book to the library collection
    addBook(book: Book): void {
        this.books.push(book);  // Push new book to the end of array
    }

    // Returns ALL books in the library (read-only copy)
    getAllBooks(): Book[] {
        return this.books;  // Returns reference to books array
    }

}

// App logic - main application code
let lib = new Library();  // Create one Library instance

// Pre-populate library with 3 example books (runs once on page load)
lib.addBook(new Book("Tõde ja õigus", "A. H. Tammsaare"));
lib.addBook(new Book("Kevade", "O. Luts"));
lib.addBook(new Book("Rehepapp", "A. Kivirähk"));

function showAll() {
    const out = document.getElementById("output")!;  // Get output div element
    const books = lib.getAllBooks();                 // Get all books from library
    out.innerHTML = books.map(b => b.getInfo()).join("<br>");  // Format and display
}

(window as any).showAll = showAll;  // Make function accessible from HTML onclick
