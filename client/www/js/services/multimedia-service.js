app.factory('MultimediaService', ['$q', function ($q) {

	function _getVideos() {
	};


	function _getImages() {
		// if (localStorageService.get('users')) {
		// return localStorageService.get('users');
		// }
		return ['bar-game-shot.jpg', 'bar-yesh.jpg', 'bar.jpg', 'bargavia.jpg', 'DSC_7737.jpg', 'DSC_7975.jpg', 'DSC_7977.jpg', 'DSC_8082.jpg', 'DSC_8138.jpg', 'DSC_8142.jpg'];
	}

	function b64toBlob(b64Data, contentType, sliceSize) {
		contentType = contentType || '';
		sliceSize = sliceSize || 512;

		var byteCharacters = atob(b64Data);
		var byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
			var slice = byteCharacters.slice(offset, offset + sliceSize);

			var byteNumbers = new Array(slice.length);
			for (var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			var byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		var blob = new Blob(byteArrays, { type: contentType });
		return blob;
	}

	function _uploadImage(data) {
		var picCompleter = $q.defer();
		var user = firebase.auth().currentUser;
		const picRef = firebase.storage().ref('/user/' + user.uid + '/full/' + Date.now() + '/photo.jpg');
		
		var picUploadTask = picRef.put(b64toBlob(data, 'image/jpeg', 512));
		picUploadTask.on('state_changed', function (snapshot) {
			// Observe state change events such as progress, pause, and resume
			// See below for more detail
		}, function (error) {
			console.log('error:' + error);
			picCompleter.reject(error);
		}, function () {
			var downloadURL = picUploadTask.snapshot.downloadURL;
			console.log('downloadURL:' + downloadURL);
			picCompleter.resolve({downloadURL:downloadURL, fullStorageURI:picRef.toString()});
		});
		return picCompleter.promise;
	}

	return {
		uploadImage: _uploadImage,
		getImages: _getImages,
		getVideos: _getVideos
	};
}]); 