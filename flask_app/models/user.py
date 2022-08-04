from flask_app import DATABASE
from flask_app.config.mysqlconnection import connectToMySQL
from flask_app.models.favorite import Favorite
from flask import flash
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
PASSWORD_REGEX = re.compile(r"^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$")
class User():
    def __init__(self, data):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.pword_hash = data['pword_hash']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.favorites = []

    @classmethod
    def save_entry(cls, data): #ya know, makes users
        query = "INSERT INTO users (first_name, last_name, email, pword_hash) VALUES (%(first_name)s, %(last_name)s, %(email)s, %(pword_hash)s);"
        return connectToMySQL(DATABASE).query_db(query, data)

    @staticmethod # validate new registration
    def validate_registration( user ):
        is_valid = True
        # test whether first name contains 3 characters minimum
        if len(user['first_name'])<2:
            flash(u'First Name must contain at least 3 characters', 'error_reg')
            is_valid = False
        # test whether last name contains 3 characters minimum
        if len(user['last_name'])<2:
            flash(u'Last Name must contain at least 3 characters', 'error_reg')
            is_valid = False
        # test whether email matches the pattern
        if not EMAIL_REGEX.match(user['email']): 
            flash(u"Boo! Invalid Email Address! Booooo!", 'error_reg')
            is_valid = False
        # test whether password matches the pattern
        if not PASSWORD_REGEX.match(user['password']):
            flash(u'A Password should contain the following minimums:', 'error_reg')
            flash(u'8 Characters, 1 Uppercase, 1 Lowercase, 1 Numeric', 'error_reg')
            is_valid = False
        # test whether confirmation matches initial password entry
        if user['password'] != user['confirm']:
            flash(u'The Passwords you provided do not match', 'error_reg')
            is_valid = False
        return is_valid

    # looks for the address submitted in the database
    @classmethod
    def unique_address(cls,data):
        query = "SELECT email FROM users WHERE email = %(email)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        is_valid = True
        if results != ():
            flash(u'Provided email address is already registered', 'error_reg')
            is_valid = False
        return is_valid

    # checks for the address submitted in the database
    @classmethod
    def get_by_email(cls,data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        result = connectToMySQL(DATABASE).query_db(query, data)
        if len(result) < 1:
            return False
        return cls(result[0])

    @classmethod
    def get_by_id(cls, data):
        query = "SELECT * FROM users WHERE id = %(id)s;"
        results = connectToMySQL(DATABASE).query_db(query, data)
        if results == ():
            return False
        return results[0];