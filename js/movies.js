welcome();

function welcome(){
    document.querySelector('#strbtn').addEventListener('click',function(){
        html=``;
        document.querySelector('#welcome').innerHTML = html;
        html=`
        <nav class="navbar navbar-dark" id="nav">
            <div class="container-fluid ">
              <a class="navbar-brand" id="omdb" onclick="home('film',1)"><p>Open Movies DataBase</p></a>
              <div class="d-flex">
                <h5 class="text-white-50 mt-2 px-2 ">Search</h5>
                <input id="search-input" class="form-control me-2" type="search" placeholder="e.g. james bond" aria-label="Search">
                <button id="search-btn" class="btn btn-light " >GO</button>
              </div>
            </div>
          </nav>
    
          <div class="container p-3 mb-2 bg-muted" >
            <div class="row" id="movies">
                <div class="col m-4">
                    <div class="card " style="width: 18rem;">
                        <img src="..." class="card-img-top" alt="...">
                        <div class="card-body rounded-circle">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                            <ul class="list-group list-group-flush">
                            <li class="list-group-item">An item</li>
                            <li class="list-group-item">A second item</li>
                            <li class="list-group-item">A third item</li>
                        </ul>
                        
                        
                    </div>
                </div>
            </div>
            
        </div>`;



        document.querySelector('#welcome').innerHTML = html;
        search('film',1,'true');

        document.querySelector('#search-btn').addEventListener('click',function(){
            const q= document.querySelector('#search-input').value;
            search(q,1);
        });
        
        
        document.querySelector('#search-input').addEventListener('keydown',function(event){
            if (event.keyCode == 27){
                this.blur();
            }
            if (event.keyCode == 13){
                search(this.value,1);
            }
        });
    });
    }



 function search(q,p, init){

    if (!init && (!q || q.length < 3)){
        alert("The field is empty or does not contain enough characters")
        console.log("mpika me 0")
        return;
    }

    fetch(`https://www.omdbapi.com/?s=${q}&page=${p}&apikey=3cf54044`).then(response=>response.json()).then(data=>{
        //console.log(data);
        if(data.Response == "True"){
            console.log(data.Search);
            prepareData(data.Search);
        }

   });
}



function buildMovie(m){

    var html=`<div class="col m-4">
    <div class="card" style="width: 18rem;" >
        <img src="${m.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
           
        </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">${m.Year}</li>
            <li class="list-group-item">${m.Type}</li>
            <li class="list-group-item">IMDB_ID:${m.imdbID}</li>
            <div class="card-body">
                <a href="#" class="text-primary" onclick="fetchExtra('${m.imdbID}')">Extra...</a>
            </div>
            </ul>
        
        
    </div>
</div>`;

return html;
}

function prepareData(movies){
    //for testing
    //console.log(buildMovie(movies[0]));
    //console.log(movies[0]);
    //document.querySelector('#movies').innerHTML = buildMovie(movies[0]);
    
    //for testing
    
    totalHtml = movies.reduce((accumulator,t)=>accumulator+buildMovie(t),'')
    
    document.querySelector('#movies').innerHTML = totalHtml;
}


function fetchExtra(id){
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=3cf54044`).then(response=>response.json()).then(data=>
    buildDetailsMovie(data)
    );
}


function buildDetailsMovie(n){
    var html='';
    console.log(n);
    var q=n.Title.slice(0,8);
    console.log(q);
    var keepnm= document.querySelector('#search-input').value;
    if(keepnm == ''){
        keepnm='film';
    }
    html=`<div class="container">
    <div class="row">
    <div class="col m-6">
    <div class="card position-absolute top-20 start-5 " style="width: 30rem;" >
    <img src="${n.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
            
           
        </div>
        </div>
        </div>
           
            <div class="col m-1">
            <ul class="list-group list-group-flush">
            
            <a href="#" class="card-link btn btn-light shadow-lg p-2 ms-3 mb-3 bg-body rounded" onclick="home('film',1)"><h3>HOME</h3></a>
            <a href="#" class="card-link btn btn-light shadow-lg p-2 mb-3 bg-body rounded" onclick="back('${keepnm}',1)"><h3>Back</h3></a>

            <li class="list-group-item"><h3>Title:</h3><span class="fs-4 text-dark">${n.Title}</span></li>
            <li class="list-group-item"><h5>Director:</h5>${n.Director}</li>
            <li class="list-group-item"><h5>Actors:</h5>${n.Actors}</li>
            <li class="list-group-item"><h5>Realease Date:</h5>${n.Released}</li>
            <li class="list-group-item"><h5>Plot:</h5>${n.Plot}</li>
            <li class="list-group-item"><h5>Duration:</h5>${n.Runtime}</li>
            <li class="list-group-item"><h5>Genre:</h5>${n.Genre}</li>
            <li class="list-group-item"><h5>Language:</h5>${n.Language}</li>
            <li class="list-group-item"><h5>Awards:</h5>${n.Awards}</li>
            <li class="list-group-item"><h5>IMDB Rating/votes:</h5>${n.imdbRating}/${n.imdbVotes}</li>

            <div class="card-body">
            
        </div>
        </div>
            </ul>
            </div>
    
</div>`;
document.querySelector('#movies').innerHTML = html;
}


function home(q,p){
    if (!q || q.length < 3){
        alert("The field is empty or does not contain enough characters")
        console.log("mpika me 0")
        return;
    }
    fetch(`https://www.omdbapi.com/?s=${q}&page=${p}&apikey=3cf54044`).then(response=>response.json()).then(data=>{
        //console.log(data);
        if(data.Response == "True"){
            console.log(data.Search);
            prepareData(data.Search);
        }

   });
}

function back(q,p){
    if (!q || q.length < 3){
        alert("The field is empty or does not contain enough characters")
        console.log("mpika me 0")
        return;
    }
    fetch(`https://www.omdbapi.com/?s=${q}&page=${p}&apikey=3cf54044`).then(response=>response.json()).then(data=>{
        //console.log(data);
        if(data.Response == "True"){
            console.log(data.Search);
            prepareData(data.Search);
        }

   });
}