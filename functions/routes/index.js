const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');
const bodyParser = require("body-parser");
const admin = require('firebase-admin');

var session = require('express-session');

router.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
}));

router.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();


let formulesRef = db.collection('Formules');

router.get('/', function (req, res, next) {
    res.render('index.ejs');
});



module.exports = router;
