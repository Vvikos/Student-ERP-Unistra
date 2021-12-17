import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Button, Card, Image, Container, Row, Col, Nav } from "react-bootstrap";
import * as profileActions from "../actions/Profile.actions";
import {Link} from "react-router-dom";

export class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.props.fetchUserData();
    this.props.reinitializeState();

    this.state = {
      readOnly: true
    };

    this.switchToEditionMode = this.switchToEditionMode.bind(this);
  }

  componentDidMount(){
    this.props.fetchUserData();
    this.props.reinitializeState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.state !== this.props.state) {
      this.setState({
        readOnly: this.props.state.updateUserSuccess
      });
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  switchToEditionMode() {
    this.setState({
      readOnly: false
    });
  }

  changeUserData() {
    this.props.changeUserData(this.state);
  }


  render() {
  	return (
      <div>
  		<Card style={{ width: '18rem', margin: '0 auto', marginTop:'30px' }}>
        <Card.Body>
          <Card.Title>Profil</Card.Title>
          <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src={this.props.state.me.picture} alt="avatar" width={210} height={210} roundedCircle />
            </Col>
          </Row>
        </Container>
          <Form autoComplete="off" onSubmit={(e) => {e.preventDefault(); this.changeUserData()}}>
            <Form.Group controlId="username">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control
                defaultValue={this.props.state.me.username}
                onChange={this.handleChange}
                type="text"
                minLength={8}
                readOnly
                plaintext
              />
            </Form.Group>
            <Form.Group controlId="firstname">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                defaultValue={this.props.state.me.firstname}
                onChange={this.handleChange}
                type="text"
                minLength={8}
                readOnly={this.state.readOnly}
              />
            </Form.Group>
            <Form.Group controlId="lastname">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                defaultValue={this.props.state.me.lastname}
                onChange={this.handleChange}
                type="text"
                minLength={8}
                readOnly={this.state.readOnly}
              />
            </Form.Group>
            <Form.Group controlId="student_number">
              <Form.Label>Numéro Etudiant</Form.Label>
              <Form.Control
                defaultValue={this.props.state.me.student_number}
                onChange={this.handleChange}
                type="text"
                minLength={8}
                readOnly
                plaintext
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                defaultValue={this.props.state.me.email}
                onChange={this.handleChange}
                type="text"
                minLength={8}
                readOnly={this.state.readOnly}
              />
            </Form.Group>
            <Form.Group controlId="date_birth">
              <Form.Label>Date d'anniversaire</Form.Label>
              <Form.Control
                defaultValue={this.props.state.me.date_birth}
                onChange={this.handleChange}
                type="date"
                minLength={8}
                readOnly={this.state.readOnly}
              />
            </Form.Group>

            { !this.state.readOnly && this.state.password &&
              <Form.Group controlId="oldpassword">
                <Form.Label>Ancien mot de passe</Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  type="password"
                  minLength={8}
                />
              </Form.Group>
            }
            { !this.state.readOnly &&
            <Form.Group controlId="password">
              <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  onClick={(e) => {
                    this.setState({changePass: true});
                  }}
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                  type="password"
                  minLength={8}
                />
              </Form.Group>
            }
             <Form.Group controlId="picture">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                defaultValue={this.props.state.me.picture}
                onChange={this.handleChange}
                type="text"
                readOnly={this.state.readOnly}
              />
            </Form.Group>
            { !this.state.readOnly &&
              <Button
                block
                type="submit"
                variant="primary"
              >
                Enregistrer
              </Button>
            }
            { this.state.readOnly &&
              <Button
                block
                onClick={this.switchToEditionMode}
                variant="primary"
              >
                Modifier
              </Button>
              }
            </Form>
          {this.props.state.updateUserError && <div><br/>{JSON.stringify(this.props.state.updateUserErrorMessage.message)}</div>}
          {this.props.state.updateUserSuccess && <div><br/>Profil modifié avec succès.</div>}
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
    state: state.profile
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: () => dispatch(profileActions.fetchUserData()),
    changeUserData: (data) => dispatch(profileActions.changeUserData(data)),
    reinitializeState: () => dispatch(profileActions.reinitializeState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
