// Bannière Play Store 1024x500.
const {chromium}=require("playwright");const path=require("path"),fs=require("fs");
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1024,height:500}});
 const bg="data:image/png;base64,"+fs.readFileSync(path.join(__dirname,"../assets/icon-background.png")).toString("base64");
 const ic="data:image/png;base64,"+fs.readFileSync(path.join(__dirname,"../assets/icon-foreground.png")).toString("base64");
 const f64=n=>"data:font/woff2;base64,"+fs.readFileSync(path.join(__dirname,"../app/fonts/"+n)).toString("base64");
 const css=`@font-face{font-family:CP;font-weight:700;src:url(${f64("ChakraPetch-700-latin.woff2")})}@font-face{font-family:PX;src:url(${f64("IBMPlexSans-400-latin.woff2")})}`;
 await p.setContent(`<style>${css}</style><body style="margin:0;width:1024px;height:500px;background:url(${bg}) center/cover;display:flex;align-items:center;gap:10px;font-family:CP;color:#fff">
 <img src="${ic}" style="width:440px;height:440px;margin-left:10px"><div><div style="font-size:76px;font-weight:700;letter-spacing:.12em">CONST<span style="color:#3ddc84">E</span>LLA</div>
 <div style="font-family:PX;font-size:26px;opacity:.8;margin-top:6px">Relie les étoiles. Conquiers la galaxie.</div></div></body>`);
 await p.waitForTimeout(500);await p.screenshot({path:path.join(__dirname,"../store/feature-graphic.png")});await b.close();console.log("ok");})();
