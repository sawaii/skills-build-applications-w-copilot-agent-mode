import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes.js'
import { connectDB, MONGODB_URI } from './config/database.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 8000)
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker API')
})

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker backend is running',
    port,
    baseUrl,
  })
})

app.use('/api', routes)

connectDB()
  .then(() => {
    console.log(`Connected to MongoDB: ${MONGODB_URI}`)
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })

app.listen(port, () => {
  console.log(`Backend server listening on ${baseUrl}`)
})
