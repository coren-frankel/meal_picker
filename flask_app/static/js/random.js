const FLASK_APP_API_KEY = 'ec2d471e81mshd1d781daa45de8ap15487djsn98d072fb2757' // spoonacular API key

// function search(e){
//     e.preventDefault();
//     var searchForm = document.getElementById('searchForm')
//     var form = new FormData(searchForm);
//     fetch('http://localhost:5000/search',{method:'POST',body:form})
//         .then(res => res.json() )
//         .then( data => console.log(data) )
// }


function getOneRandom(event) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${FLASK_APP_API_KEY}`,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };
    event.preventDefault();
    fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1', options)
        .then(response => response.json())
        .then(function (response) {
            console.log(response)
            var recipe = response.recipes[0]
            var diets = ''
            list = recipe.diets.length
            if (list != 0) {
                var i = 0;
                while (i < list) {
                    let pre = recipe.diets[i];
                    let post = pre.split(" ");
                    for (let j = 0; j < post.length; j++) {
                        post[j] = post[j][0].toUpperCase() + post[j].substr(1);
                    }
                    post = post.join("-")
                    diets += post
                    if (recipe.diets[i + 1] != undefined) {
                        diets += ', '
                    }
                    i++
                }
            } else
                diets = 'None-Listed'
            ingreds = recipe.extendedIngredients
            ingredientsList = '<ul>'
            for (var i = 0; i < ingreds.length; i++) {
                ingredientsList += `<li>${ingreds[i].original}</li>`
            }
            ingredientsList += '</ul>'
            const results = document.querySelector('#results');
            results.innerHTML = `<form action="/favorite" method="POST">
                                <fieldset class="border p-2">
                                    <legend class="px-2 w-auto" style="float: none;">${recipe.title}</legend>
                                    <input type="hidden" name="recipe_id" value="${recipe.id}">
                                    <div class="accordion" id="accordionPanelsStayOpenExample">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                                <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                                    aria-controls="panelsStayOpen-collapseOne">
                                                    Details
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"
                                                aria-labelledby="panelsStayOpen-headingOne">
                                                <div class="accordion-body d-flex justify-content-between">
                                                    <table>
                                                        <tr>
                                                            <th>Cooktime:</th>
                                                            <td>${recipe.readyInMinutes} Minutes</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Matches Diet:</th>
                                                            <td>${diets}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Piq me?:</th>
                                                            <td><input type="submit" class="btn btn-sm btn-outline-success" value="+ Add"></td>
                                                        </tr>
                                                    </table>
                                                    <img src="${recipe.image}" alt="${recipe.title}" style="object-fit: contain; height: 300px; width: auto; position: center;" class="Rounded-2">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                                                    aria-controls="panelsStayOpen-collapseThree">
                                                    Ingredients
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse"
                                                aria-labelledby="panelsStayOpen-headingThree">
                                                <div class="accordion-body">
                                                    ${ingredientsList}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="panelsStayOpen-headingFour">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false"
                                                    aria-controls="panelsStayOpen-collapseFour">
                                                    Instructions
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse"
                                                aria-labelledby="panelsStayOpen-headingFour">
                                                <div class="accordion-body">
                                                    ${recipe.instructions}
                                                </div>
                                            </div>
                                        </div>
                                </fieldset>
                            </form>`
        })
        .catch(err => console.error(err));
}
function getFiveRandom(event) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${API_KEY}`,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };
    event.preventDefault();
    fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=5', options)
        .then(response => response.json())
        .then(function (response) {
            console.log(response.recipes)
            const results = document.querySelector('#results');
            results.innerHTML = ''
            for (var k = 0; k < 5; k++) {
                let recipe = response.recipes[k]
                let diets = ''
                list = recipe.diets.length
                if (list != 0) {
                    var i = 0;
                    while (i < list) {
                        let pre = recipe.diets[i];
                        let post = pre.split(" ");
                        for (let j = 0; j < post.length; j++) {
                            post[j] = post[j][0].toUpperCase() + post[j].substr(1);
                        }
                        post = post.join("-")
                        diets += post
                        if (recipe.diets[i + 1] != undefined) {
                            diets += ', '
                        }
                        i++
                    }
                } else
                    diets = 'None-Listed'
                ingreds = recipe.extendedIngredients
                ingredientsList = '<ul>'
                for (var i = 0; i < ingreds.length; i++) {
                    ingredientsList += `<li>${ingreds[i].original}</li>`
                }
                ingredientsList += '</ul>'
                results.innerHTML += `<form action="/favorite" method="POST">
                                    <fieldset class="border p-2">
                                        <legend class="px-2 w-auto" style="float: none;">${recipe.title}</legend>
                                        <input type="hidden" name="recipe_id" value="${recipe.id}">
                                        <div class="accordion" id="accordionPanelsStayOpenExample">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                                        aria-controls="panelsStayOpen-collapseOne">
                                                        Details
                                                    </button>
                                                </h2>
                                                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"
                                                    aria-labelledby="panelsStayOpen-headingOne">
                                                    <div class="accordion-body d-flex justify-content-between">
                                                        <table>
                                                            <tr>
                                                                <th>Cooktime:</th>
                                                                <td>${recipe.readyInMinutes} Minutes</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Fits Diet:</th>
                                                                <td>${diets}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Piq me?:</th>
                                                                <td><input type="submit" class="btn btn-sm btn-outline-success" value="+ Add"></td>
                                                            </tr>
                                                        </table>
                                                        <img src="${recipe.image}" alt="${recipe.title}" style="object-fit: contain; height: 300px; width: auto; position: center;" class="Rounded-4">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                                                        aria-controls="panelsStayOpen-collapseThree">
                                                        Ingredients
                                                    </button>
                                                </h2>
                                                <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse"
                                                    aria-labelledby="panelsStayOpen-headingThree">
                                                    <div class="accordion-body">
                                                        ${ingredientsList}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="panelsStayOpen-headingFour">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false"
                                                        aria-controls="panelsStayOpen-collapseFour">
                                                        Instructions
                                                    </button>
                                                </h2>
                                                <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse"
                                                    aria-labelledby="panelsStayOpen-headingFour">
                                                    <div class="accordion-body">
                                                        ${recipe.instructions}
                                                    </div>
                                                </div>
                                            </div>
                                    </fieldset>
                                </form>`
            }
        })
        .catch(err => console.error(err));
}
function getTenRandom(event) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${API_KEY}`,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };
    event.preventDefault();
    fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=10', options)
        .then(response => response.json())
        .then(function (response) {
            console.log(response.recipes)
            const results = document.querySelector('#results');
            results.innerHTML = ''
            for (var k = 0; k < 10; k++) {
                let recipe = response.recipes[k]
                let diets = ''
                list = recipe.diets.length
                if (list != 0) {
                    var i = 0;
                    while (i < list) {
                        let pre = recipe.diets[i];
                        let post = pre.split(" ");
                        for (let j = 0; j < post.length; j++) {
                            post[j] = post[j][0].toUpperCase() + post[j].substr(1);
                        }
                        post = post.join("-")
                        diets += post
                        if (recipe.diets[i + 1] != undefined) {
                            diets += ', '
                        }
                        i++
                    }
                } else
                    diets = 'None-Listed'
                ingreds = recipe.extendedIngredients
                ingredientsList = '<ul>'
                for (var i = 0; i < ingreds.length; i++) {
                    ingredientsList += `<li>${ingreds[i].original}</li>`
                }
                ingredientsList += '</ul>'
                results.innerHTML += `<form action="/favorite" method="POST">
                                    <fieldset class="border p-2">
                                        <legend class="px-2 w-auto" style="float: none;">${recipe.title}</legend>
                                        <input type="hidden" name="recipe_id" value="${recipe.id}">
                                        <div class="accordion" id="accordionPanelsStayOpenExample">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                                        aria-controls="panelsStayOpen-collapseOne">
                                                        Details
                                                    </button>
                                                </h2>
                                                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show"
                                                    aria-labelledby="panelsStayOpen-headingOne">
                                                    <div class="accordion-body d-flex justify-content-between">
                                                        <table>
                                                            <tr>
                                                                <th>Cooktime:</th>
                                                                <td>${recipe.readyInMinutes} Minutes</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Fits Diet:</th>
                                                                <td>${diets}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Piq me?:</th>
                                                                <td><input type="submit" class="btn btn-sm btn-outline-success" value="+ Add"></td>
                                                            </tr>
                                                        </table>
                                                        <img src="${recipe.image}" alt="${recipe.title}" style="object-fit: contain; height: 300px; width: auto; position: center;" class="Rounded-2">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                                                        aria-controls="panelsStayOpen-collapseTwo">
                                                        Summary
                                                    </button>
                                                </h2>
                                                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse"
                                                    aria-labelledby="panelsStayOpen-headingTwo">
                                                    <div class="accordion-body">
                                                        ${recipe.summary}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                                                        aria-controls="panelsStayOpen-collapseThree">
                                                        Ingredients
                                                    </button>
                                                </h2>
                                                <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse"
                                                    aria-labelledby="panelsStayOpen-headingThree">
                                                    <div class="accordion-body">
                                                        ${ingredientsList}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="panelsStayOpen-headingFour">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false"
                                                        aria-controls="panelsStayOpen-collapseFour">
                                                        Instructions
                                                    </button>
                                                </h2>
                                                <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse"
                                                    aria-labelledby="panelsStayOpen-headingFour">
                                                    <div class="accordion-body">
                                                        ${recipe.instructions}
                                                    </div>
                                                </div>
                                            </div>
                                    </fieldset>
                                </form>`
            }
        })
        .catch(err => console.error(err));
}