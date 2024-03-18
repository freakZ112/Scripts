// ==UserScript==
// @name         Mission-Share NEW
// @namespace
// @version      1.0.1
// @author       freakZ112
// @include      *://leitstellenspiel.de/*
// @include      *://www.leitstellenspiel.de/*
// @run          document-start
// ==/UserScript==

$(document).ready(function() {
  let AuthToken;
  let TimeSpan = 2500;
  let minCredits=2500;// minimale credits
  function AlertMission(Index, Mission) {

        $.get(`missions/${Mission}`, function(Response){

            let start= Response.search("einsaetze"); //get beginning of link of Response string
            let endchar=Response.indexOf('" class', start); // get end of link
            let einsatzUrl=Response.slice(start,endchar); // slice link
            $.get(einsatzUrl, function(Response){
                let htmltext = Response;

                let startpos = htmltext.search("Credits im Durchschnitt")+60; // get pos of beginning of Credits + 60 Chars
                let endpos =htmltext.indexOf("</td>",startpos); // get next </TD> TAG AFTER CREDITS
                let credits = parseInt(htmltext.slice(startpos,endpos)); // slice credits
                console.log(credits);
                if(credits >= minCredits)
                {
                    $.get(`missions/${Mission}`, function(Response) {
                        AuthToken = $('meta[name="csrf-token"]', Response).attr('content');
                    }).done(function(Response) {
                        $.post(`missions/${Mission}/alarm`, {
                            'utf8': '?',
                            authenticity_token: AuthToken,
                            next_mission: 0,
                            alliance_mission_publish: 1,
                            'vehicle_ids[]': []
                        }).done(function() {
                            console.log(`Done - ${Index}/${GetMissions().length}! + Credis: ${credits}`);
                        });
                    });
                }
            });
        });
  } // end function

  function GetMissions() {
    let Entities = [];

    $("div#mission_list > div > div[id^='mission_panel_']:not('.panel-success')").each(function(i, Entity) {
      Entities.push($(Entity).attr('id').replace('mission_panel_', ''));
    });

    return Entities;
  } // end

//  $('div#missionSpeed').append('<a href="#" id="mission-share" class="btn btn-xs mission_selection btn-info"><span class="glyphicon glyphicon-globe"></span> X</a>');
$("#search_input_field_missions")
        .after(`<a id="mission-share" class="btn btn-xs mission_selection btn-info"><span class="glyphicon glyphicon-globe"></span> X </a>`);



  $('a#mission-share').click(function() {
    console.log(`Missions found: ${GetMissions().length}`);

    $(GetMissions()).each(function(Index, Mission) {

      setTimeout(AlertMission(Index, Mission), Index * TimeSpan);
    });
  });
});
