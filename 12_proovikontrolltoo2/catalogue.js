// catalogue.ts
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
    function LibraryItem(id, title, year) {
        this.id = id;
        this.title = title;
        this.year = year;
    }
    LibraryItem.prototype.getId = function () {
        return this.id;
    };
    LibraryItem.prototype.getTitle = function () {
        return this.title;
    };
    LibraryItem.prototype.getYear = function () {
        return this.year;
    };
    return LibraryItem;
}());
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(id, title, year, ISBN, author, pages) {
        var _this = _super.call(this, id, title, year) || this;
        _this.ISBN = ISBN;
        _this.author = author;
        _this.pages = pages;
        return _this;
    }
    Book.prototype.getTypeLabel = function () {
        return "Book";
    };
    Book.prototype.getSummary = function () {
        return "Book #".concat(this.id, ": \"").concat(this.title, "\" (").concat(this.year, "), ISBN ").concat(this.ISBN, ", by ").concat(this.author, ", ").concat(this.pages, " pages.");
    };
    Book.prototype.matches = function (query) {
        var q = query.toLowerCase();
        return [
            this.title,
            this.author,
            String(this.year),
            String(this.ISBN),
            this.getTypeLabel()
        ].some(function (value) { return value.toLowerCase().includes(q); });
    };
    Book.prototype.toRecord = function () {
        return {
            type: "book",
            id: this.id,
            title: this.title,
            year: this.year,
            ISBN: this.ISBN,
            author: this.author,
            pages: this.pages
        };
    };
    return Book;
}(LibraryItem));
var DVD = /** @class */ (function (_super) {
    __extends(DVD, _super);
    function DVD(id, title, year, director, duration) {
        var _this = _super.call(this, id, title, year) || this;
        _this.director = director;
        _this.duration = duration;
        return _this;
    }
    DVD.prototype.getTypeLabel = function () {
        return "DVD";
    };
    DVD.prototype.getSummary = function () {
        return "DVD #".concat(this.id, ": \"").concat(this.title, "\" (").concat(this.year, "), directed by ").concat(this.director, ", ").concat(this.duration, " min.");
    };
    DVD.prototype.matches = function (query) {
        var q = query.toLowerCase();
        return [
            this.title,
            this.director,
            String(this.year),
            this.getTypeLabel()
        ].some(function (value) { return value.toLowerCase().includes(q); });
    };
    DVD.prototype.toRecord = function () {
        return {
            type: "dvd",
            id: this.id,
            title: this.title,
            year: this.year,
            director: this.director,
            duration: this.duration
        };
    };
    return DVD;
}(LibraryItem));
var CatalogueValidationError = /** @class */ (function (_super) {
    __extends(CatalogueValidationError, _super);
    function CatalogueValidationError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "CatalogueValidationError";
        return _this;
    }
    return CatalogueValidationError;
}(Error));
var LibraryCatalogue = /** @class */ (function () {
    function LibraryCatalogue() {
        this.items = [];
    }
    LibraryCatalogue.prototype.addItem = function (item) {
        if (this.items.some(function (existing) { return existing.getId() === item.getId(); })) {
            throw new CatalogueValidationError("An item with ID ".concat(item.getId(), " already exists."));
        }
        this.items.push(item);
    };
    LibraryCatalogue.prototype.getItems = function () {
        return __spreadArray([], this.items, true);
    };
    LibraryCatalogue.prototype.search = function (query) {
        var trimmed = query.trim();
        if (!trimmed)
            return this.getItems();
        return this.items.filter(function (item) { return item.matches(trimmed); });
    };
    LibraryCatalogue.prototype.exportToJson = function () {
        return JSON.stringify({ items: this.items.map(function (item) { return item.toRecord(); }) }, null, 2);
    };
    LibraryCatalogue.prototype.importFromJson = function (json) {
        var _this = this;
        var parsed;
        try {
            parsed = JSON.parse(json);
        }
        catch (e) {
            throw new CatalogueValidationError("The selected file is not valid JSON.");
        }
        if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.items)) {
            throw new CatalogueValidationError("The file must contain an object with an items array.");
        }
        var incoming = parsed.items;
        var added = 0;
        var rejected = 0;
        var errors = [];
        incoming.forEach(function (entry, index) {
            try {
                var item = LibraryCatalogue.itemFromUnknown(entry);
                _this.addItem(item);
                added += 1;
            }
            catch (e) {
                rejected += 1;
                errors.push("Item ".concat(index + 1, ": ").concat(e instanceof Error ? e.message : "Invalid entry."));
            }
        });
        return { added: added, rejected: rejected, errors: errors };
    };
    LibraryCatalogue.itemFromUnknown = function (entry) {
        if (!entry || typeof entry !== "object") {
            throw new CatalogueValidationError("Entry must be an object.");
        }
        var raw = entry;
        var id = raw.id, title = raw.title, year = raw.year, type = raw.type;
        if (!Number.isInteger(id) || id <= 0) {
            throw new CatalogueValidationError("ID must be a positive integer.");
        }
        if (typeof title !== "string" || title.trim().length === 0) {
            throw new CatalogueValidationError("Title is required.");
        }
        if (!Number.isInteger(year) || year < 1000 || year > 3000) {
            throw new CatalogueValidationError("Year must be a valid integer between 1000 and 3000.");
        }
        if (type === "book") {
            if (typeof raw.author !== "string" || raw.author.trim().length === 0) {
                throw new CatalogueValidationError("Book author is required.");
            }
            if (!Number.isInteger(raw.ISBN) || raw.ISBN <= 0) {
                throw new CatalogueValidationError("Book ISBN must be a positive integer.");
            }
            if (!Number.isInteger(raw.pages) || raw.pages <= 0) {
                throw new CatalogueValidationError("Book pages must be a positive integer.");
            }
            return new Book(id, title.trim(), year, raw.ISBN, raw.author.trim(), raw.pages);
        }
        if (type === "dvd") {
            if (typeof raw.director !== "string" || raw.director.trim().length === 0) {
                throw new CatalogueValidationError("DVD director is required.");
            }
            if (!Number.isInteger(raw.duration) || raw.duration <= 0) {
                throw new CatalogueValidationError("DVD duration must be a positive integer.");
            }
            return new DVD(id, title.trim(), year, raw.director.trim(), raw.duration);
        }
        throw new CatalogueValidationError("Item type must be either book or dvd.");
    };
    return LibraryCatalogue;
}());
