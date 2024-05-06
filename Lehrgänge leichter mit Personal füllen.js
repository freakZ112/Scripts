// ==UserScript==
// @name        Lehrgänge leichter mit Personal füllen
// @namespace    http://tampermonkey.net/
// @version      1.2.1
// @description  enables the filtering of buildings in the creation of courses and select people faster!
// @author       freakZ112
// @include      https://www.leitstellenspiel.de/buildings/*
// @include      https://www.leitstellenspiel.de/schoolings/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leitstellenspiel.de
// @require      https://raw.githubusercontent.com/freakZ112/libs/main/utf16convert.js
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';




    //Mit dieser Variable können Standard-Filter-Werte für einzelne Lehrgänge festgelegt werden
    //Dabei muss man wie folgt vorgehen:

    //1. Suche den Namen des Lehrgang raus, für welchen Standard-Filter-Werte erstellt werden sollen. Füge diesen Namen in eckigen Klammern und Anführungszeichen ein.
    //Beispiel: ["GW-Gefahrgut Lehrgang"]

    //2. Falls standardmäßig nach einem Gebäude gefiltert werden soll, füge in Anführungszeichen die ID dem obigen Eintrag hinzu. Andernfalls füge leere Anfähungzeichen hinzu
    //Beispiel falls EIN Gebäude standardmäßig ausgewählt werden soll: ["GW-Gefahrgut Lehrgang","0"]
    //Beispiel falls KEIN Gebäude standardmäßig ausgewählt werden soll: ["GW-Gefahrgut Lehrgang",""]

    //3. Falls standardmäßig nach einer Erweiterung gefiltert werden soll, füge in Anführungszeichen den exakten Namen der Erweiterung dem obigen Eintrag hinzu. Andernfalls füge leere Anfähungzeichen hinzu
    //Beispiel falls EINE Erweiterung standardmäßig ausgewählt werden soll: ["GW-Gefahrgut Lehrgang","0","Großwache"]
    //Beispiel falls KEINE Erweiterung standardmäßig ausgewählt werden soll: ["GW-Gefahrgut Lehrgang","0",""]

    //4. Falls standardmäßig nur Gebäude angezeigt werden sollen, in welchen noch keine gewisse Anzahl an Ausbildungen vorhanden ist, füge in Anführungszeichen die Anzahl der Ausbildungen dem obigen Eintrag hinzu.
    //Andernfalls füge leere Anfähungzeichen hinzu
    //Beispiel falls nach vorhandenen Ausbildungen gefiltert werden soll: ["GW-Gefahrgut Lehrgang","0","Großwache","6"]
    //Beispiel falls nicht nach vorhandenen Ausbildungen gefiltert werden soll: ["GW-Gefahrgut Lehrgang","0","Großwache",""]

    //5. Falls standardmäßig nur Gebäude angezeigt werden sollen, in welchen eine gewisse Anzahl an Leuten vorhanden ist, füge in Anführungszeichen die Anzahl der Ausbildungen dem obigen Eintrag hinzu.
    //Andernfalls füge leere Anfähungzeichen hinzu
    //Beispiel falls nach Anzahl des Personal gefiltert werden soll: ["GW-Gefahrgut Lehrgang","0","Großwache","6","80"]
    //Beispiel falls nicht nach Anzahl des Personals gefiltert werden soll: ["GW-Gefahrgut Lehrgang","0","Großwache","6",""]

    //6. Füge zum Schluss ein Komma hinten hinzu
    //Beispiel: ["GW-Gefahrgut Lehrgang","0","Großwache","6","80"],

    //7. Diesen nun generierten Eintrag fügst du unten zwischen den beiden Kommentaren ein. Ob du alle Einträge in eine Zeile schreibst oder in eine Zeile nur einen Eintrag ist egal.

    //Die zur Zeit darin befindlichen Einträge sind Beispiele und können rausgelöscht werden

    var standardFilterWerte = [
        //***** unterhalb von hier einfügen *****
		//["Lehrgangsname", "Gebäude-ID", "Ausbau", "Filter vorhanden min.", "Filter min Leute",]
//Feuerwehr
        ["GW-Messtechnik Lehrgang","0","","3",""],
		["GW-Gefahrgut Lehrgang","0","","3",""],
		["Höhenrettung Lehrgang","0","","9",""],
		["ELW 2 Lehrgang","0","","6",""],
		["Dekon-P Lehrgang","0","","6",""],
		["Feuerwehrkran Lehrgang","0","","2",""],
		["Flugfeldlöschfahrzeug-Ausbildung","0","Flughafenfeuerwehr","18",""],
		["Rettungstreppen-Ausbildung","0","Flughafenfeuerwehr","12",""],
		["Werkfeuerwehr-Ausbildung","0","Werkfeuerwehr","72",""],
		["Drohnen-Schulung","0","","5",""],
//Polizei
		["Hundeführer (Schutzhund)","6","","2",""],
		["Kriminalpolizei","6","","4",""],
		["Dienstgruppenleitung","6","","2",""],
//BePol
		["Zugführer (leBefKw)","11","","12",""],
		["Hundertschaftsführer (FüKw)","11","","15",""],
		["Wasserwerfer","11","","15",""],
        ["SEK","11","","42",""],
        ["MEK","11","","42",""],
		["Hundeführer (Schutzhund)","11","","6",""],
//Sondereinheit
        ["SEK","17","","42",""],
        ["MEK","17","","42",""],
		["Hundeführer (Schutzhund)","17","","6",""],
//RD
		["Notarzt-Ausbildung","2","","10",""],
		["LNA-Ausbildung","2","","1",""],
		["OrgL-Ausbildung","2","","1",""],
		["SEG - Einsatzleitung","12","","2",""],
		["SEG - GW-San","12","","6",""],
		["GW-Wasserrettung Lehrgang","12","","6",""],
		["GW-Taucher Lehrgang","12","","2",""],
		["Rettungshundeführer (SEG)","12","","10",""],
		["SEG Drohne","12","","4",""],
		["Betreuungsdienst","12","","7",""],
		["Verpflegungshelfer","12","","14",""],
//THW
		["Zugtrupp","9","","8",""],
		["Fachgruppe Räumen","9","","9",""],
		["Fachgruppe Rettungshundeführer","9","","10",""],
		["Fachgruppe Wasserschaden/Pumpen","9","","10",""],
		["Fachgruppe Schwere Bergung","9","","9",""],
		["Fachgruppe Elektroversorgung","9","","3",""],
		["Fachzug Führung und Kommunikation","9","","22",""],
//Wasserrettung
		["GW-Wasserrettung Lehrgang","15","","12",""],
		["GW-Taucher Lehrgang","15","","4",""],


        //***** oberhalb von hier einfügen *****
    ];


    var defaultValueSettings = [["","","","",""]]

    var feuerwehrAusbauten = ["Rettungsdienst-Erweiterung","Wasserrettungs-Erweiterung","Flughafenfeuerwehr","Großwache","Werkfeuerwehr","Abrollbehälter-Stellplatz","Lüfter-Erweiterung","NEA50-Erweiterung","NEA200-Erweiterung"];
    var thwAusbauten = ["Zugtrupp","Fachgruppe Räumen","Fachgruppe Wassergefahren","Fachgruppe Ortung","Fachgruppe Wasserschaden/Pumpen","Fachgruppe Schwere Bergung","Fachgruppe Elektroversorgung"];
    var polizeiAusbauten = ["Technischer Zug: Wasserwerfer","SEK","MEK","Diensthundestaffel","Kriminalpolizei-Erweiterung","Dienstgruppenleitung-Erweiterung","Außenlastbehälter-Erweiterung"];
    var rettungsDienstAusbauten = ["Wasserrettungs-Erweiterung","Rettungshundestaffel"];

    var feuerwehrGebaeude = [["Feuerwache",0],["Feuerwache (Kleinwache)",18]];
    var thwGebaeude = [["THW Ortsverband",9]];
    var polizeiGebaeude = [["Polizeiwache",6],["Polizeiwache (Kleinwache)",19],["Bereitschaftspolizei",11],["Polizeihubschrauber-Station",13],["Polizei-Sondereinheit",17]];
    var rettungsDienstGebaeude = [["Rettungswache",2],["Rettungswache (Kleinwache)",20],["Rettungshubschrauber-Station",5],["Rettungshundestaffel",21],["SEG",12],["Wasserrettungswache",15]];

    var buildings;

    if (!sessionStorage.c2Buildings || JSON.parse(sessionStorage.c2Buildings).lastUpdate < (new Date().getTime() - 5 * 1000 * 60) || JSON.parse(sessionStorage.c2Buildings).userId != user_id) {
        await $.getJSON('/api/buildings').done(data => sessionStorage.setItem('c2Buildings', JSON.stringify({ lastUpdate: new Date().getTime(), value: LZString.compress(JSON.stringify(data)), userId: user_id })));
    }

    buildings = JSON.parse(LZString.decompress(JSON.parse(sessionStorage.c2Buildings).value));

    var buildingType = 0;
    if(window.location.href.includes("leitstellenspiel.de/buildings/")){
        buildingType = document.getElementsByTagName("h1")[0].getAttribute("building_type");
    } else if(window.location.href.includes("leitstellenspiel.de/schoolings/")){

        var shownBuildings = Array.prototype.slice.call($('#accordion')[0].getElementsByTagName("div"));
        shownBuildings = shownBuildings.filter(b => b.hasAttribute("building_id"));
        shownBuildings = shownBuildings.map(b => parseInt(b.getAttribute("building_id")));
        shownBuildings = shownBuildings.map(b => {
            var filteredB = buildings.filter(b2 => b2.id == b);
            if(filteredB.length > 0){
                return filteredB[0].building_type;
            } else {
                return -1;
            }
        });

        if (shownBuildings.filter(b => parseInt(b) == 0).length > 0){
            buildingType = 1;
        }
        if (shownBuildings.filter(b => parseInt(b) == 2).length > 0){
            buildingType = 3;
        }
        if (shownBuildings.filter(b => parseInt(b) == 6).length > 0){
            buildingType = 8;
        }
        if (shownBuildings.filter(b => parseInt(b) == 9).length > 0){
            buildingType = 10;
        }

    }
    var allBuil = [];

    if (buildingType == 1 || buildingType == 3 || buildingType == 8 || buildingType == 10){

        var dropDownSelectionAusbau = [];
        var dropDownSelectionGebaeude = [];

        if (buildingType == 1){
            dropDownSelectionAusbau = feuerwehrAusbauten;
            dropDownSelectionGebaeude = feuerwehrGebaeude;
        }
        if (buildingType == 3){
            dropDownSelectionAusbau = rettungsDienstAusbauten;
            dropDownSelectionGebaeude = rettungsDienstGebaeude;
        }
        if (buildingType == 8){
            dropDownSelectionAusbau = polizeiAusbauten;
            dropDownSelectionGebaeude = polizeiGebaeude;
        }
        if (buildingType == 10){
            dropDownSelectionAusbau = thwAusbauten;
            dropDownSelectionGebaeude = thwGebaeude;
        }

        //var building = cBuildings.filter(b => b.id == buildingID)[0];

        var newWindow = document.createElement("div");

        var text = `
            <p style="display: inline-block"><b>Achtung! Achtung! Achtung! Bei der Verwendung von Skripten, welche die Oberfläche verändern (z.B. LSS-Manager oder das Lehrgangsskript vom Waldgott) kann es passieren, dass die Lehrgangs-Skripte nicht mehr funktioniert! In diesem Fall das oberflächenverändernde Skript ausschalten und nach der Lehrgangszuweisung wieder einschalten.</b></p>`;
        newWindow.innerHTML = text;

        $('#accordion').before(newWindow);


        newWindow = document.createElement("div");

        text = `
            <p style="display: inline-block"><b>TIP: öffne die Gebäude von unten nach oben, dann musst du nicht scrollen!</b></p>`;
        newWindow.innerHTML = text;

        $('#accordion').before(newWindow);


        newWindow = document.createElement("div");

        text = `
            <p style="display: inline-block"><b>Wenn unten in der Liste am rechten Rand "Lade..." erscheint und nicht mehr verschwindet, einmal minimal scrollen!</b></p>`;
        newWindow.innerHTML = text;

        $('#accordion').before(newWindow);


        newWindow = document.createElement("div");

        text = `
          Nach Gebäuden filtern
          <select id="gebaeudeArt" name="gebaeudeFiltern" style="display:inline-block; color: #000;">
                <option value="">nicht filtern</option>`;
        for(var i = 0; i < dropDownSelectionGebaeude.length; i++){
            text += `<option value="` + dropDownSelectionGebaeude[i][1] +`">`+ dropDownSelectionGebaeude[i][0] +`</option>`;
        }
        text += `</select>`;
        newWindow.innerHTML = text;

        $('#accordion').before(newWindow);


        newWindow = document.createElement("div");

        text = `
          Nach Ausbauten filtern
          <select id="ausbau" name="ausbauFiltern" style="display:inline-block; color: #000;">
                <option value="">nicht filtern</option>`;
        for(i = 0; i < dropDownSelectionAusbau.length; i++){
            text += `<option value="` + dropDownSelectionAusbau[i] +`">`+ dropDownSelectionAusbau[i] +`</option>`;
        }
        text += `</select>`;
        newWindow.innerHTML = text;

        $('#accordion').before(newWindow);


        newWindow = document.createElement("div");

        text = `
          Lager vorhanden:
          <input type="checkbox" id="lager" name="lagerFiltern" style="display:inline-block; color: #000;">`;
        newWindow.innerHTML = text;

        $('#accordion').before(newWindow);


        newWindow = document.createElement("div");

        text = `
            <p style="display: inline-block">zeige nur Wachen mit weniger Ausbildungen als ausgewählter Anzahl an:</p>
            <input style="display:inline-block; color: #000; width:50px;" type="number" id="maxAusbildungen" min="1" value=""></input>`;
        newWindow.innerHTML = text;

        $('#accordion').before(newWindow);


        newWindow = document.createElement("div");

        text = `
            <p style="display: inline-block">zeige nur Wachen an, die mindestens die ausgewählte Personenanzahl haben:</p>
            <input style="display:inline-block; color: #000; width:50px;" type="number" id="minPerson" min="1" value=""></input>`;
        newWindow.innerHTML = text;

        $('#accordion').before(newWindow);


        let div = document.createElement("div");
        div.className = "navbar-text navbar-right"
        div.innerHTML = `
                <p style="display: inline-block">füllt die Anzahl der Ausbildungen pro Wache bis zur gewählten Zahl auf  </p>
                <input style="display:inline-block; color: #000; width:50px;" type="number" id="maxPerBuilding" min="1" value="1"></input>
                <a id="btnAutoSelect" class="btn btn-success">Auswählen</a>
                <input id="noEduc" name="noEduc" type="checkbox" checked="true">
                <label class="" for="noEduc">nur Personal ohne Ausbildung</label>
                <input id="noAss" name="noAss" type="checkbox" checked="true">
                <label class="" for="noAss">nur ungebundenes Personal</label>
        `;


        let insertBeforeElement = $('#schooling_free')[0].parentElement
        insertBeforeElement.parentElement.insertBefore(div, insertBeforeElement);

        $('#btnAutoSelect').on('click', function() { autoSelectPeople(); });

        //document.getElementById('ausbau').addEventListener ('change', filterBuildings);
        //document.getElementById('maxAusbildungen').addEventListener ('change', filterBuildings);

        allBuil = Array.prototype.slice.call($('#accordion')[0].getElementsByClassName('panel panel-default'));


        var setting = [];

        var relevantRadioButtons = Array.prototype.slice.call(document.getElementsByTagName("input")).filter(e => e.getAttribute("class") == "radio");
        relevantRadioButtons = relevantRadioButtons.filter(e => e.getAttribute("id").indexOf("education_") >= 0);

        if(document.getElementsByTagName("h2").length > 0 && (document.getElementsByTagName("h2")[0] == null || document.getElementsByTagName("h2")[0].parentNode.className != "alert alert-info")){
            setting = standardFilterWerte.filter((e) => e[0] === document.getElementsByTagName("h2")[0].innerText);
        } else if(relevantRadioButtons.length > 0){
            checkForRadioButtonChange();
        }

        if(setting.length > 0){
            $("#gebaeudeArt")[0].value = setting[0][1];
            $("#ausbau")[0].value = setting[0][2];
            $("#maxAusbildungen")[0].value = setting[0][3];
            $("#minPerson")[0].value = setting[0][4];
            $("#maxPerBuilding")[0].value = setting[0][3];
            if(setting[0][3] == ""){
                $("#maxPerBuilding")[0].value = 1;
            }
        }
    }

    var oldSelection = "";

    async function checkForRadioButtonChange(){
        var changed = false;

        for(let n = 0; n < relevantRadioButtons.length; n++){
            if(relevantRadioButtons[n].checked){
                var text = relevantRadioButtons[n].parentNode.innerText
                text = text.substring(0, text.lastIndexOf("(")).trim();

                if(oldSelection != text){
                    oldSelection = text;
                    setting = standardFilterWerte.filter((e) => e[0] === text);
                    changed = true;

                    if(setting.length == 0){
                        setting = defaultValueSettings;
                    }
                }
            }
        }

        if(changed){
            $("#gebaeudeArt")[0].value = setting[0][1];
            $("#ausbau")[0].value = setting[0][2];
            $("#maxAusbildungen")[0].value = setting[0][3];
            $("#minPerson")[0].value = setting[0][4];
            $("#maxPerBuilding")[0].value = setting[0][3];
            if(setting[0][3] == ""){
                $("#maxPerBuilding")[0].value = 1;
            }
        }

        await delay(500);
        checkForRadioButtonChange();
    }

    var relevantBuildingIDs = [];
    var oldAusbauSelection = NaN;
    var oldGebäudeSelection = NaN;
    var oldNumPeopleSelection = NaN;
    var oldLagerSelection = NaN;

    function updateRelevantBuildings(){
        oldAusbauSelection = document.getElementById('ausbau').value;
        oldGebäudeSelection = document.getElementById('gebaeudeArt').value;
        oldNumPeopleSelection = document.getElementById('minPerson').value;
        oldLagerSelection = document.getElementById('lager').checked;

        relevantBuildingIDs = [];

        var filtered;

        filtered = buildings.filter((e) => {
            if(e.extensions){
                return (document.getElementById('gebaeudeArt').value == "" || e.building_type == parseInt(oldGebäudeSelection)) && (document.getElementById('minPerson').value == "" || parseInt(document.getElementById('minPerson').value) <= e.personal_count) &&
                    (document.getElementById('ausbau').value == "" || e.extensions.filter((e1) => e1.caption.indexOf(document.getElementById('ausbau').value) >= 0).length > 0) &&
                    (oldLagerSelection == false || e.storage_upgrades.length > 0);
            } else {
                return false;
            }
        });

        for(var n=0; n < filtered.length; n++){
            relevantBuildingIDs.push(parseInt(filtered[n].id));
        }
    }

    filterBuildings();

    async function filterBuildings(){
        if(buildings){
            if(oldAusbauSelection != document.getElementById('ausbau').value || oldGebäudeSelection != document.getElementById('gebaeudeArt').value || oldNumPeopleSelection != document.getElementById('minPerson').value ||
               oldLagerSelection != document.getElementById('lager').checked){
                updateRelevantBuildings();
            }

            for(var n = 0; n < allBuil.length;n++){
                if(relevantBuildingIDs.includes(parseInt(allBuil[n].getElementsByClassName('panel-heading personal-select-heading')[0].getAttribute("building_id"))) &&
                   (document.getElementById('maxAusbildungen').value == "" || parseInt(document.getElementById('maxAusbildungen').value) > getNumAusbildungen(allBuil[n]))){
                    allBuil[n].setAttribute("class", "panel panel-default");
                } else {
                    allBuil[n].setAttribute("class", "panel-body hidden");
                    if(allBuil[n].getElementsByClassName('panel-body').length > 0 && allBuil[n].getElementsByClassName('panel-body hidden').length == 0){
                        allBuil[n].getElementsByClassName('panel-heading personal-select-heading')[0].click();

                        var allPeople = Array.prototype.slice.call(allBuil[n].getElementsByTagName("tr"));
                        allPeople.shift();

                        for (let i = 0; i < allPeople.length; i++) {
                            UnselectPeople(allPeople[i]);
                        }
                    }
                }
            }
        }

        await delay(500);
        filterBuildings();
    }

    function delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    function autoSelectPeople() {
        var allBuildings = Array.prototype.slice.call(document.getElementsByClassName("table table-striped tablesorter tablesorter-default"));

        allBuildings = allBuildings.filter(item => new String(item.parentElement.className).valueOf() != new String("panel-body hidden").valueOf());

        allBuildings.forEach(item => {
            var allPeople = Array.prototype.slice.call(item.getElementsByTagName("tr"));
            allPeople.shift();

            var curSelected = getNumAusbildungen2(item);
            for (let i = 0; i < allPeople.length; i++) {
                if(IsPeopleAvailable(allPeople[i]) && IsPeopleSelected(allPeople[i])){
                    curSelected += 1;
                }

                if(IsPeopleAvailable(allPeople[i]) && IsPeopleSelected(allPeople[i]) && ((document.getElementById("noEduc").checked && HasPeopleASTraining(allPeople[i])) || (document.getElementById("noAss").checked && IsPeopleGebunden(allPeople[i])))){
                    UnselectPeople2(allPeople[i]);
                    curSelected -= 1;
                }
            }

            var maxPerBuilding = $('#maxPerBuilding').val();

            for (let i = 0; i < allPeople.length; i++) {
                if(curSelected < maxPerBuilding && IsPeopleAvailable(allPeople[i]) && !IsPeopleSelected(allPeople[i]) && (!document.getElementById("noEduc").checked || !HasPeopleASTraining(allPeople[i])) && (!document.getElementById("noAss").checked || !IsPeopleGebunden(allPeople[i]))){
                    SelectPeople(allPeople[i]);
                    curSelected += 1;
                }

                if(curSelected > maxPerBuilding && IsPeopleAvailable(allPeople[i]) && IsPeopleSelected(allPeople[i])){
                    UnselectPeople2(allPeople[i]);
                    curSelected -= 1;
                }
            }
        });
    }

    function getNumAusbildungen(building){
        var returnValue = 0;
        if(building.getElementsByClassName("label label-success").length > 0){
            returnValue += parseInt(building.getElementsByClassName("label label-success")[0].innerHTML) || 0;
        }
        if(building.getElementsByClassName("label label-info").length > 0){
            returnValue += parseInt(building.getElementsByClassName("label label-info")[0].innerHTML) || 0;
        }
        return returnValue;
    }

    function getNumPeople(building){
        return parseInt(building.getElementsByClassName("label label-default ")[0].innerHTML) || 0;
    }

    function UnselectPeople(entry){
        if(entry.getElementsByTagName("td")[0].getElementsByTagName("input").length > 0 && entry.getElementsByTagName("td")[0].getElementsByTagName("input")[0].checked){
            entry.getElementsByTagName("td")[0].getElementsByTagName("input")[0].click();
        }
    }

    function getNumAusbildungen2(building){
        building = building.parentNode.parentNode;
        var returnValue = 0;
        if(building.getElementsByClassName("label label-success").length > 0){
            returnValue += parseInt(building.getElementsByClassName("label label-success")[0].innerHTML) || 0;
        }
        if(building.getElementsByClassName("label label-info").length > 0){
            returnValue += parseInt(building.getElementsByClassName("label label-info")[0].innerHTML) || 0;
        }

        return returnValue;
    }

    function IsPeopleSelected(entry){
        return entry.getElementsByTagName("td")[0].getElementsByTagName("input")[0].checked;
    }

    function SelectPeople(entry){
        if(!entry.getElementsByTagName("td")[0].getElementsByTagName("input")[0].checked && parseInt($('#schooling_free')[0].innerHTML) > 0){
            entry.getElementsByTagName("td")[0].getElementsByTagName("input")[0].click();
        }
    }

    function UnselectPeople2(entry){
        if(entry.getElementsByTagName("td")[0].getElementsByTagName("input")[0].checked){
            entry.getElementsByTagName("td")[0].getElementsByTagName("input")[0].click();
        }
    }

    function IsPeopleAvailable(entry){
        return new String(entry.getElementsByTagName("td")[0].innerHTML).valueOf().trim() != new String("").valueOf();
    }

    function HasPeopleASTraining(entry){
        return new String(entry.getElementsByTagName("td")[2].innerHTML).valueOf().trim() != new String("").valueOf();
    }

    function IsPeopleGebunden(entry){
        return new String(entry.getElementsByTagName("td")[3].innerHTML).valueOf().trim() != new String("").valueOf();
    }
})();
