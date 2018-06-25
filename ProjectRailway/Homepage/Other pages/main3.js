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
  
      function dispdata(){
          var usr = document.getElementById('displayData');
          usr.style.display = 'block';
          console.log('hi');
      }

      function cnfusr(id){
          var usersRef = firebase.database().ref('/Users/TempUsers');
          usersRef.child(id).once('value', function(snapshot) {
            if (snapshot.exists()) {
                dispdata();
            }
            else {
              alert('The given Temperory ID '+ id + ' does not exist. Please give the correct ID or head over to "Add new Trainees" to create a new ID');
            }
           });
      }

      $('#firstip').on('submit',function(event){
        event.preventDefault();
        var id = $('#tempId').val();
        cnfusr(id);
      });

      $('#addDetails').on('submit',event=>{
        event.preventDefault();
  
        var courseId = $('#courseId').val();
        var courseName = $('#courseName').val();
        var durs = $("#durs").val();
        var dure = $("#dure").val();
        var dept = $("#dept").val();

        var theDataToAdd = $('#tempId').val();
        
        var usersRef = firebase.database().ref('/Courses/TempUsers/'+theDataToAdd);
  
        usersRef.child(courseId).once('value', function(snapshot) {
          if (snapshot.exists()) {
            alert('The course '+courseId+', '+courseName+' has already been registered, please specify only new courses');
            $('#addDetails').trigger('reset');
            
          }
          else{
            firebase.database().ref('/Courses/TempUsers/' + theDataToAdd).set({
              courseId,
              courseName,
              durs,
              dure,
              dept
            });
          }
        });
        $('#addDetails').trigger('reset');
      });
    }
  
    //perm user add course
    else{ 
        var usr = document.getElementById('tempId');
        usr.removeAttribute('required');
    
        function dispdatap(){

            var usr = document.getElementById('displaydata');
            usr.style.display = 'block';
        }

        function cnfusrp(id){
            var usersRef = firebase.database().ref('/Users/PermUsers');
            usersRef.child(id).once('value', function(snapshot) {
                if (snapshot.exists()) {
                    dispdatap();
                }
                else {
                alert('The given PF Number '+ id + ' does not exist. Please give the correct ID or head over to "Add new Trainees" to create a new ID');
                }
            });
        }

        $('#firstip').on('submit',event=>{
            event.preventDefault();
            var id = $('#pfNo').val();
            cnfusrp(id);
            console.log('hi');
        });


      $('#addDetails').on('submit',event=>{
        event.preventDefault();
  
        var courseId = $('#courseId').val();
        var courseName = $('#courseName').val();
        var durs = $("#durs").val();
        var dure = $("#dure").val();
        var dept = $("#dept").val();

        var theDataToAdd = $('#pfNo').val();
        
        var usersRef = firebase.database().ref('/Courses/PermUsers/'+theDataToAdd);
  
        usersRef.child(courseId).once('value', function(snapshot) {
          if (snapshot.exists()) {
            alert('The course '+courseId+', '+courseName+' has already been registered, please specify only new courses');
           $('#addDetails').trigger('reset');
            
          }
          else{
            firebase.database().ref('/Courses/PermUsers/' + theDataToAdd).set({
              courseId,
              courseName,
              durs,
              dure,
              dept
            });
          }
        });
        $('#addDetails').trigger('reset');
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
  
  function uploadfile(){
    
  }
  
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