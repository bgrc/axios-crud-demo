window.onload = function () {
    const form = document.getElementById("addMovie")
    form.addEventListener('submit', e => {
        e.preventDefault()

        const movieData = getMovieData()
        console.log(movieData)

        axios.post('http://localhost:3000/movies', movieData)
            .then(function (response) {
                if (response.data) {
                    alert("添加成功")
                    form.reset()
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    })

    function getMovieData() {
        let tagElements = document.getElementsByTagName('input')
        let movieData = {}
        for (let item of tagElements) {
            movieData[item.name] = item.value
        }
        return movieData
    }
}