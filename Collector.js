// ==UserScript==
// @name         Collector
// @version      1.0.5
// @author       freakZ112
// @description  Sammelt die Eier, Kürbis etc. ein
// @include      *://leitstellenspiel.de/missions/*
// @include      *://www.leitstellenspiel.de/missions/*
// @grant        none
// ==/UserScript==
/* global $ */

(function() {
'use strict';

$('a[href*="claim_found_object_sync"]').click((e) => {
event.preventDefault();
var target = $(event.currentTarget);
$.ajax({url: target.attr("href")});
target.remove();
})
})();

var claim_found_object_sync = document.querySelectorAll('a[href*=claim_found_object_sync]');
if (claim_found_object_sync.length == 1){
   claim_found_object_sync[0].click();
}
