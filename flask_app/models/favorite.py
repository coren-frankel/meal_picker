from flask_app import DATABASE
from flask_app.config.mysqlconnection import connectToMySQL

class Favorite():
    def __init__(self, data):
        self.user_id = data['user_id']
        self.recipe_id = data['recipe_id']

    @classmethod
    def add_favorite(cls, data):
        query = "INSERT INTO favorites (user_id, recipe_id) VALUES (%(user_id)s, %(recipe_id)s);"
        return connectToMySQL(DATABASE).query_db(query, data)
    
    @classmethod
    def get_favorites(cls, data):
        query = "SELECT recipe_id FROM favorites WHERE user_id = %(user_id)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if results == ():
            return False
        print(results)
        return results;