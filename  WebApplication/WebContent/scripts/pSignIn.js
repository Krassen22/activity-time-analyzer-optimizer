$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:3000/RegularUser/";
	var targetUserId;
	function userEndpoint(userId) {
		return ENDPOINT + "/" + userId;
	}
	
	function getAllRegularUsers(){
		return $.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		});
	}
	
	function createUser(user) {
		return $.ajax(ENDPOINT, {
			method: "POST",
			dataType: "json",
			data: JSON.stringify(user),
			contentType: "application/json; charset=utf-8"
		});
	}
	
	function signInChecker(email, username, userObject) {
		var	existUser = false;	
		$.ajax(ENDPOINT, {
			method: "GET",
			dataType: "json"
		}).then(function(response) {
			_.forEach(response, function(user) {
				if(user.email == email) {
					alert("E-mail already in use");
					existUser = true; 
				}
				if(user.username == username) {
					alert("Username already in use");
					existUser = true;
				}
			});
			if(existUser != false) {
				$("[name='email']").val("");
				$("[name='password']").val("");
				$("[name='username']").val("");
			}else{
				createUser(userObject);
				var json = getAllRegularUsers();
				alert(json);
				var lastAdded = json[ Object.keys(obj).sort().pop()];
				targetUserId = lastAdded.id;
				alert(targetUserId);
				window.location.assign("../pages/wallOf.html");
			}
		});
	}
	
	function signIn(){
		$("#createUserButton").click(function() {
			var user = {
				email: $("[name='email']").val(),
				password: $("[name='password']").val(),
				username: $("[name='username']").val()
			};
			signInChecker(user.email, user.username, user);
		});
	}
	
	signIn();
});