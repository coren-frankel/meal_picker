from flask import render_template, redirect, request, session, flash, url_for
from flask_app import app
import os
import requests
from flask import jsonify
from flask_app.models.user import User
from flask_app.models.favorite import Favorite
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

# @app.route('/searching',methods=['POST']):
#     print(request.form['query'])
#     # now we inject the query into our string
#     r = requests.get(f"https:api.information.com/{os.environ.get('FLASK_API_KEY')}/search?={request.form['query']}")
#     # we must keep in line with JSON format.
#     # requests has a method to convert the data coming back into JSON.
#     return jsonify( r.json() )

@app.route('/')#Render Homepage
def index():
    if 'user_id' in session:
        return redirect('/plan')
    if 'recipe_id' in session:
        if session['recipe_id'] != -1:
            flash('Save your piq by logging in!', 'success_log')
    return render_template('index.html')

@app.route('/register')#Render registration page
def registration():
    if 'user_id' in session:
        return redirect('/favorites')
    return render_template('registration.html')

# Bcrypt methods below
@app.route('/process', methods=['POST'])
def register(): # validate the form here ...
    if request.method == 'POST':
        if not User.validate_registration(request.form): # validate me senpai, validate me
            return redirect('/register')
        if not User.unique_address(request.form): #if there is match, rejects submission
            return redirect('/register')
        pw_hash = bcrypt.generate_password_hash(request.form['password']) # create the hash
        data = { # put the pw_hash into the data dictionary
            "first_name": request.form['first_name'].title(),
            "last_name": request.form['last_name'].title(),
            "email": request.form['email'].lower(),
            "pword_hash" : pw_hash
        }
        new_user = User.save_entry(data) # Call the save @classmethod on User
        flash("Please Login!", "success_log")
        if 'recipe_id' in session:
            if session['recipe_id'] != -1:
                first_piq = {
                    "recipe_id" : session['recipe_id'],
                    "user_id" : new_user
            }
            Favorite.add_favorite(first_piq)
            session['recipe_id'] = -1
        return redirect("/")

@app.route('/login', methods=['POST'])
def login():
    # see if the username provided exists in the database
    data = { "email" : request.form["email"] }
    user = User.get_by_email(data)
    # user is not registered in the db
    if not user:
        flash("Email provided is not registered", 'error_log')
        return redirect("/")
    if not bcrypt.check_password_hash(user.pword_hash, request.form['password']):
        # if we get False after checking the password
        flash("Password provided is invalid", 'error_log')
        return redirect('/')
    # if the passwords matched, we set the user_id into session
    session['user_id'] = user.id
    session['first_name'] = user.first_name
    if 'recipe_id' in session:
        if (session['recipe_id'] != -1):
            new_piq = {
                "recipe_id" : session['recipe_id'],
                "user_id" : session['user_id']
            }
            Favorite.add_favorite(new_piq)
            session['recipe_id'] = -1
    return redirect("/favorites")

@app.route('/plan')# Show all Recipes! If not logged in, clear session and go to login page
def result():
    if 'user_id' not in session:
        return redirect('/')
    data = {
        "id" : session['user_id']
    }
    user = User.get_by_id(data) 
    if not user:
        return redirect('/logout')
    return render_template('plan.html', user=user)

@app.route('/random') # Go to random recipe call page
def go_choose_random():
    return render_template('roulette.html')

@app.route('/prepme', methods=['POST'])
def pass_recipe():
    session['recipe_id'] = request.form['recipe_id']
    print("sending from /prepme...")
    return redirect('/prep')

@app.route('/prep')
def show_recipe():
    data = {
        "recipe_id" : session['recipe_id']
    }
    print("made it to the return line rendering show_recipe")
    return render_template('show_recipe.html', data = data)

@app.route('/favorites')
def display_favorites():
    if 'user_id' not in session:
        return redirect('/')
    user_data = {
        "user_id" : session['user_id']
    }
    return render_template('favorites.html', data = Favorite.get_favorites(user_data))

@app.route('/favorite', methods = ['POST'])
def add_favorites():
    if 'user_id' not in session:
        session['recipe_id'] = request.form['recipe_id']
        flash('To save a recipe to your piqs you need an account!', 'reg_piq')
        flash('Register and then Login to save the recipe!', 'reg_piq')
        return redirect('/register')
    data = {
        "user_id" : session['user_id'],
        "recipe_id" : request.form['recipe_id']
    }
    Favorite.add_favorite(data)
    return redirect('/favorites')

@app.route('/remove/<int:rcp_id>')
def remove_piq(rcp_id):
    if 'user_id' not in session:
        return redirect('/')
    data = {
        "user_id" : session['user_id'],
        "recipe_id" : rcp_id
    }
    Favorite.remove_piq(data)
    return redirect ('/favorites')

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)
