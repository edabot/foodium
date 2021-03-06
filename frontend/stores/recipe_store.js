const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const RecipeConstants = require('../constants/recipe_constants');
const LikeConstants = require('../constants/like_constants');
const CommentConstants = require('../constants/comment_constants');
const TagConstants = require('../constants/tag_constants');

const RecipeStore = new Store(AppDispatcher);

let _recipes = {};
let _recipesDetail = {};
let _recipe = {};

RecipeStore.getRecipe = function(id){
  return Object.assign({}, _recipe);
};

RecipeStore.getRecipes = function() {
  const result = [];
  for (var key in _recipes) {
    result.push(_recipes[key]);
  }
  return result;
};

RecipeStore.getNewest = function() {
  return Object.assign({}, _recipe);
};

RecipeStore.getLikers = function(recipeId) {
  return _recipes[recipeId].likers;
};

const setRecipes = function(recipes) {
  _recipes = {};
  for (let i = 0; i < recipes.length; i++) {
    _recipes[recipes[i].id] = recipes[i];
  }
};

const setRecipe = function(recipe) {
  _recipesDetail[recipe.id] = recipe;
  _recipe = recipe;
};

const removeRecipe = function(recipe) {
  delete _recipes[recipe.id];
};

const addComment = function(comment) {
  _recipesDetail[comment.recipe_id].comments.unshift(comment);
};

const removeComment = function(comment) {
  let commentIds = _recipesDetail[comment.recipe_id].comments.map(comment => {
    return comment.id;
  });
  let idx = commentIds.indexOf(comment.id);
  _recipesDetail[comment.recipe_id].comments.splice(idx, 1);
};

const addLike = function(recipeId, userId) {
  _recipes[recipeId].likers.push(parseInt(userId));
  if (_recipe.likers) _recipe.likers.push(parseInt(userId));
};

const removeLike = function(recipeId, userId) {
  let userIdx = _recipes[recipeId].likers.indexOf(parseInt(userId));
  _recipes[recipeId].likers.splice(userIdx, 1);
  if (_recipe.likers) {
    userIdx = _recipe.likers.indexOf(parseInt(userId));
    _recipe.likers.splice(userIdx, 1);
  }
};

RecipeStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case RecipeConstants.RECIPES_RECEIVED:
      setRecipes(payload.recipes);
      this.__emitChange();
      break;
    case RecipeConstants.RECIPE_RECEIVED:
      setRecipe(payload.recipe);
      this.__emitChange();
      break;
    case RecipeConstants.RECIPE_REMOVED:
      removeRecipe(payload.recipe);
      this.__emitChange();
      break;
    case LikeConstants.ADDED_LIKE:
      addLike(payload.like.recipe_id, payload.like.user_id);
      this.__emitChange();
      break;
    case LikeConstants.REMOVED_LIKE:
      removeLike(payload.like.recipe_id, payload.like.user_id);
      this.__emitChange();
      break;
    case CommentConstants.ADDED_COMMENT:
      addComment(payload.comment);
      this.__emitChange();
      break;
    case CommentConstants.REMOVED_COMMENT:
      removeComment(payload.comment);
      this.__emitChange();
      break;
    case TagConstants.RECEIVED_TAG_RECIPES:
      setRecipes(payload.recipes);
      this.__emitChange();
      break;
  }
};

module.exports = RecipeStore;
