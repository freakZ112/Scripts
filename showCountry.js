// ==UserScript==
// @name         showCounty
// @version      1.0.0
// @description  zeigt den Landkreis der gebauten Wache an
// @author       freakZ112
// @include      /^https?:\/\/(?:w{3}\.)?(?:(policie\.)?operacni-stredisko\.cz|(politi\.)?alarmcentral-spil\.dk|(polizei\.)?leitstellenspiel\.de|missionchief\.gr|(?:(police\.)?missionchief-australia|(police\.)?missionchief|(poliisi\.)?hatakeskuspeli|missionchief-japan|missionchief-korea|nodsentralspillet|meldkamerspel|operador193|jogo-operador112|jocdispecerat112|dispecerske-centrum|112-merkez|dyspetcher101-game)\.com|(police\.)?missionchief\.co\.uk|centro-de-mando\.es|centro-de-mando\.mx|(police\.)?operateur112\.fr|(polizia\.)?operatore112\.it|operatorratunkowy\.pl|dispetcher112\.ru|larmcentralen-spelet\.se)\/buildings\/.*\
// @grant        none
// ==/UserScript==
/* global $ */

(async function() {
    'use strict';

    var building = await $.getJSON("/api/buildings/" + window.location.href.replace(/\D+/g, ""));

    await $.getJSON("https://nominatim.openstreetmap.org/reverse?format=json&lat=" + building.latitude + "&lon=" + building.longitude + "&zoom=18&addressdetails=1", function(data) {
        $(".active:first").after("<span class='label label-info' style='cursor:default;margin-left:2em'>" + (data.address.county ? data.address.county : (data.address.city ? data.address.city : data.address.town)) + "</span>");
    });

})();
