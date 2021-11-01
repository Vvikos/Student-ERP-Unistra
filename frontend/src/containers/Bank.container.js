import { connect } from 'react-redux';
import React from 'react';
import logo from '../icons/transaction.png';
import { withRouter } from 'react-router-dom'
import { Table, Accordion, Button, Card, Image, Container, Row, Col } from "react-bootstrap";
import * as bankActions from "../actions/Bank.actions";

export class Bank extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      readOnly: true
    };

    this.switchToEditionMode = this.switchToEditionMode.bind(this); 
  }

  componentWillMount(){
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
  		<Row style={{ width: '95%', margin: '0 auto', marginTop:'30px' }}>
        <Col xs lg="4">
          <Card style={{ width: '100%', margin: '0 auto', marginTop:'30px' }}>
            <Card.Body>
              <Card.Title>Balance</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '100%', margin: '0 auto', marginTop:'30px' }}>
            <Card.Body>
              <Card.Title>Transactions</Card.Title>
            <Table hover>
              <tbody>
                <tr>
                  <td><Image src={logo} width={30} height={30} /></td>
                  <td colSpan="2">29/09/2021</td>
                  <td>-8€</td>
                </tr>
                <tr>
                  <td><Image src={logo} width={30} height={30} /></td>
                  <td colSpan="2">29/09/2021</td>
                  <td>-8€</td>
                </tr>
                <tr>
                  <td><Image src={logo} width={30} height={30} /></td>
                  <td colSpan="2">29/09/2021</td>
                  <td>-8€</td>
                </tr>
              </tbody>
            </Table>
           </Card.Body>
          </Card>
        </Col>
          {this.props.state.updateUserError && <div><br/>{JSON.stringify(this.props.state.updateUserErrorMessage.message)}</div>}
          {this.props.state.updateUserSuccess && <div><br/>Success! You can now use your new password.</div>}
      </Row>
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
    fetchUserData: () => dispatch(bankActions.fetchUserData()),
    changeUserData: (data) => dispatch(bankActions.changeUserData(data)),
    reinitializeState: () => dispatch(bankActions.reinitializeState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Bank))
