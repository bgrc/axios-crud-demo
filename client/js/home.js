window.onload = function () {

    const homePage = {
        init() {
            homePage.fun.render()
            document.addEventListener('click', homePage.fun.handleDeleteMoieClick)
            homePage.fun.deleteButton();

        },
        fun: {
            render() {
                axios.get('http://localhost:3000/movies')
                    .then(function (response) {
                        let movies = response.data
                        let str = ``

                        for (const movie of movies) {
                            let star = "★★★★★☆☆☆☆☆"
                            let rate = Math.round(movie.score / 2)
                            str += `
                            <li class="movieBox">
                                <span class="delMovie" data-movieId="${movie.id}">x</span>
                                <div class="mPost">
                                    <img src="${movie.img}" alt="${movie.title}">
                                </div>
                                <div class="mTitle">${movie.title}</div>
                                <div class="mScore">${star.slice(5 - rate, 10 - rate) + ` ` + movie.score} 分</div>
                            </li>`
                        }
                        let moviesRow = document.getElementById("moviesRow")
                        moviesRow.innerHTML = str
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            handleDeleteMoieClick(e) {
                let movieId = e.target.getAttribute("data-movieId")
                if (movieId) {
                    let confirmDel = confirm('确定删除？')
                    if (confirmDel) {
                        homePage.fun.deleteMovieById(movieId)
                    } else return
                } else return
            },
            deleteMovieById(movieId) {
                axios.delete(`http://localhost:3000/movies/${movieId}`)
                    .then(function (response) {
                        if (response.status == 200) {
                            console.log("删除成功！")
                            homePage.fun.render()
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            deleteButton() {
                let tagElements = document.getElementsByTagName('span')
                document.getElementById("deleteButton").addEventListener('click', function (e) {
                    for (let item of tagElements) {
                        item.style.display = "inline"
                    }
                })
            }
        }
    }

    homePage.init()

}