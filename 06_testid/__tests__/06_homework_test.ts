import { Notes } from "../homework_6";

let notesObj: Notes;

beforeEach(() => {
    notesObj = new Notes();
});

// Checks that a new Notes object starts with an empty array
test("empty init", () => {
    expect(notesObj.getNotes()).toEqual([]);
});

// Checks that one normal note is added correctly
test("add one note", () => {
    notesObj.addNote("Buy milk");
    expect(notesObj.getNotes()).toEqual(["Buy milk"]);
});

// Checks that an empty note made of only spaces is not added
test("ignore empty note", () => {
    notesObj.addNote("   ");
    expect(notesObj.getNotes()).toEqual([]);
});

// Checks that two notes are stored in the correct order
test("add two notes", () => {
    notesObj.addNote("Buy milk");
    notesObj.addNote("Do homework");
    expect(notesObj.getNotes()).toEqual(["Buy milk", "Do homework"]);
});

// Checks that deleting one note removes the correct item
test("delete one note", () => {
    notesObj.addNote("Buy milk");
    notesObj.addNote("Do homework");
    notesObj.deleteNote(0);
    expect(notesObj.getNotes()).toEqual(["Do homework"]);
});

// Checks that using a wrong index does not delete anything
test("delete note with wrong index", () => {
    notesObj.addNote("Buy milk");
    notesObj.deleteNote(5);
    expect(notesObj.getNotes()).toEqual(["Buy milk"]);
});

// Checks that clearAll removes every note from the array
test("clear all notes", () => {
    notesObj.addNote("Buy milk");
    notesObj.addNote("Do homework");
    notesObj.clearAll();
    expect(notesObj.getNotes()).toEqual([]);
});