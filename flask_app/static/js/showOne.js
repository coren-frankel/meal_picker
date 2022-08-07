const FLASK_APP_API_KEY = 'ec2d471e81mshd1d781daa45de8ap15487djsn98d072fb2757'
console.log("showOne.js engaged")
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': `${FLASK_APP_API_KEY}`,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
};
function myFunc(one) {
    if (one == false) {//FIX ME, I DON'T WORK YET!
        console.log("No recipe id was given")
    } else {
        console.log("Attempting Fetch!")
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${one.recipe_id}/information`, options)
            .then(response => response.json())
            .then(function (response) {
                console.log(response)
                var recipe = response
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
                var wineInfo
                if (recipe.winePairing.pairingText == '' || recipe.winePairing.pairingText == null){
                    wineInfo = '';
                } else {
                    wineInfo = `<div class="text-center">
                                    <h5 class="text-dark">Wine Pairings :<h5>
                                    <h6 class="text-dark">${recipe.winePairing.pairingText}</h6>
                                </div>`
                }
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
                                                    <table class="col-4 text-center" style="font-size:110%;">
                                                        <tr>
                                                            <th>Cooktime :</th>
                                                            <td class="ms-3">${convertedCookTime}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Diet Matches :</th>
                                                            <td class="ms-3">${diets}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Serves :</th>
                                                            <td>${recipe.servings}</td>
                                                        </tr>
                                                        </table>
                                                        <div class="col-8 text-center">
                                                        <img src="${recipe.image}" alt="${recipe.title}" style="object-fit: contain; height: 300px; width: auto;" class="rounded-1 img-fluid"><br>
                                                        ${wineInfo}
                                                    </div>
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
                                                <div class="accordion-body" id="instr">
                                                    ${recipe.instructions}
                                                </div>
                                            </div>
                                        </div>
                                </fieldset>
                            </form>
                            <a href="/remove/${recipe.id}" class="btn btn-large btn-danger mt-3">Purge this from myPiqs</a>`
            })
            .catch(err => console.error(err));
    }
};