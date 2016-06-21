app.controller('AccountController', function ($scope, $ionicModal,UsersService,$cordovaCamera, $cordovaFileTransfer) { //store the entities name in a variable var taskData = 'task';
$scope.profileImageUrl = '/img/profile.jpg';
$ionicModal.fromTemplateUrl('create-profile-modal', {
    scope: $scope,
    animation: 'slide-in-up'
}).then(function (modal) {
    $scope.profileDialogModal = modal;
});

$scope.uploadProfileImage = function(){
	
	$scope.profileImageUrl = '/img/ionic.png';
};
$scope.calculateAge = function(){
	
	var birthdate = new Date($scope.user.birthday);
	var cur = new Date();
	var diff = cur-birthdate; // This is the difference in milliseconds
	return Math.floor(diff/31536000000); // Divide by 1000*60*60*24*365
};

$scope.openProfileDialogModal = function(){
	$scope.profileDialogModal.show();
};

$scope.closeProfileDialogModal = function(){
	$scope.profileDialogModal.hide();
};

$scope.saveProfile = function(){
	console.log('Save profile');
	UsersService.createUser($scope.user);
	$scope.users = UsersService.getUsers();
	$scope.profileDialogModal.hide();
};

$scope.upload = function() {

    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        mediaType: Camera.MediaType.ALLMEDIA,
        saveToPhotoAlbum: true

    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
        console.log("img URI= " + imageData);        
        //Here you will be getting image data 
        _uploadFileToServer();
    }, function(err) {
        alert("Failed because: " + err);
        console.log('Failed because: ' + err);
    });

};
function _uploadFileToServer(uri) {
        var options = {
            fileKey: "avatar",
            fileName: "image.png",
            chunkedMode: false,
            mimeType: "image/png"
        };
        $cordovaFileTransfer.upload("http://localhost:3000/file/upload", uri, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
        }, function (progress) {
            // constant progress updates
        });
    };
 });