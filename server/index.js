const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Drive } = require('deta');
const path = require('path');

const app = express();
const userDrive = Drive('users');
const bartersDrive = Drive('barters');

app.listen(process.env.PORT || 4000, '0.0.0.0');
app.use(express.static(path.resolve(__dirname, './build')));
app.use(cors());

// Parses HTTP Request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', async (request, res) => {
  const data = request.body;
  let user = data.userName;
  let password = data.password;
  // Retrieve user data from Deta Drive, parse from Blob into JSON
  userDrive
    .get('userData.txt')
    .then((data) => data.text())
    .then((data) => JSON.parse(data))
    .then((dataObject) => {
      // Determine if user exists
      if (user in dataObject) {
        if (dataObject[user]['password'] == password) {
          res.send({ username: true, password: true });
        } else {
          res.send({ username: true, password: false });
        }
      } else {
        res.send({ username: false, password: false });
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
  // Retrieve user data from Deta Drive, parse from Blob into JSON
  userDrive
    .get('userData.txt')
    .then((data) => data.text())
    .then((data) => JSON.parse(data))
    .then((dataObject) => {
      let finalJSON = Object.assign({}, dataObject, new_json);
      finalJSON = JSON.stringify(finalJSON); //convert it back to json
      userDrive.put('userData.txt', {
        data: finalJSON,
        contentType: 'text/plain',
      });
    });
  res.send({ success: true });
});

app.use('/postQuibb', (request, res) => {
  const data = request.body;
  let user = data.userName;
  let productName = data.productName;
  let image = data.image;
  let description = data.description;
  let detaileDescription = data.detailedDescription;
  let time =
    new Date().getHours() +
    ':' +
    new Date().getMinutes() +
    ':' +
    new Date().getSeconds();
  let new_json = {
    [productName]: { user, time, image, description, detaileDescription },
  };

  bartersDrive
    .get('barterData.txt')
    .then((data) => data.text())
    .then((data) => JSON.parse(data))
    .then((dataObject) => {
      let finalJSON = Object.assign({}, dataObject, new_json);
      finalJSON = JSON.stringify(finalJSON); //convert it back to json
      bartersDrive.put('barterData.txt', {
        data: finalJSON,
        contentType: 'text/plain',
      });
    });

  res.send({ success: true });
});

app.use('/barters/*', (request, res) => {
  let userName = request.params['0'];
  let user_data = {};
  let general_data = {};
  let mainData = {};
  bartersDrive
    .get('barterData.txt')
    .then((data) => data.text())
    .then((data) => JSON.parse(data))
    .then((dataObject) => {
      for (let key in dataObject) {
        if (dataObject[key]['user'] != userName) {
          general_data[key] = dataObject[key];
        } else {
          user_data[key] = dataObject[key];
        }
      }
      mainData['general'] = general_data;
      mainData['user'] = user_data;
      res.send(mainData);
    });
});

app.use('/editBarter/*', (request, res) => {
  let product = request.params['0'];
  let mainData = {};
  bartersDrive
    .get('barterData.txt')
    .then((data) => data.text())
    .then((data) => JSON.parse(data))
    .then((dataObject) => {
      for (let key in dataObject) {
        if (key === product) {
          mainData[key] = dataObject[key];
        }
      }
      res.send(mainData);
    });
});
app.use('/userInfo/*', (request, res) => {
  let user = request.params['0'];
  let mainData = {};
  userDrive
    .get('userData.txt')
    .then((data) => data.text())
    .then((data) => JSON.parse(data))
    .then((dataObject) => {
      mainData[user] = dataObject[user]['email'];
      res.send(mainData);
    });
});
app.use('/userProfile/*', (request, res) => {
  let user = request.params['0'];
  let mainData = {};
  userDrive
    .get('userData.txt')
    .then((data) => data.text())
    .then((data) => JSON.parse(data))
    .then((dataObject) => {
      mainData[user] = dataObject[user]['profile'];
      res.send(mainData);
    });
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});
