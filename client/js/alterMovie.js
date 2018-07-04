window.onload = function () {
    let movies
    let selectId
    axios.get('http://localhost:3000/movies')
        .then(function (response) {
            movies = response.data
            let html1 = `<option value="">请选择电影</option>`
            let str = ``
            for (let movie of movies) {
                str += `
                <option value="${movie.id}">${movie.title}</option>`
            }
            sellect.innerHTML = html1 + str
        })
        .catch(function (error) {
            console.log(error)
        })

    let sellect = document.getElementById("mySelect");
    sellect.addEventListener('change', function (e) {
        selectId = e.target.value

        let formPlaceholder = document.getElementsByTagName('input')
        for (let movie of movies) {
            if (selectId == movie.id) {
                formPlaceholder[0].placeholder = movie.title
                formPlaceholder[1].placeholder = movie.img
                formPlaceholder[2].placeholder = movie.director
                formPlaceholder[3].placeholder = movie.score
                formPlaceholder[4].placeholder = movie.date
            }
        }
    }, false)

    const alter = document.getElementById("alterMovie")
    alter.addEventListener('submit', e => {
        e.preventDefault()
        axios.delete(`http://localhost:3000/movies/${selectId}`)
            .then(function (response) {
                if (response.status == 200) {
                    console.log("删除成功！")
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        axios.post('http://localhost:3000/movies', getMovieData())
            .then(function (response) {
                if (response.data) {
                    alert("修改成功！")
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        function getMovieData() {
            let tagElements = document.getElementsByTagName('input')
            let movieData = {}
            for (let item of tagElements) {
                movieData[item.name] = item.value
            }
            movieData['id'] = selectId
            return movieData
        }
    })

}