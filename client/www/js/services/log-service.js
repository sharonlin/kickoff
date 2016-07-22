app.factory('LogService', ['logService',function() {

function _log(message){
	var myElement = angular.element( document.querySelector( '#console' ) ); 
alert(myElement.html());
}
	return {
		log: _log
	};
}]); 