import app from './app.js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import cleanTables from '../database/cleanTables.js'


dotenv.config({
      path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../.env')
})

const {
      PORT,
      HOST
} = process.env

async function startServer() {
      try {
            // cleanTables()
            app.listen(PORT, HOST, () => {
                  console.log(`Server started at http://${HOST}:${PORT}`)
            })
      }
      catch (error) {
            console.log("Failed starting server", error)
      }
}

startServer()
