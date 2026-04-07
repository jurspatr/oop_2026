export class Notes {

    // This array stores all notes as strings
    protected notes: string[] = [];

    constructor() {}

    // Adds a new note to the list
    addNote(note: string): void {
        // Remove spaces from the beginning and end of the text
        const trimmed = note.trim();

        // If the text is empty after trimming, stop here
        if (trimmed === "") {
            return;
        }

        // Add the new note to the end of the array
        this.notes.push(trimmed);
    }

    // Deletes one note by its index
    deleteNote(i: number): void {
        // Check that the index is valid
        if (i >= 0 && i < this.notes.length) {
            // Remove one item from the array at position i
            this.notes.splice(i, 1);
        }
    }

    // Returns all notes
    getNotes(): string[] {
        return this.notes;
    }

    // Deletes all notes
    clearAll(): void {
        // Replace the current array with an empty one
        this.notes = [];
    }
}

// Check that the code is running in the browser
if (typeof window !== "undefined") {
    // Put the Notes class on the window object so it can be used from the HTML file
    (window as any).Notes = Notes;
}