const React = require('react');
const UserActions = require('../actions/user_actions');
const UserStore = require('../stores/user_store');
const UserRecipeIndexItem = require('./user_recipe_index_item');

const Author = React.createClass({
  getInitialState(){
    return {user: {recipes: [], image_url: ""}};
  },
  componentDidMount(){
    this.storeListener = UserStore.addListener(this.receiveUser);
    UserActions.getUserPage(this.props.params.userId);
  },
  receiveUser(user){
    this.setState({user: UserStore.getUser(this.props.params.userId)});
  },
  componentWillUnmount(){
    this.storeListener.remove();
  },
  render(){
    return(
      <div className="tag-index">
        <div className="member-bio">
          <div className="flex-column">
            <img src={this.state.user.image_url.replace("upload",
              "upload/w_400,h_400,c_crop,g_face,r_max,b_rgb:fafafa/w_200").replace("png", "jpg")} />
            <h2>
            {this.state.user.username}
            </h2>
           </div>
        </div>
        {this.state.user.recipes.map(recipe => {
          return <UserRecipeIndexItem key={recipe.id} recipe={recipe}/>;
        })}
      </div>
    );
  }
});

module.exports = Author;
