function InstaTodayArticle(curHeadline, curSnippet){
	"use strict";


this.title = curHeadline;
this.description= curSnippet;
this.img="";
}

var instaToday =[];

function getTodayData(curSearchTerm){
	var TodaySearchURL ='http://api.usatoday.com/open/articles?section=politics&keyword='
    var searchTerm = curSearchTerm;
    var myTodayKey='YOUR_TODAY_API_KEY';

	$.ajax({
		url: TodaySearchURL + searchTerm + myTodayKey,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log("We got problems");
			alert("You entered " + curSearchTerm + "??? Please try entering a different word.");
		},
		success: function(data){
			console.log("WooHoo!");
			var TodayArticles;
			if(!(data.stories instanceof Array)){
				console.log("Data is not an array");
				return;
			}
			else{
				TodayArticles= data.stories;

			}
			var tempArticleObj;
			for(var i=0; i<TodayArticles.length; i++){
				tempArticleObj = new InstaTodayArticle(TodayArticles[i].title, TodayArticles[i].description);
				instaToday.push(tempArticleObj);
				getInstagramData();

			}
		}



	})



}


function getInstagramData(){
	"use strict";
	var curTag = 'selfie';
	var myInstaKey = 'YOUR_INSTAGRAM_API_KEY';
	var instagramTagSearchURL = 'https://api.instagram.com/v1/tags/' + curTag + '/media/recent?client_id=' + myInstaKey;

	$.ajax({
		url: instagramTagSearchURL,
		type: 'GET',
		dataType: 'jsonp',
		error: function(data){
			console.log("We got problems");
			console.log(data.status);
		},
		success: function(data){
			console.log("WooHoo!");
			var instagramData;
			if(!(data.data instanceof Array)){
				console.log("Huh?? Data is not an array");
				console.log(data);
				return;
			}
			else{
				instagramData= data.data;
				for(var i=0; i<instaToday.length; i++){
					instaToday[i].img = instagramData[i].images.thumbnail.url;
					$("#latestUpdates").append("<div class='articleBox'>" +
							"<p class='articleTitle'>" +
								instaToday[i].title +
							"</p>" +
							"<div class='contentBox'>" +
								"<img class='articleImg' src=" + instaToday[i].img + ">" +
								"<p class='articleText'>" +
									instaToday[i].description+
								"</p>" +
							"</div>" +
						"</div>"
						);
				}

			}
			
		}



	});




}

$(document).ready(function(){
	"use strict";

	$("#inputBox").focus(function() {
		$("#inputBox").val("");
	});

	$("#update").click(function(){
		console.log("Clicked Update");
		instaToday = [];
	$("#latestUpdates").empty();
	var inputTerm = $('#inputBox').val();
	getTodayData(inputTerm);

	
	
	});	
});
