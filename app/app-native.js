// Intégration mobile (Android / iPhone) : bouton retour, pause en arrière-plan, barre d'état.
(function(){
  const C=window.Capacitor;if(!C||!C.isNativePlatform||!C.isNativePlatform())return;
  const P=C.Plugins||{};
  const inGame=()=>typeof G!=="undefined"&&G&&!G.over&&!G.demo&&!menuOpen;
  try{P.StatusBar&&P.StatusBar.setOverlaysWebView({overlay:true});P.StatusBar&&P.StatusBar.setStyle({style:"DARK"});}catch(e){}
  try{P.SplashScreen&&P.SplashScreen.hide();}catch(e){}
  if(P.App){
    P.App.addListener("backButton",()=>{
      if(typeof helpOpen!=="undefined"&&helpOpen){$("helpOk").click();return;}
      if(inGame()){openMenu();return;}
      if(!$("menu").hidden){P.App.exitApp();return;}
      openMenu();
    });
    P.App.addListener("pause",()=>{if(inGame())openMenu();});
  }
})();
