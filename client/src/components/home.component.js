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

  getFormattedDate(date) {
    var timestamp = Date.parse(date);
    var date = new Date(timestamp);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    
    return dd + '/' + mm + '/' + yyyy;
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
                          <th scope="col">Nom utilisateur</th>
                          <th scope="col">Nom</th>
                          <th scope="col">Prenom</th>
                          <th scope="col">Email</th>
                          <th scope="col">Date de naissance</th>
                          <th scope="col">Numero étudiant</th>
                          <th scope="col">Date d'adhésion</th>
                        </tr>
                    </thead>
                    <tbody>
                {Object.entries(this.state.content).map(([key, student]) => (
                    <tr key={key}>
                        <th scope="row">{student.id}</th>
                        <td>{student.nom_utilisateur}</td>
                        <td>{student.nom}</td>
                        <td>{student.prenom}</td>
                        <td>{student.email}</td>
                        <td>{this.getFormattedDate(student.date_naissance)}</td>
                        <td>{student.numero_etudiant}</td>
                        <td>{this.getFormattedDate(student.date_adhesion)}</td>
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
