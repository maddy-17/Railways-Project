var config = {
  apiKey: "AIzaSyClPLO1GbsuZ8nIp2Fz1clJFbNvJYN9r4g",
  authDomain: "southernrailwayapp.firebaseapp.com",
  databaseURL: "https://southernrailwayapp.firebaseio.com",
  projectId: "southernrailwayapp",
  storageBucket: "southernrailwayapp.appspot.com",
  messagingSenderId: "454464183095"
};
firebase.initializeApp(config);
x=1;
if (window.history && history.pushState && (window.history.length>1)) {
  addEventListener('load', function() {
    history.pushState(null, null, null); // creates new history entry with same URL
    addEventListener('popstate', function() {
          var stayOnPage = confirm("Would you like to logout?");
          if (!stayOnPage) {
          } else {
              logout();
            }
      });    
  });
}
firebase.auth().onAuthStateChanged(user => {
  if (user) {
	$('#loading').fadeOut(1000);
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
    history.go(-(history.length - 2));
  }
}); 
console.log(document.referrer);
function logout(){
  firebase.auth().signOut();
}

