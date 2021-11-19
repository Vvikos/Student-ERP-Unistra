import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as signupActions from '../actions/SignUp.actions';
import { Form, Button, Card, Nav } from "react-bootstrap";
import { Link, Redirect} from "react-router-dom";

export class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      student_number: null,
      date_birth: "",
      accept_condition: false
    };
    this.register = this.register.bind(this);
  }

  componentWillMount() {
    this.props.reinitializeState();
  }

  register(e) {
    this.props.registerRequest(this.state);
    e.preventDefault();
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0 && this.state.accept_condition === true;
  }

  handleChange = event => {
    if(event.target.id === "accept_condition"){
      this.setState({
        [event.target.id]: event.target.checked
      });
    } else {
      this.setState({
        [event.target.id]: event.target.value
      });
    }


  }


  render() {
  	return (
      <div>
    		<Card style={{ width: '18rem', margin: '0 auto', marginTop:'30px' }}>
          <Card.Body>
            <Card.Title>S'inscrire</Card.Title>
            <Form onSubmit={(e) => this.register(e)}>
              <Form.Group controlId="username">
                <Form.Label>Nom d'utilisateur</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="firstname">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  minLength={1}
                  value={this.state.firstname}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="lastname">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  minLength={1}
                  value={this.state.lastname}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="email"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  minLength={8}
                />
              </Form.Group>
              <Form.Group controlId="date_birth" bsSize="large">
                <Form.Label>Date d'anniversaire</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.date_birth}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="student_number">
                <Form.Label>Numéro Etudiant</Form.Label>
                <Form.Control
                  type="text"
                  minLength={8}
                  maxLength={8}
                  value={this.state.student_number}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="accept_condition">
                <Form.Check
                  type="checkbox"
                  label="En soumettant ce formulaire, j'accepte la politique de confidentialité"
                  checked={this.state.accept_condition}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                block
                disabled={!this.validateForm()}
                type="submit"
                variant="primary"
              >
                S'inscrire
              </Button>
              {this.props.state.loading && <div><br/>Veuillez patienter...</div>}
              {this.props.state.error && <div><br/>{JSON.stringify(this.props.state.errorMessage.message)}</div>}
              {this.props.state.success && <Redirect to="/login" />}
            </Form>
          </Card.Body>
        </Card>
        <footer className="footer mt-auto py-3">
          <div className="container" style={{ textAlign : "center"}}>
            <Nav.Link as={Link} to="/privacy/">
              Politique de confidentialité
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
    state: state.signup
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (registerData) => dispatch(signupActions.register(registerData)),
    reinitializeState: () => dispatch(signupActions.reinitializeState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))
