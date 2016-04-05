$(document).ready(function() {
	"use strict";
	var ENDPOINT = "http://localhost:3000/RegularUser";
	var targetUserId;
	function userEndpoint(userId) {
		return ENDPOINT + "/" + userId;
	}
	function getRegularUsers(){
		return $.ajax(userEndpoint(document.cookie), {
			method: "GET",
			async: false,
			dataType: "json"
		});
	}
	
	
	function showPanel(panelName) {
		var ALL_PANELS = ["add-timer", "statistics", "help", "editUser", 
		                  "activities", "reading-activity", "working-activity", 
		                  "playing-activity", "watching-activity"];
		_.forEach(ALL_PANELS, function(nextValue) {
			$("#"+nextValue).hide();
		});
		$("#list-of-timers").hide();
		$("#"+panelName).fadeIn();
		if(panelName == "add-timer"){
			$("#list-of-timers").fadeIn();
		}
		if(panelName == "reading-activity" || panelName == "working-activity" || 
			panelName == "playing-activity" || panelName == "watching-activity"){
			$("#list-of-timers").fadeIn();
			$("#activities").fadeIn();
		}
	}
	
	
	$(document).on("click", "#helpButton", function() {
		showPanel("help");
	});
	
	$(document).on("click", "#statisticsButton", function() {
		var reading_activity_html = document.getElementById("reading-count").innerHTML;
		var working_activity_html = document.getElementById("working-count").innerHTML;
		var playing_activity_html = document.getElementById("playing-count").innerHTML;
		var watching_activity_html = document.getElementById("watching-count").innerHTML;
		var all_activities_sum = parseInt(reading_activity_html) + parseInt(working_activity_html) +
		parseInt(playing_activity_html) + parseInt(watching_activity_html);
		$("#reading-activity-part").css("width", 100/all_activities_sum * reading_activity_html + "%");
		$("#working-activity-part").css("width", 100/all_activities_sum * working_activity_html + "%");
		$("#playing-activity-part").css("width", 100/all_activities_sum * playing_activity_html + "%");
		$("#watching-activity-part").css("width", 100/all_activities_sum * watching_activity_html + "%");
		$("#activities-part").css("width", all_activities_sum + "%");
		showPanel("statistics");
	});
	
	$(document).on("click", "#timersButton", function() {
		showPanel("add-timer");
	});
	$(document).on("click", "#add-activity-button", function() {
		showPanel("add-timer");
	});
	$(document).on("click", "#userName", function() {
		showPanel("editUser");
	});
	$(document).on("click", "#reading", function() {
		showPanel("reading-activity");
	});
	$(document).on("click", "#working", function() {
		showPanel("working-activity");
	});
	$(document).on("click", "#playing", function() {
		showPanel("playing-activity");
	});
	$(document).on("click", "#watching", function() {
		showPanel("watching-activity");
	});
	$(document).on("click", "#submitbutton", function() {
		var sIndex = document.getElementById("select").options.selectedIndex;
		alert(sIndex);
		showPanel("activities");
	});

	$( "#userName" ).text(getRegularUsers().responseJSON.username);
	// Timers
	var jsalarm={
		padfield:function(f){
			return (f<10)? "0"+f : f
		},
		showcurrenttime:function(){
			var dateobj=new Date()
			var ct=this.padfield(dateobj.getHours())+":"+this.padfield(dateobj.getMinutes())+":"+this.padfield(dateobj.getSeconds())
			this.ctref.innerHTML=ct
			this.ctref.setAttribute("title", ct)
			if (typeof this.hourwake!="undefined"){ //if alarm is set
				if (this.ctref.title==(this.hourwake+":"+this.minutewake+":"+this.secondwake)){
					clearInterval(jsalarm.timer);
					window.location=document.getElementById("musicloc").value
				}
			}
		},
		init:function(){
			var dateobj=new Date()
			this.ctref=document.getElementById("jsalarm_ct")
			this.submitref=document.getElementById("submitbutton")
			this.submitref.onclick=function(){
				jsalarm.setalarm()
				this.value="Set Alarm!"
				this.disabled=true
				return false
			};
			this.resetref=document.getElementById("resetbutton")
			this.resetref.onclick=function(){
			jsalarm.submitref.disabled=false
			jsalarm.hourwake=undefined
			jsalarm.hourselect.disabled=false
			jsalarm.minuteselect.disabled=false
			jsalarm.secondselect.disabled=false
			return false
			};
			var selections=document.getElementsByTagName("select")
			this.hourselect=selections[0]
			this.minuteselect=selections[1]
			this.secondselect=selections[2]
			for (var i=0; i<60; i++){
				if (i<24) //If still within range of hours field: 0-23
				this.hourselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getHours()==i)
				this.minuteselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getMinutes()==i)
				this.secondselect[i]=new Option(this.padfield(i), this.padfield(i), false, dateobj.getSeconds()==i)

			}
			jsalarm.showcurrenttime()
			jsalarm.timer=setInterval(function(){jsalarm.showcurrenttime()}, 1000)
		},
		setalarm:function(){
			this.hourwake=this.hourselect.options[this.hourselect.selectedIndex].value
			this.minutewake=this.minuteselect.options[this.minuteselect.selectedIndex].value
			this.secondwake=this.secondselect.options[this.secondselect.selectedIndex].value
			this.hourselect.disabled=true
			this.minuteselect.disabled=true;
			this.secondselect.disabled=true
		}
	}

	showPanel("add-timer");
	// alert(targetUserId);
	jsalarm.init();
	
	// -----------------------------
	
});
