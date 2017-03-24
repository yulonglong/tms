// ==UserScript==
// @name         FacebookConfirmFriend
// @namespace    https://github.com/yulonglong/tms
// @version      1.2
// @description  Allows you mass confirm friend request
// @author       yulonglong
// @match        https://www.facebook.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

$(document).ready(function() {
    $('._50tj').append('<input type="button" value="Confirm All" id="confirmAll">')
    $('#confirmAll').click(function(){
        var num = confirmFriend();
        alert(num + " friends accepted");
    });
});

function confirmFriend() {
	var count =0;
	var parent = document.getElementsByClassName('actions');
	for(var j=0; j<parent.length;j++) {
		var inputs = parent[j].getElementsByClassName('_42ft _4jy0 _4jy3 _4jy3 _4jy1 selected _51sy');
		for(var i=0; i<inputs.length;i++) {
			inputs[i].click();
			count++;
		}
	}
	return count;
}
