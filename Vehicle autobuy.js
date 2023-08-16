// ==UserScript==
// @name         Vehicle autobuy
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Create different settings for vehicle purchases
// @author       freakZ112
// @include      https://www.leitstellenspiel.de/buildings/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leitstellenspiel.de
// @grant        none
// ==/UserScript==

(async function() {

    const placeButtonOnTop =
          //ja nach persönlicher Präferenz können die Knöpfe entweder ganz oben im Gebäude angezeigt werden oder oberhalb der Fahrzeuge im Fahrzeug-Tab

          //falls die Knöpfe ganz oben angezeigt werden sollen, trage im direkt unterhalb befindlichen Bereich eine    1    ein
          //falls die Knöpfe oberhalb der Fahrzeuge angezeigt werden sollen, trage im direkt unterhalb befindlichen Bereich eine    0    ein

          //Anmerkung: es darf entweder  1  oder  0  im unteren Bereich stehen, nicht beides gleichzeitig und ohne Komma oder sonstige andere Zeichen
          //----- unterhalb von hier eintragen -----
          1
          //----- oberhalb von hier eintragen -----
    ;


    const vehicleConfigurations = [

        /*
        ANLEITUNG

        1. kopiere folgenden Eintrag in dem sich unterhalb dieser Anleitung markierten Bereich:



        {
            buildingID: 11,
            displayName: "",
            vehicles:[
                [50,9],
                [35,3],
                [51,1],
                [52,1],
            ]
        },



        Die sich am Anfang darin befindenden Einträge können rausgelöscht werden. Sie dienen als Veranschaulichung, wie ein beispielhafter Eitnrag aussehen kann.


        2. tausche die 11 in folgender Zeile    buildingID: 11,     durch die Gebäude-ID, für welche ein Eintrag erstellt werden soll. Lösche nicht das Komma am Ende!!!
           ANMERKUNG: Verwende für Kleinwachen die Gebäude-ID der entsprechenden "normalgroßen" Wache!!!!

        3. trage in folgender Zeile     displayName: "",     zwischen die beiden Gänsefüßchen den Namen der Konfiguration ein. Dieser Name wird auf den klickbaren Knopf angezeigt. Lösche nicht das Komma am Ende!!!

        4. ersetze die 4 folgenden Einträge

                [50,9],
                [35,3],
                [51,1],
                [52,1],

        durch die Fahrzeuge, die gekauft werden sollen. Die erste Zahl ist die Fahrzeug-ID. Die zweite Zahl gibt an, wie viele Fahrzeuge in der Wache vorhanden sein sollen.
        z.B. der Eintrag    [50,9],   bewirkt, dass das Fahrzeug mit der ID 50 (GruKw) am Ende 9 mal in der Wache vorhanden sein wird, NICHT 9 mal gekauft wird. Dies ist relevant, wenn bereits GruKw in der Wache vorhanden sind.
        Wenn z.B. bereits 3 GruKw vorhanden sind, werden nur 6 weitere gekauft, sodass am Ende 9 vorhanden sind


        Hinweis für Fortgeschrittene: Das Skript kauft Fahrzeuge in der Reihenfolge, wie sie in der Liste hinterlegt sind. Der letzte Platz in der Liste wird somit als aller letztes gekauft.
        Es macht somit Sinn z.B. LF's und HLF's in die Liste ganz hinten hinzupacken, damit in dem Fall von zu wenig Stellplätze keine Sonderfahrzeuge wegfallen.


        */

        //------- FÜGE EINTRÄGE UNTERHALB EIN -------

// ID's
//== Gebäude ==
/*
Feuerwache = 0
Rettungswache = 2
Hubschrauberstation = 5
Polizeiwache = 6
THW = 9
BePol= 11
SEG = 12
Polizeihubschrauber = 13
Wasserrettung = 15
Sondereinheit = 17
FW-klein = 18
POL-klein = 19
RD-klein = 20
Rettungshundestaffel = 21
*/
//== Fahrzeuge ==
//FEUERWEHR
/*
LF 20 = 0
LF 20 = 1
DLK = 2
ELW 1 = 3
RW = 4
GWA = 5
LF 8/6 = 6
LF20/16 = 7
LF 10/6 = 8
LF 16 TS = 9
GWÖl = 10
GW L2-Wasser = 11
GWM = 12
SW1000 = 13
SW2000 = 14
SW2000 Tr = 15
SW KatS = 16
TLF2000 = 17
TLF3000 = 18
TLF 8/8 = 19
TLF 8/18 = 20
TLF 16/24 Tr = 21
TLF 16/25 = 22
TLF 16/45 = 23
TLF 20/40 = 24
TLF 20/40-SL = 25
TLF 16 = 26
GWG = 27
HLF = 30
GWH = 33
ELW2 = 34
MTF = 36
TSF-W = 37
WLF = 46
DekonP = 53
FWK = 57
FLF = 75
RT = 76
GW-Werk = 83
ULF = 84
TM = 85
Turbolöscher = 86
TLF4000 = 87
GW L1 = 104
GW L2 = 105
MTF-L = 106
LF-L = 107
Nea50 = 111
Nea200 = 113
*/
//RETTUNGSDIENST
/*
RTW = 28
NEF = 29
RTH = 31
KTW = 38
Lna  = 55
Orgl = 56
Grtw = 73
NAW = 74
ITW = 97
*/
//POLIZEI
/*
Fustw = 32
Lebefkw = 35
GruKw = 50
Fuekw = 51
Gefkw = 52
Pol-Hubschrauber = 61
Wawe = 72
SEKzf = 79
SEKmtf = 80
MEKzf = 81
MEKmtf = 82
Dhufükw = 94
Motorrad = 95
Außenlastbehälter = 96
Zivilstreifenwagen = 98
DGL = 103
*/
//THW
/*
Gkw = 39
Mtwtz = 40
Mzgwn = 41
Lkwk9 = 42
Brmgr = 43
Dle = 44
Mlw5 = 45
Lkw7 = 65
Lkw7 Plane	= 99
Mlw4	= 100
Schmutzwasserkreiselpumpe = 101
Anhänger Plane = 102
Mzgwsb = 109
Nea50 = 110
Nea200 = 112
*/
//SEG
/*
Ktwb = 58
Elw1seg = 59
Gwsan = 60
GW T = 63
GW W = 64
Boot = 70
Hund = 91
*/
//Wasserrettung
/*
Gwt = 63
Gww = 64
Boot = 70
*/
        {
            buildingID: 0,
            displayName: "FW15",
            vehicles:[
                [2,1],   //DLK 23
                [3,1],   //ELW 1
                [5,1],   //GW-A
                [10,1],   //GW-Öl
                [12,1],   //GW-Mess
				[14,1],   //SW 2000
                [27,1],   //GW-Gefahrgut
                [33,1],   //GW-H
                [34,1],   //ELW 2
                [53,1],   //Dekon-P
                [57,1],   //FwK
				[30,5],   //HLF20
            ]
        },
	    {
            buildingID: 0,
            displayName: "Flughafen16",
            vehicles:[
                [75,6],   //FLF
                [76,6],   //RT
                [14,2],   //SW2000
                [30,2],   //HLF
				[87,1],   //TLF4000
            ]
        },	
		{
            buildingID: 0,
            displayName: "WF16",
            vehicles:[
                [83,4],   //GW-Werk
                [84,4],   //ULF
                [85,4],   //TM
                [86,4],   //Turbolöscher
				[30,1],   //HLF20
            ]
        },	
		{
            buildingID: 2,
            displayName: "RD14",
            vehicles:[
                [28,6],   //RTW
                [29,6],   //NEF
                [55,1],   //LNA
				[56,1],   //ORGL
				[74,1],   //NAW
				
            ]
        },
		{
            buildingID: 6,
            displayName: "POL15",
            vehicles:[
                [32,13],   //FuStW
				[94,1],   //Dhufükw
                [98,2],   //Zivil
                [103,1],   //DGL
            ]
        },
		{
            buildingID: 9,
            displayName: "THW",
            vehicles:[
                [39,2],   //GKW
				[40,2],   //MTW TZ
				[41,2],   //MZGWN
				[42,1],   //LKW K9
				[43,1],   //BRmG R
				[44,1],   //DLE
				[45,1],   //MLW 5
				[99,2],   //LKW 7 Plane
				[100,1],   //MLW 4
				[101,1],   //Schmutzwasserkreiselpumpe
				[102,1],   //Anhänger Plane
				[109,1],   //MZGW SB
				[110,2],   //NEA 50
				[112,1],   //NEA 200
            ]
        },
		{
            buildingID: 11,
            displayName: "BePol",
            vehicles:[
                [35,4],   //Lebefkw
				[50,9],   //GruKw
				[51,5],   //Fuekw
				[52,1],   //Gefkw
				[72,3],   //Wawe
				[79,6],   //SEKzf
				[80,2],   //SEKmtf
				[81,2],   //MEKmtf
				[82,6],   //MEKzf
				[84,3],   //Dhufükw
            ]
        },
		{
            buildingID: 12,
            displayName: "SEG",
            vehicles:[
                [28,1],   //RTW
				[58,3],   //KTW
				[59,1],   //ELW
				[60,1],   //GW San
				[91,2],   //Hund
				[63,1],   //GW T
				[64,1],   //GW W
				[70,1],   //Boot
            ]
        },
		{
            buildingID: 15,
            displayName: "WR",
            vehicles:[
                [63,2],   //GW T
				[64,2],   //GW W
				[70,2],   //Boot
            ]
        },
		{
            buildingID: 17,
            displayName: "Sondereinheit",
            vehicles:[
				[51,4],   //Fuekw
				[79,6],   //SEKzf
				[80,2],   //SEKmtf
				[81,2],   //MEKmtf
				[82,6],   //MEKzf
				[84,3],   //Dhufükw
            ]
        },
        //------- FÜGE EINTRÄGE OBERHALB EIN -------
    ];


    const buildingsIDToIgnore = [1,3,4,7,8,10,14,16];


    let buildingId = window.location.href;
    buildingId = buildingId.replace("https://www.leitstellenspiel.de/buildings/","");


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

    let allVehicles;
    updateAllVehicles();


    let wrapperDIV = document.createElement("div");
    wrapperDIV.innerText = "Vehicle-Configs:";
    wrapperDIV.style.padding = "15px 5px 15px 5px";

    if(placeButtonOnTop){
        titleDiv.parentNode.parentNode.insertBefore(wrapperDIV, titleDiv.parentNode.nextSibling);
    }
    else
    {
        $("#vehicle_table")[0].before(wrapperDIV);
    }
    

    for(let i = 0; i < vehicleConfigurations.length; i++){
        if(vehicleConfigurations[i].buildingID == buildingTypeID){
            let btn = document.createElement("a");
            btn.className = "btn btn-success btn-xs autoVehicleBuy";
            btn.setAttribute("config_id", i);
            btn.innerText = vehicleConfigurations[i].displayName;
            btn.style.margin = "5px 5px 5px 5px";
            wrapperDIV.appendChild(btn);
        }
    }

    let hintText = document.createElement("div");
    hintText.innerText = "drücke auf eine Knopf, um die Fahrzeuge zu kaufen. Falls kein Fahrzeuge gekauft werden konnte, erscheint eine Nachricht ob alle Fahrzeuge vorhanden sind oder nicht";
    wrapperDIV.appendChild(hintText);


    // Add event listener to each element
    document.querySelectorAll('.autoVehicleBuy').forEach(function(element) {
        element.addEventListener('click', function() {
            buyVehicles(element);
        });
    });


    async function buyVehicles(btnPressed){

        let messageText;

        if(document.getElementById("autoBuyVehiclesMessagetTxt")){
            messageText = document.getElementById("autoBuyVehiclesMessagetTxt");
        }else{
            messageText = document.createElement("div");
            messageText.id = "autoBuyVehiclesMessagetTxt";
            messageText.style.fontSize = "x-large";
            messageText.style.fontWeight = "900";
            wrapperDIV.appendChild(messageText);
        }

        messageText.innerText = "Bitte warten. Fahrzeuge werden gekauft";


        let vehicleBought = false;
        let vehicleConfig = vehicleConfigurations[btnPressed.getAttribute("config_id")];
        //console.log(vehicleConfig);

        for(let i = 0; i < vehicleConfig.vehicles.length; i++){
            let numberCurrentVehicles = allVehicles.filter(e => e.getAttribute("vehicle_type_id") == vehicleConfig.vehicles[i][0]).length;
            //console.log(numberCurrentVehicles);

            for(let n = numberCurrentVehicles; n < parseInt(vehicleConfig.vehicles[i][1]); n++){
                await $.post("https://www.leitstellenspiel.de/buildings/" + buildingId + "/vehicle/" + buildingId + "/" + vehicleConfig.vehicles[i][0] + "/credits?building=" + buildingId, {"_method": "get", "authenticity_token": $("meta[name=csrf-token]").attr("content") });
                await delay(100);
                vehicleBought = true;
            }
        }

        updateAllVehicles();
        let allVehiclesBought = true;

        for(let i = 0; i < vehicleConfig.vehicles.length; i++){
            let numberCurrentVehicles = allVehicles.filter(e => e.getAttribute("vehicle_type_id") == vehicleConfig.vehicles[i][0]).length;

            if(numberCurrentVehicles < parseInt(vehicleConfig.vehicles[i][1])){
                allVehiclesBought = false;
                break;
            }
        }


        if(vehicleBought){
            location.reload();
        }else{
            if(allVehiclesBought){
                messageText.innerText = "Alle Fahrzeuge vorhanden";
            }else{
                messageText.innerText = "Fahrzeuge fehlen";
            }
        }
    }

    function updateAllVehicles(time) {
        allVehicles = Array.from(document.getElementsByTagName("img"));
        allVehicles = allVehicles.filter(e => e.getAttribute("vehicle_type_id") != undefined);
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
})();