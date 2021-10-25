import React from 'react';

export class User extends React.Component {
  render() {
  	return (
  		<tr>
        <td>{this.props.user.username}</td>
      </tr>
  	);
  }
}
