import sqlite3 from "sqlite3";
import { open } from "sqlite";
import crypto from "crypto";
import fs from "fs";

import pkg from "pg";
const { Pool } = pkg;

export default class DatabaseManager {
  constructor() {
    this.pool = new Pool();
  }

  async init() {
    const client = await this.pool.connect();
  }

  async now() {
    const client = await this.pool.connect();
    const result = await client.query("SELECT NOW()");
    return result.rows[0];
  }

  async loadSQL(filePath) {
    return fs.readFileSync(filePath, "utf-8");
  }

  async getDistricts() {
    const client = await this.pool.connect();
    let query = await this.loadSQL("./db/queries/get_district_info.sql");
    const result = await client.query(query);
    return result.rows;
  }

  async getDistrict(id) {
    const client = await this.pool.connect();
    let query = await this.loadSQL("./db/queries/get_district.sql");
    const result = await client.query(query, [id]);
    return result.rows;
  }

  async getSchools() {
    const client = await this.pool.connect();
    const result = await client.query(
      `SELECT
        schools.id AS school_id,
        schools.name AS school_name,
        schools.level,
        districts.id AS district_id,
        districts.name AS district_name
        FROM schools
        JOIN districts
        ON schools.district_id = districts.id;`
    );
    return result.rows;
  }

  async getSchool(id) {
    const client = await this.pool.connect();
    const result = await client.query("SELECT * FROM schools WHERE id = $1", [id]);
    return result.rows[0];
  }

  async getSchoolsInDistrict(id) {
    const client = await this.pool.connect();
    const result = await client.query(
      "SELECT *, CONCAT(name, ' ', level, ' ', 'School') AS full FROM schools WHERE district_id = $1",
      [id]
    );

    return result.rows;
  }

  async upsertStudent(firstname, lastname, dob, school_id, email) {
    let query = await this.loadSQL("./db/queries/upsert_student.sql");
    const values = [firstname, lastname, dob, school_id, email];

    const client = await this.pool.connect();

    console.log(query, values);

    let result = await client.query(query, values);

    return result;
  }

  async getStudent(id) {
    const client = await this.pool.connect();
    const query = await this.loadSQL("./db/queries/get_student.sql");
    const values = [id];
    let result = await client.query(query, values);

    return result.rows[0];
  }

  async upsertFaculty(firstname, lastname, email, school_id, position) {
    let query = await this.loadSQL("./db/queries/upsert_faculty.sql");
    const values = [firstname, lastname, email, school_id, position];
    const client = await this.pool.connect();
    let result = await client.query(query, values);
    return result;
  }
}

let db = new DatabaseManager();

// console.log(
//   (await db.upsertStudent("Izac", "Peterson", new Date("11-22-1996").getTime(), 2, "izacpeterson@gmail.com")).rows[0]
// );

// let result = await db.upsertFaculty("Riley", "Peterson", "riley@gmail.com", 3, "Teacher");
// console.log(await db.getSchoolsInDistrict(2));
// console.log(await db.getStudent(1));
