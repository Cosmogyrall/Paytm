const express = require('express')
const app = express()
const mainRouter  = require("../backend/Routes/index")
const cors = require('cors')
const port = 3000

//use of cors and body parser middleware
app.use(cors())
app.use(express.json())

//using the mainROuter for all the requests to /api/v1/
app.use('/api/v1', mainRouter);

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})