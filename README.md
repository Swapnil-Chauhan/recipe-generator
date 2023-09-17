This is a

# Recipe Generator Project using Javascript and React framework and Redux toolkit for state management.

Users can search for possible recipes based on ingredients, quantity and meal type.
Users can follow the text based instruction as well as go through the You Tube video to watch the recipe.

# The project is deployed on GITHUB PAGES and can be accessed using URL https://swapnil-chauhan.github.io/recipe-generator/

To run the application on your local desktop

# clone the repo from https://github.com/Swapnil-Chauhan/recipe-generator

go to project root directory

# run npm install

# run npm start

the project will start on http://localhost:3000

############################# Project Details ########################################

##### First Screen

the first page consist of having two filter options( dropdowns ) using ingredients (multi select) and meal type.
The values in the dropdown are made available from below REST APIs

# www.themealdb.com/api/json/v1/1/list.php?c=list

# www.themealdb.com/api/json/v1/1/list.php?i=list

The Find Recipe button will make a call to 2 backend APIs to fetch recipes based on selected ingredient and mealType.
We will find the common recipes from both the results and show it on the UI.

# www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast,garlic,salt

# www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

User can click on the Recipe Name below the Image to naviagte to second screen.

##### Second Screen

Second screen will provide all the ingredients and their mesaures required for the recipe.
Also the video link as well as written instructions will be provided on this page.

API used to get the recipe details is:

# www.themealdb.com/api/json/v1/1/lookup.php?i=52772

User can select any ingredient and navigate to the third screen.

# TODO ---- can be enhanced in future if API is provided

currently user can select an ingredient on second screen and it will provide list of all recipes using that one ingredient.
But it can be modified to also include the ingredient quantity as a parameter and then search for the recipes.
Currently we do not have an API to search for recipes based on quantity.

#### Third Screen

this screen will provide all the recipes using the ingredient selected on second screen.

API used to fetch the data is

# www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

From the list of recipes displayed on this screen user can select any recipe and will be redirected to second screen which will provide details of the recipe.

# Home Button

User can click on the Home button in header and navigate to the first screen with all filters cleared out.
