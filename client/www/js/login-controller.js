app.controller('LoginController', function($scope, $state) {//store the entities name in a variable var taskData = 'task';
	
	$scope.signup = function(email, password) {
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log("ERROR: " + errorMessage);
		});

	};

	$scope.login = function(email, password) {

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log("ERROR: " + errorMessage);
		});

	};
	
	function _loginWithProvider(provider){
		firebase.auth().signInWithRedirect(provider).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			//var token = result.credential.accessToken;
			// The signed-in user info.
			//var user = result.user;
			// ...
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			console.log('ERROR:'+errorMessage);
			// ...
		});
	}

	$scope.loginWithGoogle = function() {
		var provider = new firebase.auth.GoogleAuthProvider();
		_loginWithProvider(provider);
	};
	
	$scope.loginWithFacebook = function() {
		var provider = new firebase.auth.FacebookAuthProvider();
		_loginWithProvider(provider);
	};

});
