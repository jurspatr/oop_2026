"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notes = void 0;
var Notes = /** @class */ (function () {
    function Notes() {
        // This array stores all notes as strings
        this.notes = [];
    }
    // Adds a new note to the list
    Notes.prototype.addNote = function (note) {
        // Remove spaces from the beginning and end of the text
        var trimmed = note.trim();
        // If the text is empty after trimming, stop here
        if (trimmed === "") {
            return;
        }
        // Add the new note to the end of the array
        this.notes.push(trimmed);
    };
    // Deletes one note by its index
    Notes.prototype.deleteNote = function (i) {
        // Check that the index is valid
        if (i >= 0 && i < this.notes.length) {
            // Remove one item from the array at position i
            this.notes.splice(i, 1);
        }
    };
    // Returns all notes
    Notes.prototype.getNotes = function () {
        return this.notes;
    };
    // Deletes all notes
    Notes.prototype.clearAll = function () {
        // Replace the current array with an empty one
        this.notes = [];
    };
    return Notes;
}());
exports.Notes = Notes;
// Check that the code is running in the browser
if (typeof window !== "undefined") {
    // Put the Notes class on the window object so it can be used from the HTML file
    window.Notes = Notes;
}
