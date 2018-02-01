var provider = new firebase.auth.GoogleAuthProvider();
var user;
var selectedFile;


function signIn() {
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  user = result.user;
	//  showWelcomeContainer();
	console.log(user.displayName);
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
	//console.log("sign in");

};


function showWelcomeContainer() {
	$("#login").hide();
	$("#welcome").show();
	$("#welcomeText").html("Hello, " + user.displayName);
};
$(".dropdown").on("hide.bs.dropdown", function(event){
    var text = $(event.relatedTarget).text(); // Get the text of the element
    $("#dogDrop").html(text+'<span class="caret"></span>');
    firebase.database().ref('Users/' + user.uid).set({
    	name: user.displayName,
    	email: user.email,
    	favDog: text
  	});

});

$("#file").on("change",function(event)
{
	selectedFile = event.target.files[0];
	$("#uploadButton").show();
	console.log( selectedFile.name);
	
});

function uploadFile()
{
	
	var filename = selectedFile.name;
	console.log( filename);
	var storageRef = firebase.storage().ref('/dogImages/' + filename);
	var uploadTask  = storageRef.put(selectedFile);
	
		uploadTask.on('state_changed', function(snapshot){
  		// Observe state change events such as progress, pause, and resume
  		// See below for more detail
	}, function(error) {
  		// Handle unsuccessful uploads
	}, function() {
  		// Handle successful uploads on complete
  		// For instance, get the download URL: https://firebasestorage.googleapis.com/...
		/*var postKey = firebase.database().ref('Posts/').push().key;
  		var downloadURL = uploadTask.snapshot.downloadURL;
		
		var updates={};
		var postData = {
			 url:downloadURL,
			 caption:$("$imageCaption").val()
			 
		};
		updates['/Posts/'+postKey] = postData;
		firebase.database().ref().update(updates);
		
		console.log(downloadURL);*/
		
		var downloadURL = upload.snapshot.downloadURL;
		console.log(downloadURL);

	});

	
	
	
	
}

