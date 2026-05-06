var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var LibraryItem = /** @class */ (function () {
    function LibraryItem(id, title, author, year) {
        if (id.trim() === "")
            throw new Error("ID cannot be empty");
        if (title.trim() === "")
            throw new Error("Title cannot be empty");
        if (author.trim() === "")
            throw new Error("Author or director cannot be empty");
        if (!Number.isInteger(year) || year < 1000 || year > 3000) {
            throw new Error("Year must be between 1000 and 3000");
        }
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
    }
    LibraryItem.prototype.getId = function () { return this.id; };
    LibraryItem.prototype.getTitle = function () { return this.title; };
    LibraryItem.prototype.getAuthor = function () { return this.author; };
    LibraryItem.prototype.getYear = function () { return this.year; };
    LibraryItem.prototype.getSummary = function () {
        return "[Item] ".concat(this.title);
    };
    return LibraryItem;
}());
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(id, title, author, year, pages, genre) {
        var _this = _super.call(this, id, title, author, year) || this;
        if (!Number.isInteger(pages) || pages <= 0) {
            throw new Error("Pages must be a positive number");
        }
        if (genre.trim() === "") {
            throw new Error("Genre cannot be empty");
        }
        _this.pages = pages;
        _this.genre = genre;
        return _this;
    }
    Book.prototype.getSummary = function () {
        return "[Book] ".concat(this.id, " | ").concat(this.title, " | ").concat(this.author, " | ").concat(this.year, " | ").concat(this.pages, " pages | ").concat(this.genre);
    };
    Book.prototype.toFileLine = function () {
        return "BOOK|".concat(this.id, "|").concat(this.title, "|").concat(this.author, "|").concat(this.year, "|").concat(this.pages, "|").concat(this.genre);
    };
    return Book;
}(LibraryItem));
var DVD = /** @class */ (function (_super) {
    __extends(DVD, _super);
    function DVD(id, title, director, year, duration) {
        var _this = _super.call(this, id, title, director, year) || this;
        if (!Number.isInteger(duration) || duration <= 0) {
            throw new Error("Duration must be a positive number");
        }
        _this.duration = duration;
        return _this;
    }
    DVD.prototype.getSummary = function () {
        return "[DVD] ".concat(this.id, " | ").concat(this.title, " | ").concat(this.author, " | ").concat(this.year, " | ").concat(this.duration, " min");
    };
    DVD.prototype.toFileLine = function () {
        return "DVD|".concat(this.id, "|").concat(this.title, "|").concat(this.author, "|").concat(this.year, "|").concat(this.duration);
    };
    return DVD;
}(LibraryItem));
var Library = /** @class */ (function () {
    function Library() {
        this.items = [];
    }
    Library.prototype.addItem = function (item) {
        if (this.items.some(function (existing) { return existing.getId() === item.getId(); })) {
            throw new Error("Item with ID ".concat(item.getId(), " already exists"));
        }
        this.items.push(item);
    };
    Library.prototype.getAll = function () {
        return __spreadArray([], this.items, true);
    };
    Library.prototype.search = function (query) {
        var q = query.trim().toLowerCase();
        if (q === "") {
            return this.getAll();
        }
        return this.items.filter(function (item) {
            return item.getSummary().toLowerCase().includes(q);
        });
    };
    Library.prototype.toText = function () {
        return this.items.map(function (item) { return item.toFileLine(); }).join("\n");
    };
    Library.prototype.loadFromText = function (text) {
        var lines = text.split(/\r?\n/);
        var errors = [];
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var rawLine = lines_1[_i];
            var line = rawLine.trim();
            if (line === "")
                continue;
            try {
                var parts = line.split("|");
                if (parts[0] === "BOOK") {
                    if (parts.length !== 7) {
                        throw new Error("Invalid BOOK format");
                    }
                    var book = new Book(parts[1], parts[2], parts[3], Number(parts[4]), Number(parts[5]), parts[6]);
                    this.addItem(book);
                }
                else if (parts[0] === "DVD") {
                    if (parts.length !== 6) {
                        throw new Error("Invalid DVD format");
                    }
                    var dvd = new DVD(parts[1], parts[2], parts[3], Number(parts[4]), Number(parts[5]));
                    this.addItem(dvd);
                }
                else {
                    throw new Error("Unknown item type");
                }
            }
            catch (e) {
                errors.push("Error in line: ".concat(line));
            }
        }
        return errors;
    };
    return Library;
}());
