//Build an API
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const port = process.env.PORT || 4000;
const barters = require('./barters.json');
//Don't serve frontend from backend
//Backend is solely an API

app.listen(port, () => {
  console.log(`listening on port ${port} ...`);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); //true or false??
app.use(bodyParser.json());

app.use('/api', (request, res) => {
  console.log(request.body);

  res.send({
    token: 'test12233',
  });
});
app.use('/barters', (request, res) => {
  res.send(barters);
});
