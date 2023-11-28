var apiKey = "a6d86e4be11611d0c6bdb1424a24eefe"

function getApi() {
    fetch("https://v3.football.api-sports.io/fixtures?league=39&next=10")

        .then(function (data) {
            var results = data.response.results


            console.log(results[i].name)

        })

}
