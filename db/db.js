import sqlite3 from "sqlite3";
import { open } from "sqlite";
import crypto from "crypto";
import fs from "fs";

export class DatabaseManager {
  constructor() {}

  async connectToDatabase() {
    return open({
      filename: "./db.db",
      driver: sqlite3.Database
    });
  }

  async setupDatabase() {
    const db = await this.connectToDatabase();

    const schema = fs.readFileSync("./db.sql", "utf-8");
    await db.exec(schema);

    console.log("Database setup complete!");
    await db.close();
  }

  async upsertStudent(student) {
    const db = await this.connectToDatabase();

    if (!student.id) {
      student.id = crypto.randomUUID();
    }

    const query = `
      INSERT INTO students (id, firstname, lastname, dob, gender, address_street_1, address_street_2, address_city, address_state, address_zip, email, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        firstname = excluded.firstname,
        lastname = excluded.lastname,
        dob = excluded.dob,
        gender = excluded.gender,
        address_street_1 = excluded.address_street_1,
        address_street_2 = excluded.address_street_2,
        address_city = excluded.address_city,
        address_state = excluded.address_state,
        address_zip = excluded.address_zip,
        email = excluded.email,
        phone = excluded.phone;
    `;

    await db.run(query, [
      student.id,
      student.firstname || "",
      student.lastname || "",
      student.dob || "",
      student.gender || "",
      student.address_street_1 || "",
      student.address_street_2 || "",
      student.address_city || "",
      student.address_state || "",
      student.address_zip || "",
      student.email || "",
      student.phone || ""
    ]);

    await db.close();
  }

  async getStudentById(id) {
    const db = await this.connectToDatabase();
    const query = `
      SELECT * FROM students WHERE id = ?;
    `;
    const student = await db.get(query, [id]);
    await db.close();
    return student;
  }
}

let db = new DatabaseManager();

// await db.setupDatabase();
await db.upsertStudent({
  id: "988f8451-a3d2-4011-9769-fb52c68f1457",
  firstname: "Izac",
  lastname: "Peterson",
  dob: `${new Date("11-22-1996").getTime()}`,
  gender: "M",
  email: "izacpeterson@gmail.com"
});

console.log(await db.getStudentById("988f8451-a3d2-4011-9769-fb52c68f1457"));
