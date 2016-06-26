// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('todo-app', ['ionic','firebase', 'LocalStorageModule','ngCordova']);
app.config(function(localStorageServiceProvider) {
	localStorageServiceProvider.setPrefix('soccer-gram');
});

app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
	// setup an abstract state for the tabs directive
	.state('tab', {
		url : "/tab",
		abstract : true,
		templateUrl : "tabs.html"
	})

	// Each tab has its own nav history stack:

	.state('tab.home', {
		url : '/home',
		views : {
			'tab-home' : {
				templateUrl : 'home.html',
				controller : 'HomeController'
			}
		}
	}).state('tab.search', {
		url : '/search',
		views : {
			'tab-search' : {
				templateUrl : 'search.html',
				controller : 'SearchController'
			}
		}
	}).state('tab.search-detail', {
		url : '/user/:userId',
		views : {
			'tab-search' : {
				templateUrl : 'user-detail.html',
				controller : 'UserDetailController'
			}
		}
	}).state('tab.account', {
		url : '/account',
		views : {
			'tab-account' : {
				templateUrl : 'account.html',
				controller : 'AccountController'
			}
		}
	}).state('login', {
    	url: '/login',
    	templateUrl: 'login.html',
    	controller: 'LoginController'
  });
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/home');

});

app.run(function($ionicPlatform, $state, $rootScope) {

	var config = {
		apiKey : "AIzaSyAVQhpKHo0cN3gYiPG5hmZw9-_iFjMG1oM",
		authDomain : "kickoff-6aff3.firebaseapp.com",
		databaseURL : "https://kickoff-6aff3.firebaseio.com",
		storageBucket : "kickoff-6aff3.appspot.com",
	};
	firebase.initializeApp(config);
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			console.log("User loggedin");
			console.dir(user);
			$rootScope.currentUser = user;
			$state.go('tab.home');
		} else {
			// No user is signed in.
			console.log("No User signedin");
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

app.controller('MainController', function($scope, UsersService) {//store the entities name in a variable var taskData = 'task';
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
//
// //initialize the tasks scope with empty array
// $scope.tasks = [];
//
// //initialize the task scope with empty object
// $scope.task = {};
//
// //configure the ionic modal before use
// $ionicModal.fromTemplateUrl('new-task-modal.html', {
// scope: $scope,
// animation: 'slide-in-up'
// }).then(function (modal) {
// $scope.newTaskModal = modal;
// });
//
//
// $scope.getTasks = function () {
// //fetches task from local storage
// if (localStorageService.get('tasks')) {
// $scope.tasks = localStorageService.get('tasks');
// } else {
// $scope.tasks = [];
// }
// };
//
// $scope.createTask = function () {
// //creates a new task
// $scope.tasks.push($scope.task);
// localStorageService.set('tasks', $scope.tasks);
// $scope.task = {};
// //close new task modal
// $scope.newTaskModal.hide();
// };
// $scope.removeTask = function (index) {
// //removes a task
// $scope.tasks.splice(index, 1);
// localStorageService.set('tasks', $scope.tasks);
// };
// $scope.completeTask = function (index) {
// //updates a task as completed
// if (index !== -1) {
// $scope.tasks[index].completed = true;
// }
//
// localStorageService.set('tasks', $scope.tasks);
// };
// });