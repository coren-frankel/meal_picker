const FLASK_APP_API_KEY = 'ec2d471e81mshd1d781daa45de8ap15487djsn98d072fb2757' // spoonacular API key

// function search(e){
//     e.preventDefault();
//     var searchForm = document.getElementById('searchForm')
//     var form = new FormData(searchForm);
//     fetch('http://localhost:5000/search',{method:'POST',body:form})
//         .then(res => res.json() )
//         .then( data => console.log(data) )
// }
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': `${FLASK_APP_API_KEY}`,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
};

function getOneRandom(event) {
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
                        diets += ', <br>'
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
            var convertedCookTime;
            if(recipe.readyInMinutes >= 60){
                var duration = recipe.readyInMinutes
                var hours = 0;
                while (duration >= 60){
                    duration -= 60;
                    hours++;
                }
                if (duration == 0){
                    duration = '';
                } else {
                    duration += ' Minutes';
                }
                if (hours > 1) {
                    hours += ' Hours'
                } else {
                    hours += ' Hour'
                }
                if (duration.length > 0){
                    convertedCookTime = `${hours} & ${duration}`
                } else {
                    convertedCookTime = `${hours}`
                }
            } else {
                convertedCookTime = `${recipe.readyInMinutes} Minutes`;
            }
            const results = document.querySelector('#results');
            results.innerHTML= `<form action="/favorite" method="POST">
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
                                                    <table class="col-4 text-center">
                                                        <tr class="lh-1">
                                                            <th class="">Cooktime :</th>
                                                            <td class="ms-3">${convertedCookTime}</td>
                                                        </tr>
                                                        <tr class=" lh-1">
                                                            <th class="">Diet Matches :</th>
                                                            <td class="ms-4">${diets}</td>
                                                        </tr>
                                                        <tr class="lh-1">
                                                            <th>Save for later?</th>
                                                            <td><input type="submit" class="btn btn-sm btn-outline-success" value="piqMe"></td>
                                                        </tr>
                                                    </table>
                                                    <div class="col-8 d-flex justify-content-end">
                                                        <img src="${recipe.image}" alt="${recipe.title}" style="object-fit: contain; height: 300px; width: auto;" class="rounded img-fluid">
                                                    </div>
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
    event.preventDefault();
    fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=5', options)
        .then(response => response.json())
        .then(function (response) {
            console.log(response.recipes)
            const results = document.querySelector('#results');
            results.innerHTML = ''
            for (var k = 0; k < 5; k++) {//Loop to unpack 5 recipes
                let recipe = response.recipes[k]
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
                        diets += ', <br>'
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
            ingredientsList += '</ul>';
            var convertedCookTime;
            if(recipe.readyInMinutes >= 60){
                var duration = recipe.readyInMinutes
                var hours = 0;
                while (duration >= 60){
                    duration -= 60;
                    hours++;
                }
                if (duration == 0){
                    duration = '';
                } else {
                    duration += ' Minutes';
                }
                if (hours > 1) {
                    hours += ' Hours'
                } else {
                    hours += ' Hour'
                }
                if (duration.length > 0){
                    convertedCookTime = `${hours} & ${duration}`
                } else {
                    convertedCookTime = `${hours}`
                }
            } else {
                convertedCookTime = `${recipe.readyInMinutes} Minutes`;
            }
            results.innerHTML+=`<form action="/favorite" method="POST">
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
                                                    <table class="col-4 text-center">
                                                    <tr class="lh-1">
                                                        <th class="">Cooktime :</th>
                                                        <td class="ms-3">${convertedCookTime}</td>
                                                    </tr>
                                                    <tr class=" lh-1">
                                                        <th class="">Diet Matches :</th>
                                                        <td class="ms-4">${diets}</td>
                                                    </tr>
                                                    <tr class="lh-1">
                                                        <th>Save for later?</th>
                                                        <td><input type="submit" class="btn btn-sm btn-outline-success" value="piqMe"></td>
                                                    </tr>
                                                    </table>
                                                    <div class="col-8 d-flex justify-content-end">
                                                        <img src="${recipe.image}" alt="${recipe.title}" style="object-fit: contain; height: 300px; width: auto;" class="rounded img-fluid">
                                                    </div>
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
    event.preventDefault();
    fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=10', options)
        .then(response => response.json())
        .then(function (response) {
            console.log(response.recipes)
            const results = document.querySelector('#results');
            results.innerHTML = ''
            for (var k = 0; k < 10; k++) {
                let recipe = response.recipes[k]
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
                        diets += ', <br>'
                    }
                    i++
                }
            } else
                diets = 'None-Listed'
            ingreds = recipe.extendedIngredients
            ingredientsList = '<ul>'
            var convertedCookTime;
            for (var i = 0; i < ingreds.length; i++) {
                ingredientsList += `<li>${ingreds[i].original}</li>`
            }
            ingredientsList += '</ul>';
            if(recipe.readyInMinutes >= 60){
                var duration = recipe.readyInMinutes
                var hours = 0;
                while (duration >= 60){
                    duration -= 60;
                    hours++;
                }
                if (duration == 0){
                    duration = '';
                } else {
                    duration += ' Minutes';
                }
                if (hours > 1) {
                    hours += ' Hours'
                } else {
                    hours += ' Hour'
                }
                if (duration.length > 0){
                    convertedCookTime = `${hours} & ${duration}`
                } else {
                    convertedCookTime = `${hours}`
                }
            } else {
                convertedCookTime = `${recipe.readyInMinutes} Minutes`;
            }
            results.innerHTML+=`<form action="/favorite" method="POST">
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
                                                        <table class="col-4 text-center">
                                                            <tr class="lh-1">
                                                                <th class="">Cooktime :</th>
                                                                <td class="ms-3">${convertedCookTime}</td>
                                                            </tr>
                                                            <tr class=" lh-1">
                                                                <th class="">Diet Matches :</th>
                                                                <td class="ms-4">${diets}</td>
                                                            </tr>
                                                            <tr class="lh-1">
                                                                <th>Save for later?</th>
                                                                <td><input type="submit" class="btn btn-sm btn-outline-success" value="piqMe"></td>
                                                            </tr>
                                                        </table>
                                                        <div class="col-8 d-flex justify-content-end">
                                                            <img src="${recipe.image}" alt="${recipe.title}" style="object-fit: contain; height: 300px; width: auto;" class="rounded img-fluid">
                                                        </div>
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