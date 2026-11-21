// Captures d'écran pour les stores : iPhone 6,7" (1290x2796) et Android (1080x1920), en fr et en.
const {chromium}=require("playwright");const path=require("path");
const out=path.join(__dirname,"..","store","screenshots"),file="file://"+path.join(__dirname,"..","www","index.html");
(async()=>{const b=await chromium.launch();
 for(const [dev,w,h,sc] of [["iphone",430,932,3],["android",360,640,3]])for(const L of ["fr","en"]){
  const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:sc,hasTouch:true});
  await p.goto(file);await p.evaluate(l=>{localStorage.clear();localStorage.setItem("constella-tuto-v2","true");localStorage.setItem("constella-tuto2","true");localStorage.setItem("constella-lang",JSON.stringify(l));localStorage.setItem("constella-ftuto2",JSON.stringify({prod:1,def:1,rapide:1,phare:1}));},L);
  await p.reload();await p.waitForTimeout(900);await p.screenshot({path:`${out}/${dev}-${L}-1-menu.png`});
  const shot=async(wi,li,n,extra)=>{await p.evaluate(([a,c])=>window.__constella.startLevel(a,c),[wi,li]);await p.waitForTimeout(200);
   if(await p.isVisible("#newsOk"))await p.click("#newsOk");if(await p.isVisible("#tutoSkip"))await p.click("#tutoSkip");
   await p.evaluate(()=>{const G=window.__constella.G;for(let i=0;i<500;i++){window.__constella.step(0.1);if(i%8===0)window.__constella.ai(1);}});await p.waitForTimeout(400);
   if(extra)await extra();await p.screenshot({path:`${out}/${dev}-${L}-${n}.png`});};
  await shot(2,3,"2-partie");
  await shot(4,2,"3-mondes",async()=>{const pos=await p.evaluate(()=>{const G=window.__constella.G;const n=G.nodes.filter(n=>n.owner===1).sort((a,b)=>b.ships-a.ships)[0];return [n.sx,n.sy];});await p.mouse.click(pos[0],pos[1]);await p.waitForTimeout(300);});
  await shot(3,1,"4-aide",async()=>{await p.click("#helpBtn");await p.waitForTimeout(300);});
  await p.close();}
 await b.close();console.log("ok");})();
