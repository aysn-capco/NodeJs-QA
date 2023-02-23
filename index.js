const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000

require('./routes/card.routes')(app);

app.get('/', (req, res) => {
  res.send('Hello cards!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
