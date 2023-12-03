var league = document.getElementById('leagueGames')
var odds = document.getElementById('odds')
var premierLeagueLi = document.getElementById('premierLeague')
var laLigaLi = document.getElementById('laLiga')
var bundesligaLi = document.getElementById('bundesliga')
var apiKey = "a6d86e4be11611d0c6bdb1424a24eefe"
var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", apiKey);
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
    method: 'GET',
    headers: myHeaders
};
function getLeague(leagueId) {
    league.innerHTML = ''
    fetch(`https://v3.football.api-sports.io/fixtures?league=${leagueId}&next=10`, requestOptions).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            var results = data.response
            console.log(results)
            for (var i = 0; i < results.length; i++) {


                var teamNames = document.createElement('h3')
                teamNames.textContent = results[i].teams.home.name + " vs " + results[i].teams.away.name
                teamNames.className += "matches";
                league.append(teamNames)

                var matchDay = document.createElement("p")
                matchDay.textContent = results[i].fixture.date
                matchDay.className += "matchDay";
                league.append(matchDay)

                var homeTeamLogo = document.createElement('img')
                homeTeamLogo.src = results[i].teams.home.logo
                homeTeamLogo.className += "homeLogo"
                league.append(homeTeamLogo)

                var awayTeamLogo = document.createElement('img')
                awayTeamLogo.src = results[i].teams.away.logo
                awayTeamLogo.className += "awayLogo"
                league.append(awayTeamLogo)
            }


        })

}

premierLeagueLi.addEventListener('click', function (event) {
    event.preventDefault()
    getLeague(39)
    getOdds('soccer_epl')
})
laLigaLi.addEventListener('click', function (event) {
    event.preventDefault()
    getLeague(140)
    getOdds('soccer_spain_la_liga')

})
bundesligaLi.addEventListener('click', function (event) {
    event.preventDefault()
    getLeague(78)
    getOdds('soccer_germany_bundesliga')
})

function getOdds(oddId) {
    odds.innerHTML = ''
    fetch(`https://api.the-odds-api.com/v4/sports/${oddId}/odds?apiKey=34b3c99bfd37616194e6d4c0a3604a37&regions=us&markets=h2h`)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var html = ""; 
            console.log(data)
            for (var i = 0; i < 10; i++) {

                console.log(data[i].bookmakers[0].markets[0].outcomes[0].name)
                console.log(data[i].bookmakers[0].markets[0].outcomes[0].price)
                console.log(data[i].bookmakers[0].markets[0].outcomes[1].name)
                console.log(data[i].bookmakers[0].markets[0].outcomes[1].price)
                console.log(data[i].bookmakers[0].markets[0].outcomes[2].name)
                console.log(data[i].bookmakers[0].markets[0].outcomes[2].price)
                
               
                var homeTeamName = data[i].bookmakers[0].markets[0].outcomes[0].name

                //var homeTeamName = document.createElement('h4')
                
                //homeTeamName.className += "homeTeam"
                //odds.append(homeTeamName)

               // var homeTeamOdds = document.createElement('p')
                var homeTeamOdds= data[i].bookmakers[0].markets[0].outcomes[0].price
                //homeTeamOdds.className += "homeTeamOdds"
               //odds.append(homeTeamOdds)

                //var awayTeamName = document.createElement('h4')
                var awayTeamName = data[i].bookmakers[0].markets[0].outcomes[1].name
                //awayTeamName.className += "awayTeam"
                //odds.append(awayTeamName)

                //var awayTeamOdds = document.createElement('p')
                var awayTeamOdds = data[i].bookmakers[0].markets[0].outcomes[1].price
                //awayTeamOdds.className += "awayTeamOdds"
                //odds.append(awayTeamOdds)

                //var drawName = document.createElement('h4')
                var drawName = data[i].bookmakers[0].markets[0].outcomes[2].name
                //drawName.className += "drawTeam"
                //odds.append(drawName)

                //var drawOdds = document.createElement('p')
                var drawOdds= data[i].bookmakers[0].markets[0].outcomes[2].price
                //drawOdds.className += "drawOdds"
                //odds.append(drawOdds)
                html+= "<tr><td>"+homeTeamName +"</td><td>"+ awayTeamName +"</td><td>"+ drawName+ "</td></tr>"
                html+= "<tr><td>"+homeTeamOdds +"</td><td>"+ awayTeamOdds +"</td><td>"+ drawOdds + "</td></tr>"
                odds.innerHTML = html; 



            }

        })
}


