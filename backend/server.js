require('dotenv').config()

const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const admin = require('firebase-admin')
const userRoutes = require('./routes/userRoutes');


// Firebase Admin SDK initialization
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})


// Express App Setup
const app = express()
app.use(cors())
app.use(express.json())

connectDB()

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
