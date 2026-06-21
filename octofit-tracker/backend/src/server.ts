import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 8000)
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db'

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
  })
})

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log(`Connected to MongoDB: ${mongoUri}`)
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`)
})
