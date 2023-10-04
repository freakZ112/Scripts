// ==UserScript==
// @name Auto expand
// @version 1.0.0
// @description auto Extensions
// @author freakZ112
// @match https://www.leitstellenspiel.de/buildings/*
// @icon https://www.google.com/s2/favicons?sz=64&domain=leitstellenspiel.de
// @grant none
// ==/UserScript==

(async function() {


    const expandConfigurations = [

        /*
        ---------
        1. BuildingID des Gebäudes, es wird nur der erste Eintrag der jeweiligen ID berücksichtigt
        2. Reihenfolge der Ausbauten. Am besten im Menü über den Buttons hovern und die Zahl vor dem Fragezeichen ablesen

        {
            buildingID: 0, //FW
            sequence: [16]
        },
        ---------
        */

        //{
        //    buildingID: 0, //FW
        //    sequence: [16,14]
        //},

        {
            buildingID: 1, //FW-Schule
            sequence: [0,1,2]
        },

        //{
        //    buildingID: 2, //RD
        //    sequence: []
        //},

        {
            buildingID: 3, //RD-Schule
            sequence: [0,1,2]
        },

        {
            buildingID: 4, //KH
            sequence: [0,1,2,3,4,5,6,7,8]
        },

        {
            buildingID: 6, //Pol
            sequence: [10,11,12,0,1,2,3,4,5,6,7,8,9]
        },

        {
            buildingID: 8, //Pol-Schule
            sequence: [0,1,2]
        },

        {
            buildingID: 9, //THW
            sequence: [0,1,2,4,5,6,7,8,9,10,11]
        },

        {
            buildingID: 10, //THW-Schule
            sequence: [0,1,2]
        },

        {
            buildingID: 11, //BePo
            sequence: [0,1,2,3,4,5,6,7,8,9]
        },

        {
            buildingID: 12, //SEG
            sequence: [0,1,2,3]
        },

    ];


//---------------------

    const buildingsIDToIgnore = [7,14];

    let buildingId = window.location.href;
    buildingId = buildingId.replace("https://www.leitstellenspiel.de/buildings/","");
    let positionHash = buildingId.search("#")
    if (positionHash != -1) { buildingId = buildingId.slice(0,positionHash) }
    //console.log(buildingId)


    let titleDiv = Array.from(document.getElementsByTagName("h1"));
    titleDiv = titleDiv.filter(e => e.getAttribute("building_type") != undefined);


    if(titleDiv.length == 0){
        return;
    }

    titleDiv = titleDiv[0];

    let buildingTypeID = Number(titleDiv.getAttribute("building_type"));

    if(buildingsIDToIgnore.indexOf(buildingTypeID) >= 0){
        return;
    }

    for(let i = 0; i < expandConfigurations.length; i++){
        if(expandConfigurations[i].buildingID == buildingTypeID){

            var dl = document.getElementsByClassName("dl-horizontal")[0];

            var dt = document.createElement('dt'); //Label
            var label = document.createElement('strong');
            label.appendChild(document.createTextNode("Auto Ausbau"));
            dt.appendChild(label)

            var dd = document.createElement('dd'); //Button
            var button = document.createElement("a");
            button.className = "btn btn-default btn-xs autoExpand";
            button.innerText = "Ausbauen starten";
            dd.appendChild(button)

            dl.appendChild(dt)
            dl.appendChild(dd)

            button.addEventListener('click', function() {
            expandBuilding(i);
            //console.log("Ausbau gestartet")
            });

            var doneMsg = document.createElement('text')
            var usrInfo = document.createTextNode("");
            doneMsg.appendChild(usrInfo)
            dd.appendChild(doneMsg)

            break;
        }
    };

    async function expandBuilding(expandConfig){
        var sequence = expandConfigurations[expandConfig].sequence;
        //console.log(sequence);

        //userInfoStart
        usrInfo.replaceData(0,usrInfo.length,"Ausbauten werden beauftrag ...")


        //get Extensions
        var buildingInfo = await $.getJSON('/api/buildings/'+buildingId)
        var buildingExtensions = buildingInfo.extensions
        //console.log(buildingExtensions)


        //order extensions
        var newExtensions = false
        for (var expand of sequence){
            //console.log(expand);
            if (!buildingExtensions || !buildingExtensions.find(e => e.type_id==expand) ) {
                await $.post("https://www.leitstellenspiel.de/buildings/"+buildingId+"/extension/credits/"+expand+"?redirect_building_id="+buildingId, {"_method": "post", "authenticity_token": $("meta[name=csrf-token]").attr("content") });
                //console.log(expand+" wird ausgebaut")
                await delay(250);
                newExtensions = true
            }
        }


        //UserInfoEnd
        if (newExtensions) {
            usrInfo.replaceData(0,usrInfo.length,"Ausbauten wurden beauftrag ... Seite wird neu geladen")
            await delay(250)
            location.reload();
        } else {
            usrInfo.replaceData(0,usrInfo.length,"Es sind bereits alle Ausbauten vorhanden")
        }
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    })();