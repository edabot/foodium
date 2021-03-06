const React = require('react');
const SessionStore = require('../stores/session_store');
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;

const Navbar = require('react-bootstrap').Navbar;
const Nav = require('react-bootstrap').Nav;
const NavItem = require('react-bootstrap').NavItem;
const Button = require('react-bootstrap').Button;

const TopNav = React.createClass({
  getInitialState(){
    return {
      currentUser: SessionStore.currentUser(),
    };
  },
  componentDidMount(){
    SessionStore.addListener(this._updateUser);
  },
  _updateUser(){
    this.setState({
      currentUser: SessionStore.currentUser()
    });
  },
  linkToUserPage(){
    hashHistory.push('/member/' + this.state.currentUser.id);
  },
  navUserSection(){
    let user = this.state.currentUser.username;
    if (user !== undefined) {
      return(
        <div className="flex-end flex-center">
        <div className="pointer" onClick={this.linkToUserPage}>{user}</div>
        <img className="left10 pointer" onClick={this.linkToUserPage} src={this.state.currentUser.image_url.replace("upload",
          "upload/w_400,h_400,c_crop,g_face,r_max/w_40").replace('png', 'jpg')} />
        <button onClick={this.props.logout} className="btn btn-default navbar-btn" >logout</button>
        </div>
      );
    } else {
      return(
        <div>
          <Button className="btn btn-default navbar-btn" onClick={this.props.login}>Log In</Button>
          <Button className="btn btn-default navbar-btn" onClick={this.props.signup}>Sign Up</Button>
        </div>
      );
    }
  },
  render(){
    return(
      <Navbar>
        <div className="navbar-container">
          <Navbar.Header>
            <Navbar.Brand>
              <div className="navbar-logo">
                <a href="#"><img src="http://res.cloudinary.com/de7jh2mw5/image/upload/c_scale,h_30/v1468016512/Screen_Shot_2016-07-08_at_3.21.33_PM_amhk0p.png" /></a>
                <div className="left10"><a href="#">Foodium</a>
                </div>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.navUserSection()}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }

});

module.exports = TopNav;
