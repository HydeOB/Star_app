// Construit le dossier www/ (contenu de l'appli mobile) à partir de index.html :
// polices intégrées (jeu 100 % hors ligne) et script d'intégration mobile.
const fs=require("fs"),path=require("path");
const root=path.join(__dirname,".."),www=path.join(root,"www");
fs.rmSync(www,{recursive:true,force:true});fs.mkdirSync(path.join(www,"fonts"),{recursive:true});
let html=fs.readFileSync(path.join(root,"index.html"),"utf8");
html=html.replace(/<link rel="preconnect"[^>]*>\n?/g,"")
  .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/,'<link rel="stylesheet" href="fonts/fonts.css">');
if(html.includes("fonts.googleapis.com"))throw new Error("lien Google Fonts restant");
html=html.replace('content="width=device-width,initial-scale=1,viewport-fit=cover"','content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"');
// Version store : le mode test (tous les niveaux ouverts) est masqué, sauf si TEST_MODE=1 (APK de test)
if(process.env.TEST_MODE!=="1"){
  const a='<div><h2 data-i18n="test_h">',b='let testMode=store.get("constella-test",false);';
  if(!html.includes(a)||!html.includes(b))throw new Error("bloc mode test introuvable");
  html=html.replace(a,'<div hidden><h2 data-i18n="test_h">').replace(b,"let testMode=false;");
}
html=html.replace("</body>",'<script src="app-native.js"></script>\n</body>');
fs.writeFileSync(path.join(www,"index.html"),html);
fs.copyFileSync(path.join(root,"app","app-native.js"),path.join(www,"app-native.js"));
for(const f of fs.readdirSync(path.join(root,"app","fonts")))fs.copyFileSync(path.join(root,"app","fonts",f),path.join(www,"fonts",f));
console.log("www/ prêt");
