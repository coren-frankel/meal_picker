console.log("Hey Cutie")


const FLASK_APP_API_KEY = 'ec2d471e81mshd1d781daa45de8ap15487djsn98d072fb2757'


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': `${FLASK_APP_API_KEY}`,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
};

function myFunc(favs) {
    console.log(favs)
    if (favs == false){//FIX ME, I DON'T WORK YET!
        // const nada = document.getElementById('nada')
        // nada.innerText = "You have may not have made Piqs yet! Go forth and Piq some recipe so that you might Savor the recipe!";
    } else if (favs.length == 1) {
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${favs[0].recipe_id}/information`, options)
            .then(response => response.json())
            .then(function (response) {
                const row = document.getElementById('row')
                const nada = document.getElementById('nada')
                nada.innerText = ''
                console.log(response)
                var recipe = response
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
                row.innerHTML+=`<tr>
                                    <td class="border col-3">${recipe.title}<br><br><img src="${recipe.image}" alt="recipe image sourced elsewhere" style="width:200px;height:auto;" class="rounded-circle"></td>
                                    <td class="border col-2">${convertedCookTime}<br><br><br><form action="/prepme" method="POST"><input type="hidden" name="recipe_id" value="${recipe.id}"><input type="submit" value="View" class="btn btn-sm btn-outline-primary"></form></td>
                                    <td class="border col-7">${recipe.summary}</td>
                                </tr>`
            })
            .catch(err => console.error(err));
    } else {
        var favorites = ''
        for (var i = 0; i < favs.length; i++) {
            favorites += favs[i].recipe_id
            if (favs[i + 1] != undefined) {
                favorites += '%2C'
            }
        }
        // console.log(favorites)
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=${favorites}`, options)
            .then(response => response.json())
            .then(function (response) {
                // console.log(response)
                const row = document.getElementById('row')
                const nada = document.getElementById('nada')
                nada.innerText = ''
                    for (var i = 0; i < response.length; i++) {
                        var recipe = response[i]
                        console.log(recipe)
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
                        row.innerHTML+=`<tr>
                                            <td class="border col-3">${recipe.title}<br><br><br><br><img src="${recipe.image}" alt="recipe image sourced elsewhere" style="width:200px;height:auto;" class="rounded-3"></td>
                                            <td class="border col-2">${convertedCookTime}<br><br><br><br><br><br><br><form action="/prepme" method="POST"><input type="hidden" name="recipe_id" value="${recipe.id}"><input type="submit" value="View" class="btn btn-sm btn-primary"></form></td>
                                            <td class="border col-7">${recipe.summary}</td>
                                        </tr>`
                    }
                })
            .catch(err => console.error(err));
    }
}
