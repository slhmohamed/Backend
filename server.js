const express = require('express')
 const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const cors = require('cors')
// Config dotev
require('dotenv').config()

//creation de serveur express
const app = express()

// Connect to database
connectDB();

// body parser
app.use(bodyParser.json())
// Load routes
const authRouter = require('./routes/auth.route')
const userRouter = require('./routes/user.route')
const clientRouter = require('./routes/client.route');
const impayeRouter = require('./routes/impaye.route')
const logRoute=require('./routes/log.route')
 
 
// Dev Logginf Middleware
 
    app.use(cors( ))
     
 

// Use Routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/client', clientRouter)
app.use('/api/impaye', impayeRouter)
app.use('/api/log', logRoute)
 
 
app.use('/upload',express.static(__dirname+'/upload'));
app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded" 
    })
})

 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { 
    console.log(`App listening on port ${PORT}`);
});