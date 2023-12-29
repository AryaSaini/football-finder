//Selecting the league games div
var league = document.getElementById('leagueGames')
//Selecting the odds div from the front-end
var odds = document.getElementById('odds')
//Selecting dropdown items
var premierLeagueLi = document.getElementById('premierLeague')
var laLigaLi = document.getElementById('laLiga')
var bundesligaLi = document.getElementById('bundesliga')
//key used to query the API
var apiKey = "a6d86e4be11611d0c6bdb1424a24eefe"
//Headers for request JSON
var myHeaders = new Headers();
//Adding keys and host name to headers
myHeaders.append("x-rapidapi-key", apiKey);
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");
//Defining JSON request as GET to obtain info from servers with correct key/host to query
var requestOptions = {
    method: 'GET',
    headers: myHeaders
};
//Function to work with data obtained from the query
function getLeague(leagueId) {
    league.innerHTML = ''
    //Fetch information from API on sports teams
    fetch(`https://v3.football.api-sports.io/fixtures?league=${leagueId}&next=10`, requestOptions).then(function (response) {
        return response.json();
    })
    //Once data is obtained
        .then(function (data) {
            var results = data.response
            console.log(results)
            //Add the logos and names of teams onto the HTML page
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
//Make dropdowns functional
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
//Allow odds to load onto page
function getOdds(oddId) {
    odds.innerHTML = ''
    //Fetch data from the api
    fetch(`https://api.the-odds-api.com/v4/sports/${oddId}/odds?apiKey=a6d86e4be11611d0c6bdb1424a24eefe&regions=us&markets=h2h`)
    //Once data is obtained jsonify it so its usable
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data)
            //Print out the odds of 10 teams next to the team information div
            for (var i = 0; i < 10; i++) {

                //console.log(data[i].bookmakers[0].markets[0].outcomes[0].name)
                console.log(data[i].bookmakers[0].markets[0].outcomes[0].price)
                console.log(data[i].bookmakers[0].markets[0].outcomes[1].name)
                console.log(data[i].bookmakers[0].markets[0].outcomes[1].price)
                console.log(data[i].bookmakers[0].markets[0].outcomes[2].name)
                console.log(data[i].bookmakers[0].markets[0].outcomes[2].price)

                //Populate HTML divs to add onto homepage
                var homeTeamName = document.createElement('h4')
                homeTeamName.textContent = data[i].bookmakers[0].markets[0].outcomes[0].name
                homeTeamName.className += "homeTeam"
                odds.append(homeTeamName)

                var homeTeamOdds = document.createElement('p')
                homeTeamOdds.textContent = data[i].bookmakers[0].markets[0].outcomes[0].price
                homeTeamOdds.className += "homeTeamOdds"
                odds.append(homeTeamOdds)

                var awayTeamName = document.createElement('h4')
                awayTeamName.textContent = data[i].bookmakers[0].markets[0].outcomes[1].name
                awayTeamName.className += "awayTeam"
                odds.append(awayTeamName)

                var awayTeamOdds = document.createElement('p')
                awayTeamOdds.textContent = data[i].bookmakers[0].markets[0].outcomes[1].price
                awayTeamOdds.className += "awayTeamOdds"
                odds.append(awayTeamOdds)

                var drawName = document.createElement('h4')
                drawName.textContent = data[i].bookmakers[0].markets[0].outcomes[2].name
                drawName.className += "drawTeam"
                odds.append(drawName)

                var drawOdds = document.createElement('p')
                drawOdds.textContent = data[i].bookmakers[0].markets[0].outcomes[2].price
                drawOdds.className += "drawOdds"
                odds.append(drawOdds)



            }

        })
}
