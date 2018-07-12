var config = {
    apiKey: "AIzaSyClPLO1GbsuZ8nIp2Fz1clJFbNvJYN9r4g",
    authDomain: "southernrailwayapp.firebaseapp.com",
    databaseURL: "https://southernrailwayapp.firebaseio.com",
    projectId: "southernrailwayapp",
    storageBucket: "southernrailwayapp.appspot.com",
    messagingSenderId: "454464183095"
    };
    firebase.initializeApp(config);
    
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // User is signed in.
    } else {
        history.go(-(history.length - 2));
        // No user is signed in.
    }
});

var txtPath = ["PermUsers", "TempUsers"];
var txtId;
var usr;
var queries = [];
var cqueries = [];
var displayedUsers = {};

$('#homebut').on('click', function(e){
    e.preventDefault();
    history.go(-1);
});

function chkdur(www){
    if(( www.durs >= $('#durs').val()) && (www.dure <= $('#dure').val()) ){
        return 1;
    }
    else{
        return 0;
    }
}

function resetfn(){
    
    $('#userDet tbody').empty();
    $('#courseDet tbody').empty();
    $('#displayUsers')[0].style.display = 'none';
    for(i in queries){
        $('#' + queries[i] + 'Need')[0].style.display = 'none';
        $('#' + queries[i] )[0].removeAttribute("required");  
    }
    queries = [];  
    for(i in cqueries){
        $('#' + cqueries[i] + 'Need')[0].style.display = 'none';
        if( cqueries[i] == 'durt'){
            $('#durs').removeAttribute("required");
            $('#dure').removeAttribute("required");
        }
        else{
            $('#' + cqueries[i] )[0].removeAttribute("required");
        }
    }
    cqueries = [];              
    $('.content').trigger('reset');   
    $('#resetbtn')[0].style.display = 'none';
    displayedUsers = {};

}

function dispUsers(snapshot){
    var usertodisp;
    
    if ( snapshot.child('pfNo').val() != ""){
        usertodisp = snapshot.child('pfNo').val();
        if( displayedUsers[usertodisp] == 'true')
            return;
    }

    else{
        usertodisp = snapshot.child('tempId').val();
        if( displayedUsers[usertodisp] == 'true')
            return;
    }
    displayedUsers[usertodisp] = 'true';
    var x = document.createElement("tr");
    x.onclick = function(){
        dispFull(snapshot);
    };
    var y = [];
    for( i=0; i<8; i++){
        y[i] = document.createElement("td");
    }
    x.appendChild(y[0]).innerHTML = usertodisp;
    x.appendChild(y[1]).innerHTML = snapshot.child('name').val();
    x.appendChild(y[2]).innerHTML = snapshot.child('sex').val();
    x.appendChild(y[3]).innerHTML = snapshot.child('desig').val();
    x.appendChild(y[4]).innerHTML = snapshot.child('stn').val();
    x.appendChild(y[5]).innerHTML = snapshot.child('zone').val();
    x.appendChild(y[6]).innerHTML = snapshot.child('dvsn').val();
    x.appendChild(y[7]).innerHTML = snapshot.child('dept').val();
    $('#userDet tbody')[0].append(x);
}

