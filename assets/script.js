var divBody = document.getElementById('results')
var premierLeagueLi= document.getElementById('premierLeague')
var laLigaLi= document.getElementById('laLiga')
var bundesligaLi= document.getElementById('bundesliga')
var apiKey = "a6d86e4be11611d0c6bdb1424a24eefe"
var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", apiKey);
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders
};
function getLeague(leagueId) {
    divBody.innerHTML=''
    fetch(`https://v3.football.api-sports.io/fixtures?league=${leagueId}&next=10`, requestOptions).then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var results = data.response
            console.log(results)
            for (var i = 0; i < results.length; i++) {

                console.log(results[i].fixture.date)
                console.log(results[i].teams.home.name)
                console.log(results[i].teams.away.name)
                console.log(results[i].teams.home.logo)
                console.log(results[i].teams.away.logo)


 var teamNames= document.createElement('h3')
 teamNames.textContent=results[i].teams.home.name  + " vs " + results[i].teams.away.name
 teamNames.className += "matches";
 divBody.append(teamNames)

 var matchDay= document.createElement("p")
 matchDay.textContent= results[i].fixture.date
 matchDay.className += "matchDay";
 divBody.append(matchDay)

 var homeTeamLogo= document.createElement('img')
 homeTeamLogo.src= results[i].teams.home.logo
 homeTeamLogo.className += "homeLogo"
 divBody.append(homeTeamLogo)

 var awayTeamLogo= document.createElement('img')
 awayTeamLogo.src= results[i].teams.away.logo
 awayTeamLogo.className += "awayLogo"
 divBody.append(awayTeamLogo)
            }


        })

}

premierLeagueLi.addEventListener('click', function(event){
    event.preventDefault()
    getLeague(39)
})
laLigaLi.addEventListener('click', function(event){
    event.preventDefault()
    getLeague(140)
})
bundesligaLi.addEventListener('click', function(event){
    event.preventDefault()
    getLeague(78)
})



