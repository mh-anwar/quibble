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
const path = require('path');

app.listen(port);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); //true or false??
app.use(bodyParser.json());

app.use('/api', (request, res) => {
  console.log(request.body);

  res.send({
    token: 'test12233',
  });
});

app.use('/login', (request, res) => {
  const data = request.body;
  let user = data.userName;
  let password = data.password;

  fs.readFile('./users.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data); //now it an object
      if (user in obj) {
        if (obj[user]['password'] == password) {
          res.send({ username: true, password: true });
        } else {
          res.send({ username: true, password: false });
        }
      } else {
        res.send({ username: false, password: false });
      }
    }
  });
});

app.use('/join', (request, res) => {
  const data = request.body;
  let user = data.userName;
  let email = data.email;
  let password = data.password;
  let profile = data.profile;
  let new_json = { [user]: { email, password, profile } };

  fs.readFile('./users.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data); //now it an object
      let final_json = Object.assign({}, obj, new_json);
      final_json = JSON.stringify(final_json); //convert it back to json
      fs.writeFile(
        './users.json',
        final_json,
        'utf8',
        (err) => res.send(err),
        console.log(err)
      );
    }
  });
  res.send({ success: true });
});

app.use('/postQuibb', (request, res) => {
  const data = request.body;
  let user = data.userName;
  let productName = data.productName;
  let image = data.image;
  let description = data.description;
  let time =
    new Date().getHours() +
    ':' +
    new Date().getMinutes() +
    ':' +
    new Date().getSeconds();
  let new_json = { [productName]: { user, time, image, description } };

  fs.readFile('./barters.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      let final_json = Object.assign({}, obj, new_json);
      final_json = JSON.stringify(final_json); //convert it back to json
      fs.writeFile(
        './barters.json',
        final_json,
        'utf8',
        (err) => res.send(err),
        console.log(err)
      );
    }
  });
  res.send({ success: true });
});
//Normal barter
app.use('/barters/*', (request, res) => {
  let userName = request.params['0'];
  let user_data = {};
  let general_data = {};
  let main_data = {};
  fs.readFile('./barters.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      for (let key in obj) {
        if (obj[key]['user'] != userName) {
          general_data[key] = obj[key];
        } else {
          user_data[key] = obj[key];
        }
      }
      main_data['general'] = general_data;
      main_data['user'] = user_data;
      res.send(main_data);
    }
  });
});

app.use('/editBarter/*', (request, res) => {
  let product = request.params['0'];
  let mainData = {};
  fs.readFile('./barters.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      for (let key in obj) {
        if (key === product) {
          mainData[key] = obj[key];
        }
      }
      res.send(mainData);
    }
  });
});
app.use('/userInfo/*', (request, res) => {
  let user = request.params['0'];
  let mainData = {};
  console.log(user);
  fs.readFile('./users.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data);
      console.log(obj[user]['email']);
      mainData[user] = obj[user]['email'];

      res.send(mainData);
    }
  });
});
