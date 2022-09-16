let cl = console.log;

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
// cl(API_URL)
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const searchBar = document.getElementById("searchBar")
const postInfo = document.getElementById("postInfo");
const numSearch = document.getElementById("numSearch")

function makeApiCall(apiUrl, methodName, body){
    return fetch(apiUrl, {
        method: methodName,
        body: body,
        headers:{
            "Content-type": "application/json; charset = UTF-8",
        }
    })
    .then(res=> res.json())
}

makeApiCall(API_URL, "GET")
            .then(res=> {
                // cl(res)
                let postArray = res.results;
                // cl(postArray)
                templating(postArray)
            })
            .catch(cl)

function onColor(item){
    if(item>=8){
        return "green"
    }else if(item>=6){
        return "orange"
    }else if(item>=3){
        return "red"
    }
}          
function templating(arr){
    let result = "";
    arr.forEach((ele) => {
        result += `
        <div class="col-md-3 mb-4">
        <div class="card">
                        <div class="card-body movie">
                            <figure class="img-section">
                                <img src="${IMG_PATH}${ele.poster_path}" alt="${ele.original_title}" class="img">
                            </figure>
                            <figcaption class="img-caption mt-3">
                                <div class="row img-row">
                                    <div class="col-md-8">
                                        <h3>${ele.original_title}</h3>
                                    </div>
                                    <div class="col-md-4 mt-2">
                                        <span class="${onColor(ele.vote_average)} bk-dark">
                                            ${ele.vote_average}
                                        </span>
                                    </div>
                                </div>
                            </figcaption>
                            <div class="overview">
                                <h3>${ele.original_title}</h3>
                                <p>${ele.overview}</p>
                            </div>
                        </div>
                    </div>
                    </div>
        `
    });
    postInfo.innerHTML = result;
}

const onkeyUpHandler = (event)=>{
    let keyVal = event.target.value.toLowerCase().trim()
    let updatedUrl = localStorage.getItem("newUrl")
    makeApiCall(updatedUrl, "GET")
            .then(res=> {
                let postArray = res.results;
                let newArr = postArray.filter(ele=> ele.title.toLowerCase().trim().includes(keyVal))
                templating(newArr)
                cl(newArr)
                // numSearchKeyUp()
            })
            .catch(cl)
}

const numSearchKeyUp = (event)=>{
    let newUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${event.target.value}`
    localStorage.setItem("newUrl", newUrl)
    cl(newUrl)
    makeApiCall(newUrl, "GET")
            .then(res=> {
                let postArray = res.results;
                templating(postArray)
            })
            .catch(cl)
}


numSearch.addEventListener("keyup", numSearchKeyUp)
searchBar.addEventListener("keyup", onkeyUpHandler)