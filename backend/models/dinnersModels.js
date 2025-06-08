import { pool } from '../database/database.js'

async function createDinnerModel({name, description, price, day}) {
      const query = `INSERT INTO adverts (name, description, price, day)
                        VALUES ( $1, $2, $3, $4)`
                        
      const values = [name, description, price, day]
      
      try {
            await pool.query(query, values)  
      }
      catch(error) {
            console.log("Failed to write dinner to database.", error)
      }
}

async function updateDinnerModel({dinnerId, name, description, price, day}) {
      const query = `UPDATE ONLY dinners
                        SET   name = COALESCE($2, name),
                              description = COALESCE($3, description),
                              price = COALESCE($4, price),
                              day = COALESCE($5, day)
                        WHERE id = $1`

      const values = [dinnerId, name, description, price, day]

      try {
            await pool.query(query, values)
      }
      catch(error) {
            console.log("Failed to update dinner in database.", error)
      }
}

async function getAllDinnersModel() {
      
      const query = `SELECT   dinners.id,
                              dinners.name AS "dinnerName",
                              dinners.description,
                              dinners.price,
                              COUNT (favorites.dinner_id) AS rating
                              FROM dinners
                                    LEFT JOIN favorites
                                          ON favorites.dinner_id = dinners.id
                                GROUP BY
                                    dinners.id,
                                    dinnerName,
                                    dinners.description,
                                    dinners.price
                              ORDER BY adverts.created_at`

      try {
            const result = await pool.query(query)
            return result.rows
      }
      catch {
            console.log("Error getting all adverts.", error)
            throw error
      }
}


async function deleteDinnerModel({id}) {
      const query = `DELETE FROM dinners
                        WHERE id = $1`

      const values = [id]

      try {
            await pool.query(query, values)
      }
      catch(error) {
            console.log("Failed to delete dinner from database.", error)
            throw error
      }
}



export { createDinnerModel, deleteDinnerModel, getAllDinnersModel, updateDinnerModel }