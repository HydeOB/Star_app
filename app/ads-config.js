// Réglages publicités et achat « sans pub ».
// Les identifiants ci-dessous sont ceux de TEST fournis par Google : à remplacer par ceux de Constella
// (AdMob > Applis > Constella > Blocs d'annonces). L'identifiant d'APPLICATION se met aussi dans
// android/app/src/main/res/values/strings.xml (admob_app_id) et ios/App/App/Info.plist (GADApplicationIdentifier).
window.CONSTELLA_ADS = {
  testing: true,                 // passer à false une fois les vrais identifiants en place
  android: {
    interstitial: "ca-app-pub-3940256099942544/1033173712",
    rewarded: "ca-app-pub-3940256099942544/5224354917"
  },
  ios: {
    interstitial: "ca-app-pub-3940256099942544/4411468910",
    rewarded: "ca-app-pub-3940256099942544/1712485313"
  },
  noAdsProduct: "constella_sans_pub"   // achat intégré non consommable à 5,99 € (même identifiant sur les deux stores)
};
