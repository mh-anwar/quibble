//Build an API
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const port = process.env.PORT || 4000;
const barters = require('./barters.json');
const fs = require('fs');

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

app.use('/join', (request, res) => {
  const data = request.body;
  let user = data.userName;
  let email = data.email;
  let password = data.password;
  let profile = data.profile;
  let new_json = { [user]: { email, password, profile } };

  console.log('initial data', new_json);

  fs.readFile('./users.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data); //now it an object
      let final_json = Object.assign({}, obj, new_json);
      final_json = JSON.stringify(final_json); //convert it back to json
      fs.writeFile('./users.json', final_json, 'utf8', (err) =>
        console.log(err)
      ); // write it back
    }
  });
  res.send({ success: true });
});

app.use('/barters', (request, res) => {
  res.send(barters);
});
