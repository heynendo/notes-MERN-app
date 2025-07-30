import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from './routes/authRoutes.js'
import noteRoutes from './routes/notesRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
]

// middleware
app.use(cors({origin: allowedOrigins}))
app.use(express.json())

// routes
app.use('/api/auth', authRoutes)
app.use('/api/notes', noteRoutes)

// mongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(port, () => console.log(`Server running on port ${port}`))
  })
  .catch(err => console.error(err))