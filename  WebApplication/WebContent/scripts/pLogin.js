$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:3000/RegularUser";
	function userEndpoint(userId) {
		return ENDPOINT + "/" + userId;
	}
	
	function loginChecker(username, password) {
		var userId = false;
		$.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		}).then(function(response) {
			_.forEach(response, function(user) {
				if(user.username == username && user.password == password){
					userId = user.userId;
				}
			});
			if(userId != false) {
				window.location.assign("../pages/wallOf.html");
			}else{
				alert("Wrong username or password");
				$("[name='username']").val("");
				$("[name='password']").val("");
			}
			return userId;
		});
	}
	function login() {
		$("#enterUserButton").click(function() {
			var username = $("[name='username']").val();
			var password = $("[name='password']").val();
			var userId = loginChecker(username, password);
		});
	}
	
	login();
});