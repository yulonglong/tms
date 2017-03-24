// ==UserScript==
// @name         FacebookConfirmFriend
// @namespace    https://github.com/yulonglong/tms
// @version      1
// @description  Allows you mass confirm friend request
// @author       yulonglong
// @match        http://www.facebook.com/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

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

confirmFriendbh_go();
