import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = "StockSync.db";

class DatabaseService {
  private db: SQLiteDatabase | null = null;

  async init(): Promise<void> {
    if (this.db) return;

    try {
      this.db = await SQLite.openDatabase({
        name: database_name,
        location: 'default',
      });

      console.log("Database opened");
      await this.createTables();
    } catch (error) {
      console.error("Error opening database:", error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) return;

    const queries = [
      `CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL
      );`,
      `CREATE TABLE IF NOT EXISTS Categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES Users (id)
      );`,
      `CREATE TABLE IF NOT EXISTS Items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category_id INTEGER,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        user_id INTEGER,
        FOREIGN KEY (category_id) REFERENCES Categories (id),
        FOREIGN KEY (user_id) REFERENCES Users (id)
      );`,
      `CREATE TABLE IF NOT EXISTS Customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES Users (id)
      );`,
      `CREATE TABLE IF NOT EXISTS Invoices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        invoice_number TEXT UNIQUE NOT NULL,
        customer_id INTEGER,
        date TEXT NOT NULL,
        total REAL NOT NULL,
        vat REAL NOT NULL,
        due_amount REAL NOT NULL,
        user_id INTEGER,
        FOREIGN KEY (customer_id) REFERENCES Customers (id),
        FOREIGN KEY (user_id) REFERENCES Users (id)
      );`,
      `CREATE TABLE IF NOT EXISTS InvoiceItems (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        invoice_id INTEGER,
        item_id INTEGER,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        amount REAL NOT NULL,
        FOREIGN KEY (invoice_id) REFERENCES Invoices (id),
        FOREIGN KEY (item_id) REFERENCES Items (id)
      );`
    ];

    for (const query of queries) {
      await this.db.executeSql(query);
    }

    await this.seedUsers();
    console.log("Tables created/verified and seeded successfully");
  }

  private async seedUsers(): Promise<void> {
    if (!this.db) return;
    const users = await this.selectAll("SELECT * FROM Users WHERE email = ?", ["admin@asap.com"]);
    if (users.length === 0) {
      await this.executeQuery(
        "INSERT INTO Users (email, password, name) VALUES (?, ?, ?)",
        ["admin@asap.com", "password123", "ASAP Admin"]
      );
      console.log("Default admin user seeded");
    }
  }

  async executeQuery(query: string, params: any[] = []): Promise<any> {
    if (!this.db) await this.init();
    return this.db!.executeSql(query, params);
  }

  // Helper for select queries to return an array of results
  async selectAll<T>(query: string, params: any[] = []): Promise<T[]> {
    const [results] = await this.executeQuery(query, params);
    const items: T[] = [];
    for (let i = 0; i < results.rows.length; i++) {
      items.push(results.rows.item(i));
    }
    return items;
  }
}

export const DB = new DatabaseService();
