// ======================================
// = Javascript Client Error Log Helper =
// ======================================
var HSErrorLogger = function(logURL) {
	this.logURL = logURL;
}

HSErrorLogger.prototype.initLog = function() {
	var logURL = this.logURL;
	window.onerror = function(message, file, line) {
		var queryString = "";
		var params = [];
		var logData = {
			file: file,
			line: line,
			message: message,
			referer: location.href
		};
		for (var param in logData) {
			params.push(param + "=" + encodeURI(logData[param]));
		}
		if (params.length > 0) queryString = params.join("&");
		var xmlhttp;
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				if (typeof console.log != 'undefined') console.log("Error log successful! :D");
			}
		}
		xmlhttp.open("POST", logURL, true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(queryString);
	};
};