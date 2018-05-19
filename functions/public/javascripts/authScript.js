// TODO: change url's
// TODO: maybe send the verification email first
// TODO: fix error handling
const loginUrl = "http://localhost:5000/logIn";
const loggedInUrl = "http://localhost:5000/login";
const registerUrl = "http://localhost:5000/register";
const accountUrl = "http://localhost:5000/goToAccount";
const formuleUrl = "http://localhost:5000/bestelFormule";
var config = {
  apiKey: "AIzaSyBG-ahO2gR1OBlCCuErWMoQKsgBIr692qk",
  authDomain: "casamentos-16f05.firebaseapp.com",
  projectId: "casamentos-16f05",
};
firebase.initializeApp(config);
const auth = firebase.auth();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (document.URL == loginUrl || document.URL == registerUrl || document.URL == formuleUrl) {
      setUser(user);
    }
  } else {
    if (document.URL == loggedInUrl || document.URL == accountUrl) {
      sendLogout();
    }
  }
});


if (document.URL == loggedInUrl || document.URL == accountUrl) {
  handleLogout();
  handleDeleteAccount();
} else if (document.URL == loginUrl || document.URL == formuleUrl) {
  handleLogin();
} else if (document.URL == registerUrl) {
  handleRegister();
}

function setUser(user) {
  fetch("http://localhost:5000/setUser", {
    method: 'POST',
    body: JSON.stringify(user.providerData),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then((res) => {
    document.getElementById('signIn').submit();
  });
}

function sendLogout() {
  fetch("http://localhost:5000/logOut", {
    method: 'GET',
  }).then((res) => {
    location.href = 'http://localhost:5000/'
  });
}


function handleLogout() {
  let btnLogout = document.getElementById('btnLogout');
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });
}

function handleDeleteAccount() {
  let btnDelete = document.getElementById('btnDeleteAccount');
  btnDelete.addEventListener('click', (e) => {
    e.preventDefault();
    deleteAccount();
  })
}

function handleRegister() {
  let btnRegister = document.getElementById('btnRegister');
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    let passedInEmailRegister = document.getElementById('email').value;
    let passedInPasswordRegister = document.getElementById('password').value;
    let passedInPasswordRegisterAgain = document.getElementById('retypPassword').value;
    if (passedInPasswordRegister == passedInPasswordRegisterAgain) {
      registerWithEmail(passedInEmailRegister, passedInPasswordRegister);
    } else {
      setError("The password and password again don't match");
    }
  });
}


function handleLogin() {
  let btnSignIn = document.getElementById('signInBtn');
  btnSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    let passedInEmail = document.getElementById('email').value;
    let passedInPassword = document.getElementById('password').value;
    loginWithEmail(passedInEmail, passedInPassword);
  });
}

function loginWithEmail(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .catch(e => setError(e.message));
}

function registerWithEmail(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((e) => setError(e.message));
}

function logout() {
  firebase.auth().signOut().then(function() {}).catch(function(error) {});
}

function deleteAccount() {
  var user = firebase.auth().currentUser;
  user.delete().then(function() {
    sendLogout();
  }).catch(function(error) {});
}

function setError(msg){
  document.getElementById('error').innerHTML = msg;
}