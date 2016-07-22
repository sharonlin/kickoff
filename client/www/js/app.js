// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('todo-app', ['ionic', 'firebase', 'LocalStorageModule', 'ngCordova']);
app.config(function(localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('kickoff');
});


app.config(function($stateProvider, $urlRouterProvider, $provide) {

	$provide.decorator('$exceptionHandler', ['$delegate', function($delegate) {
		return function(exception, cause) {
			$delegate(exception, cause);

			var data = {
				type: 'angular',
				url: window.location.hash,
				localtime: Date.now()
			};
			if (cause) {
				data.cause = cause;
			}
			if (exception) {
				if (exception.message) {
					data.message = exception.message;
				}
				if (exception.name) {
					data.name = exception.name;
				}
				if (exception.stack) {
					data.stack = exception.stack;
				}
			}

			console.log('exception', data);
			window.alert('Error2: ' + data.message);
		};
	}]);

	// catch exceptions out of angular
	window.onerror = function(message, url, line, col, error) {
		var stopPropagation = true;
		var data = {
			type: 'javascript',
			url: window.location.hash,
			localtime: Date.now()
		};
		if (message) {
			data.message = message;
		}
		if (url) {
			data.fileName = url;
		}
		if (line) {
			data.lineNumber = line;
		}
		if (col) {
			data.columnNumber = col;
		}
		if (error) {
			if (error.name) {
				data.name = error.name;
			}
			if (error.stack) {
				data.stack = error.stack;
			}
		}
		console.log('exception', data);
		window.alert('Error: ' + data.message);
		return stopPropagation;
	};

	$stateProvider
	// setup an abstract state for the tabs directive
		.state('tab', {
			url: '/tab',
			abstract: true,
			templateUrl: 'tabs.html'
		})

	// Each tab has its own nav history stack:

	.state('tab.home', {
		url: '/home',
		views: {
			'tab-home': {
				templateUrl: 'home.html',
				controller: 'HomeController'
			}
		}
	}).state('tab.search', {
		url: '/search',
		views: {
			'tab-search': {
				templateUrl: 'search.html',
				controller: 'SearchController'
			}
		}
	}).state('tab.search-detail', {
		url: '/user/:userId',
		views: {
			'tab-search': {
				templateUrl: 'user-detail.html',
				controller: 'UserDetailController'
			}
		}
	}).state('tab.account', {
		url: '/account',
		views: {
			'tab-account': {
				templateUrl: 'account.html',
				controller: 'AccountController'
			}
		}
	}).state('login', {
		url: '/login',
		templateUrl: 'login.html',
		controller: 'LoginController'
	});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('login');

});

app.run(function($ionicPlatform, $state, $rootScope, UsersService) {

	var config = {
		apiKey: 'AIzaSyAVQhpKHo0cN3gYiPG5hmZw9-_iFjMG1oM',
		authDomain: 'kickoff-6aff3.firebaseapp.com',
		databaseURL: 'https://kickoff-6aff3.firebaseio.com',
		storageBucket: 'kickoff-6aff3.appspot.com',
	};
	firebase.initializeApp(config);
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			console.log('User loggedin');
			console.dir(user);
			$rootScope.currentUser = user;
			UsersService.createUser(user).then(function() {
				$state.go('tab.home');
			});

		} else {
			// No user is signed in.
			console.log('No User signedin');
			$rootScope.currentUser = user;
			$state.go('login');
		}
	});

	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			// Don't remove this line unless you know what you are doing. It stops the viewport
			// from snapping when text inputs are focused. Ionic handles this internally for
			// a much nicer keyboard experience.
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});

app.controller('MainController', function($scope, UsersService) { //store the entities name in a variable var taskData = 'task';
	$scope.user = UsersService.getUser();
	$scope.users = UsersService.getUsers();
	$scope.logout = function() {
		firebase.auth().signOut().then(function() {
			// Sign-out successful.
		}, function(error) {
			// An error happened.
		});
	};
});