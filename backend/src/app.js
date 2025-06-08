import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import errorHandler from '../middlewares/errorHandler.js'


const app = express()

app.use(
      morgan(
          'Received request \x1b[32m:method\x1b[36m :url\x1b[33m :status\x1b[0m'
      )
)

app.use(express.json())

app.use(cors())


app.use(errorHandler)


export default app