function dispFull(snapshot){
    $('div')[0].style.display = 'flex';
    
    if(snapshot.child('pfNo')!=''){
    var storageRef = firebase.storage().ref('/UserPics/PermUsers/'+ snapshot.child('pfNo').val() + '.jpg');
    }
    else{
        var storageRef = firebase.storage().ref('/UserPics/TempUsers/'+ snapshot.child('tempId').val() + '.jpg');
    }
    storageRef.getDownloadURL().then(function(url){
        $('#dippic')[0].src = url;
        $("#dippic").on('click',function(){
            window.open(url,'_blank');
        });
    });
    $('#p1')[0].innerHTML = "<b>Name:</b> " + snapshot.child("name").val();
    $('#p2')[0].innerHTML = "<b>Father's Name:</b> " + snapshot.child("dadname").val();
    $('#p3')[0].innerHTML = "<b>Address:</b><br>" + snapshot.child("address").val();          
    $('#p4')[0].innerHTML = "<b>Phone No:</b> " + snapshot.child("phSelf").val();
    $('#p5')[0].innerHTML = "<b>Emergency Contact:</b> " + snapshot.child("phEmer").val();
    $('#p6')[0].innerHTML = "<b>Sex:</b> " + ((snapshot.child("sex").val() == "M") ? "Male" : ((snapshot.child('sex').val() == "F") ? "Female" : "Others" ));
    $('#p7')[0].innerHTML = "<b>Date of Birth:</b> " + snapshot.child("dob").val();
    $('#p8')[0].innerHTML = "<b>Qualification:</b> " + snapshot.child("qual").val();

    $('#p9')[0].innerHTML = "<b>Designation:</b> " + snapshot.child("desig").val();
    $('#p10')[0].innerHTML = "<b>Station:</b> " + snapshot.child("stn").val();
    $('#p11')[0].innerHTML = "<b>Division:</b> " + snapshot.child("dvsn").val() + ((snapshot.child("othdvsn").val() != "") ? (snapshot.child("othdvsn").val()) : "");
    $('#p12')[0].innerHTML = "<b>Zone:</b><br>" + snapshot.child("zone").val();
    $('#p13')[0].innerHTML = "<b>Department:</b> " + snapshot.child("dept").val() + ((snapshot.child("othdept").val() != "") ? (snapshot.child("othdept").val()) : "");
    $('#p14')[0].innerHTML = ((snapshot.child('pfNo').val() != "") ? ("<b>PF Number:</b> " + snapshot.child('pfNo').val()) : ("<b>Temperory ID:</b> " + snapshot.child('tempId').val()));
    $('#p15')[0].innerHTML = "<b>RC:</b> " + snapshot.child("detRc").val();
    $('#p16')[0].innerHTML = "<b>FC:</b> " + snapshot.child("detFc").val();
    $('#p17')[0].innerHTML = "<b>BCC No:</b> " + snapshot.child("bccNo").val();
    $('#p18')[0].innerHTML = "<b>THB No:</b> " + snapshot.child("thbNo").val();
    $('#p19')[0].innerHTML = "<b>ECC No:</b> " + snapshot.child("eccNo").val();

    $('#p20')[0].innerHTML = "<b>Blood Group:</b> " + snapshot.child("bldGrp").val();
    $('#p21')[0].innerHTML = "<b>Drugs, allergic to:</b> " + snapshot.child("drugs").val();
    $('#p22')[0].innerHTML = "<b>BP:</b> " + snapshot.child("detBp").val();
    $('#p23')[0].innerHTML = "<b>Sugar:</b> " + snapshot.child("detSugar").val();
    $('#p24')[0].innerHTML = "<b>Heart:</b> " + snapshot.child("detHeartDis").val();
    $('#p25')[0].innerHTML = "<b>Eye:</b> " + snapshot.child("detEye").val();
    $('#p26')[0].innerHTML = "<b>Other ailments:</b><br>" + snapshot.child("otherCmts").val();
    $('#p27')[0].innerHTML = "<b>Remarks:</b><br>" + snapshot.child("remarks").val();

    $('#courseDet tbody').empty();

    var sno = 1;
   
    if ( snapshot.child('pfNo').val() != ""){
        var ref = firebase.database().ref('/Courses/PermUsers/' + snapshot.child('pfNo').val());
    }
    else{
        var ref = firebase.database().ref('/Courses/TempUsers/' + snapshot.child('tempId').val());        
    }

    ref.orderByChild('durs').once('value').then(snaps =>{
        snaps.forEach(function(snapshotx){
            var x = document.createElement("tr");
            var y = [];
            for( i=0; i<7; i++){
                y[i] = document.createElement("td");
            }    
            x.appendChild(y[0]).innerHTML = sno++;
            x.appendChild(y[1]).innerHTML = snapshotx.child('courseId').val();
            x.appendChild(y[2]).innerHTML = snapshotx.child('batchNo').val();
            x.appendChild(y[3]).innerHTML = snapshotx.child('cdept').val();
            x.appendChild(y[4]).innerHTML = snapshotx.child('courseName').val();
            x.appendChild(y[5]).innerHTML = snapshotx.child('durs').val();
            x.appendChild(y[6]).innerHTML = snapshotx.child('dure').val();
            $('#courseDet tbody')[0].append(x);    
        });
    });    
    $('#courseHead').innerHTML += ' '+ sno; 

}

