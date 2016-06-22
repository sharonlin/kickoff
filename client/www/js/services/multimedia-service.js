app.factory('MultimediaService', ['localStorageService',
function(localStorageService) {

	function _getVideos() {
	};


	function _getImages() {
		// if (localStorageService.get('users')) {
			// return localStorageService.get('users');
		// }
		return ['bar-game-shot.jpg','bar-yesh.jpg','bar.jpg','bargavia.jpg','DSC_7737.jpg','DSC_7975.jpg', 'DSC_7977.jpg','DSC_8082.jpg','DSC_8138.jpg','DSC_8142.jpg'];
	}

	return {
		getImages: _getImages,
		getVideos : _getVideos
	};
}]); 