// ==UserScript==
// @name         FacebookInviteFriendToLikePage
// @namespace    https://github.com/yulonglong/tms
// @version      1.1
// @description  Allows you to mass invite your friend to like your page
// @author       yulonglong
// @match        https://www.facebook.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

function invite() {
	var count = 0;
	var inputs = document.getElementsByClassName('uiButton _1sm');
	for(var i=0; i<inputs.length;i++) {
		inputs[i].click();
		count++;
		if (count >= 50) break;
	}
	return count;
}

function inviteHighWrapper() {
	var invited = invite();
	alert(invited + " invitations sent!");
}

function addButton() {
	if($("#InviteAll").length == 0) {
		$('form._s > div._4-i0 > div').prepend('<input type="button" value="Invite All" id="InviteAll">');
		$('#InviteAll').click(inviteHighWrapper);
	}
}

setInterval(addButton, 2000);
