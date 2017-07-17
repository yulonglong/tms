// ==UserScript==
// @name         FacebookInviteLikePage
// @namespace    https://github.com/yulonglong/tms
// @version      1.5.2
// @description  Allows you to mass invite people to like your page who have liked a page post
// @author       yulonglong
// @match        https://www.facebook.com/*
// @match        https://business.facebook.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Shared see more and invite function
function see() {
	var seeMore = $("div.clearfix.mtm.uiMorePager.stat_elem._52jv > div > a.pam.uiBoxLightblue.uiMorePagerPrimary");
	for(var k=0; k<seeMore.length;k++) seeMore[k].click();
	return seeMore.length;
}

function invite() {
	var count = 0;
	var inviteMore = $("div._6a._5j0d > div._6a._6b > span > a._42ft._4jy0._4jy3._517h._51sy");
	for(var k=0; k<inviteMore.length;k++) {
		if (inviteMore[k].classList.contains('_55pi')) continue;
		if (inviteMore[k].disabled == true) continue;
		inviteMore[k].click();
		count++;
	}
	return count;
}

function tooManyInvites() {
	// Check whether found too many invites box, if found, stop immediately
	var tooManyInvites1 = $("div._t > div > div > div > div._4-i0");
	var tooManyInvites2 = $("div._t > div > div > div > div._4-i2._pig._50f4");
	var tooManyInvites3 = $("div._t > div > div > div > div._5a8u._5lnf.uiOverlayFooter");
	if (tooManyInvites1.length > 0 || tooManyInvites2.length > 0 || tooManyInvites3.length > 0) {
		return true;
	}
	return false;
}

// Invite per click functions
function inviteWrapper(prev) {
	if (tooManyInvites()) {
		alert(prev + " invitations sent!");
		return;
	}
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

// Invite Perpetual Function
function invitePerpetualWrapper(prev, grandTotal) {
	if (tooManyInvites()) {
		alert((grandTotal+prev).toString() + " invitations sent!");
		return;
	}
	
	var numSee = see();
	var num = invite();
	var total = prev + num;
	if (total <= 50 && numSee > 0) {
		if($("#ListInvitePerpetualAll").length > 0) {
			$('#ListInvitePerpetualAll').append(' + ' + num);
		}
		setTimeout(invitePerpetualWrapper, 500, total, grandTotal);
	}
	else if (numSee > 0) {
		randomMilliseconds = Math.round(Math.random() * 300000);
		if ($("#ListInvitePerpetualAll").length > 0) {
			$('#ListInvitePerpetualAll').append(' + ' + num);
			$('#ListInvitePerpetualAll').append(' = ' + total);
			$('#ListInvitePerpetualAll').append('<br>');
			$('#ListInvitePerpetualAll').append(new Date().toLocaleString());
			$('#ListInvitePerpetualAll').append('<br>');
			$('#ListInvitePerpetualAll').append('Waiting for 15 mins and ' + (randomMilliseconds/1000).toString() + ' seconds');
			$('#ListInvitePerpetualAll').append('<br>');
		}
		setTimeout(invitePerpetualWrapper, 900000 + randomMilliseconds, 0, grandTotal + total);
	}
	else {
		if($("#ListInvitePerpetualAll").length > 0) {
			$('#ListInvitePerpetualAll').append(' + ' + num);
			$('#ListInvitePerpetualAll').append(' = ' + total);
			$('#ListInvitePerpetualAll').append('<br>');
			$('#ListInvitePerpetualAll').append('Grand Total : ' + grandTotal);
		}
		alert(grandTotal + " invitations sent!");
	}
}

function invitePerpetualHighWrapper() {
	if($("#ListInvitePerpetualAll").length > 0) {
		$('#ListInvitePerpetualAll').empty();
		$('#ListInvitePerpetualAll').html('<input type="button" value="Invite Perpetual All" id="InvitePerpetualAll">');
		$('#InvitePerpetualAll').click(invitePerpetualHighWrapper);
		$('#ListInvitePerpetualAll').append('Loading... 0');
	}
	setTimeout(invitePerpetualWrapper, 500, 0, 0);
}


function addButton() {
	if($("#InviteAll").length == 0) {
		$('div._5i_p > ul').prepend('<li id="ListInviteAll"><input type="button" value="Invite All" id="InviteAll"></li>');
		$('#InviteAll').click(inviteHighWrapper);
	}
	if($("#InvitePerpetualAll").length == 0) {
		$('div._5i_p > ul').prepend('<li id="ListInvitePerpetualAll"><input type="button" value="Invite Perpetual All" id="InvitePerpetualAll"></li>');
		$('#InvitePerpetualAll').click(invitePerpetualHighWrapper);
	}
}

setInterval(addButton, 2000);
