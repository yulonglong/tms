// ==UserScript==
// @name         FacebookAddFriend
// @namespace    https://github.com/yulonglong/tms
// @version      0.2
// @description  Allows you to mass add friend to people who have liked a post
// @author       yulonglong
// @match        https://www.facebook.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

function see() {
	var seeMore = document.getElementsByClassName('pam uiBoxLightblue uiMorePagerPrimary');
	if (seeMore.length == 0) return "Already see all";
	for(var k=0; k<seeMore.length;k++) {
		seeMore[k].click();
	}
	return seeMore.length;
}

function addFriend() {
	var count =0;
	var parent = document.getElementsByClassName('_6a _6b');
	for(var j=0; j<parent.length;j++) {
		var inputs = parent[j].getElementsByClassName('_42ft _4jy0 FriendRequestAdd addButton _4jy3 _517h _51sy');
		for(var i=0; i<inputs.length;i++) {
			if (inputs[i].classList.contains('_55pi')) continue;
			if (inputs[i].disabled == true) continue;
			inputs[i].click();
			count++;
		}
	}
	return count;
}

function addFriendWrapper() {
	see();
	var num = addFriend();
	alert(num + " friends added!");
}

function addButton() {
	$('.uiList').prepend('<li><input type="button" value="Add Friend All" class="AddFriendAll"></li>');
	$('.AddFriendAll').click(addFriendWrapper);
}

$(document).ready(function() {
	$('._4arz').on('click', 'span', function() {
		alert("Wait 2 seconds for the button to appear");
		setTimeout(addButton, 2000);
	});
});



