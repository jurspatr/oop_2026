// catalogue.ts

type ItemType = "book" | "dvd";

type ItemRecord =
  | {
      type: "book";
      id: number;
      title: string;
      year: number;
      ISBN: number;
      author: string;
      pages: number;
    }
  | {
      type: "dvd";
      id: number;
      title: string;
      year: number;
      director: string;
      duration: number;
    };

abstract class LibraryItem {
  constructor(
    protected readonly id: number,
    protected readonly title: string,
    protected readonly year: number
  ) {}

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getYear(): number {
    return this.year;
  }

  abstract getTypeLabel(): string;
  abstract getSummary(): string;
  abstract matches(query: string): boolean;
  abstract toRecord(): ItemRecord;
}

class Book extends LibraryItem {
  constructor(
    id: number,
    title: string,
    year: number,
    private readonly ISBN: number,
    private readonly author: string,
    private readonly pages: number
  ) {
    super(id, title, year);
  }

  getTypeLabel(): string {
    return "Book";
  }

  getSummary(): string {
    return `Book #${this.id}: "${this.title}" (${this.year}), ISBN ${this.ISBN}, by ${this.author}, ${this.pages} pages.`;
  }

  matches(query: string): boolean {
    const q = query.toLowerCase();
    return [
      this.title,
      this.author,
      String(this.year),
      String(this.ISBN),
      this.getTypeLabel()
    ].some(value => value.toLowerCase().includes(q));
  }

  toRecord(): ItemRecord {
    return {
      type: "book",
      id: this.id,
      title: this.title,
      year: this.year,
      ISBN: this.ISBN,
      author: this.author,
      pages: this.pages
    };
  }
}

class DVD extends LibraryItem {
  constructor(
    id: number,
    title: string,
    year: number,
    private readonly director: string,
    private readonly duration: number
  ) {
    super(id, title, year);
  }

  getTypeLabel(): string {
    return "DVD";
  }

  getSummary(): string {
    return `DVD #${this.id}: "${this.title}" (${this.year}), directed by ${this.director}, ${this.duration} min.`;
  }

  matches(query: string): boolean {
    const q = query.toLowerCase();
    return [
      this.title,
      this.director,
      String(this.year),
      this.getTypeLabel()
    ].some(value => value.toLowerCase().includes(q));
  }

  toRecord(): ItemRecord {
    return {
      type: "dvd",
      id: this.id,
      title: this.title,
      year: this.year,
      director: this.director,
      duration: this.duration
    };
  }
}

class CatalogueValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CatalogueValidationError";
  }
}

class LibraryCatalogue {
  private items: LibraryItem[] = [];

  addItem(item: LibraryItem): void {
    if (this.items.some(existing => existing.getId() === item.getId())) {
      throw new CatalogueValidationError(`An item with ID ${item.getId()} already exists.`);
    }
    this.items.push(item);
  }

  getItems(): LibraryItem[] {
    return [...this.items];
  }

  search(query: string): LibraryItem[] {
    const trimmed = query.trim();
    if (!trimmed) return this.getItems();
    return this.items.filter(item => item.matches(trimmed));
  }

  exportToJson(): string {
    return JSON.stringify(
      { items: this.items.map(item => item.toRecord()) },
      null,
      2
    );
  }

  importFromJson(json: string): {
    added: number;
    rejected: number;
    errors: string[];
  } {
    let parsed: unknown;

    try {
      parsed = JSON.parse(json);
    } catch (e) {
      throw new CatalogueValidationError("The selected file is not valid JSON.");
    }

    if (!parsed || typeof parsed !== "object" || !Array.isArray((parsed as { items?: unknown }).items)) {
      throw new CatalogueValidationError("The file must contain an object with an items array.");
    }

    const incoming = (parsed as { items: unknown[] }).items;
    let added = 0;
    let rejected = 0;
    const errors: string[] = [];

    incoming.forEach((entry, index) => {
      try {
        const item = LibraryCatalogue.itemFromUnknown(entry);
        this.addItem(item);
        added += 1;
      } catch (e) {
        rejected += 1;
        errors.push(
          `Item ${index + 1}: ${e instanceof Error ? e.message : "Invalid entry."}`
        );
      }
    });

    return { added, rejected, errors };
  }

  static itemFromUnknown(entry: unknown): LibraryItem {
    if (!entry || typeof entry !== "object") {
      throw new CatalogueValidationError("Entry must be an object.");
    }

    const raw = entry as Record<string, unknown>;
    const { id, title, year, type } = raw;

    if (!Number.isInteger(id) || (id as number) <= 0) {
      throw new CatalogueValidationError("ID must be a positive integer.");
    }

    if (typeof title !== "string" || title.trim().length === 0) {
      throw new CatalogueValidationError("Title is required.");
    }

    if (!Number.isInteger(year) || (year as number) < 1000 || (year as number) > 3000) {
      throw new CatalogueValidationError("Year must be a valid integer between 1000 and 3000.");
    }

    if (type === "book") {
      if (typeof raw.author !== "string" || raw.author.trim().length === 0) {
        throw new CatalogueValidationError("Book author is required.");
      }

      if (!Number.isInteger(raw.ISBN) || (raw.ISBN as number) <= 0) {
        throw new CatalogueValidationError("Book ISBN must be a positive integer.");
      }

      if (!Number.isInteger(raw.pages) || (raw.pages as number) <= 0) {
        throw new CatalogueValidationError("Book pages must be a positive integer.");
      }

      return new Book(
        id as number,
        title.trim(),
        year as number,
        raw.ISBN as number,
        raw.author.trim(),
        raw.pages as number
      );
    }

    if (type === "dvd") {
      if (typeof raw.director !== "string" || raw.director.trim().length === 0) {
        throw new CatalogueValidationError("DVD director is required.");
      }

      if (!Number.isInteger(raw.duration) || (raw.duration as number) <= 0) {
        throw new CatalogueValidationError("DVD duration must be a positive integer.");
      }

      return new DVD(
        id as number,
        title.trim(),
        year as number,
        raw.director.trim(),
        raw.duration as number
      );
    }

    throw new CatalogueValidationError("Item type must be either book or dvd.");
  }
}