import fs from "fs";
import crypto from "crypto";
import pkg from "pg";
const { Pool } = pkg;

import dotenv from "dotenv";

dotenv.config();

export default class DatabaseManager {
  static instance;

  constructor() {
    if (DatabaseManager.instance) {
      return DatabaseManager.instance;
    }

    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: {
        rejectUnauthorized: false // Set to true if using a valid CA certificate
      }
    });

    DatabaseManager.instance = this;
  }

  async loadSQL(filePath) {
    return fs.readFileSync(filePath, "utf-8");
  }

  async now() {
    try {
      const result = await this.pool.query("SELECT NOW()");
      return result.rows[0];
    } catch (error) {
      console.error("Error executing now query:", error);
      throw error;
    }
  }

  async getDistricts() {
    const query = await this.loadSQL("./db/queries/get_district_info.sql");
    try {
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error getting districts:", error);
      throw error;
    }
  }

  async getDistrict(id) {
    const query = await this.loadSQL("./db/queries/get_district.sql");
    try {
      const result = await this.pool.query(query, [id]);
      return result.rows;
    } catch (error) {
      console.error("Error getting district:", error);
      throw error;
    }
  }

  async getSchools() {
    const query = `
      SELECT
        schools.id AS school_id,
        schools.name AS school_name,
        schools.level,
        districts.id AS district_id,
        districts.name AS district_name
      FROM schools
      JOIN districts
      ON schools.district_id = districts.id;
    `;
    try {
      const result = await this.pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error getting schools:", error);
      throw error;
    }
  }

  async getSchool(id) {
    try {
      const result = await this.pool.query("SELECT * FROM schools WHERE id = $1", [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error getting school:", error);
      throw error;
    }
  }

  async getSchoolsInDistrict(id) {
    const query = `
      SELECT *, CONCAT(name, ' ', level, ' ', 'School') AS full 
      FROM schools 
      WHERE district_id = $1
    `;
    try {
      const result = await this.pool.query(query, [id]);
      return result.rows;
    } catch (error) {
      console.error("Error getting schools in district:", error);
      throw error;
    }
  }

  async upsertStudent(firstname, lastname, dob, school_id, email) {
    const query = await this.loadSQL("./db/queries/upsert_student.sql");
    const values = [firstname, lastname, dob, school_id, email];
    try {
      const result = await this.pool.query(query, values);
      return result;
    } catch (error) {
      console.error("Error upserting student:", error);
      throw error;
    }
  }

  async getStudent(id) {
    const query = await this.loadSQL("./db/queries/get_student.sql");
    const values = [id];
    try {
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error getting student:", error);
      throw error;
    }
  }

  async upsertFaculty(firstname, lastname, email, school_id, position) {
    const query = await this.loadSQL("./db/queries/upsert_faculty.sql");
    const values = [firstname, lastname, email, school_id, position];
    try {
      const result = await this.pool.query(query, values);
      return result;
    } catch (error) {
      console.error("Error upserting faculty:", error);
      throw error;
    }
  }
}

// Singleton instance of DatabaseManager
const db = new DatabaseManager();

// Example usage (uncomment to test):
// (async () => {
//   console.log(await db.now());
//   console.log(await db.getDistricts());
// })();
