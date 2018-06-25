$(function(){
    var config = {
      apiKey: "AIzaSyDobO_q3o5vitRX53WoCDuz142XCVdsfeQ",
      authDomain: "learn1-5cc0d.firebaseapp.com",
      databaseURL: "https://learn1-5cc0d.firebaseio.com",
      projectId: "learn1-5cc0d",
      storageBucket: "learn1-5cc0d.appspot.com",
      messagingSenderId: "276613014482"
    };
  
    firebase.initializeApp(config);

    var temp = prompt("Do u have a PF number? ( Y / N )");

    if(temp == 'N') {
        var usr = document.getElementById('pfNo');
        usr.removeAttribute('required');
        usr = document.getElementById('pfNeed');
        usr.style.display = 'none';
        usr = document.getElementById('tempNeed');
        usr.style.display = 'block';

        function dispdata(snapshot){
            var usr = document.getElementById('displayData');
            usr.style.display = 'block';
            $('#p1')[0].innerHTML = 'Name: ' + snapshot.child("name").val();
            $('#p2')[0].innerHTML = "Father's Name: " + snapshot.child("dadname").val();
            $('#p3')[0].innerHTML = "Designation: " + snapshot.child("desig").val();          
        }

        function cnfusr(id){
            var usersRef = firebase.database().ref('/Users/TempUsers');
            usersRef.child(id).once('value', function(snapshot) {
                if (snapshot.exists()) {
                    dispdata(snapshot);
                    var x=$('#addDetails');
                    x[0].style.display = 'block' ;
                }
                else {
                    alert('The given Temperory ID '+ id + ' does not exist. Please give the correct ID or head over to "Add new Trainees" to create a new ID');
                    $('.content').trigger('reset');              
                    var x = $('.req');
                    for( var i =0; i< x.length ;i++)
                    {
                        x[i].removeAttribute("required");
                    }                  
                }
           });
        }

        var glousr;

        $('#button1').on('click',event=>{
            event.preventDefault();
            document.getElementById('displayData').style.display = 'none';
            glousr = $('#tempId').val();
            if(glousr == ""){
                alert('Enter a valid Temperory ID. DO NOT leave it empty');
            }
            else{
                cnfusr(glousr);
            }
        });

        $('.content').on('submit',event=>{
            event.preventDefault();
            var courseId = $('#courseId').val();
            var courseName = $('#courseName').val();
            var durs = $("#durs").val();
            var dure = $("#dure").val();
            var dept = $("#dept").val();

            var theDataToAdd = glousr;

                var usersRef = firebase.database().ref('/Courses/TempUsers/'+theDataToAdd);
        
                usersRef.child(courseId).once('value', function(snapshot) {
                if (snapshot.exists()) {
                    alert('The course '+courseId+', '+courseName+' has already been registered, please specify only new courses');
                    $('.content').trigger('reset');
                    
                }
                else{
                    firebase.database().ref('/Courses/TempUsers/' + theDataToAdd).child(courseId).set({
                    courseId,
                    courseName,
                    durs,
                    dure,
                    dept
                    });
                    alert('Course '+courseId+', '+courseName+' is successfully registered' );
                    $('.content').trigger('reset');
                    
                }
                });
            
        });
    }
  
    //perm user add course
    else{ 
        var usr = document.getElementById('tempId');
        usr.removeAttribute('required');
    
        function dispdatap(snapshot){
            var usr = document.getElementById('displayData');
            usr.style.display = 'block';
            $('#p1')[0].innerHTML = 'Name: ' + snapshot.child("name").val();
            $('#p2')[0].innerHTML = "Father's Name: " + snapshot.child("dadname").val();
            $('#p3')[0].innerHTML = "Designation: " + snapshot.child("desig").val();
        }

        function cnfusrp(id){
            var usersRef = firebase.database().ref('/Users/PermUsers');
            usersRef.child(id).once('value', function(snapshot) {
                if (snapshot.exists()) {
                    dispdatap(snapshot);
                    var x=$('#addDetails');
                    x[0].style.display = 'block' ;
                }
                else {
                    alert('The given PF Number '+ id + ' does not exist. Please give the correct ID or head over to "Add new Trainees" to create a new ID');
                    $('.content').trigger('reset');
                    var x = $('.req');
                    for( var i =0; i< x.length ;i++)
                    {
                        x[i].removeAttribute("required");
                    }        
                }
            });
        }
        var glousr;
        $('#button1').on('click',event=>{
            event.preventDefault();
            glousr = $('#pfNo').val();
            document.getElementById('displayData').style.display = 'none';            
            if(glousr == ""){
                alert('Enter a valid PF Number. DO NOT leave it empty');
            }
            else{
            cnfusrp(glousr);
            }    
        });

        $('.content').on('submit',event=>{
            event.preventDefault();
            var courseId = $('#courseId').val();
            var courseName = $('#courseName').val();
            var durs = $("#durs").val();
            var dure = $("#dure").val();
            var dept = $("#dept").val();

            var theDataToAdd = glousr;

                var usersRef = firebase.database().ref('/Courses/PermUsers/'+theDataToAdd);
        
                usersRef.child(courseId).once('value', function(snapshot) {
                if (snapshot.exists()) {
                    alert('The course '+courseId+', '+courseName+' has already been registered, please specify only new courses');
                    $('.content').trigger('reset');
                }
                else{
                    firebase.database().ref('/Courses/PermUsers/' + theDataToAdd).child(courseId).set({
                    courseId,
                    courseName,
                    durs,
                    dure,
                    dept
                    });
                    alert('Course '+courseId+', '+courseName+' is successfully registered' );
                    location.reload();
                    
                }
                });
        });
    }
      
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
        } else {
            // No user is signed in.
            window.location='../../index.html';
        }
    });

    
});

function logout(){
    firebase.auth().signOut();
}

function deptfn(){
    var x = document.getElementById('dept').value;

    if( x == 'others'){
        var y = document.getElementById('deptNeed');
        y.style.display = 'block';    
        var z = document.getElementById('othDept');
        z.required = 'true';
    }
    else{
        var y = document.getElementById('deptNeed');
        y.style.display = 'none';
        var z = document.getElementById('othDept');
        z.removeAttribute("required");
    }
}
