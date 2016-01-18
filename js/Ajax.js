
var Ajax = {
	getXHR: function() {
		if (typeof XMLHttpRequest != 'undefined') {
			return new XMLHttpRequest();
		}
		if (typeof ActiveXObject != 'undefined') {
			return new ActiveXObject('Microsoft.XMLHTTP');
		}
		throw new Error('AJAX is not supported');
	},
	makeRequest: function(method, url, params, async, callback) {
		var xhr = this.getXHR();
		var number;
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				callback(xhr, number = undefined);
			}
		};
		async = async ? true : false;
		if (method == 'GET') {
			url += (url.indexOf('?') != -1) ? '&' : '?';
			url += this.parseParams(params);
		}
		xhr.open(method, url, async);
		if (method == 'POST') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}
		xhr.send(method == 'POST' ? this.parseParams(params) : null );
	},
	parseParams: function(params) {
		var paramsAsString = [];
		for (var key in params) {
			var pair = encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
			paramsAsString.push(pair);
		}
		return paramsAsString.join('&');
	}
};