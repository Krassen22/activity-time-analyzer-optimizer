$(document).ready(function() {
	"use strict";
	
	function showPanel(panelName) {
		var ALL_PANELS = ["description", "statistics", "help"];
		_.forEach(ALL_PANELS, function(nextValue) {
			$("#"+nextValue).hide();
		});
		$("#"+panelName).fadeIn();
	}
	
	
	$(document).on("click", "#helpButton", function() {
		showPanel("help");
	});
	
	$(document).on("click", "#statisticsButton", function() {
		showPanel("statistics");
	});
	
	$(document).on("click", "#descriptionBottom", function() {
		showPanel("description");
	});

	showPanel("description");

});
