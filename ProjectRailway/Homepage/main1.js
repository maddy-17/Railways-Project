var config = {
  apiKey: "AIzaSyClPLO1GbsuZ8nIp2Fz1clJFbNvJYN9r4g",
  authDomain: "southernrailwayapp.firebaseapp.com",
  databaseURL: "https://southernrailwayapp.firebaseio.com",
  projectId: "southernrailwayapp",
  storageBucket: "southernrailwayapp.appspot.com",
  messagingSenderId: "454464183095"
};
firebase.initializeApp(config);

function logout(){
	firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
     if(user.email == "admin@sttcsr.com")
    {
      $('#card3')[0].style.display = 'block';
      $('#card3')[0].classList.add('col-lg-4');

      $('#card1')[0].classList.remove('col-lg-6');
      $('#card1')[0].classList.add('col-lg-4');

      $('#card2')[0].classList.remove('col-lg-6');
      $('#card2')[0].classList.add('col-lg-4');
      $('#card2')[0].style.marginBottom = '0';
      
    }
  } else {
    // No user is signed in.
    window.location='../index.html';
  }
});