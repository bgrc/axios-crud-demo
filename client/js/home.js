window.onload = function () {
    axios.get('http://localhost:3000/movies')
        .then(function (response) {
            let movies = response.data
            let str = ``

            for (const movie of movies) {
                let star = "★★★★★☆☆☆☆☆"
                let rate = Math.round(movie.score / 2)
                str += `
                <li class="movieBox">
                    <div class="mPost">
                        <img src="${movie.img}" alt="${movie.title}">
                    </div>
                    <div class="mTitle">${movie.title}</div>
                    <div class="mScore">${star.slice(5 - rate, 10 - rate) + ` ` + movie.score} 分</div>
                </li>`
            }

            let moviesRow = document.getElementById("moviesRow")
            moviesRow.innerHTML += str;
        })

        .catch(function (error) {
            console.log(error)
        })
}