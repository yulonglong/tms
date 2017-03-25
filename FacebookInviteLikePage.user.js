// ==UserScript==
// @name         FacebookInviteLikePage
// @namespace    https://github.com/yulonglong/tms
// @version      0.1
// @description  Allows you to mass invite people to like your page who have liked a page post
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

function invite() {
	var count =0;
	var parent = document.getElementsByClassName('_6a _6b');
	for(var j=0; j<parent.length;j++) {
		var inputs = parent[j].getElementsByClassName('_42ft _4jy0 _4jy3 _517h _51sy');
		for(var i=0; i<inputs.length;i++) {
			if (inputs[i].classList.contains('_55pi')) continue;
			if (inputs[i].disabled == true) continue;
			inputs[i].click();
			count++;
		}
	}
	return count;
}

function inviteWrapper() {
	see();
	var num = invite();
	alert(num + " invitations sent!");
}

function addButton() {
	$('.uiList').prepend('<li><input type="button" value="Invite All" class="InviteAll"></li>');
	$('.InviteAll').click(inviteWrapper);
}

$(document).ready(function() {
	$('._4arz').on('click', 'span', function() {
		alert("Wait 2 seconds for the button to appear");
		setTimeout(addButton, 2000);
	});
});


