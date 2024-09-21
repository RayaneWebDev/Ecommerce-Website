const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes/index')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()

// Configurer body-parser avec une limite plus grande
app.use(bodyParser.json({ limit: '50mb' })); // Ajustez la taille en fonction de vos besoins
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json())
app.use(cors({
    origin : 'http://localhost:5173' ,
    credentials : true
}))


//cookies
app.use(cookieParser())  // soit etre avant les routes

// routes

app.use('/api',router)



const PORT = 8080 || process.env.PORT

connectDB().then( ()=>{
    app.listen(PORT, ()=>{
        console.log("Server is running...");
        console.log('DB connected');

    })
}).catch((err)=>{
    console.log(err);
    
})

