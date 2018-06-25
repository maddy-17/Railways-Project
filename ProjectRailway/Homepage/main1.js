function logout(){
	firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
    window.location='../index.html';
  }
});