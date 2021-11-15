import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as userActions from '../actions/Users.actions';
import { User } from '../components/User.component';
import { Card, Table } from 'react-bootstrap';

export class Users extends React.Component {
  // constructor(props){
  //   super(props);
  // }

  componentWillMount(){
    this.props.fetchUsers();
  }

  render() {
  	return (
  		<Card style={{ width: '90vw', margin: '0 auto', marginTop:'30px' }}>
        <Card.Body>
            <Card.Title>Utilisateurs</Card.Title>
	  		<Table striped bordered hover>
                <thead>
                    <tr>
                        <td>Nom d'utilisateur</td>
                    </tr>
                </thead>
                <tbody>
		  		{this.props.state.users.map((value, index) => {
			        return <User key={index} likeUser={this.props.likeUser} unlikeUser={this.props.unlikeUser} user={value} appState={this.props.loginState} profileState={this.props.profileState}></User>
			    })}
                </tbody>
		    </Table>
		    {this.props.state.error && <div>Une erreur est survenue pendant le chargement des utilisateurs.</div>}
		  	{this.props.state.loading && <div>Chargement...</div>}
	    </Card.Body>
	    </Card>
  	);
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    state: state.users,
    loginState: state.login,
    profileState: state.profile,
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  	fetchUsers: () => dispatch(userActions.fetchUsers()),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users))
