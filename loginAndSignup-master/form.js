// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyBDm0V8XP5oXCSNu0v8LvIIsMVMNKRfKFA",
	authDomain: "myteamprojectdb.firebaseapp.com",
	databaseURL: "https://myteamprojectdb.firebaseio.com",
	projectId: "myteamprojectdb",
	storageBucket: "myteamprojectdb.appspot.com",
	messagingSenderId: "869369411885",
	appId: "1:869369411885:web:3f890933eae82e5f247ba4",
	measurementId: "G-DQEY5KPJQS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase.analytics(); //not in demo
const auth = firebase.auth();
var database = firebase.database();

function signUp(){
	var email = document.getElementById("email");
	var password = document.getElementById("password");
	const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
	promise.catch(e => alert(e.message));
	
	//send an email verification
	var user = firebase.auth().currentUser;
	user.sendEmailVerification().then(function() {
	  alert('sent');
	}).catch(function(error) {
	  alert('error')
	});
	
	alert("Signed Up");
}

function signIn(){
	var email = document.getElementById("email");
	var password = document.getElementById("password");
	const promise = auth.signInWithEmailAndPassword(email.value, password.value);
	promise.catch(e => alert(e.message));
	
	//check if user has been verified
	var user = firebase.auth().currentUser;
	if(firebase.auth().currentUser.emailVerified){
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		var strSplit = email.split("@");
		let username = strSplit[0];
		
		
		firebase.database().ref().once('value').then(function (snapshot) {
			var usernames = snapshot.val().users;
			var usernamesSplit = usernames.split(";");
			var usernameFound = false;
			var i = 0;
			while(i < usernamesSplit.length - 1){
				if(usernamesSplit[i] == strSplit[i]){
					usernameFound = true;
					break;
				}
				else{
					alert(usernamesSplit[i]);
				}
				i++;
			};
			if(usernameFound){
				alert("found")
			}
			else if(!usernameFound){
				alert("not found");
				usernames = usernames + username + ";";
				firebase.database().ref(username).child("username").set(username);
				firebase.database().ref(username).child("email").set(email);
				firebase.database().ref(username).child("password").set(password);
				firebase.database().ref('users').set(usernames);
			}
		});
	}
	else if(!firebase.auth().currentUser.emailVerified){
		alert("Please verify your email")
		//don't make stuff accessable
	}
	else{
		alert("not working")
	}
}

function signOut(){
	auth.signOut();
	alert("Signed Out");
};
