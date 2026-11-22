// Intégration mobile (Android / iPhone) : bouton retour, pause en arrière-plan, barre d'état,
// publicités AdMob (consentement RGPD, plein écran, pub bonus) et achat « sans pub ».
(function(){
  const C=window.Capacitor;if(!C||!C.isNativePlatform||!C.isNativePlatform())return;
  const P=C.Plugins||{},CFG=window.CONSTELLA_ADS||{},OS=C.getPlatform(),IDS=CFG[OS]||{};
  const game=()=>window.constellaGame;
  try{P.StatusBar&&P.StatusBar.setOverlaysWebView({overlay:true});P.StatusBar&&P.StatusBar.setStyle({style:"DARK"});}catch(e){}
  try{P.SplashScreen&&P.SplashScreen.hide();}catch(e){}
  if(P.App){
    P.App.addListener("backButton",()=>{if(!game()||!game().back())P.App.exitApp();});
    P.App.addListener("pause",()=>{if(game())game().pause();});
  }

  const KEY="constella-noads",AdMob=P.AdMob,IAP=P.NativePurchases;
  const ads={noAds:localStorage.getItem(KEY)==="1",ready:false,privacyNeeded:false,price:"5,99 €",canBuy:!!IAP,
    interstitial,rewarded,privacy,buyNoAds,restore};
  window.constellaAds=ads;
  const changed=()=>window.dispatchEvent(new Event("constella-ads"));
  const setNoAds=v=>{ads.noAds=v;try{localStorage.setItem(KEY,v?"1":"0");}catch(e){}changed();};

  // --- achat « sans pub » ---
  async function checkOwned(){if(!IAP||!CFG.noAdsProduct)return;
    try{const r=await IAP.getPurchases({productType:"inapp"});
      const own=(r.purchases||[]).some(p=>p.productIdentifier===CFG.noAdsProduct&&(OS!=="android"||p.purchaseState==="1"));
      if(own&&!ads.noAds)setNoAds(true);}catch(e){}}
  async function buyNoAds(){if(!IAP)return false;
    try{await IAP.purchaseProduct({productIdentifier:CFG.noAdsProduct,productType:"inapp"});setNoAds(true);return true;}
    catch(e){await checkOwned();return ads.noAds;}}
  async function restore(){if(!IAP)return false;try{await IAP.restorePurchases();}catch(e){}await checkOwned();return ads.noAds;}
  if(IAP&&CFG.noAdsProduct)IAP.getProducts({productIdentifiers:[CFG.noAdsProduct],productType:"inapp"})
    .then(r=>{const p=(r.products||[])[0];if(p&&p.priceString){ads.price=p.priceString;changed();}}).catch(()=>{});
  checkOwned();

  // --- publicités ---
  const opts=id=>({adId:id,isTesting:!!CFG.testing});
  let interLoaded=false,rewardLoaded=false;
  const loadInter=()=>{if(!ads.ready||ads.noAds||!IDS.interstitial)return;AdMob.prepareInterstitial(opts(IDS.interstitial)).then(()=>interLoaded=true).catch(()=>interLoaded=false);};
  const loadReward=()=>{if(!ads.ready||ads.noAds||!IDS.rewarded)return;AdMob.prepareRewardVideoAd(opts(IDS.rewarded)).then(()=>rewardLoaded=true).catch(()=>rewardLoaded=false);};
  async function initAds(){if(!AdMob||ads.noAds)return;
    try{
      let info=await AdMob.requestConsentInfo();
      if(!info.canRequestAds&&info.isConsentFormAvailable&&info.status==="REQUIRED")info=await AdMob.showConsentForm();
      ads.privacyNeeded=info.privacyOptionsRequirementStatus==="REQUIRED";
      if(OS==="ios"){try{const s=await AdMob.trackingAuthorizationStatus();if(s.status==="notDetermined")await AdMob.requestTrackingAuthorization();}catch(e){}}
      if(!info.canRequestAds){changed();return;}
      await AdMob.initialize({initializeForTesting:!!CFG.testing});
      ads.ready=true;loadInter();loadReward();changed();
    }catch(e){changed();}
  }
  // pub plein écran entre deux niveaux (jamais pendant une partie)
  async function interstitial(){if(ads.noAds||!ads.ready||!interLoaded)return;interLoaded=false;
    try{await AdMob.showInterstitial();}catch(e){}loadInter();}
  // pub bonus choisie par le joueur ; sans pub : le bonus est offert
  async function rewarded(){if(ads.noAds)return true;if(!ads.ready||!rewardLoaded)return false;rewardLoaded=false;
    try{const r=await AdMob.showRewardVideoAd();loadReward();return !!r;}catch(e){loadReward();return false;}}
  async function privacy(){if(!AdMob)return;try{await AdMob.showPrivacyOptionsForm();}catch(e){}}
  setTimeout(initAds,1500);
})();
