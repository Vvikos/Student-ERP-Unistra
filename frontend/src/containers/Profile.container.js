import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Button, Card, Image, Container, Row, Col } from "react-bootstrap";
import * as profileActions from "../actions/Profile.actions";

export class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password: "",
      readOnly: true,
      changePass: false
    };

    this.switchEditionMode = this.switchEditionMode.bind(this); 
  }

  componentWillMount(){
    this.props.fetchUserData();
    this.props.reinitializeState();
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    }, () => {this.setState({changePass: this.state.password });}
    );
  }

  switchEditionMode() {
    this.setState(prevState => ({
      readOnly: !prevState.readOnly
    }));
  }

  render() {
  	return (
  		<Card style={{ width: '18rem', margin: '0 auto', marginTop:'30px' }}>
        <Card.Body>
          <Card.Title>Profile</Card.Title>
          <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src="https://cdn.pixabay.com/photo/2018/09/06/18/26/person-3658927_960_720.png" width={210} height={210} roundedCircle />
            </Col>
          </Row>
        </Container>
          <Form autoComplete="off" onSubmit={(e) => {e.preventDefault(); this.changePassword(e)}}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={this.props.state.me.username}
                onChange={this.handleChange}
                type="text"
                minLength={8}
                readOnly={this.state.readOnly}
              />
            </Form.Group>
            <Form.Group controlId="firstname">
              <Form.Label>First name</Form.Label>
              <Form.Control
                value={this.props.state.me.firstname}
                onChange={this.handleChange}
                type="text"
                minLength={8}
                readOnly={this.state.readOnly}
              />
            </Form.Group>
            <Form.Group controlId="lastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={this.props.state.me.lastname}
                onChange={this.handleChange}
                type="text"
                minLength={8}
                readOnly={this.state.readOnly}
              />
            </Form.Group>
            <Form.Group controlId="student_number">
              <Form.Label>No Student</Form.Label>
              <Form.Control
                value={this.props.state.me.student_number}
                onChange={this.handleChange}
                type="text"
                minLength={8}
                readOnly
                plaintext
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={this.props.state.me.email}
                onChange={this.handleChange}
                type="text"
                minLength={8}
                readOnly={this.state.readOnly}
              />
            </Form.Group>
            <Form.Group controlId="date_birth">
              <Form.Label>Date Birth</Form.Label>
              <Form.Control
                value={this.props.state.me.date_birth}
                onChange={this.handleChange}
                type="date"
                minLength={8}
                readOnly={this.state.readOnly}
              />
            </Form.Group>

            { !this.state.readOnly && this.state.changePass &&
              <Form.Group controlId="oldpassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  minLength={8}
                />
              </Form.Group>
            }
            { !this.state.readOnly &&
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
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
            { !this.state.readOnly &&
              <Button
                block
                onClick={this.switchEditionMode}
                type="submit"
                variant="primary"
              >
                Save
              </Button>
            }
            { this.state.readOnly && 
              <Button
                block
                onClick={this.switchEditionMode}
                variant="primary"
              >
                Edit
              </Button>
              }
            </Form>
          {this.props.state.changePassError && <div><br/>{JSON.stringify(this.props.state.changePassErrorMessage.message)}</div>}
          {this.props.state.changePassSuccess && <div><br/>Success! You can now use your new password.</div>}
        </Card.Body>
      </Card>
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
    changePassword: (data) => dispatch(profileActions.changePassword(data)),
    reinitializeState: () => dispatch(profileActions.reinitializeState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