function queryDb(txtPath, txtId){
    $('#displayUsers')[0].style.display = 'block';
    
    for(i in txtPath){
        var x = firebase.database().ref('/Users/' + txtPath[i]);
        x.child(txtId).once('value',function(snapshot){
            dispUsers(snapshot);
        });
    }
 
}
function newfn(){
    $('#displayUsers')[0].style.display = 'block';
    var len = queries.length;
    if(len){
        for(j in txtPath){
            var x = firebase.database().ref('/Users/' + txtPath[j]);

            x.orderByChild(queries[0]).equalTo($('#' + queries[0]).val()).once('value').then(snaps =>{
                snaps.forEach(function(snapshot){
                    
                    flag = 0;
                    k = 1;
                    
                    while(k<len){
                        if(snapshot.child(queries[k]).val() == $('#' + queries[k]).val()){
                            k++;continue;
                        }
                        else{
                            flag=1;break;
                        }
                        k++;
                    }
                    if(flag!=1){   
                        dispUsers(snapshot);
                    }
                });
            });
        }
    }
    if(cqueries.length)
    {
        cqueries.sort();
        console.log(cqueries);
        if(cqueries[0] == 'durt'){
            var x = firebase.database().ref('/Courses/durs/');
    
            x.orderByKey().startAt($('#durs').val()).once('value').then(snaps =>{
                snaps.forEach(function(snapshot){
                    var useit = snapshot.val();
                    for(z in useit)
                    {
                        var id = useit[z].id;
                        if(useit[z].dure <= $('#dure').val()){
                            if(id.startsWith("TCSR")){
                                firebase.database().ref('/Users/TempUsers/' + id).once('value').then(yyy=>{
                                    dispUsers(yyy);
                                });
                            }
                            else{
                                firebase.database().ref('/Users/PermUsers/' + id).once('value').then(yyy=>{
                                    dispUsers(yyy);
                                });
                            }
                        }
                    }
                    });
            });
        }
        else{
            clen= cqueries.length;
    
            var ref = firebase.database().ref("/Courses/" + cqueries[0] + '/' + $('#' + cqueries[0]).val());
            ref.on("value", function(snapshoty) { 
                var wholelist=snapshoty.val();
                for(z in wholelist){
                    var det = wholelist[z].id; 
                    flag = 0;
                    k = 1;
                    
                    while(k<clen){
                        if(cqueries[k] == "durt"){
                            if(chkdur(wholelist[z]) == 1){
                                break;
                            }
                            else{
                                flag = 1;break;
                            }
                        }
                        else{
                            switch(cqueries[k]){
                                case "batchNo":
                                        if(wholelist[z].batchNo == $('#' + cqueries[k]).val()){
                                            k++;continue;
                                        }
                                        else{
                                            flag=1;break;
                                        }
                                        break;
                                case "cdept":
                                        if(wholelist[z].cdept == $('#' + cqueries[k]).val()){
                                            k++;continue;
                                        }
                                        else{
                                            flag=1;break;
                                        }
                                        break;
                                case "courseId":                          
                                        if(wholelist[z].courseId == $('#' + cqueries[k]).val()){
                                            k++;continue;
                                        }
                                        else{
                                            flag=1;break;
                                        }
                                        break;
                            }
                        }
                    }
    
                    if(flag!=1){   
                        if(det.startsWith("TCSR")){
                            firebase.database().ref('/Users/TempUsers/' + det).once('value').then(yyy=>{
                                dispUsers(yyy);
                            });
                        }
                        else{
                            firebase.database().ref('/Users/PermUsers/' + det).once('value').then(yyy=>{
                                dispUsers(yyy);
                            });
                        }
                    }                
                }
            });
        }
    }
}

$('.content').on('submit',event=>{
    event.preventDefault(); 
    $('#resetbtn')[0].style.display = 'initial';
    
    if (( $('#pfNo').val() != "") && ( $('#tempId').val() != "")){
        alert("Select only one among PF Number and Temperory ID. NOT BOTH !!!");
        location.reload();
    }
    
    if (( $('#pfNo').val() != "" ) && queries.length == 1 && queries[0] == "pfNo"){
        txtPath = ['PermUsers'];
        txtId = $('#pfNo').val();
        queryDb(txtPath, txtId);
        return;
    }

    if (( $('#tempId').val() != "") && queries.length == 1 && queries[0] == "tempId"){
        txtPath=['TempUsers'];
        txtId = $('#tempId').val();
        queryDb(txtPath, txtId);
        return;
    }
    newfn();
});

function logout(){
    firebase.auth().signOut();
}

function qryremove(array, element) {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}

function queryfn(){
    var x=$('#querySelect').val();

    var label = $('#querySelect :selected').parent().attr('label');
    
    if(x == "")
        return;
        
    if(label != 'Course Details'){
        if($('#' + x + 'Need')[0].style.display == 'none'){
            $('#' + x + 'Need')[0].style.display = 'block';
            $('#' + x )[0].required = 'true';
            queries.push(x);
        }
        else{
            $('#' + x + 'Need')[0].style.display = 'none';
            $('#' + x )[0].removeAttribute("required");
            qryremove(queries, x);
        }
        
    }
    else{
        if($('#' + x + 'Need')[0].style.display == 'none'){
            $('#' + x + 'Need')[0].style.display = 'block';
            if( x == 'durt'){
            $('#durs').required = 'true';
            $('#dure').required = 'true';
            }
            else{
            $('#' + x )[0].required = 'true';
            }
            cqueries.push(x);
        }
        else{
            $('#' + x + 'Need')[0].style.display = 'none';
            if( x == 'durt'){
                $('#durs').removeAttribute("required");
                $('#dure').removeAttribute("required");
                }
                else{
                $('#' + x )[0].removeAttribute("required");
                }
            qryremove(cqueries, x);
        }
    }
}

function closebtn(){
    $('#top').hide();
}

function rem(x, arr){
    $('#crse' + x)[0].style.display = 'block';
        
    for(i in arr){
        if($('#crse' + arr[i])[0].style.display = 'block'){
            $('#crse' + arr[i])[0].style.display = 'none';
        }
    }
}

function crsechange(){
    var x = $('#cdept').val();
    if(x == "Signal"){
        rem('1', ["2","3"]);   
    }
    else if(x == "Telecom"){
        rem('2', ["1","3"]);       
        
    }
    else{
        rem('3', ["1","2"]);       
        
    }
}
function chkdate(){
    if(($('#dure').val()=='') || ($('#durs').val()=='')){
        return;
    }
    if(($('#dure').val()) < ($('#durs').val())){
        alert('Please choose the dates correctly. Start Date > Ending Date');
        $('#dure').val("");
        $('#durs').val("");
    }
}