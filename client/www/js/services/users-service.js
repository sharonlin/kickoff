app.factory('UsersService', ['localStorageService',
function(localStorageService) {

	function _getUser(uid) {
		return firebase.database().ref('users/'+uid).once('value');
	};

	function _createUser(user) {
		return firebase.database().ref(`users/`+user.uid).update({
    		displayName: user.displayName,
    	    email: user.email,
			photoURL:user.photoURL,
			dominantLeg:user.dominantLeg,
			description:user.description,
			country:user.country,
			birthday:user.birthday.toString(),
			position:user.position

  		}).then(function(){
			  console.log('user created')
		  })
	};

	function _getUsers() {
		// if (localStorageService.get('users')) {
			// return localStorageService.get('users');
		// }
		var aaa = localStorageService.get('users');
		return [{"dominantLeg":"Right","description":"dribbles","country":"Germany","birthday":"2016-06-07T21:00:00.000Z","position":"Striker","name":"Yorgen","family":"Yorg"},
		{"dominantLeg":"Right","description":"Some desc","country":"England","birthday":"2016-06-07T21:00:00.000Z","position":"game maker","name":"Jack","family":"Sparrow"},
		{"name":"Yossi","family":"Swissa","birthday":"2016-06-19T21:00:00.000Z","country":"Israel","tafkid":"Defender","dominantLeg":"Right","description":"ststs"},
		{"name":"testestststs","family":"te","birthday":"2016-06-19T21:00:00.000Z","country":"ststs","position":"ete","dominantLeg":"Both","description":"ststs"},
		{"name":"rrr","family":"rr","birthday":"2016-05-29T21:00:00.000Z","position":"rw","dominantLeg":"Right","description":"rw"}];
	}

	return {
		getUser : _getUser,
		createUser : _createUser,
		getUsers : _getUsers
	};
}]); 