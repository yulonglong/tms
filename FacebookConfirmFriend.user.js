// ==UserScript==
// @name         FacebookConfirmFriend
// @namespace    https://github.com/yulonglong/tms
// @version      1.3
// @description  Allows you mass confirm friend request
// @author       yulonglong
// @match        https://www.facebook.com/friends/requests/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

function see() {
	var seeMore = $("div.clearfix.mtm.uiMorePager.stat_elem._646._52jv > div > a.pam.uiBoxLightblue._5cz.uiMorePagerPrimary");
	for(var k=0; k<seeMore.length;k++) seeMore[k].click();
	return seeMore.length;
}

function confirmFriend() {
	var count = 0;
	var inputs = $("div._6a._6b > div.ruResponse.ruResponseSimple > div.ruResponseButtons > button._42ft._4jy0._4jy3._4jy1._51sy");
	for(var i=0; i<inputs.length;i++) {
		inputs[i].click();
		count++;
	}
	return count;
}

function confirmFriendWrapper(prev) {
	var numSee = see();
	var num = confirmFriend();
	var total = prev + num;
	if (total <= 20 && numSee > 0) {
		setTimeout(confirmFriendWrapper, 1000, total);
	}
	else {
		alert(total + " friend confirmed!");
	}
}

function confirmFriendHighWrapper() {
	setTimeout(confirmFriendWrapper, 1000, 0);
}

$(document).ready(function() {
	$('._50tj').append('<input type="button" value="Confirm All" id="ConfirmAll">')
	$('#ConfirmAll').click(confirmFriendHighWrapper);
});

