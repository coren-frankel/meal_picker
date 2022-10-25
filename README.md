# *piqr*
> (pick·​er | \ ˈpi-kər \) 
> piqr is a random recipe retrieval CRUD app and the first full-stack portfolio project for <a href="https://github.com/coren-frankel">Coren Frankel</a> as a fledgling developer. It integrates the spoonacular API random recipe endpoint to provide an adventurous recipe discovery, persistence, and deletion experience for the user.
> Live demo [_here_](http://3.101.63.102/). <!-- Once a live deployment is available, include the link here. -->

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)
<!-- * [License](#license) -->

<!-- PLACE BETWEEN SCREENSHOTS AND PROJECT STATUS WHEN IMPLEMENTING
* [Setup](#setup)
* [Usage](#usage)
-->

## General Information
<!--
- Provide general information about your project here.
- What problem does it (intend to) solve?
- What is the purpose of your project?
- Why did you undertake it?
-->
<!-- You don't have to answer all the questions - just the ones relevant to your project. -->
Have you ever been willing to cook, unwilling to cook the familiar, but had the general creative desire to try something new or different?*piqr* was contrived as a response to the classic dilemna that can result amongst individuals when asking, "What should we make to eat?" The app harnesses the spoonacular Nutrition, Recipe, & Food API to allow easy-click random recipes from over 300K to be glanced and saved to user-registered accounts. The Python-Flask MVC architecture utilizes bcrypt hashing for password security and authentication, and flash messages for login and registration validations. The MySQL database is host to minimal user info and collects reference points to spoonacular's recipes to avoid the *scraping* of data from the API per developer agreement. Users are able to access one-click request/responses for 1, 5, or 10 recipes at a time.


## Technologies Used
+ Python 3.10
+ Flask 2.1.3
+ MySQL 8.0.28
+ PyMySQL 1.0.2
+ bcrypt 4.0.1
+ Jinja2 3.1.2
+ Bootstrap 5.0
+ Google Fonts API
+ spoonacular API via RapidAPI


## Features
<!-- List the ready features here: -->
- Login/Registration with bcrypt password-hashing & email regular expression backend validations with flash messages
- User account allows fetching of 1, 5, or 10 random recipes at a time
- Users can "piq" their favorite recipes to be saved, view more detail about recipes, and purge them from their account
- Guests can get a dose of the user experience with access to 1 random recipe at a time, and are able to attempt to save a recipe, which 
- More to come! (Ingredient/Cuisine/Diet search filters!!!)


## Screenshots
<!-- If you have screenshots, gifs, video demos you'd like to share, include them here. -->
![Landing Page Screenshot](./img/landing.gif)

<!--
## Setup
What are the project requirements/dependencies? Where are they listed? A requirements.txt or a Pipfile.lock file perhaps? Where is it located?

Proceed to describe how to install / setup one's local environment / get started with the project.


## Usage
How does one go about using it?
Provide various use cases and code examples here.

`write-your-code-here`

-->
## Project Status
Project is: 🏗️ _in progress_

Active Contributors: 
  + [Coren Frankel](https://github.com/coren-frankel) (Full Stack Developer)
<!-- _in progress_ / _complete_ / _no longer being worked on_. If you are no longer working on it, provide reasons why. -->


## Room for Improvement
<!-- Include areas you believe need improvement / could be improved. Also add TODOs for future development. -->

Room for improvement:
- When initially learning, exploring & building with the spoonacular api, fetch, & bootstrap styles and components, the UX was largely bolstered by DOM manipulation through javascript. This amalgymated several areas needing improvment including: exposed API keys in js files, clunky template literals & indistinct bootstrap accordion elements that open/close in unison rather than being autonomously interactive.
- The original design(unfinished & excluded in minimum viable product) provides a form that allows users to call for random recipes with filters to include or exclude cuisine, diets, and/or ingredients to provide a more robust recipe inspiration experience. This feature will come to exist!**

To do:
- Migrate API request to the backend from JS to Python to promote clean API consumption
- Refactor styles for mobile-friendly responsive design
- Integrate minimal animations for AJAX waiting/loading
- Provide the ability to create, edit your own recipes
- Build relationships and logic to "like" & comment on recipes
- Introduce minimal "social" element to share/show recently "piq'd" (favorited) recipes


## Acknowledgements
- This project is dedicated to my wife Rosey, who tolerates me and endures my flagrant suggestion of "food" whenever asked what to eat or cook.


## Contact 
+ [Coren Frankel](https://linkedin.com/in/coren-frankel): feel free to [email me](mailto:coren.frankel@gmail.com)!

<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
