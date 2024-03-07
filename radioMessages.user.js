// ==UserScript==
// @name         radioMessages
// @version      1.0.1
// @author       freakZ112
// @description  Sprechwünsche - da fliegen sie davon
// @include      /^https?:\/\/(?:w{3}\.)?(?:leitstellenspiel\.de|(?:meldkamerspel|missionchief|missionchief-australia|nodsentralspillet|112-merkez|jogo-operador112|operador193|dyspetcher101-game|missionchief-japan|jocdispecerat112|missionchief-korea|hatakeskuspeli|dispecerske-centrum)\.com|missionchief\.co\.uk|centro-de-mando\.es|operatorratunkowy\.pl|larmcentralen-spelet\.se|operatore112\.it|operateur112\.fr|dispetcher112\.ru|alarmcentral-spil\.dk|operacni-stredisko\.cz|centro-de-mando\.mx)\/$/
// @grant        none
// ==/UserScript==
/* global $ */

(function() {
    'use strict';

    if(!localStorage.radMe_config) localStorage.radMe_config = JSON.stringify({"cells": {"alli": true, "tax": 0}, "beds": {"alli": true, "spec": true, "tax": 0}});

    var config = JSON.parse(localStorage.radMe_config);

    $("body")
        .prepend(
        `<div class="modal fade bd-example-modal-lg" id="radMeModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
           <div class="modal-dialog modal-lg" role="document">
             <div class="modal-content">
               <div class="modal-header">
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&#x274C;</span>
                 </button>
                 <h2 class="modal-title"><center>Sprechwünsche</center></h2>
                 <div class="btn-group">
                   <a class="btn btn-success btn-xs" id="radMeSavePreferences">Einstellungen speichern</a>
                   <a class="btn btn-success btn-xs" id="radMeStartRadio">Sprechwünsche bearbeiten</a>
                 </div>
               </div>
                 <div class="modal-body" id="radMeModalBody">
                   <div style="display:flex">
                     <div style="flex:1">
                       <center><h4>Zellen</h4></center>
                       <div class="dropdown-item form-check">
                         <input type="checkbox" class="form-check-input" id="radMeAlliCells" ${config.cells.alli ? `checked`: ``}>
                         <label class="form-check-label" for="radMeAlliCells">Verbandszellen nutzen</label>
                       </div>
                       <div class="form-group">
                         <label for="radMeSelTaxCells">Abgabe in Prozent</label>
                         <select class="form-control" id="radMeSelTaxCells" style="width:15em">
                           <option>0</option>
                           <option>10</option>
                           <option>20</option>
                           <option>30</option>
                           <option>40</option>
                           <option>50</option>
                         </select>
                       </div>
                     </div>
                     <div style="flex:1">
                       <center><h4>Krankenhäuser</h4></center>
                       <div class="dropdown-item form-check">
                         <input type="checkbox" class="form-check-input" id="radMeAlliBeds" ${config.beds.alli ? `checked`: ``}>
                         <label class="form-check-label" for="radMeAlliBeds">Verbandskrankenhäuser nutzen</label>
                       </div>
                       <div class="dropdown-item form-check">
                         <input type="checkbox" class="form-check-input" id="radMeAlliSpec" ${config.beds.spec ? `checked`: ``}>
                         <label class="form-check-label" for="radMeAlliSpec">nur passende Fachrichtung</label>
                       </div>
                       <div class="form-group">
                         <label for="radMeSelTaxBeds">Abgabe in Prozent</label>
                         <select class="form-control" id="radMeSelTaxBeds" style="width:15em">
                           <option>0</option>
                           <option>10</option>
                           <option>20</option>
                           <option>30</option>
                           <option>40</option>
                           <option>50</option>
                         </select>
                       </div>
                     </div>
                   </div>
                   <div id="radMeSupportText"></div>
                 </div>
                 <div class="modal-footer">
                   <button type="button" class="btn btn-danger" data-dismiss="modal">Schließen</button>
                   <div class="pull-left">v ${GM_info.script.version}</div>
                 </div>
           </div>
         </div>`);

    $("#radMeSelTaxCells").val(config.cells.tax);
    $("#radMeSelTaxBeds").val(config.beds.tax);

    $("#navbar_profile_link")
        .parent()
        .after(`<li role="presentation"><a style="cursor:pointer" id="toggleRmModal" data-toggle="modal" data-target="#radMeModal" ><span class="glyphicon glyphicon-bullhorn"></span> Sprechwünsche</a></li>`);

    function writeStatus(count, max) {
        $("#radMeStartRadio").text("Sprechwünsche " + count + "/" + max);
        $("#radMeSupportText").text("Sprechwunsch " + count + " von " + max + " bearbeitet.");
        $("#radMeLabel").text("Sprechwünsche " + count + "/" + max);
    }

    function getFreeCells(data) {
        var $data = data;
        var cellsFree = [];

        $('a[href*="gefangener"]', $data).each(function(){
            var $this = $(this);
            var matchOwn = new RegExp("(?:Freie Zellen: )(.*?)(?:, Entfernung: )(.*?)(?: km)");
            var matchAlliance = new RegExp("(?:Freie Zellen: )(.*?)(?:, Entfernung: )(.*?)(?: km, Abgabe an Besitzer: )(.*?)(?:%)");
            var cellId = $this.attr('href').split('/')[4];
            var matchedText = "";
            var textToCheck = $this.text();
            var pushObject = {};

            if($this.text().indexOf("Abgabe") != -1) {
                matchedText = textToCheck.match(matchAlliance);
                pushObject.alli = true;
            } else {
                matchedText = textToCheck.match(matchOwn);
                matchedText[3] = 0;
                pushObject.alli = false;
            }

            pushObject.free = parseInt(matchedText[1]);
            pushObject.distance = parseFloat(matchedText[2].replace(',','.') * 1000);
            pushObject.tax = parseInt(matchedText[3]);
            pushObject.id = cellId;

            if(pushObject.tax > config.cells.tax || pushObject.free <= 0 || (pushObject.alli == true && config.cells.alli == false)) {
                return true;
            }

            cellsFree.push(pushObject);
        });

        cellsFree.sort(function(a, b) {
            return parseFloat(a.distance) - parseFloat(b.distance);
        });

        return cellsFree;
    }

    function getFreeBeds(data) {
        var $data = data;
        var bedsFree = [];

        $("table:nth-child(3) tbody tr, table:nth-child(5) tbody tr", $data).each(function(){
            var $this = $(this);
            var distance = $("td:nth-child(2)", $this).text().trim().replace(/\,|[ km]/gm, '') * 1000;
            var free = parseInt($("td:nth-child(3)", $this).text().trim());
            var taxes = $("td:nth-child(4)", $this).text().trim().replace(' %','');
            var speciality = $("td:nth-child(5)", $this).text().trim().replace(' %','');
            var pushObject = {};
            var hospitalId = $('td:last a', $this).attr('href').split('/')[4];
            var alliance = true;

            if(speciality == "Anfahren") {
                speciality = taxes;
                taxes = 0;
                alliance = false;
            }
            if(speciality == "Ja") {
                speciality = true;
            } else if(speciality == "Nein") {
                speciality = false;
            }

            if((speciality == false && config.beds.spec == true) || isNaN(free) || free <= 0 || +taxes > config.beds.tax || (config.beds.alli == false && alliance == true)) {
                return true;
            }

            pushObject.distance = distance;
            pushObject.free = free;
            pushObject.tax = +taxes;
            pushObject.spec = speciality;
            pushObject.id = hospitalId;
            pushObject.alli = alliance;

            bedsFree.push(pushObject);
        });

        bedsFree.sort(function(a, b) {
            return parseFloat(a.distance) - parseFloat(b.distance);
        });

        return bedsFree;
    }

    async function workRadio(speakArray) {
        var getInfos = (url, callback) => $.get(url, callback);
        var $speakArray = speakArray;
        var usedWlf = [];
        var counter = 0;

        $("#radio_panel_heading").after(`<a class="label label-danger" id="radMeLabel"></a>`);

        for(var i in $speakArray) {
            var response;
            var e = $speakArray[i];
            counter++;

            if(!e.multiple) {
                response = await getInfos("/vehicles/"+e.vehicleId);

                if(!e.missionId) {
                    $(".btn-success[href*='/vehicles/" + e.vehicleId + "']", response).each(function() {
                        var wlfId = +$(this).attr('href').match(/\d+$/g)[0];
                        if(!usedWlf.includes(wlfId)) {
                            $.get($(this).attr('href'));
                            usedWlf.push(wlfId);
                            writeStatus(counter, $speakArray.length);
                            return false;
                        }
                    });
                } else if(e.prisoner) {
                    var freeCellId = getFreeCells(response);

                    if(freeCellId[0] === undefined) {
                        writeStatus("defekt - reload", $speakArray.length);
                        break;
                    }

                    await getInfos("/vehicles/"+e.vehicleId+"/gefangener/"+freeCellId[0].id);
                    writeStatus(counter, $speakArray.length);
                } else {
                    var freeBeds = getFreeBeds(response);

                    if(freeBeds[0] === undefined) {
                        writeStatus("defekt - reload", $speakArray.length);
                        break;

                    }
                    await getInfos("/vehicles/"+e.vehicleId+"/patient/"+freeBeds[0].id);
                    writeStatus(counter, $speakArray.length);
                }
            } else {
                response = await getInfos("/missions/"+e.missionId);
                var $selectCells = $('td[id^="vehicle_prisoner_select_"]', response);
                var countPrisoners = +$('#h2_prisoners', response).text().trim().replace(' Gefangene','');
                var freeCells = getFreeCells($selectCells.first());

                var foundGefKw = false;
                var vehicleIdGefKw = "";
                var getVehicleTypeId = $('a[vehicle_type_id]', response);

                for(var k = 0; k < getVehicleTypeId.length; k++){
                    if(getVehicleTypeId[k].attributes[1].value === "52") {
                        foundGefKw = true;
                        vehicleIdGefKw = getVehicleTypeId[k].attributes[0].value.replace("/vehicles/","");
                    }
                }

                for(var l = 0; l < countPrisoners; l++) {
                    var vehicleId = $selectCells[l].attributes[3].value;

                    for(var j = 0; j < freeCells.length; j++){
                        if(freeCells[j].id === undefined) {
                            writeStatus("defekt - reload", $speakArray.length);
                            break;
                        }

                        if(freeCells[j].free <= 0) continue;

                        if(foundGefKw) {
                            if(freeCells[j].free <= 4) continue;

                            vehicleId = vehicleIdGefKw;
                            freeCells[j].free -= 5;
                            countPrisoners -= 5;
                            foundGefKw = false;
                        } else {
                            freeCells[j].free--;
                        }

                        await getInfos("/vehicles/"+vehicleId+"/gefangener/"+freeCells[j].id);
                        writeStatus(counter, $speakArray.length);

                        j = 1000;
                    }
                }
            }
        }
        setTimeout(function() {
            $("#radMeLabel").remove();
        }, 1000);
    }

    function scanRadio() {
        $("#radMeSupportText").text();
        var speakVehicles = [];
        $('#radio_messages_important li:not(.radio_message_alliance)').each(function(){
            var vehicle = {};
            var missionLink = $(this).find('a[href^="/missions/"]').attr('mission_id');

            vehicle.vehicleId = $(this).find('a[href^="/vehicles/"]').attr('href').replace('/vehicles/','');

            if(missionLink) {
                vehicle.missionId = missionLink.replace('/missions/','');
                var prisoners = $('#mission_prisoners_'+vehicle.missionId).children().length;

                if(prisoners > 1) vehicle.multiple = true;
                if(prisoners > 0) vehicle.prisoner = true;
            }

            speakVehicles.push(vehicle);

            if(speakVehicles.length == $('#radio_messages_important li:not(.radio_message_alliance)').length) {
                workRadio(speakVehicles);
            }
        });
    }

    $("body").on("click", "#radMeStartRadio", function() {
        scanRadio();
    });

    $("body").on("click", "#radio_panel_heading", function() {
        scanRadio();
    });

    $("body").on("click", "#radMeSavePreferences", function() {
        config.cells.alli = $("#radMeAlliCells")[0].checked;
        config.cells.tax = +$("#radMeSelTaxCells").val();
        config.beds.alli = $("#radMeAlliBeds")[0].checked;
        config.beds.spec = $("#radMeAlliSpec")[0].checked;
        config.beds.tax = +$("#radMeSelTaxBeds").val();

        localStorage.radMe_config = JSON.stringify(config);
        $("#radMeSupportText").text("Einstellungen gespeichert.");
    });

})();
