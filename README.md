# Constella

Prototype jouable d'un jeu de stratégie en temps réel pour mobile (Android et iPhone), jouable dans le navigateur.

## Jouer

Ouvre `index.html` dans un navigateur (PC ou téléphone). Aucun serveur ni installation nécessaire.

## Campagne

4 mondes, de plus en plus durs, avec 4 ou 5 niveaux chacun. Un niveau se débloque quand le précédent est gagné, et la progression est sauvegardée dans le navigateur.

- **Monde 1 · Ceinture d'Aldra** : 1 ennemi prudent, on commence à 2 étoiles contre 2.
- **Monde 2 · Nébuleuse de Vesk** : 1 ennemi plus vif, cartes plus grandes.
- **Monde 3 · Triangle de Kael** : 2 ennemis en même temps (ils se battent aussi entre eux).
- **Monde 4 · Couronne d'Ysor** : 3 ennemis.

Les cartes de campagne sont générées à partir d'une graine fixe et sont symétriques, donc équitables et identiques à chaque partie.

## Score

Chaque niveau de campagne rapporte 1 à 3 étoiles : 1 pour la victoire, 2 si tu gagnes sous le temps cible, 3 sous le temps record. Les temps dépendent de la taille de la carte et sont comptés en temps de jeu (affiché en haut à gauche). Le meilleur score et le meilleur temps sont gardés.

## Règles

- Chaque planète que tu possèdes produit des vaisseaux en continu. Les grosses planètes produisent plus.
- **Envoi unique** : touche ton étoile puis une autre étoile, elle envoie ses vaisseaux une fois (25, 50 ou 100 %).
- **Envoi automatique** : reste appuyé sur ton étoile et glisse vers une autre. Elle envoie d'abord tous ses vaisseaux, puis un paquet (3, 5 ou 10, réglable dans Munitions) dès qu'elle l'a produit. Glisse à nouveau vers la même cible pour arrêter.
- Une attaque réussit si la flotte compte plus de vaisseaux que la défense (vaisseaux × bouclier).
- **Améliorations** : dépense des vaisseaux pour monter Production et Défense (3 niveaux chacune).
- **Mur de protection** : plus tu gardes une étoile, plus un mur se construit autour d'elle (un segment toutes les 6 s, jusqu'à 5). Chaque segment arrête 1 vaisseau ennemi avant les défenseurs. Le mur repart de zéro quand l'étoile change de camp.
- **Étoiles spéciales** (dès 5 vaisseaux, coût 5) : **Rapide** produit et envoie 40 % plus vite, sans défense. **Bouclier** produit 25 % de moins, mais son mur se construit 2 fois plus vite (3 s par segment) et monte jusqu'à 10. **Phare** produit 25 % de moins, mais les flottes qui partent de lui ou de tes étoiles voisines volent 25 % plus vite et frappent 25 % plus fort.
- Vitesse du jeu : pause, ½×, 1×, 1,5×, 2×, 3× (½× par défaut, pour bien démarrer).
- Victoire quand l'adversaire n'a plus aucun système ni flotte.

## Contenu du prototype

- Campagne : 4 mondes, 19 niveaux, jusqu'à 3 ennemis
- Partie libre : 2 cartes (Anneau de Véga, Delta du Cygne)
- IA à 3 niveaux : Facile, Normal, Difficile. Elle défend ses étoiles menacées (renforts des voisines), vise les étoiles faibles et combine plusieurs étoiles pour attaquer
- Caractère des ennemis selon le niveau : agressif (te vise en priorité), prudent (se protège, prend d'abord les neutres) ou équilibré
- Sons synthétisés (captures, explosions quand les flottes se percutent, améliorations, victoire), vibration sur mobile, bouton pour couper le son
- Accueil épuré : logo, gros bouton Jouer (ouvre le choix des niveaux), tuiles Partie libre / Comment jouer / Réglages qui ouvrent un panneau
- 3 niveaux d'apprentissage lents avant le monde 1, ennemi passif : conquérir des étoiles, glisser pour envoyer en continu, améliorer une étoile (revoir depuis Comment jouer)
- Mini tutoriel guidé à chaque nouvelle icône (Production, Rapide, Défense, Phare), avec l’icône qui brille
- Bouton ? toujours disponible en jeu : explique les gestes et toutes les icônes débloquées (met la partie en pause)
- Icônes autour de l'étoile sélectionnée (Production, Défense, Rapide, Bouclier, Phare, niveau du type, envoi auto), sans panneau de texte
- Déblocage progressif en campagne : Production (1-3), Rapide (1-4), Défense (1-5), Bouclier (2-1), Phare (2-3), types niveau 2 (2-4) puis 3 (3-3) ; une petite carte « Nouveau » présente chaque déblocage
- Trois catégories d'étoiles : normale, 2 points, 3 points (points sous l'étoile). Plus grandes, production plus rapide, plus dures à prendre. Monde 1 : normales seulement ; monde 2 : + 2 points ; mondes 3-4 : + 3 points
- Améliorations moins chères : Production et Défense niveau 1 à 5 vaisseaux (puis 15, 25) ; types à 5 vaisseaux
- Bouclier fusionné dans la Défense : chaque niveau de Défense donne +40 % en défense et un mur plus grand et plus rapide (max 7, 9, 11 ; un segment toutes les 5, 4, 3 s). Types d'étoiles : Rapide (flottes +60 %, puis +80 %, +100 % ; sans Défense, sans bonus de production) et Phare
- 5 langues : français, anglais, espagnol, néerlandais, arabe (de droite à gauche). Choix dans le menu, langue du téléphone par défaut
- Zoom : pincer ou molette, glisser dans le vide pour déplacer, bouton pour recentrer
- Contrôles tactiles et souris, affichage portrait et paysage

## Prochaines étapes possibles

Campagne de niveaux, plus de types de planètes, sons et musique, sauvegarde, puis emballage en application Android/iOS (par exemple avec Capacitor).

## Applications mobiles (Android et iPhone)

Le jeu est emballé avec Capacitor (dossiers `android/` et `ios/`). GitHub Actions compile un APK de test et, une fois les clés configurées, le fichier pour le Play Store et l'envoi vers TestFlight. Tout est expliqué pas à pas dans [PUBLICATION.md](PUBLICATION.md). Fiche des stores, icône, bannière et captures : dossier `store/`.
