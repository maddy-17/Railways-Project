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

	function dispdesigners(){
		$('.details').empty();
		$('#main-footer')[0].style.position = 'relative';
		var d1 = "<div id='dispinfo' style='border-radius: 10px;border:5px black solid;background-color:black;color:white;font-family:Ubuntu;sans-serif;width:50%;appearance:none;margin:auto;min-width:250px;'><b>ADMIN:</b><p>, S&T Training Center,<br>161/1, Vellalur Road,<br>Siddhannapuram, Kallaraicheri,<br>Podanur, Coimbatore,<br>Tamil Nadu 641023</p><b>DESIGNERS:</b><br><b>APP:<br></b><b>Vikas Sampangi</b><p>B.Tech CSE, NIT-Trichy</p><b>Ashwin Shankar</b><p>B.Tech CSE, NIT-Trichy</p><b>WEBSITE:<br></b><b><a href='https://www.linkedin.com/in/madhav-prakash-170361137/'>Madhav Prakash</a></b><p>B.Tech CSE, NIT-Trichy</p></div>";
		$('.details').append(d1);
	}