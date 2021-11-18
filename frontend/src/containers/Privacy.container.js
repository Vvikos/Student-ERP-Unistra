import React from 'react';
import { withRouter } from 'react-router-dom'
import { Card } from 'react-bootstrap';

export class Privacy extends React.Component {

  render() {
  	return (
      <>
        <Card>
          <Card.Header as="h2">Politique de confidentialité</Card.Header>
          <Card.Body>
            <Card.Title>Date d'entrée en vigueur : 17 novembre 2021</Card.Title>
            <Card.Text class="text-justify" >Cette page vous informe de nos politiques concernant la collecte, l'utilisation et la divulgation des données personnelles lorsque vous utilisez notre service et les choix que vous avez associés à ces données. 
              Nous utilisons vos données pour fournir et améliorer le service. En utilisant le service, vous acceptez la collecte et l'utilisation des informations conformément à cette politique. Sauf indication contraire dans la présente politique de confidentialité, les termes utilisés dans cette politique de confidentialité ont la même signification que dans nos conditions générales.
            </Card.Text> 
          </Card.Body>
        </Card>

        <Card>
          <Card.Header as="h3">Collecte et utilisation des informations</Card.Header>
          <Card.Body>
            <Card.Text class="text-justify">Nous collectons différents types d'informations à diverses fins pour vous fournir et améliorer notre service.</Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header as="h4">Types de données collectées</Card.Header>
          <Card.Body>
            <Card.Title>Données personnelles</Card.Title>
            <Card.Text class="text-justify"> Lors de l'utilisation de notre service, nous pouvons vous demander de nous fournir certaines informations personnellement identifiables qui peuvent être utilisées pour vous contacter ou vous identifier (« Données personnelles »). <br></br>
            Informations personnellement identifiables :      
            <ul>
              <li>Adresse e-mail</li>
              <li>Pseudo</li>
              <li>Prénom</li>
              <li>Nom</li>
              <li>Date de naissance</li>
              <li>Numéro étudiant</li>
              <li>Photo</li>
            </ul>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header as="h3">Divulgation de données</Card.Header>
          <Card.Body>
            <Card.Title>Exigences légales</Card.Title>
            <Card.Text class="text-justify">L'AIUS peut divulguer vos données personnelles en croyant de bonne foi qu'une telle action est nécessaire pour : 
            <ul>
              <li>Pour se conformer à une obligation légale Protéger et défendre les droits ou la propriété de l'AIUS.</li>
              <li>Pour prévenir ou enquêter sur d'éventuels actes répréhensibles en rapport avec le service.</li>
              <li>Pour protéger la sécurité personnelle des utilisateurs du service ou du public.</li>
              <li>Pour se protéger contre la responsabilité légale.</li>
            </ul>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header as="h3">Sécurité des données</Card.Header>
          <Card.Body>
            <Card.Text class="text-justify">La sécurité de vos données est importante pour nous, mais n'oubliez pas qu'aucune méthode de transmission sur Internet ou méthode de stockage électronique n'est sécurisée à 100 %. Bien que nous nous efforcions d'utiliser des moyens commercialement acceptables pour protéger vos données personnelles, nous ne pouvons garantir leur sécurité absolue.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header as="h3">Modifications de cette politique de confidentialité</Card.Header>
          <Card.Body>
            <Card.Text class="text-justify">Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité sur cette page. Nous vous informerons par e-mail et/ou par un avis bien visible sur notre service, avant que le changement ne prenne effet et nous mettrons à jour la « date d'entrée en vigueur » en haut de la présente Politique de confidentialité. Il vous est conseillé de consulter périodiquement cette politique de confidentialité pour tout changement. Les modifications apportées à cette politique de confidentialité entrent en vigueur lorsqu'elles sont publiées sur cette page.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header as="h3">Nous contacter</Card.Header>
          <Card.Body>
            <Card.Text class="text-justify">Si vous avez des questions sur cette politique de confidentialité, veuillez nous contacter : Par mail : aius@unistra.fr
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}


export default withRouter((Privacy))
