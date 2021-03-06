# Phase 2: Flux Architecture and Recipe Components (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* RecipesIndex
  - RecipesIndexItem

### Stores
* Recipe

### Actions
* ApiActions.receiveAllRecipes -> triggered by ApiUtil
* ApiActions.receiveSingleRecipe
* ApiActions.deleteRecipe
* RecipeActions.fetchAllRecipes -> triggers ApiUtil
* RecipeActions.fetchSingleRecipe
* RecipeActions.createRecipe
* RecipeActions.editRecipe
* RecipeActions.destroyRecipe

### ApiUtil
* ApiUtil.fetchAllRecipes
* ApiUtil.fetchSingleRecipe
* ApiUtil.createRecipe
* ApiUtil.editRecipe
* ApiUtil.destroyRecipe

## Gems/Libraries
* Flux Dispatcher (npm)
* Twitter Bootstrap
