import { connect } from 'react-redux';
import React from 'react';
import logo_trans from '../icons/transaction.png';
import logo_money from '../icons/dollar.png';
import { withRouter } from 'react-router-dom'
import { Table, Button, Card, Image, Row, Col, Nav, NavItem } from "react-bootstrap";
import * as bankActions from "../actions/Bank.actions";
import { Link } from "react-router-dom";


export class Bank extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchUserData();
    this.props.fetchUserTransactions(this.props.profile.me.student_number);
  }

  convertDate(formated_Date){
    const date = new Date(formated_Date);

    let day = parseInt(date.getDate());
    if(day < 10){
      day = "0" + day;
    }

    let month = parseInt(date.getMonth() + 1);
    if(month < 10){
      month = "0" + month;
    }

    let hours = parseInt(date.getHours());
    if(hours < 10){
      hours = "0" + hours;
    }

    let minutes = parseInt(date.getMinutes());
    if(minutes < 10){
      minutes = "0" + minutes;
    }

    return day + "/" + month + "/" + date.getFullYear() + " " + hours + ":" + minutes;
  }

  render() {
  	return (
      <div>
  		<Row style={{ height: '100%', width: '95%', margin: '0 auto', marginTop:'30px' }}>
        <Col lg="4" className='block-example border-right border-gray bg-light' style={{ marginTop:'20px', width: '100%', height: '100%', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} >
          <Card className='bg-light' style={{ width: '100%', height: '100%', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
            <Card.Body>
              <Card.Title>Solde</Card.Title>
              <Card.Img src={logo_money} alt="argent" width={50} height={50} />
              <Card.Text style={{textAlign: 'center', fontSize:'20px'}}>
                {this.props.bank.account ? this.props.bank.account.balance : 'NaN'} €
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '100%', border:'none', margin: '0 auto', marginTop:'30px' }}>
            <Card.Body>
              <Card.Title>Transactions</Card.Title>
            <Table hover style={{ marginTop:'50px' }}>
              <tbody>
              { this.props.bank.account ?
                  this.props.bank.account.transactions.map((transaction) => {
                    return (
                      <tr key={'trans'+transaction.id}>
                        <td><Image src={logo_trans} alt='transaction' width={30} height={30} /></td>
                        <td style={{fontStyle:'italic'}} colSpan='3'>{this.convertDate(transaction.concluded_at)}</td>
                        <td style={{fontStyle:'italic', color:'#242424'}} colSpan='3'>{transaction.comment}</td>
                        <td>{transaction.amount}€</td>
                      </tr>
                    );
                  })
                :
                 null
              }
              </tbody>
            </Table>
           </Card.Body>
          </Card>
        </Col>
          {this.props.profile.updateUserError && <div><br/>{JSON.stringify(this.props.profile.updateUserErrorMessage.message)}</div>}
          {this.props.profile.updateUserSuccess && <div><br/>Success! You can now use your new password.</div>}
      </Row>
      <footer className="footer mt-auto" style={{ position:'absolute', left:0, bottom:0, right:0}}>
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
    profile: state.profile,
    bank: state.bank
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: () => dispatch(bankActions.fetchUserData()),
    fetchUserTransactions: (data) => dispatch(bankActions.fetchUserTransactions(data)),
    reinitializeState: () => dispatch(bankActions.reinitializeState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Bank))
