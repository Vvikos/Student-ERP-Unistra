import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }


  render() {
    return (
      <div className="container">
        <header className="jumbotron">
            <h3>Welcome</h3>
        </header>
        <div>
            { this.state.content ?
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nom</th>
                        </tr>
                    </thead>
                    <tbody>
                {Object.entries(this.state.content).map(([key, value]) => (
                    <tr key={key}>
                        <th scope="row">{value.id}</th>
                        <td>{value.name}</td>
                    </tr>
                ))}
                    </tbody>
                </table> 
            : "" }
        </div>
      </div>
    );
  }
}
