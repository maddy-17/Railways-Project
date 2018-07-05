var config = {
  apiKey: "AIzaSyClPLO1GbsuZ8nIp2Fz1clJFbNvJYN9r4g",
  authDomain: "southernrailwayapp.firebaseapp.com",
  databaseURL: "https://southernrailwayapp.firebaseio.com",
  projectId: "southernrailwayapp",
  storageBucket: "southernrailwayapp.appspot.com",
  messagingSenderId: "454464183095"
};
firebase.initializeApp(config);

$(function(){
    var selectedFile;

    var temp = prompt("Do u have a PF number? ( Y / N )");

    $('#fileButton').on('change', function(e){
      selectedFile = e.target.files[0];
    });

    function uploadfile(str, ids){
      var uploader = $('#uploader');
        
        var storageRef = firebase.storage().ref('/UserPics/' + str + '/' + ids + '.jpg');
        var task = storageRef.put(selectedFile);
        task.on('state_changed',
          function progress(snapshot){
          },
          function error(err){
          },
          function complete(){
          
          }
        );
      }  

    if(temp == 'N')
    {
      var usr = document.getElementById('pfNo');
      usr.style.display = 'none';
      usr.removeAttribute('required');
      usr = document.getElementById('pfneed');
      usr.style.display = 'none';
  
      function makeid() {
        var text = "TCSR";
        var possible = "0123456789";
      
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
      }
  
      function cnfusr(){
        var theDataToAdd = makeid();
          var usersRef = firebase.database().ref('/Users/TempUsers');
  
          usersRef.child(theDataToAdd).once('value', function(snapshot) {
            if (snapshot.exists()) {
                theDataToAdd=cnfusr();
            }
            else {
              return theDataToAdd;}
           });
          return theDataToAdd;
      }
    

      $('.content').on('submit',event=>{
        event.preventDefault();
  
        var name = $('#name').val();
        var dadname = $('#dadname').val();
        var address = $("#addr").val();
        var phSelf = $("#phSelf").val();
        var phEmer = $("#phEmer").val();
        var sex = $('input[name="sex"]').val();
        var dob = $("#dob").val();
        var qual = $("#qual").val();
  
        var desig = $("#desig").val();
        var stn = $("#stn").val();
        var dvsn = $("#dvsn").val();
        var othdvsn = $("#othdvsn").val();
        var zone = $("#zone").val();
        var dept = $("#dept").val();
        var othdept = $("#othdept").val();
        var pfNo = $("#pfNo").val();
        var detRc = $("#detRc").val();
        var detFc = $("#detFc").val();
        var bccNo = $("#bccNo").val();
        var thbNo = $("#thbNo").val();
        var eccNo = $("#eccNo").val();
  
        var bldGrp= $("#bldGrp").val();
        var drugs = $("#drugs").val();
        var detBp = $("#detBp").val();
        var detSugar = $("#detSugar").val();
        var detHeartDis = $("#detHeartDis").val();
        var detEye = $("#detEye").val();
        var otherCmts = $("#otherCmts").val();
        var remarks = $("#remarks").val();
  
        var userid = cnfusr();
        uploadfile('TempUsers', userid);
        var tempId = userid;
        firebase.database().ref('Users/TempUsers/' + userid).set({
          name,
          dadname,
          address,
          phSelf,
          phEmer,
          sex,
          dob,
          qual,
    
          desig,
          stn,
          dvsn,
          othdvsn,
          zone,
          dept,
          othdept,
          pfNo,
          tempId,
          detRc,
          detFc,
          bccNo,
          thbNo,
          eccNo,
    
          bldGrp,
          drugs,
          detBp,
          detSugar,
          detHeartDis,
          detEye,
          otherCmts,
          remarks,

        });
  
        alert('Your temp ID is: ' + userid+ ' .Please note this for future applications');
        $('.content').trigger('reset');
      });
    }
  
    //perm user creation
    else{ 
      $('.content').on('submit',event=>{
        event.preventDefault();
  
        var name = $('#name').val();
        var dadname = $('#dadname').val();
        var address = $("#addr").val();
        var phSelf = $("#phSelf").val();
        var phEmer = $("#phEmer").val();
        var sex = $('input[name="sex"]').val();
        var dob = $("#dob").val();
        var qual = $("#qual").val();
  
        var desig = $("#desig").val();
        var stn = $("#stn").val();
        var dvsn = $("#dvsn").val();
        var othdvsn = $("#othdvsn").val();
        var zone = $("#zone").val();
        var dept = $("#dept").val();
        var othdept = $("#othdept").val();
        var pfNo = $("#pfNo").val();
        var detRc = $("#detRc").val();
        var detFc = $("#detFc").val();
        var bccNo = $("#bccNo").val();
        var thbNo = $("#thbNo").val();
        var eccNo = $("#eccNo").val();
  
        var bldGrp= $("#bldGrp").val();
        var drugs = $("#drugs").val();
        var detBp = $("#detBp").val();
        var detSugar = $("#detSugar").val();
        var detHeartDis = $("#detHeartDis").val();
        var detEye = $("#detEye").val();
        var otherCmts = $("#otherCmts").val();
        var remarks = $("#remarks").val();
  
        var theDataToAdd = pfNo;
        var usersRef = firebase.database().ref('/Users/PermUsers');
  
        usersRef.child(theDataToAdd).once('value', function(snapshot) {
          if (snapshot.exists()) {
            alert('User '+pfNo+' already exists, please head over to "Add Courses" Section');
            location.reload();
          }
          else{
            uploadfile('PermUsers', pfNo);
            firebase.database().ref('Users/PermUsers/' + pfNo).set({
              name,
              dadname,
              address,
              phSelf,
              phEmer,
              sex,
              dob,
              qual,
        
              desig,
              stn,
              dvsn,
              othdvsn,
              zone,
              dept,
              othdept,
              pfNo,
              detRc,
              detFc,
              bccNo,
              thbNo,
              eccNo,
        
              bldGrp,
              drugs,
              detBp,
              detSugar,
              detHeartDis,
              detEye,
              otherCmts,
              remarks,
            });
            alert('User with PF Number ' + pfNo + ' has been created');
          }
        });
        $('.content').trigger('reset');
      });
  
    }
  });
    
  function logout(){
    firebase.auth().signOut();
  }

   firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
        window.location='../../index.html';
      }
    });

  function myfn(a){
  
    var x = document.getElementsByClassName("chkbox");
    
      var y = x[a-1].getElementsByTagName('input');
      var z=y[0],w=y[1];
  
      if (z.checked == true){
        w.style.display = 'block';
        w.required='true';
      } 
      else{
        w.style.display = 'none';
        w.removeAttribute("required"); 
      }
  }
  
  function deptfn(str){
    var x =$('#' + str).val();
    if( x == 'Others'){
      $('#' + str + 'Need')[0].style.display = 'block';
      $('#oth' + str ).required = 'true';
    }
    else{
      $('#' + str + 'Need')[0].style.display = 'none';
      $('#oth' + str )[0].removeAttribute('required');     
    }
  }  