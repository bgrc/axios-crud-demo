window.onload = function () {
    axios.get('http://localhost:3000/movies')
        .then(function (response) {
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
}