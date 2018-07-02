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
        // No user is signed in.
        window.location='../../index.html';
    }
});

var txtPath = ["PermUsers", "TempUsers"];
var txtId;
var usr;
var queries = [];

function resetfn(){
    $('tbody').empty();
    $('#displayUsers')[0].style.display = 'none';
    for(i in queries){
        $('#' + queries[i] + 'Need')[0].style.display = 'none';
        $('#' + queries[i] )[0].removeAttribute("required");  
        qryremove(queries, queries[i]);    
    }
    $('.content').trigger('reset');   
    $('#resetbtn')[0].style.display = 'none';

}

function dispUsers(snapshot){
    var x = document.createElement("tr");
    var y = [];
    for( i=0; i<8; i++){
        y[i] = document.createElement("td");
    }
    
    if (( $('#tempId').val() != "")){
        x.appendChild(y[0]).innerHTML = snapshot.child('tempId').val();       
    }
    else{
        x.appendChild(y[0]).innerHTML = snapshot.child('pfNo').val();   
    }
    x.appendChild(y[1]).innerHTML = snapshot.child('name').val();
    x.appendChild(y[2]).innerHTML = snapshot.child('dadname').val();
    x.appendChild(y[3]).innerHTML = snapshot.child('phSelf').val();
    x.appendChild(y[4]).innerHTML = snapshot.child('phEmer').val();
    x.appendChild(y[5]).innerHTML = snapshot.child('bldGrp').val();
    x.appendChild(y[6]).innerHTML = snapshot.child('dob').val();
    x.appendChild(y[7]).innerHTML = snapshot.child('desig').val();
    $('tbody').append(x);
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
    for(i in queries){
        len--;
        for(j in txtPath){
            var x = firebase.database().ref('/Users/' + txtPath[j]);

            x.orderByChild(queries[i]).equalTo($('#' + queries[i]).val()).once('value').then(snaps =>{
                snaps.forEach(function(snapshot){
                    dispUsers(snapshot);
                });
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
    if(x == "")
    return;
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
    console.log(queries);
}

