const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.post('/test', (req,res)=>{

  console.log(req.body)

  res.json(req.body.message)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})