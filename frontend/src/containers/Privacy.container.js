import React from 'react';
import { withRouter } from 'react-router-dom'


export class Privacy extends React.Component {

  render() {
  	return (
      <div>
        <h1>
          Politique de confidentialité
        </h1>
        <p>
        Date d'entrée en vigueur : 17 novembre 2021

Cette page vous informe de nos politiques concernant la collecte, l'utilisation et la divulgation des données personnelles lorsque vous utilisez notre Service et les choix que vous avez associés à ces données.

Nous utilisons vos données pour fournir et améliorer le Service. En utilisant le Service, vous acceptez la collecte et l'utilisation des informations conformément à cette politique. Sauf indication contraire dans la présente politique de confidentialité, les termes utilisés dans cette politique de confidentialité ont la même signification que dans nos conditions générales.

        </p>
        <h2>Collecte et utilisation des informations</h2>
        <p>Nous collectons différents types d'informations à diverses fins pour vous fournir et améliorer notre Service.</p>
        <h3>Types de données collectées</h3>
        <h4>Données personnelles</h4>
        <p>Lors de l'utilisation de notre Service, nous pouvons vous demander de nous fournir certaines informations personnellement identifiables qui peuvent être utilisées pour vous contacter ou vous identifier (« Données personnelles »). Informations personnellement identifiables :
Adresse e-mail
Pseudo
Prénom
Nom
Date de naissance
Numéro étudiant
Photo
        </p>
        <h2>Divulgation de données</h2>
        <h3>Exigences légales</h3>
        <p>Jad Joubran BV peut divulguer vos données personnelles en croyant de bonne foi qu'une telle action est nécessaire pour :

Pour se conformer à une obligation légale
Protéger et défendre les droits ou la propriété de Jad Joubran BV
Pour prévenir ou enquêter sur d'éventuels actes répréhensibles en rapport avec le Service
Pour protéger la sécurité personnelle des utilisateurs du Service ou du public
Pour se protéger contre la responsabilité légale</p>

      <h2>Sécurité des données</h2>
      <p>La sécurité de vos données est importante pour nous, mais n'oubliez pas qu'aucune méthode de transmission sur Internet ou méthode de stockage électronique n'est sécurisée à 100 %. Bien que nous nous efforcions d'utiliser des moyens commercialement acceptables pour protéger vos données personnelles, nous ne pouvons garantir leur sécurité absolue.</p>
      <h2>Modifications de cette politique de confidentialité</h2>
      <p>Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité sur cette page.

Nous vous informerons par e-mail et/ou par un avis bien visible sur notre Service, avant que le changement ne prenne effet et nous mettrons à jour la « date d'entrée en vigueur » en haut de la présente Politique de confidentialité.

Il vous est conseillé de consulter périodiquement cette politique de confidentialité pour tout changement. Les modifications apportées à cette politique de confidentialité entrent en vigueur lorsqu'elles sont publiées sur cette page.</p>

      <h2>Nous contacter</h2>
      <p>Si vous avez des questions sur cette politique de confidentialité, veuillez nous contacter :

Par mail : aius@unistra.fr</p>
      </div>
    );
  }
}


export default withRouter((Privacy))
