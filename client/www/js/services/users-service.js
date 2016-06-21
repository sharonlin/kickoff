app.factory('UsersService', ['localStorageService',
function(localStorageService) {

	function _getUser() {
		if (localStorageService.get('user')) {
			return localStorageService.get('user');
		}
		return {};
	};

	function _createUser(user) {
		localStorageService.set('user', user);
	};

	function _getUsers() {
		// if (localStorageService.get('users')) {
			// return localStorageService.get('users');
		// }
		return [{"strongLeg":"Right","description":"dribbles","country":"Germany","birthday":"2016-06-07T21:00:00.000Z","tafkid":"Striker","name":"Yorgen","family":"Yorg"},
		{"strongLeg":"Right","description":"Some desc","country":"England","birthday":"2016-06-07T21:00:00.000Z","tafkid":"game maker","name":"Jack","family":"Sparrow"},
		{"name":"Yossi","family":"Swissa","birthday":"2016-06-19T21:00:00.000Z","country":"Israel","tafkid":"Defender","strongLeg":"Right","description":"ststs"},
		{"name":"testestststs","family":"te","birthday":"2016-06-19T21:00:00.000Z","country":"ststs","tafkid":"ete","strongLeg":"Both","description":"ststs"},
		{"name":"rrr","family":"rr","birthday":"2016-05-29T21:00:00.000Z","tafkid":"rw","strongLeg":"Right","description":"rw"}];
	}

	return {
		getUser : _getUser,
		createUser : _createUser,
		getUsers : _getUsers
	};
}]); 