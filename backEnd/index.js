const connectToMongo = require('./db.js');
const express = require('express')

connectToMongo();

const app = express()
const port = 3000


app.use(express.json());

//Available routes 
// app.use('/', (req,res)=>{
//     res.send('Welecome the first route')
// })

app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})