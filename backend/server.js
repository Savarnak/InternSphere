import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import jobsRouter from './routes/jobs.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => res.json({ ok: true }))
app.use('/api/jobs', jobsRouter)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`API Endpoint: http://localhost:${PORT}/api/jobs?q=intern`)
})
