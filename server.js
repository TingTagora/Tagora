import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

// Serve static files from dist
const distPath = path.join(__dirname, 'dist')
app.use(express.static(distPath))

// API routes (if you have any future backend endpoints)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// React Router fallback for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
