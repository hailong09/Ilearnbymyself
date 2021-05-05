require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post');
const PORT = 8080 || process.env.PORT;
// const dbUrll = 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("mongoDB connected")
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
connectDB();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes);


app.listen(PORT, () => console.log(`Server lisneing on port ${PORT}`))