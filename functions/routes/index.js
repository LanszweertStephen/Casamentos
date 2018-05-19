const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');
const bodyParser = require("body-parser");
var admin = require('firebase-admin');

admin.initializeApp({
  databaseURL: 'https://casamentos-16f05.firebaseio.com/'
});


let db = admin.firestore();

let formulesRef = db.collection('Formules');
let usersRef = db.collection('Users');

router.use(function(req, res, next) {
  if (res.locals.user == null) {
    res.locals.user = null;
  }
  next();
});

let loggedInUser = null;

router.get('/', function(req, res, next) {
  res.render('index', {
    user: loggedInUser
  });
});

router.get('/formules', function(req, res, next) {
  let formules = [];
  formulesRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        formules.push(doc.data());
      });
      res.render('formules', {
        formules: formules,
        user: loggedInUser
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
});

router.get('/bestelFormule', function(req, res, next) {
  var formuleId = req.query.formuleId;
  res.render('bestelFormulier', {
    user: loggedInUser
  });
});

router.post('/setUser', (req, res, next) => {
  loggedInUser = req.body[0];
  res.send("user set to values");
});

router.post('/login', function(req, res, next) {
  res.render('loggedIn', {
    user: loggedInUser
  });
});


router.get('/logIn', function(req, res, next) {
  res.render('login', {
    user: loggedInUser
  });
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    user: loggedInUser
  });
});

router.get('/contact', function(req, res, next) {
  res.render('contact',{user:loggedInUser});
});

router.get('/fotogalerij', function(req, res, next) {
  res.render('fotogalerij',{user:loggedInUser});
});

router.get('/logOut', function(req, res, next) {
  loggedInUser = null;
  res.send('user set to null');
});

router.get('/goToAccount', function(req, res, next) {
  res.render('loggedIn', {
    user: loggedInUser
  });
});

module.exports = router;
