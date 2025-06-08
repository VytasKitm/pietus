import pg from 'pg'
import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config({
      path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../.env')
})

const fileData = fs.readFileSync("./database/testData.sql", "utf-8")

const { DATABASE_URL } = process.env

const pool  = new pg.Pool({
      connectionString: DATABASE_URL,
      ssl: {
            rejectUnauthorized: false
      }
})

if (!DATABASE_URL) {
      console.log("Bad .env location. Cant read file.")
      process.exit(1)
}

async function testData() {
      const fileData = fs.readFileSync("./database/testData.sql", "utf-8")
      try {
            await pool.query(fileData)
      }
      catch (error) {
            console.log("Cant write data to database.", error)
      }

}

export { pool, testData }

