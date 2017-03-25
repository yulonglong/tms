// ==UserScript==
// @name         FacebookInviteLikePage
// @namespace    https://github.com/yulonglong/tms
// @version      1.3
// @description  Allows you to mass invite people to like your page who have liked a page post
// @author       yulonglong
// @match        https://www.facebook.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

function see() {
	var seeMore = $("div.clearfix.mtm.uiMorePager.stat_elem._52jv > div > a.pam.uiBoxLightblue.uiMorePagerPrimary");
	for(var k=0; k<seeMore.length;k++) seeMore[k].click();
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

function inviteWrapper(prev) {
	var numSee = see();
	var num = invite();
	var total = prev + num;
	if (total <= 50 && numSee > 0) {
		if($("#ListInviteAll").length > 0) {
			$('#ListInviteAll').append(' + ' + num);
		}
		setTimeout(inviteWrapper, 500, total);
	}
	else {
		if($("#ListInviteAll").length > 0) {
			$('#ListInviteAll').append(' + ' + num);
			$('#ListInviteAll').append(' = ' + total);
		}
		alert(total + " invitations sent!");
	}
}

function inviteHighWrapper() {
	if($("#ListInviteAll").length > 0) {
		$('#ListInviteAll').empty();
		$('#ListInviteAll').html('<input type="button" value="Invite All" id="InviteAll">');
		$('#InviteAll').click(inviteHighWrapper);
		$('#ListInviteAll').append('Loading... 0');
	}
	setTimeout(inviteWrapper, 500, 0);
}

function addButton() {
	if($("#InviteAll").length == 0) {
		$('div._5i_p > ul').prepend('<li id="ListInviteAll"><input type="button" value="Invite All" id="InviteAll"></li>');
		$('#InviteAll').click(inviteHighWrapper);
	}
}

setInterval(addButton, 2000);
