window.onload = function () {
    var sellect = document.getElementById("mySelect");
    sellect.addEventListener('change', function (e) {
        let selectId = e.target.value
        console.log(selectId);
    }, false)

    axios.get('http://localhost:3000/movies')
        .then(function (response) {
            let movies = response.data
            let html1 = `<option value="">请选择电影</option>`
            let str = ``
            for (const movie of movies) {
                str += `
                <option value="${movie.id}">${movie.title}</option>`
            }
            sellect.innerHTML = html1 + str
        })
        .catch(function (error) {
            console.log(error)
        })

}