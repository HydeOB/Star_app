# Publier Constella sur le Play Store et l'App Store

Le jeu est déjà emballé en application Android et iPhone (avec [Capacitor](https://capacitorjs.com)). GitHub compile les applis tout seul à chaque mise à jour : **pas besoin de Mac ni d'Android Studio**.

Ce qu'il te reste à faire, ce sont les étapes qui demandent ton identité et un paiement.

## 0. Tout de suite : essayer l'appli sur ton téléphone Android

1. Sur GitHub, ouvre l'onglet **Actions**, puis la dernière exécution **Android** (pastille verte).
2. En bas, télécharge **constella-test-apk**, dézippe et envoie le fichier `.apk` sur ton téléphone.
3. Ouvre-le et accepte « installer des applis inconnues ».

## 1. Politique de confidentialité (5 minutes, obligatoire pour les deux stores)

Dépôt GitHub › **Settings › Pages** › Source : *Deploy from a branch*, branche `main`, dossier `/docs` › Save.
Après une minute, la page est en ligne : `https://hydeob.github.io/Star_app/privacy.html`.

## 2. Google Play Store

1. **Compte** : crée un compte développeur sur https://play.google.com/console (25 $ une seule fois, vérification d'identité avec une pièce d'identité).
   ⚠️ Pour un compte personnel récent, Google exige un **test fermé avec au moins 12 testeurs pendant 14 jours** avant de pouvoir publier pour tout le monde. Prévois des amis ou de la famille avec un téléphone Android.
2. **Clé de signature** (une seule fois, à garder précieusement) : sur un ordinateur avec Java, tape
   ```
   keytool -genkey -v -keystore constella.jks -keyalg RSA -keysize 2048 -validity 10000 -alias constella
   ```
   Note le mot de passe. Puis transforme le fichier en texte : `base64 -w0 constella.jks` (Mac : `base64 -i constella.jks`).
3. **Secrets GitHub** : dépôt › Settings › Secrets and variables › Actions › *New repository secret*, crée :
   - `ANDROID_KEYSTORE_BASE64` : le texte obtenu juste avant
   - `ANDROID_KEYSTORE_PASSWORD` et `ANDROID_KEY_PASSWORD` : ton mot de passe
   - `ANDROID_KEY_ALIAS` : `constella`
4. Onglet **Actions › Android › Run workflow**. À la fin, télécharge **constella-play-store-aab** (fichier `.aab`).
5. Dans la Play Console : *Créer une application* (nom Constella, jeu, gratuit), puis remplis :
   - la fiche (textes et images de `store/fiche-store.md`, `store/feature-graphic.png`, `store/icon-512.png`, `store/screenshots/android-*.png`) ;
   - *Sécurité des données* : « Identifiants de l'appareil (identifiant publicitaire) » collectés et partagés **pour la publicité**, par le SDK Google AdMob ; données chiffrées en transit ;
   - *Annonces* : « Oui, mon appli contient des annonces » ;
   - *Classification du contenu* (questionnaire : pas de violence réaliste ; achats numériques : oui) ;
   - *Public cible* : 13 ans et plus (une appli pour enfants a des règles de pub beaucoup plus strictes) ;
   - *Public cible* ; lien de politique de confidentialité ;
   - dépose le `.aab` dans **Test › Test fermé**, ajoute tes testeurs, puis passe en **Production** après les 14 jours.

## 3. Apple App Store (iPhone)

1. **Compte** : inscris-toi à l'Apple Developer Program sur https://developer.apple.com/programs/ (99 $ par an).
2. **Identifiant de l'appli** : https://developer.apple.com/account › Certificates, IDs & Profiles › Identifiers › + › App IDs › Bundle ID `com.hydeob.constella`.
3. **Fiche** : https://appstoreconnect.apple.com › Mes apps › + › Nouvelle app (iOS, nom Constella, langue principale Français, bundle ID ci-dessus).
4. **Clé d'accès pour GitHub** : App Store Connect › Utilisateurs et accès › Intégrations › Clés API App Store Connect › + (accès *Gestionnaire d'apps*). Télécharge le fichier `.p8` (une seule fois possible).
   Crée ces secrets GitHub :
   - `APPSTORE_KEY_ID` : l'identifiant de la clé
   - `APPSTORE_ISSUER_ID` : l'« Issuer ID » affiché en haut de la page
   - `APPSTORE_KEY_P8` : tout le contenu du fichier `.p8`
   - `APPLE_TEAM_ID` : ton Team ID (developer.apple.com › Membership)
5. Onglet **Actions › iOS › Run workflow**, coche **Envoyer vers TestFlight**. Environ 15 minutes plus tard, la version apparaît dans App Store Connect › TestFlight : tu peux l'installer sur ton iPhone avec l'appli TestFlight.
6. Dans App Store Connect, remplis la fiche (textes de `store/fiche-store.md`, captures `store/screenshots/iphone-*.png`), *Confidentialité de l'app* : « Identifiants › Identifiant de l'appareil » et « Données d'utilisation › Données publicitaires », utilisés pour la publicité tierce et liés au suivi ; classification 4+ ; choisis le build et clique **Soumettre pour vérification**. Apple répond en général en 1 à 3 jours.

## 4. Publicités (AdMob) et achat « sans pub » à 5,99 €

Tant que les vrais identifiants ne sont pas en place, l'appli affiche les **pubs de test de Google**. C'est normal et sans risque.

**AdMob**
1. Va sur https://admob.google.com avec ton compte Google, accepte les conditions et ajoute tes infos de paiement.
2. *Applis › Ajouter une appli* : Android, puis une seconde fois iOS (nom Constella). Note les deux **identifiants d'application** (`ca-app-pub-…~…`).
3. Pour chaque appli, crée deux *blocs d'annonces* : **Interstitiel** et **Avec récompense** (récompense : 20 vaisseaux). Note les identifiants (`ca-app-pub-…/…`).
4. *Confidentialité et messages › RGPD* : crée et publie le message de consentement (obligatoire en Europe) pour les deux applis. Fais de même pour *Demande de suivi iOS (IDFA)*.
5. Envoie-moi les 6 identifiants : je les mets dans `app/ads-config.js`, `strings.xml` et `Info.plist`, et je passe `testing` à `false`.
6. Une fois l'appli publiée, relie-la à sa fiche Play Store / App Store dans AdMob, puis publie le fichier `app-ads.txt` qu'AdMob te donne (je peux le mettre sur la page GitHub Pages).

**Achat « Sans publicité »**
- Play Console › *Monétiser › Produits › Produits intégrés* › Créer : identifiant **`constella_sans_pub`**, nom « Sans publicité », prix 5,99 €. Il faut d'abord avoir envoyé une version contenant la facturation (n'importe quel `.aab` actuel) et configuré un profil de paiement marchand.
- App Store Connect › ton appli › *Achats intégrés* › + : type **Non consommable**, identifiant **`constella_sans_pub`**, prix 5,99 €, avec une capture d'écran du réglage. Signe aussi l'accord *Applis payantes* (Business) avec tes coordonnées bancaires.
- Le bouton **Restaurer** (Réglages) est déjà là : Apple l'exige.

## Mettre à jour le jeu plus tard

Chaque modification poussée sur `main` recompile les applis. Le numéro de version interne augmente tout seul. Il suffit de relancer les étapes « Run workflow » puis de déposer le nouveau fichier.

## Pour les développeurs

```
npm install
npm run build            # construit www/ depuis index.html (polices intégrées)
npx cap sync             # copie dans android/ et ios/
npx cap open android     # ou ios (nécessite Android Studio / Xcode)
node scripts/make-icons.js && npx capacitor-assets generate   # icônes et écran de démarrage
node scripts/make-screenshots.js                             # captures pour les stores
```
