const RecipeApiUtil = require('../util/recipe_api_util.js');
const Dispatcher = require('../dispatcher/dispatcher');
const RecipeConstants = require('../constants/recipe_constants');
const ErrorActions = require('./error_actions');

const RecipeActions = {
  createRecipe(recipe){
    RecipeApiUtil.create(recipe, RecipeActions.receiveRecipe);
  },
  showRecipe(id){
    RecipeApiUtil.show(id, RecipeActions.receiveRecipe,
      ErrorActions.setErrors);
  },
  showRecipeIndex(){
    RecipeApiUtil.index(RecipeActions.receiveRecipes);
  },
  updateRecipe(recipe){
    RecipeApiUtil.update(recipe, RecipeActions.receiveRecipe);
  },
  deleteRecipe(id){
    RecipeApiUtil.destroy(id, RecipeActions.removeRecipe);
  },
  receiveRecipes(recipes){
    Dispatcher.dispatch({
      actionType: RecipeConstants.RECIPES_RECEIVED,
      recipes: recipes
    });
  },
  receiveRecipe(recipe){
    Dispatcher.dispatch({
      actionType: RecipeConstants.RECIPE_RECEIVED,
      recipe: recipe
    });
  },
  removeRecipe(recipe){
    Dispatcher.dispatch({
      actionType: RecipeConstants.RECIPE_REMOVED,
      recipe: recipe
    });
  }
};

module.exports = RecipeActions;
