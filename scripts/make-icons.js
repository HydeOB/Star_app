// Génère l'icône et l'écran de démarrage (assets/) avec un canvas.
const {chromium}=require("playwright");const fs=require("fs"),path=require("path");
const draw=`(mode,S)=>{const c=document.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d');
 const bg=mode!=='fg';
 if(bg){const g=x.createRadialGradient(S*.35,S*.3,0,S*.5,S*.5,S*.8);g.addColorStop(0,'#2a2f6e');g.addColorStop(.55,'#141738');g.addColorStop(1,'#0a0c1b');x.fillStyle=g;x.fillRect(0,0,S,S);
  const b=(cx,cy,r,col)=>{const q=x.createRadialGradient(cx,cy,0,cx,cy,r);q.addColorStop(0,col);q.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=q;x.fillRect(0,0,S,S);};
  b(S*.75,S*.25,S*.45,'rgba(140,80,200,.35)');b(S*.2,S*.8,S*.4,'rgba(40,120,200,.3)');
  let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;for(let i=0;i<260;i++){x.fillStyle='rgba(255,255,255,'+(.2+r()*.6)+')';const z=r()*S*.0035+S*.0008;x.beginPath();x.arc(r()*S,r()*S,z,0,7);x.fill();}}
 if(mode==='bg')return c.toDataURL();
 const k=mode==='splash'?.42:mode==='fg'?.62:1,o=S*(1-k)/2,P=(u,v)=>[o+u*S*k,o+v*S*k];
 const A=P(.27,.7),B=P(.5,.3),D=P(.75,.62);
 x.lineWidth=S*k*.028;x.setLineDash([S*k*.05,S*k*.035]);x.lineCap='round';
 const ln=(p,q,c1,c2)=>{const m=[(p[0]+q[0])/2,(p[1]+q[1])/2];x.strokeStyle=c1;x.beginPath();x.moveTo(...p);x.lineTo(...m);x.stroke();x.strokeStyle=c2;x.beginPath();x.moveTo(...m);x.lineTo(...q);x.stroke();};
 ln(A,B,'#3ddc84','#3ddc84');ln(B,D,'#3ddc84','#ff5a4e');ln(A,D,'#3ddc84','#ff5a4e');x.setLineDash([]);
 const star=(p,R,col)=>{const g=x.createRadialGradient(p[0],p[1],0,p[0],p[1],R*2.2);g.addColorStop(0,col+'99');g.addColorStop(1,col+'00');x.fillStyle=g;x.beginPath();x.arc(p[0],p[1],R*2.2,0,7);x.fill();
  x.fillStyle='#10132b';x.beginPath();x.arc(p[0],p[1],R,0,7);x.fill();x.lineWidth=R*.22;x.strokeStyle=col;x.stroke();
  x.fillStyle='#fff';x.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?R*.24:R*.55;x.lineTo(p[0]+Math.cos(a)*rr,p[1]+Math.sin(a)*rr);}x.closePath();x.fill();};
 star(A,S*k*.11,'#3ddc84');star(D,S*k*.09,'#ff5a4e');star(B,S*k*.14,'#3ddc84');
 return c.toDataURL();}`;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const out=path.join(__dirname,"..","assets");
 for(const [name,mode,S] of [["icon-only","full",1024],["icon-foreground","fg",1024],["icon-background","bg",1024],["splash","splash",2732],["splash-dark","splash",2732]]){
  const d=await p.evaluate(`(${draw})(${JSON.stringify(mode)},${S})`);fs.writeFileSync(path.join(out,name+".png"),Buffer.from(d.split(",")[1],"base64"));}
 await b.close();console.log("ok");})();
