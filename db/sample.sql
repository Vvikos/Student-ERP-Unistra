--
-- Structure de la table `STUDENT`
--

CREATE TABLE `STUDENT` (
  `id` int(11) NOT NULL,
  `nom_utilisateur` varchar(255) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `date_naissance` date NOT NULL,
  `numero_etudiant` int(20) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `date_adhesion` date NOT NULL,
  `created_at` datetime  NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime  NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `STUDENT`
--

INSERT INTO `STUDENT` (`id`, `nom_utilisateur`, `mdp`, `nom`, `prenom`, `email`, `date_naissance`, `numero_etudiant`, `photo`, `date_adhesion`) VALUES
(1, 'jmercier', '36361127680f6e70448d262faf47c0459854498a74c1e2457dc7bc3f566972ce', 'Mercier', 'Jean', 'jean.mercier@etu.unistra.fr', '1999-03-02', 11223344, 'https://us.123rf.com/450wm/salamatik/salamatik1801/salamatik180100019/92979836-ic%C3%B4ne-de-visage-anonyme-de-profil-personne-silhouette-grise-avatar-par-d%C3%A9faut-masculin-photo-placeho.jpg?ver=6', '2021-09-10'),
(2, 'cbertin', 'bbb1dcf581d4af52a77eb3d2e5fee4aa40aa65ca4afa8b2ece3e511473f82e78', 'Bertin', 'Caroline', 'c.bertin@etu.unistra.fr', '1998-09-07', 99887766, 'https://us.123rf.com/450wm/salamatik/salamatik1801/salamatik180100019/92979836-ic%C3%B4ne-de-visage-anonyme-de-profil-personne-silhouette-grise-avatar-par-d%C3%A9faut-masculin-photo-placeho.jpg?ver=6', '2021-09-06'),
(3, 'mschneider', '7d68e6cb489f5347a31ecb7cce7e40de0c7f1eaba1142ea4cca35f3807ad9167', 'Schneider', 'Marine', 'm.schneider@etu.unistra.fr', '1999-02-06', 12345678, 'https://us.123rf.com/450wm/salamatik/salamatik1801/salamatik180100019/92979836-ic%C3%B4ne-de-visage-anonyme-de-profil-personne-silhouette-grise-avatar-par-d%C3%A9faut-masculin-photo-placeho.jpg?ver=6', '2021-10-01');

--
-- Index pour la table `STUDENT`
--
ALTER TABLE `STUDENT`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nom_utilisateur` (`nom_utilisateur`),
  ADD UNIQUE KEY `numero_etudiant` (`numero_etudiant`);

--
-- AUTO_INCREMENT pour la table `STUDENT`
--
ALTER TABLE `STUDENT`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;
