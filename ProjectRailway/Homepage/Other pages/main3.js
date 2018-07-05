var config = {
    apiKey: "AIzaSyClPLO1GbsuZ8nIp2Fz1clJFbNvJYN9r4g",
    authDomain: "southernrailwayapp.firebaseapp.com",
    databaseURL: "https://southernrailwayapp.firebaseio.com",
    projectId: "southernrailwayapp",
    storageBucket: "southernrailwayapp.appspot.com",
    messagingSenderId: "454464183095"
  };
firebase.initializeApp(config);
var gloId;
$(function(){
    
    function dispdata(snapshot){
        var usr = document.getElementById('displayData');
        usr.style.display = 'block';
        $('#p1')[0].innerHTML = 'Name: ' + snapshot.child("name").val();
        $('#p2')[0].innerHTML = "Father's Name: " + snapshot.child("dadname").val();
        $('#p3')[0].innerHTML = "Designation: " + snapshot.child("desig").val();          
    }

    function cnfusr(id, txtpath, txt){
        var usersRef = firebase.database().ref('/Users/'+txtpath);
        usersRef.child(id).once('value', function(snapshot) {
            if (snapshot.exists()) {
                dispdata(snapshot);
                var x=$('#addDetails');
                x[0].style.display = 'block' ;
            }
            else {
                alert('The given'+ txt + id + ' does not exist. Please give the correct ID or head over to "Add new Trainees" to create a new user');
                $('.content').trigger('reset'); 
                $('#addDetails')[0].style.display = 'none';             
                var x = $('.req');
                for( var i =0; i< x.length ;i++)
                {
                    x[i].removeAttribute("required");
                }                  
            }
       });
    }

    var glousr;
    
    function getusr(idpath, txtpath, txt){
        document.getElementById('displayData').style.display = 'none';
        glousr = $('#'+idpath).val();
        if(glousr == ""){
            alert('Enter a valid' + txt + 'DO NOT leave it empty');
        }
        else{
            cnfusr(glousr,txtpath,txt);
        }
    }

    function addData(txtpath){
        var cdept = $("#dept").val();

        var courseId = $('#crse' + gloId ).val();
        var courseName = $('#courseName').val();
        var batchNo = $('#batchNo').val();
        var durs = $("#durs").val();
        var dure = $("#dure").val();
        
        var theDataToAdd = glousr;

        var usersRef = firebase.database().ref('/Courses/' + txtpath + '/'+theDataToAdd);
        usersRef.child(courseId).once('value', function(snapshot) {
            if (snapshot.exists()) {
                alert('The course '+courseId+', '+courseName+' has already been registered, please specify only new courses');
                $('.content').trigger('reset');
                $()
            }
            else{

                firebase.database().ref('/Courses/' + txtpath + '/' + theDataToAdd).child(courseId).set({
                cdept,
                courseId,
                courseName,
                batchNo,
                durs,
                dure,
                },function(error){
                    if(error){
                        alert(error);
                    }
                    else{
                        alert('Course '+courseId+', '+courseName+' is successfully registered' );
                    }
                });
                firebase.database().ref('/Courses/' + "cdept" + '/' + cdept).child(theDataToAdd).set({
                    courseId,
                    id:theDataToAdd,
                    courseName,
                    batchNo,
                    durs,
                    dure,
                });

                firebase.database().ref('/Courses/' + "batchNo" + '/' + batchNo).child(theDataToAdd).set({
                    cdept,
                    id:theDataToAdd,
                    courseId,
                    courseName,
                    durs,
                    dure,
                });

                
                firebase.database().ref('/Courses/' + "courseId" + '/' + courseId).child(theDataToAdd).set({
                    cdept,
                    id:theDataToAdd,
                    batchNo,
                    courseName,
                    durs,
                    dure,
                });

                firebase.database().ref('/Courses/' + "courseId" + '/' + courseId).child(theDataToAdd).set({
                    cdept,
                    batchNo,
                    id:theDataToAdd,
                    courseName,
                    durs,
                    dure,
                });

                $('.content').trigger('reset');    
            }
        });
    }
    
    var temp = prompt("Do u have a PF number? ( Y / N )");

    if(temp == 'N') {
        var usr = document.getElementById('pfNo');
        usr.removeAttribute('required');
        usr = document.getElementById('pfNeed');
        usr.style.display = 'none';
        usr = document.getElementById('tempNeed');
        usr.style.display = 'block';
        var txtpath = "TempUsers";
        var txt = " Temperory ID ";
        var idpath = "tempId";

        $('#button1').on('click',event=>{
            event.preventDefault();
            getusr(idpath,txtpath,txt);
        });

        $('.content').on('submit',event=>{
            event.preventDefault();
            addData(txtpath);
        });
    }

    else{
        var usr = document.getElementById('tempId');
        usr.removeAttribute('required');
        var txtpath = "PermUsers";
        var txt = " PF Number ";
        var idpath = "pfNo";

        $('#button1').on('click',event=>{
            event.preventDefault();
            getusr(idpath,txtpath,txt);
        });

        $('.content').on('submit',event=>{
            event.preventDefault();
            addData(txtpath);
        });
    }
});

function chkdate(){
    if(($('#dure').val()=='') || ($('#durs').val()=='')){
        return;
    }
    if(($('#dure').val()) < ($('#durs').val())){
        alert('Please choose the dates correctly. Start Date > Ending Date');
        $('#dure').val("");
        $('#durs').val("");
        console.log('hi');
    }
}

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

function rem(x, arr){
    $('#crse' + x)[0].style.display = 'block';
    $('#crse' + x).required = 'true';
        
    for(i in arr){
        if($('#crse' + arr[i])[0].style.display = 'block'){
            $('#crse' + arr[i])[0].style.display = 'none';
            $('#crse' + arr[i])[0].removeAttribute('required');
        }
    }
}

function crsechange(){
    var x = $('#dept').val();
    if(x == "Signal"){
        rem('1', ["2","3"]);   
        gloId='1';    
    }
    else if(x == "Telecom"){
        rem('2', ["1","3"]);       
        gloId='2';    
    }
    else{
        rem('3', ["1","2"]);       
        gloId='3';    
    }
}