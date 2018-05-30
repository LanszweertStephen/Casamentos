const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');
const bodyParser = require("body-parser");
var admin = require('firebase-admin');

admin.initializeApp({
  databaseURL: 'https://casamentos-16f05.firebaseio.com/'
});

let loggedInUser = null;


let db = admin.firestore();
router.use(function(req, res, next) {
  res.locals.user = loggedInUser;
  next();
});


function getFormules(cb) {
  let formulesRef = db.collection('Formules');
  let formules = [];
  formulesRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        formules.push(doc.data());
      });
      cb(formules);
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}

function addBestelling(req, cb) {
  let bestellingenRef = db.collection('Bestellingen');
  bestellingenRef.add({
      user: loggedInUser.email,
      type: req.body.type,
      locatie: req.body.locatie,
      dag: req.body.dag,
      opmerkingen: req.body.opmerkingen
    }).then(function(docRef) {
      cb();
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

function getBestellingen(cb) {
  let bestellingenRef = db.collection('Bestellingen');
  let bestellingen = [];
  bestellingenRef.where("user", "==", loggedInUser.email).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        bestellingen.push(doc.data());
      });
      cb(bestellingen);
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });
}

router.get('/', function(req, res, next) {
  res.render('index', {
    user: loggedInUser
  });
});

router.get('/formules', function(req, res, next) {
  getFormules((formules) => {
    res.render('formules', {
      user: loggedInUser,
      formules: formules
    })
  });
});

router.get('/lookOrders',function(req,res,next){
    getBestellingen((bestellingen)=>{
      res.render('bestellingen',{
        user:loggedInUser,
        bestellingen:bestellingen
      })
    })
});

router.post('/bestel', function(req, res, next) {
  addBestelling(req, () => {
    getBestellingen((bestellingen) => {
      res.render('bestellingen', {
        user: loggedInUser,
        bestellingen: bestellingen
      })
    })
  })
});

router.get('/bestelFormule', function(req, res, next) {
  if (loggedInUser == null) {
    // FIXME: fix the login after clicked on a formule
    res.render("login", {
      user: loggedInUser
    });
  } else {
    getFormules((formules) => {
      res.render('bestelFormulier', {
        user: loggedInUser,
        formules: formules
      })
    });
  }
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
  res.render('contact', {
    user: loggedInUser
  });
});

router.get('/fotogalerij', function(req, res, next) {
  res.render('fotogalerij', {
    user: loggedInUser
  });
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


router.get('/changeProfile', function(req, res, next) {
  res.render('changeProfile', {
    user: loggedInUser
  });
})


module.exports = router;
