// ==UserScript==
// @name         Personalzuweiser
// @namespace    empty
// @version      1.0.0.2
// @description  assign People with a button push
// @author       freakZ112
// @match        https://www.leitstellenspiel.de/vehicles/*/zuweisung
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leitstellenspiel.de
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(async function() {
    'use strict';

    //------- you can change this variables -------


    //für Fahrzeuge in dieser Liste können Personen per Knopfdruck zugewiesen werden.
    //erstes Feld: Fahrzeug ID z.B. "35"

    //zweites Feld: Lehrgang der zuzuweisenden Person. Kopiere dazu die Bezeichung des Lehrgangs aus dem Fenster raus, in welchem du die Personen dem Fahrzeug zuweisen würdest und NICHT den Namen des Lehrgangs.
    //richtig wäre: "GW-Gefahrgut"    falsch wäre: "GW-Gefahrgut Lehrgang".
    //z.B. "Zugführer (leBefKw)" oder "" für Leute ohne Lehrgänge

    //drittes Feld: Anzahl der Personen. z.B. 1 oder 3 oder 4

    //somit sollte die Zeile unten drunter z.B. so aussehen:        var list = [["35","Zugführer (leBefKw)",1],["50","",1],["29","Notarzt",2]];
    //beim NAW müssen zwei verschiedene Personengruppen zugewiesen werden. Einmal mit Notarzt-Ausbildung und einmal ohne.
    //Dafür einfach zwei Einträge in der Liste erstellen.

    var list = [
        ["0","",9], //LF20
        ["1","",9], //LF10
        ["2","",3], //DLK
        ["3","",3], //ELW 1
        ["4","",3], //RW
        ["5","",3], //GW-A
        ["6","",9], //LF8/6
        ["7","",9], //LF20/16
        ["8","",9], //10/6
        ["9","",9], //LF16-TS
        ["10","",3], //GW-Öl
        ["11","",3], //GW-L2-Wasser
        ["12","GW-Messtechnik",3], //GW-Mess
        ["13","",3], //SW1000
        ["14","",6], //SW2000
        ["15","",3], //SW2000-Tr
        ["16","",3], //SW KatS
        ["17","",3], //TLF2000
        ["18","",3], //TLF3000
        ["19","",3], //TLF8/8
        ["20","",3], //TLF8/18
        ["21","",3], //TLF 16/24-Tr
        ["22","",6], //TLF16/25
        ["23","",3], //TLF16/45
        ["24","",3], //TLF20/40
        ["25","",3], //TLF20/40-SL
        ["26","",3], //TLF16
        ["27","GW-Gefahrgut",3], //GW-Gefahr
        ["28","",2], //RTW
        ["29","Notarzt",1], //NEF
        ["29","",1], //NEF
        ["30","",9], //HLF20
        ["31","Notarzt",1], //RTH
        ["32","",2], //FuStW
        ["33","GW-Höhenrettung",9], //GW-Höhen
        ["34","ELW 2",6], //ELW2
        ["35","Zugführer (leBefKw)",3], //leBefKw
        ["36","",9], //MTW
        ["37","",6], //TSF-W
        ["38","",2], //KTW
        ["39","",9], //GKW
        ["40","Zugtrupp",4], //MTW-TZ
        ["41","",9], //MzGW (FGr N) ; MzKW
        ["42","Fachgruppe Räumen",3], //LKW K9
        ["45","Fachgruppe Räumen",6], //MLW5
        ["46","Wechsellader",3], //WLF
        ["50","",1], //GruKw
        ["51","Hundertschaftsführer (FüKw)",3], //FüKw
        ["52","",2], //GefKw
        ["53","Dekon-P",6], //Dekon-P
        ["55","LNA",1], //LNA
        ["56","OrgL",1], //OrgL
        ["57","Feuerwehrkran",2], //FwK
        ["58","",2], //KTW Typ B
        ["59","Einsatzleitung (SEG)",2], //ELW 1 (SEG)
        ["60","GW-San",6], //GW-SAN
        ["61","Polizeihubschrauber",3], //Polizeihubschrauber
        ["63","GW-Taucher",2], //GW-Taucher
        ["64","GW-Wasserrettung",6], //GW-Wasserrettung
        ["65","GW-Wasserrettung",3], //LKW 7 Lkr 19 tm
        ["69","Taucher",2], //Tauchkraftwagen
        ["72","Wasserwerfer",5], //WaWe 10 ; Wasserwerfer
        ["73","Notarzt",6], //GRTW
        ["74","Notarzt",1], //NAW
		["74","",2], //NAW
        ["75","Flugfeldlöschfahrzeug",3], //FLF ; Flugfeldlöschfahrzeug
        ["76","Rettungstreppe",2], //Rettungstreppe
        ["79","SEK",4], //SEK - ZF
        ["80","SEK",9], //SEK - MTF
        ["81","MEK",4], //MEK - ZF
        ["82","MEK",9], //MEK - MTF
        ["83","Werkfeuerwehr",9], //GW-Werkfeuerwehr
        ["84","Werkfeuerwehr",3], //ULF mit Löscharm
        ["85","Werkfeuerwehr",3], //TM 50 ; Teleskopmast
        ["86","Werkfeuerwehr",3], //Turbolöscher
        ["87","",3], //TLF4000
        ["88","",6], //KLF
        ["89","",6], //MLF
        ["90","",9], //HLF10
        ["91","Rettungshundeführer (SEG)",5], //Rettungshundefahrzeug SEG
        ["93","Rettungshundeführer (THW)",5], //Rettungshundefahrzeug THW
        ["94","Hundeführer (Schutzhund)",2], //DHuFüKw
        ["95","Motorradstaffel",1], //Polizeimotorrad
        ["97","Notarzt",1], //ITW Notarzt (1 von 3)
        ["97","Intensivpflege",2], //ITW Itensivpfleger (2 von 3)
        ["98","Kriminalpolizist",2], //Zivilstreife
        //["99","FGr E",3], //LKW 7 Lbr
        ["100","Fachgruppe Wasserschaden/Pumpen",7], //MLW 4
        ["103","Dienstgruppenleitung",2], //FuStW (DGL)
        ["104","",6], //GW-L1
        ["105","",6], //GW-L2
        ["106","",6], //MTF-L
        ["107","",9], //LF-L
        ["109","FGr SB",9], //MzGW SB ; Schwere Bergung
        ["114","",2], // GW-Lüfter
        ["122","FGr E",3], //LKW 7 E
        ["123","Fachgruppe Wasserschaden/Pumpen",3], //LKW 7 WP
		["124","",7], //MTW-OV
		["125","Tr UL",4], //MTW-Tr UL
        ["126","Drohnen-Schulung",5], //MTW Drohne
        ["127","SEG Drohne",4], //GW UAS
        ["128","Drohnen-Schulung",5], //ELW Drohne
        ["129","Drohnen-Schulung",5], //ELW2 Drohne
        ["130","Verpflegungshelfer",2], //GW-Bt
       ["130","Betreuungshelfer",1], //GW-Bt
        ["131","Betreuungshelfer",9], //Bt-Kombi
        ["133","Verpflegungshelfer",2], //Bt LKW
        ["133","Betreuungshelfer",1], //Bt LKW
    ];


    //pause between button presses. z.B. 1000 for 1 second pause between presses. 750 for 0.75 seconds pause between presses
    var pressDelay = 1;


     //------- after here change only stuff if you know what you are doing -------


    var vehicleID = window.location.href
    vehicleID = vehicleID.split("/");
    vehicleID = vehicleID[vehicleID.length-2]

    var vehicle = await $.getJSON('/api/v2/vehicles/' + vehicleID);
    vehicle = vehicle.result;

    var personGoal = list.filter(b => b[0] == vehicle.vehicle_type);

    if (vehicleID && vehicle && personGoal.length > 0 && window.location.href == "https://www.leitstellenspiel.de/vehicles/" + vehicleID + "/zuweisung"){

        var allMsg = Array.prototype.slice.call(document.getElementsByClassName("vehicles-education-filter-box"))[0];
        console.log(vehicle.vehicle_type);
        console.log(personGoal);

        var newWindow = document.createElement("div");
        newWindow.innerHTML = `
                <a id="btnAssign" class="btn btn-success">Auswählen</a>
        `;

        newWindow.innerHTML += `<div><p id="msgToPlayer" style="display: inline-block">`
        for(var n = 0; n < personGoal.length; n++){
            newWindow.innerHTML += `Anzahl Personen: ` + personGoal[n][2] + `   Lehrgang: ` + personGoal[n][1] + `</br>`
        }
        newWindow.innerHTML += `</p></div>`

        newWindow.setAttribute("class","navbar-text");
        newWindow.setAttribute("style","width:100%;");

        allMsg.parentNode.insertBefore(newWindow, allMsg);

        $('#btnAssign').on('click', async function() {
            var allPeople = Array.prototype.slice.call($('#personal_table')[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr"));

            var curSelected = Array(personGoal.length).fill(0);
            for (let i = 0; i < allPeople.length; i++) {
                let index = GetIndexOfRelevantTraining(allPeople[i]);
                if(IsPeopleAssignedToThisVeh(allPeople[i])){
                    curSelected[index] += 1;
                }

                if(IsPeopleAssignedToThisVeh(allPeople[i]) && !HasRelevantTraining(allPeople[i])){
                    await UnselectPeople(allPeople[i]);
                    curSelected[index] -= 1;
                }
            }

            var maxPerVehicle = personGoal.map(e => e[2]);

            for (let i = 0; i < allPeople.length; i++) {
                var index = GetIndexOfRelevantTraining(allPeople[i]);
                console.log(allPeople[i]);
                if(curSelected[index] < maxPerVehicle[index] && HasRelevantTraining(allPeople[i]) && IsPeopleFreeToAssigne(allPeople[i])){
                    await SelectPeople(allPeople[i]);
                    curSelected[index] += 1;
                }

                if(curSelected[index] > maxPerVehicle[index] && IsPeopleAssignedToThisVeh(allPeople[i])){
                    await UnselectPeople(allPeople[i]);
                    curSelected[index] -= 1;
                }
            }

            $('#msgToPlayer')[0].innerHTML = "";
            var peopleMissing = false;

            for (let i = 0; i < curSelected.length; i++) {
                if(curSelected[i] != maxPerVehicle[i]){
                    peopleMissing = true;
                }
            }

            if(peopleMissing){
                $('#msgToPlayer')[0].innerHTML =  "Leute fehlen!";
            }else{
                $('#msgToPlayer')[0].innerHTML = "Done";
            }
        });

        await delay(500);
        $('#btnAssign').click();
    }

    function HasRelevantTraining(entry){
        for(var n = 0; n < personGoal.length; n++){
            if((personGoal[n][1] != "" && GetTraining(entry).indexOf(personGoal[n][1]) >= 0 || personGoal[n][1] == "" && GetTraining(entry) == "")){
                return true;
            }
        }
        return false;
    }

    function GetIndexOfRelevantTraining(entry){
        for(var n = 0; n < personGoal.length; n++){
            if((personGoal[n][1] != "" && GetTraining(entry).indexOf(personGoal[n][1]) >= 0 || personGoal[n][1] == "" && GetTraining(entry) == "")){
                return n;
            }
        }
        return -1;
    }

    function IsPeopleAssignedToThisVeh(entry){
        return entry.getElementsByTagName("td")[3].getElementsByClassName("btn btn-default btn-assigned").length > 0;
    }

    function IsPeopleFreeToAssigne(entry){
        console.log(entry.getElementsByTagName("td")[2].innerText.indexOf("Im Unterricht"));
        return entry.getElementsByTagName("td")[3].getElementsByClassName("btn btn-success").length > 0 && entry.getElementsByTagName("td")[2].innerText.indexOf("Im Unterricht") == -1;
    }

    async function SelectPeople(entry){
        await delay(pressDelay);
        return entry.getElementsByTagName("td")[3].getElementsByClassName("btn btn-success")[0].click();
    }

    async function UnselectPeople(entry){
        await delay(pressDelay);
        entry.getElementsByTagName("td")[3].getElementsByClassName("btn btn-default btn-assigned")[0].click();
    }

    function GetTraining(entry){
        return new String(entry.getElementsByTagName("td")[1].innerHTML).valueOf().trim();
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
})();
