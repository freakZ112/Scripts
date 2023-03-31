// ==UserScript==
// @name         Collector
// @version      1.0.3
// @author       freakZ112
// @description  Sammelt die Eier, Kürbis etc. ein
// @include      *://leitstellenspiel.de/missions/*
// @include      *://www.leitstellenspiel.de/missions/*
// @grant        none
// ==/UserScript==
/* global $ */

(function() {
'use strict';

$('a[href*="halloweenhunt"], a[href*="easteregg"], a[href*="valentinescollection"]').click((e) => {
event.preventDefault();
var target = $(event.currentTarget);
$.ajax({url: target.attr("href")});
target.remove();
})
})();

var easteregg = document.querySelectorAll('a[href*=easteregg]');
if (easteregg.length == 1){
    easteregg[0].click();
}

var halloweenhunt = document.querySelectorAll('a[href*=halloweenhunt]');
if (halloweenhunt.length == 1){
    halloweenhunt[0].click();
}

var valentinescollection = document.querySelectorAll('a[href*=valentinescollection]');
if (valentinescollection.length == 1){
   valentinescollection[0].click();
}
