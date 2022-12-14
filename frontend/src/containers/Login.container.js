import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as loginActions from '../actions/Login.actions';
import { Form, Button, Card, Nav } from "react-bootstrap";
import { Link} from "react-router-dom";


export class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.login = this.login.bind(this);
  }

  componentDidMount() {
    this.props.reinitializeState();
  }

  login(e) {
    this.props.loginRequest(this.state);
    e.preventDefault();
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  render() {
  	return (
      <div>
      <Card style={{ width: '18rem', margin: '0 auto', marginTop:'30px' }}>
        <Card.Body>
          <Card.Title>Se connecter</Card.Title>
          <Form onSubmit={(e) => this.login(e)}>
            <Form.Group controlId="username">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </Form.Group>
            <Button
              block
              disabled={!this.validateForm()}
              type="submit"
              variant="primary"
            >
              Se connecter
            </Button>
            {this.props.state.loading && <div><br/>Logging you in...</div>}
            {this.props.state.error && <div><br/>{JSON.stringify(this.props.state.errorMessage.message)}</div>}
          </Form>
        </Card.Body>
      </Card>
      <footer className="footer mt-auto py-3" >
        <div className="container" style={{ textAlign : "center"}}>
          <Nav.Link as={Link} to="/privacy/">
            Politique de confidentialit??
          </Nav.Link>
        </div>
      </footer>
      </div>
   	);
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    state: state.login
  }
}

// map actions to props
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginRequest: (loginData) => dispatch(loginActions.login(loginData, ownProps)),
    reinitializeState: () => dispatch(loginActions.reinitializeState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
