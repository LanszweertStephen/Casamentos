// TODO: change url's
//// TODO: maybe send the verification email first
const loginUrl = "http://localhost:5000/logIn";
const loggedInUrl = "http://localhost:5000/login";
const registerUrl = "http://localhost:5000/register";
const accountUrl = "http://localhost:5000/goToAccount";
var config = {
  apiKey: "AIzaSyBG-ahO2gR1OBlCCuErWMoQKsgBIr692qk",
  authDomain: "casamentos-16f05.firebaseapp.com",
  projectId: "casamentos-16f05",
};
firebase.initializeApp(config);
const auth = firebase.auth();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    if (document.URL == loginUrl || document.URL == registerUrl) {
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
  } else {
    // No user is signed in.
    if (document.URL == loggedInUrl || document.URL == accountUrl) {
      fetch("http://localhost:5000/logOut", {
        method: 'GET',
      }).then((res) => {
        location.href = 'http://localhost:5000/'
      });
    }
  }
});


if (document.URL == loggedInUrl || document.URL == accountUrl) {
  let btnLogout = document.getElementById('btnLogout');
  btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  });
} else if (document.URL == loginUrl) {
  let btnSignIn = document.getElementById('signInBtn');
  btnSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    let passedInEmail = document.getElementById('email');
    let passedInPassword = document.getElementById('password');
    auth.signInWithEmailAndPassword(passedInEmail.value, passedInPassword.value)
      .catch(e => console.log(e.message));
  });
} else if (document.URL == registerUrl) {
  let btnRegister = document.getElementById('btnRegister');
  btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    let passedInEmailRegister = document.getElementById('email');
    let passedInPasswordRegister = document.getElementById('password');
    firebase.auth().createUserWithEmailAndPassword(passedInEmailRegister.value, passedInPasswordRegister.value)
      .catch((e) => console.log(e.message));
  })
}
