import { connect } from 'react-redux';
import React from 'react';
import logo_trans from '../icons/transaction.png';
import logo_money from '../icons/dollar.png';
import { withRouter } from 'react-router-dom'
import { Table, Button, Card, Image, Row, Col } from "react-bootstrap";
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
          <Card className="block-example border border-dark" style={{ width: '100%', margin: '0 auto', marginTop:'200px', border:'none', textAlign: "center"}}>
            <Card.Body>
              <Card.Title>Compte</Card.Title>
              <Card.Text style={{display: 'flex', justifyContent: 'center'}}>
                <Image src={logo_money} width={50} height={50} />
              </Card.Text>
              <Card.Text style={{display: 'flex', justifyContent: 'center', fontSize:"20px", fontWeight:"bold"}}>
                <div className="p-3 block-example border border-dark rounded-pill">120 €</div>
              </Card.Text>
              <Button variant="primary">Ajouter des fonds </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '100%', border:'none', margin: '0 auto', marginTop:'30px' }}>
            <Card.Body>
              <Card.Title>Transactions</Card.Title>
            <Table hover style={{ marginTop:'50px' }}>
              <tbody>
                <tr>
                  <td><Image src={logo_trans} width={30} height={30} /></td>
                  <td colSpan="3">29/09/2021</td>
                  <td>-8€</td>
                </tr>
                <tr>
                  <td><Image src={logo_trans} width={30} height={30} /></td>
                  <td colSpan="3">29/09/2021</td>
                  <td>-8€</td>
                </tr>
                <tr>
                  <td><Image src={logo_trans} width={30} height={30} /></td>
                  <td colSpan="3">29/09/2021</td>
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
