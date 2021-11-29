import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import SignUp from './containers/SignUp.container';
import Login from './containers/Login.container';
import Privacy from './containers/Privacy.container'
import Profile from './containers/Profile.container';
import Bank from './containers/Bank.container';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import {userService} from "./services/authentication.service";
import * as loginActions from './actions/Login.actions';
import * as profileActions from './actions/Profile.actions';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        userService.loggedIn() === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.getAuth()
    this.props.fetchUserData();
  }

  render() {
    return (
          <Router>
            <div>
              <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand>STUDENT</Navbar.Brand>
                <Nav className="mr-auto">
                  {!this.props.loginState.loggedIn &&
                    <Nav.Link as={Link} to="/signup/">
                      S'inscrire
                    </Nav.Link>
                  }
                  { !this.props.loginState.loggedIn &&
                    <Nav.Link as={Link} to="/login/">
                      Se connecter
                    </Nav.Link>
                  }
                  { this.props.loginState.loggedIn &&
                    <Nav.Link as={Link} to="/">
                      Profile
                    </Nav.Link>
                  }
                  { this.props.loginState.loggedIn &&
                    <Nav.Link as={Link} to="/bank/">
                      Compte
                    </Nav.Link>
                  }
                  { this.props.loginState.loggedIn &&
                    <Nav.Link as={Link} to="/" onClick={(e) => {e.preventDefault(); this.props.logoutRequest()}} >
                      Se déconnecter
                    </Nav.Link>
                  }
                </Nav>

                {this.props.loginState.loggedIn &&
                  <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                      Connecté en tant que: <Link to="/profile/">{this.props.profileState.me.username}</Link>
                    </Navbar.Text>
                  </Navbar.Collapse>
                }
              </Navbar>

              {this.props.loginState.loggedIn && !this.props.loginState.adhesionPaid &&
                  <Modal
                  show="true"
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Avertissement
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h4>En attente de paiement de l'adhésion</h4>
                    <p>
                      Veuillez contacter votre faculté afin de régler la somme pour adhérer au système de ccommunication de la faculté.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={(e) => {e.preventDefault(); this.props.logoutRequest()}}>Se déconnecter</Button>
                  </Modal.Footer>
                </Modal>
              }

              <PrivateRoute path="/" exact component={Profile} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup/" component={SignUp} />
              <Route path="/privacy/" component={Privacy} />
              <PrivateRoute path="/bank/" component={Bank} />
            </div>
          </Router>
    );
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () => dispatch(loginActions.logout()),
    getAuth: () => dispatch(loginActions.getAuth()),
    fetchUserData: () => dispatch(profileActions.fetchUserData())
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    state: state.app,
    loginState: state.login,
    profileState: state.profile
  }
}

//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
