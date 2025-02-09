const connectToMongo = require('./db');

const express = require('express')
connectToMongo();
var cors = require('cors')

const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
//available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`iNotebook backend app listening on port http://localhost:${port}`)
})