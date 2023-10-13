// ==UserScript==
// @name         ACTION_Schooler
// @version      1.0.4
// @author       NoOne
// @include      *://www.leitstellenspiel.de/buildings/*
// @include      *://www.leitstellenspiel.de/schoolings/*
// ==/UserScript==
/* global $, schooling_check_educated_counter_load, user_id, update_schooling_free */

(async function() {
    'use strict';

    var schoolingType = +$("h1:first").attr("building_type") || null;
    var accessibleBuildings = [1,3,8,10];

    if(schoolingType != null && !accessibleBuildings.includes(schoolingType)){
        return false;
    }

    var config = [{
        buildingName: "Feuerwehrschule",
        buildingType: 1,
        buildingsAccess: [0, 18],
        classes: [
            {
                name: "gw_messtechnik",
                count: 3,
                buildingsAccessToClass: [0, 18]
            },
            {
                name: "gw_gefahrgut",
                count: 3,
                buildingsAccessToClass: [0, 18]
            },
            {
                name: "gw_hoehenrettung",
                count: 9,
                buildingsAccessToClass: [0, 18]
            },
            {
                name: "elw2",
                count: 6,
                buildingsAccessToClass: [0, 18]
            },
            {
                name: "wechsellader",
                count: 0,
                buildingsAccessToClass: [0, 18]
            },
            {
                name: "dekon_p",
                count: 6,
                buildingsAccessToClass: [0, 18]
            },
            {
                name: "fwk",
                count: 2,
                buildingsAccessToClass: [0, 18]
            },
            {
                name: "gw_wasserrettung",
                count: 12,
                buildingsAccessToClass: [0, 18]
            },
            {
                name: "gw_taucher",
                count: 4,
                buildingsAccessToClass: [0, 18]
            },
            {
                name: "notarzt",
                count: 0,
                buildingsAccessToClass: [0, 18]
            },
            {
                name: "arff",
                count: 18,
                buildingsAccessToClass: [0, 18]
            },
            {
                name: "rettungstreppe",
                count: 12,
                buildingsAccessToClass: [0, 18]
            },
            {
                name: "werkfeuerwehr",
                count: 72,
                buildingsAccessToClass: [0, 18]
            },
            {
                name: "intensive_care",
                count: 0,
                buildingsAccessToClass: [0, 18]
            },
            {
               name: "energy_supply",
               count: 3,
               buildingsAccessToClass: [0, 18]
            },
        ]
    }, {
        buildingName: "Rettungsschule",
        buildingType: 3,
        buildingsAccess: [2, 5, 12, 15, 20, 21],
        classes: [
            {
                name: "notarzt",
                count: 10,
                buildingsAccessToClass: [2, 5, 20]
            },
            {
                name: "lna",
                count: 1,
                buildingsAccessToClass: [2, 20]
            },
            {
                name: "orgl",
                count: 1,
                buildingsAccessToClass: [2, 20]
            },
            {
                name: "seg_elw",
                count: 2,
                buildingsAccessToClass: [12]
            },
            {
                name: "seg_gw_san",
                count: 6,
                buildingsAccessToClass: [12]
            },
            {
                name: "gw_wasserrettung",
                count: 6,
                buildingsAccessToClass: [12, 15]
            },
            {
                name: "gw_taucher",
                count: 2,
                buildingsAccessToClass: [12, 15]
            },
            {
                name: "seg_rescue_dogs",
                count: 10,
                buildingsAccessToClass: [12, 21]
            },
            {
                name: "intensive_care",
                count: 2,
                buildingsAccessToClass: [2, 20]
            }
        ]
    }, {
        buildingName: "Polizeischule",
        buildingType: 8,
        buildingsAccess: [6, 11, 13, 17, 19],
        classes: [
            {
                name: "police_einsatzleiter",
                count: 12,
                buildingsAccessToClass: [11]
            },
            {
                name: "police_fukw",
                count: 15,
                buildingsAccessToClass: [11, 17]
            },
            {
                name: "polizeihubschrauber",
                count: 50,
                buildingsAccessToClass: [13]
            },
            {
                name: "police_wasserwerfer",
                count: 15,
                buildingsAccessToClass: [11]
            },
            {
                name: "police_sek",
                count: 42,
                buildingsAccessToClass: [11, 17]
            },
            {
                name: "police_mek",
                count: 42,
                buildingsAccessToClass: [11, 17]
            },
            {
                name: "k9",
                count: 2,
                buildingsAccessToClass: [6, 11, 17]
            },
            {
                name: "police_motorcycle",
                count: 0,
                buildingsAccessToClass: [6]
            },
            {
                name: "police_firefighting",
                count: 0,
                buildingsAccessToClass: [13]
            },
            {
                name: "criminal_investigation",
                count: 4,
                buildingsAccessToClass: [6]
            },
            {
                name: "police_service_group_leader",
                count: 2,
                buildingsAccessToClass: [6]
            }
        ]
    }, {
        buildingName: "THW Bundesschule",
        buildingType: 10,
        buildingsAccess: [9],
        classes: [
            {
                name: "thw_zugtrupp",
                count: 8,
                buildingsAccessToClass: [9]
            },
            {
                name: "thw_raumen",
                count: 9,
                buildingsAccessToClass: [9]
            },
            {
                name: "gw_wasserrettung",
                count: 4,
                buildingsAccessToClass: [9]
            },
            {
                name: "gw_taucher",
                count: 2,
                buildingsAccessToClass: [9]
            },
            {
                name: "thw_rescue_dogs",
                count: 10,
                buildingsAccessToClass: [9]
            },
            {
                name: "water_damage_pump",
                count: 10,
                buildingsAccessToClass: [9]
            },
            {
                name: "heavy_rescue",
                count: 9,
                buildingsAccessToClass: [9]
            },
            {
                name: "thw_energy_supply",
                count: 3,
                buildingsAccessToClass: [9]
            }
        ]
    }];

    if (!sessionStorage.aBuildings || JSON.parse(sessionStorage.aBuildings).lastUpdate < (new Date().getTime() - 5 * 1000 * 60) || JSON.parse(sessionStorage.aBuildings).userId != user_id) {
        await $.getJSON("/api/buildings", function (d) {
            sessionStorage.setItem('aBuildings', JSON.stringify({
                lastUpdate: new Date().getTime(),
                value: d,
                userId: user_id
            }))
        });
    }
    var aBuildings = JSON.parse(sessionStorage.aBuildings).value;

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var observePersCount = new MutationObserver (checkPersCount);
    var observePersTables = new MutationObserver (checkPersTables);
    var obsConfig = { childList: true, characterData: true, attributes: true };

    if(!$("input[name=education]")[0]){
        $("#accordion .personal-select-heading-building").each(function(){
            $(this).closest(".panel").removeClass("hidden");
            observePersCount.observe(this, obsConfig);
        });

        $("#accordion .panel-body").each(function(){
            $(this).closest(".panel").removeClass("hidden");
            observePersTables.observe(this, obsConfig);
        });
    }

    $("input[name=education]").on("click",function(){

        $("#accordion .personal-select-heading-building").each(function(){
            $(this).closest(".panel").removeClass("hidden");
            observePersCount.observe(this, obsConfig);
        });

        $("#accordion .panel-body").each(function(){
            $(this).closest(".panel").removeClass("hidden");
            observePersTables.observe(this, obsConfig);
        });
    });

    function checkPersCount(mutationRecords) {
        mutationRecords.forEach(function(mutation){
            var visibleAreaMin = $(window).scrollTop();
            var visibleAreaMax = $(window).height() + $(window).scrollTop();

            $(".personal-select-heading-building").each(function() {
                var topPosition = $(this).offset().top;

                if (topPosition > visibleAreaMin && topPosition < visibleAreaMax){
                    schooling_check_educated_counter_load($(this).attr("building_id"));
                }
            });

            if(mutation.type === "childList" &&
               (mutation.addedNodes.length === 2 || mutation.addedNodes.length === 0)){
                var targetId = +mutation.target.attributes.building_id.value;
                var checkedEducation = $("input[name=education]:checked")[0] ? $("input[name=education]:checked")[0].attributes.education_key.value : globalEducationKey;
                var building = aBuildings.filter((el)=>el.id === targetId)[0];
                var buildingTypeId = building.building_type;

                var educationCount = (function(){
                    if($("input[name=education]:checked")[0]){
                        return +$("input[name=education]:checked ~ .editableCounter").attr("personal_counter");
                    } else {
                        return 0;
                    }
                })();

                var mutatedText = mutation.target.textContent;
                var arrCounts = mutatedText.match(/([0-9]+)/gm) || null;
                var persOnBuilding = +mutation.target.nextElementSibling.textContent.match(/[0-9]+/);
                var countPers = 0;

                var allowedBuilding = (function(){
                    var filteredSchool = config.filter((e)=>e.buildingsAccess.includes(buildingTypeId));

                    if(filteredSchool.length > 0){
                        var filteredEducation = filteredSchool[0].classes.filter((e)=>e.name==checkedEducation);

                        if(filteredEducation.length > 0){
                            return filteredEducation[0].buildingsAccessToClass.includes(buildingTypeId)
                        }
                    } else {
                        return null;
                    }
                })();

                if(arrCounts && allowedBuilding){
                    countPers = arrCounts.reduce((e1,e2)=>+e1+(+e2),0);
                }

                if(countPers >= educationCount ||
                   (countPers === 0 && !allowedBuilding) ||
                   countPers === persOnBuilding) $("#personal-select-heading-building-" + targetId).closest(".panel").addClass("hidden"); //console.log($("#personal-select-heading-building-" + targetId).closest(".panel-heading").clone().children().remove().end().text().trim() + " wird ausgeblendet.");
            }
        });
    }

    function checkPersTables(mutationRecords){
        mutationRecords.forEach(function(mutation){
            if(mutation.addedNodes.length > 0){
                var checkedEducation = $("input[name=education]:checked")[0] ? $("input[name=education]:checked")[0].attributes.education_key.value : globalEducationKey;
                var buildingId = +mutation.target.attributes.building_id.value;
                var educationCount = $("input[name=education]:checked")[0] ? $("input[name=education]:checked ~ .editableCounter").attr("personal_counter") : 0;
                var persText = $("#personal-select-heading-building-"+buildingId).text();

                var foundPers = function(txt){
                    let matchText = txt.match(/(?<i>[\d,]+)/);
                    let match = matchText ? matchText.groups.i : [0];

                    if(!typeof match == "string") return match.reduce((a, b) => +a + +b)
                    else return +match;
                };

                var findCountPers = educationCount - foundPers(persText);
                var foundCountPers = 0;

                if(findCountPers > 0){
                    $("#personal_table_"+buildingId+" tbody tr").each(function(i){
                        update_schooling_free();
                        var $this = $(this);
                        var isBusy = ~$("td:nth-child(2)",$this).text().indexOf("nicht verfügbar") ? true : false;
                        var educationDone = $("td:nth-child(3)",$this).text().trim() == "" ? false : true;
                        var inVehicle = $("td:nth-child(4)",$this).text().trim() == "" ? false : true;

                        if(+$("#schooling_free").text() > 0){
                            if(!educationDone && !inVehicle && !isBusy) {
                                if(foundCountPers === findCountPers){
                                    $("#personal-select-heading-building-"+buildingId).closest(".personal-select-heading").next(".panel-body").toggleClass("hidden");
                                    $("#personal-select-heading-building-"+buildingId).append(`<span class="label label-warning">${foundCountPers} ${(foundCountPers == 1 ? "Person" : "Personen")} auszubilden</span>`);
                                    return false;
                                }

                                $("td:first input",$this).attr("checked",true);
                                foundCountPers++;
                            }
                        } else {
                            if(foundCountPers > 0){
                                $("#personal-select-heading-building-"+buildingId).append(`<span class="label label-warning">${foundCountPers} ${(foundCountPers == 1 ? "Person" : "Personen")} auszubilden</span>`);
                            }
                            $("#personal-select-heading-building-"+buildingId).closest(".personal-select-heading").next(".panel-body").toggleClass("hidden");
                            return false;
                        }

                        if(i+1 === $("#personal_table_"+buildingId+" tbody tr").length){
                            $("#personal-select-heading-building-"+buildingId).closest(".personal-select-heading").next(".panel-body").toggleClass("hidden");
                            $("#personal-select-heading-building-"+buildingId).append(`<span class="label label-warning">${foundCountPers} ${(foundCountPers == 1 ? "Person" : "Personen")} auszubilden</span>`);
                        }
                    });
                }
            }
        });
    }

    $("label.radio").each(function(){
        var school = config.filter((el)=>el.buildingType === schoolingType)[0];
        var education = school.classes.filter((el)=>el.name === $("input",$(this)).attr("education_key"))[0];
        var persCount = education.count;

        $(this).append(`<span class="label label-default editableCounter" personal_counter="${persCount}">${persCount} ${(persCount == 1 ? "Person" : "Personen")}</span>`);
    });

    $("label.radio").on("click",function(e){
        if(e.target.type === "radio" && e.target.checked === true){
            schooling_disable($(e.target).attr("education_key"));
            schooling_check_educated_counter($(e.target).val());
            update_schooling_free();
        }
    });

    $(".editableCounter").on("click", function(e){
        var persCounter = $(this).attr("personal_counter") || 0;

        if($(e.target).hasClass("editableCounter")){
            if($(".countChanger").length === 1){
                persCounter = $(".countChanger", this).val();
                $(this).attr("personal_counter", persCounter).text(`${persCounter} ${(persCounter == 1 ? "Person" : "Personen")}`);
                $(".countChanger", this).remove();
            } else {
                $(this).html(`<input type="text" size="2" class="countChanger" value="${persCounter}"> Personen`);
            }
        }
    });
})();