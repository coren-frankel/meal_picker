console.log("Hey Cutie")


const FLASK_APP_API_KEY = 'ec2d471e81mshd1d781daa45de8ap15487djsn98d072fb2757'

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

function myFunc(favs) {
    // console.log(favs)
    if (favs == false){//FIX ME, I DON'T WORK YET!
        // let x = function (const nada = document.getElementById('nada') => nada.innerText = `You have no Favorites yet! Go forth and Favor some recipe so you might Savor the recipe!`)
        // return x
    } else if (favs.length == 1) {
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${favs[0].recipe_id}/information`, options)
            .then(response => response.json())
            .then(function (response) {
                const row = document.getElementById('row')
                const nada = document.getElementById('nada')
                nada.innerText = ''
                console.log(response)
                var recipe = response
                row.innerHTML +=    `<tr>
                                        <td class="border col-3">${recipe.title}</td>
                                        <td class="border col-2">${recipe.readyInMinutes} Minutes</td>
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
                        row.innerHTML +=    `<tr>
                                                <td class="border col-3">${recipe.title}<img src="${recipe.image}" alt="recipe image sourced elsewhere" style="width:200px;height:auto;" class="rounded-3"></td>
                                                <td class="border col-2">${recipe.readyInMinutes} Minutes</td>
                                                <td class="border col-7">${recipe.summary}</td>
                                            </tr>`
                    }
                })
            .catch(err => console.error(err));
    }
}
