const React = require('react');
const RecipeStore = require('../stores/recipe_store');
const RecipeActions = require('../actions/recipe_actions');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const RecipeIndexItem = React.createClass({
  getInitialState(){
    return{recipe: this.props.recipe};
  },
  _viewRecipe(){
    hashHistory.push('/recipes/' + this.props.recipe.id);
  },
  render(){
    return(
      <div className="recipe-index-item">
        <img onClick={this._viewRecipe} className="img-responsive pointer" src={this.state.recipe.image_url} />

        <div className="recipe-body">
          <div onClick={this._viewRecipe} className="recipe-title pointer">
            {this.state.recipe.title}
          </div>
          <blockquote>
            <h3>{this.state.recipe.description}</h3>
          </blockquote>
        </div>
      </div>
    );
  }
});

module.exports = RecipeIndexItem;