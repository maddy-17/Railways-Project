var config = {
	apiKey: "AIzaSyClPLO1GbsuZ8nIp2Fz1clJFbNvJYN9r4g",
	authDomain: "southernrailwayapp.firebaseapp.com",
	databaseURL: "https://southernrailwayapp.firebaseio.com",
	projectId: "southernrailwayapp",
	storageBucket: "southernrailwayapp.appspot.com",
	messagingSenderId: "454464183095"
};
firebase.initializeApp(config);

$(window).on('load', function() {
	$('#loading').fadeOut("slow");
});

	function login(){
		var userid=document.getElementById("userid").value;
		var userpwd=document.getElementById("pwd").value;

		firebase.auth().signInWithEmailAndPassword(userid, userpwd).catch(function(error) {
		  var errorCode = error.code;
		  var errorMessage = error.message;
			window.alert("Error : " + errorMessage);
			$('#loading').hide();			
			return;
		});
	$('#loading').fadeIn("slow");

	}

	firebase.auth().onAuthStateChanged(user => {
	  if (user) {
	    window.location='Homepage/index.html';
	  }
	});