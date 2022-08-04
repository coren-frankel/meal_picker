from flask import Flask, session
DATABASE = "meal_picker_schema"
app = Flask(__name__)
app.secret_key = "thesecretingredient"