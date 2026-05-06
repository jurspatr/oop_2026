class LibraryItem {
    id: string;
    title: string;
    author: string;
    year: number;

    constructor(id: string, title: string, author: string, year: number) {
        if (id.trim() === "") throw new Error("ID cannot be empty");
        if (title.trim() === "") throw new Error("Title cannot be empty");
        if (author.trim() === "") throw new Error("Author or director cannot be empty");
        if (!Number.isInteger(year) || year < 1000 || year > 3000) {
            throw new Error("Year must be between 1000 and 3000");
        }

        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
    }

    getId(): string { return this.id; }
    getTitle(): string { return this.title; }
    getAuthor(): string { return this.author; }
    getYear(): number { return this.year; }

    getSummary(): string {
        return `[Item] ${this.title}`;
    }
}

class Book extends LibraryItem {
    pages: number;
    genre: string;

    constructor(id: string, title: string, author: string, year: number, pages: number, genre: string) {
        super(id, title, author, year);

        if (!Number.isInteger(pages) || pages <= 0) {
            throw new Error("Pages must be a positive number");
        }

        if (genre.trim() === "") {
            throw new Error("Genre cannot be empty");
        }

        this.pages = pages;
        this.genre = genre;
    }

    getSummary(): string {
        return `[Book] ${this.id} | ${this.title} | ${this.author} | ${this.year} | ${this.pages} pages | ${this.genre}`;
    }

    toFileLine(): string {
        return `BOOK|${this.id}|${this.title}|${this.author}|${this.year}|${this.pages}|${this.genre}`;
    }
}

class DVD extends LibraryItem {
    duration: number;

    constructor(id: string, title: string, director: string, year: number, duration: number) {
        super(id, title, director, year);

        if (!Number.isInteger(duration) || duration <= 0) {
            throw new Error("Duration must be a positive number");
        }

        this.duration = duration;
    }

    getSummary(): string {
        return `[DVD] ${this.id} | ${this.title} | ${this.author} | ${this.year} | ${this.duration} min`;
    }

    toFileLine(): string {
        return `DVD|${this.id}|${this.title}|${this.author}|${this.year}|${this.duration}`;
    }
}

class Library {
    items: LibraryItem[];

    constructor() {
        this.items = [];
    }

    addItem(item: LibraryItem): void {
        if (this.items.some(existing => existing.getId() === item.getId())) {
            throw new Error(`Item with ID ${item.getId()} already exists`);
        }

        this.items.push(item);
    }

    getAll(): LibraryItem[] {
        return [...this.items];
    }

    search(query: string): LibraryItem[] {
        const q = query.trim().toLowerCase();

        if (q === "") {
            return this.getAll();
        }

        return this.items.filter(item =>
            item.getSummary().toLowerCase().includes(q)
        );
    }

    toText(): string {
        return this.items.map((item: any) => item.toFileLine()).join("\n");
    }

    loadFromText(text: string): string[] {
        const lines = text.split(/\r?\n/);
        const errors: string[] = [];

        for (const rawLine of lines) {
            const line = rawLine.trim();

            if (line === "") continue;

            try {
                const parts = line.split("|");

                if (parts[0] === "BOOK") {
                    if (parts.length !== 7) {
                        throw new Error("Invalid BOOK format");
                    }

                    const book = new Book(
                        parts[1],
                        parts[2],
                        parts[3],
                        Number(parts[4]),
                        Number(parts[5]),
                        parts[6]
                    );

                    this.addItem(book);
                } else if (parts[0] === "DVD") {
                    if (parts.length !== 6) {
                        throw new Error("Invalid DVD format");
                    }

                    const dvd = new DVD(
                        parts[1],
                        parts[2],
                        parts[3],
                        Number(parts[4]),
                        Number(parts[5])
                    );

                    this.addItem(dvd);
                } else {
                    throw new Error("Unknown item type");
                }
            } catch (e) {
                errors.push(`Error in line: ${line}`);
            }
        }

        return errors;
    }
}