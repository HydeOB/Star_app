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
- Tutoriel guidé au premier niveau (revoir depuis le menu)
- Contrôles tactiles et souris, affichage portrait et paysage

## Prochaines étapes possibles

Campagne de niveaux, plus de types de planètes, sons et musique, sauvegarde, puis emballage en application Android/iOS (par exemple avec Capacitor).
