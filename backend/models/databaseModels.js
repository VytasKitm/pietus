import { pool } from '../database/database.js'

async function usersTableModel() {
      const query = `CREATE TABLE IF NOT EXISTS users (
                        id                SERIAL PRIMARY KEY,
                        name              TEXT NOT NULL,
                        last_name         TEXT NOT NULL,
                        email             VARCHAR (50) NOT NULL UNIQUE,
                        status            TEXT NOT NULL,
                        password_h        TEXT NOT NULL,
                        created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
                        deleted_at        TIMESTAMP
                        );`
      
      try {
            await pool.query(query)
            console.log('\x1b[33m users\x1b[0m \x1b[32m table created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31m Failed to create users table\x1b[0m', error)
      }
}

async function commentsTableModel() {
      const query = `CREATE TABLE IF NOT EXISTS comments (
                        id                SERIAL PRIMARY KEY,
                        dinner_id         INT NOT NULL,
                        user_id           INT NOT NULL,
                        comment           TEXT NOT NULL,
                        created_at        TIMESTAMP NOT NULL DEFAULT NOW(),
                        deleted_at        TIMESTAMP
                        );`

      try {
            await pool.query(query)
            console.log('\x1b[33m comments\x1b[0m \x1b[32m table created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31m Failed to create comments table\x1b[0m', error)
      }
}

async function dinnersTableModel() {
      const query = `CREATE TABLE IF NOT EXISTS dinners (
                        id                SERIAL PRIMARY KEY,
                        name              TEXT NOT NULL,
                        description       TEXT NOT NULL,
                        price             INT NOT NULL,
                        day               TEXT NOT NULL
                        );`

      try {
            await pool.query(query)
            console.log('\x1b[33m dinner\x1b[0m \x1b[32m table created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31m Failed to create dinner table\x1b[0m', error)
      }
}

async function ordersTableModel() {
      const query = `CREATE TABLE IF NOT EXISTS orders (
                        id                SERIAL PRIMARY KEY,
                        dinner_id         INT NOT NULL,
                        user_id           INT NOT NULL,
                        created_at        TIMESTAMP NOT NULL DEFAULT NOW()
                        );`

      try {
            await pool.query(query)
            console.log('\x1b[33m categories\x1b[0m \x1b[32m table created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31m Failed to create categories table\x1b[0m', error)
      }
}

async function photosTableModel() {
      const query = `CREATE TABLE IF NOT EXISTS photos (
                        id                SERIAL PRIMARY KEY,
                        photo_url         TEXT NOT NULL,
                        dinner_id         INT NOT NULL
                        );`

      try {
            await pool.query(query)
            console.log('\x1b[33m photos\x1b[0m \x1b[32m table created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31m Failed to create photos table\x1b[0m', error)
      }
}

async function favoritesTableModel() {
      const query = `CREATE TABLE IF NOT EXISTS favorites (
                        user_id           INT NOT NULL,
                        dinner_id         INT NOT NULL,
                              PRIMARY KEY (user_id, dinner_id)
                        );`

      try {
            await pool.query(query)
            console.log('\x1b[33m favorites\x1b[0m \x1b[32m table created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31m Failed to create favorites table\x1b[0m', error)
      }              
}

//-------------------------------------------------------------------------------------------
// CONSTRAINTS
//-------------------------------------------------------------------------------------------

async function commentsTableConstraints() {
      const query = `ALTER TABLE IF EXISTS comments
                        ADD CONSTRAINT FK_comments_users
                              FOREIGN KEY (user_id) REFERENCES users(id),
                        ADD CONSTRAINT FK_comments_dinners
                              FOREIGN KEY (dinner_id) REFERENCES dinners(id)`
      
      try {
            await pool.query(query)
            console.log('\x1b[33m comments -> users\x1b[0m \x1b[32m relation created.\x1b[0m')
            console.log('\x1b[33m comments -> dinners\x1b[0m \x1b[32m relation created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[33m comments -> users/dinners\x1b[0m \x1b[31m relation failed.\x1b[0m', error)
      }
}

// async function dinnersTableConstraints() {
//       const query = `ALTER TABLE IF EXISTS dinners
//                         ADD CONSTRAINT FK_dinners_users
//                               FOREIGN KEY (user_id) REFERENCES users(id)`
      
//       try {
//             await pool.query(query)
//             console.log('\x1b[33m adverts -> users\x1b[0m \x1b[32m relation created.\x1b[0m')
//       }
//       catch (error) {
//             console.log('\x1b[33m adverts -> users\x1b[0m \x1b[31m relation failed.\x1b[0m', error)
//       }
// }

async function favoritesTableConstraints() {
      const query = `ALTER TABLE IF EXISTS favorites
                        ADD CONSTRAINT FK_favorites_users
                              FOREIGN KEY (user_id) REFERENCES users(id),
                        ADD CONSTRAINT FK_favorites_dinners
                              FOREIGN KEY (dinner_id) REFERENCES dinners(id)`

      try {
            await pool.query(query)
            console.log('\x1b[33m favorites -> users\x1b[0m \x1b[32m relation created.\x1b[0m')
            console.log('\x1b[33m favorites -> dinners\x1b[0m \x1b[32m relation created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[33m favorites -> users/dinners\x1b[0m \x1b[31m relation failed.\x1b[0m', error)
      }                            
}

async function photosTableConstraints() {
      const query = `ALTER TABLE IF EXISTS photos
                        ADD CONSTRAINT FK_photos_dinners
                              FOREIGN KEY (dinner_id) REFERENCES dinners(id)
                              ON DELETE CASCADE`

      try {
            await pool.query(query)
            console.log('\x1b[33m photos -> dinners\x1b[0m \x1b[32m relation created.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[33m photos -> dinners\x1b[0m \x1b[31m relation failed.\x1b[0m', error)
      }
}

//-------------------------------------------------------------------------------------------
// DELETE
//-------------------------------------------------------------------------------------------

async function deleteAllTables() {
      const query = `DROP TABLE IF EXISTS
                        users,
                        comments,
                        dinners,
                        orders,
                        photos,
                        favorites
                        `

      try {
            await pool.query(query)
            console.log('\x1b[33m All tables\x1b[0m \x1b[32m have been deleted.\x1b[0m')
      }
      catch (error) {
            console.log('\x1b[31mFailed to remove all tables.\x1b[0m', error)
      }
}

export {
            usersTableModel,
            commentsTableModel,
            dinnersTableModel,
            ordersTableModel,
            photosTableModel,
            favoritesTableModel,
            commentsTableConstraints,
            favoritesTableConstraints,
            photosTableConstraints,
            deleteAllTables
      }