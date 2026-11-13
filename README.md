# Constella

Prototype jouable d'un jeu de stratégie en temps réel pour mobile (Android et iPhone), jouable dans le navigateur.

## Jouer

Ouvre `index.html` dans un navigateur (PC ou téléphone). Aucun serveur ni installation nécessaire.

## Règles

- Chaque planète que tu possèdes produit des vaisseaux en continu. Les grosses planètes produisent plus.
- **Envoi unique** : touche ton étoile puis une autre étoile, elle envoie ses vaisseaux une fois (25, 50 ou 100 %).
- **Envoi automatique** : reste appuyé sur ton étoile et glisse vers une autre. Elle envoie d'abord tous ses vaisseaux, puis un paquet (3, 5 ou 10, réglable dans Munitions) dès qu'elle l'a produit. Glisse à nouveau vers la même cible pour arrêter.
- Une attaque réussit si la flotte compte plus de vaisseaux que la défense (vaisseaux × bouclier).
- **Améliorations** : dépense des vaisseaux pour monter Production et Défense (3 niveaux chacune).
- Vitesse du jeu : pause, ½×, 1×, 1,5×, 2×, 3× (1× est volontairement posé pour une première partie).
- Victoire quand l'adversaire n'a plus aucun système ni flotte.

## Contenu du prototype

- 2 cartes symétriques : Anneau de Véga, Delta du Cygne
- IA à 3 niveaux : Facile, Normal, Difficile
- Contrôles tactiles et souris, affichage portrait et paysage

## Prochaines étapes possibles

Campagne de niveaux, plus de types de planètes, sons et musique, sauvegarde, puis emballage en application Android/iOS (par exemple avec Capacitor).
