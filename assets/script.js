var apiKey = "a6d86e4be11611d0c6bdb1424a24eefe"
var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", apiKey);
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders
};
function getApi() {
    fetch("https://v3.football.api-sports.io/fixtures?league=39&next=10", requestOptions).then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var results = data.response
            console.log(results)
            for (var i = 0; i < results.length; i++) {

                console.log(results[i].fixture.date)
                console.log(results[i].teams.home.name)
                console.log(results[i].teams.away.name)
            }


        })

}

getApi()