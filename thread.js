(function(){
  var wrap=document.getElementById('story'), svg=document.getElementById('thread'), path=svg.querySelector('path');
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var L=0, table=[];
  function build(){
    var b=wrap.getBoundingClientRect(), W=b.width, stops=wrap.querySelectorAll('[data-stop]');
    var left=Math.max(6,(W-1080)/2*0.5), right=W-left, P=[], side=0;
    stops.forEach(function(s,i){
      var r=s.getBoundingClientRect(), top=r.top-b.top, bot=r.bottom-b.top;
      var txt=s.querySelector('.txt').getBoundingClientRect();
      var txtLeft=(txt.left+txt.right)/2 < b.left+W/2;   // which side the text sits on
      var x=txtLeft?left:right;                          // run along the text's side margin
      var gapTop=top-Math.min(90,(i?60:30));
      P.push([x,gapTop],[x+(txtLeft?10:-10),top+(bot-top)*0.5],[x,bot+30]);
    });
    var d='M'+P[0][0]+' '+(P[0][1]-40);
    for(var i=0;i<P.length;i++){
      var a=P[i-1]||[P[0][0],P[0][1]-40], c=P[i];
      var my=(a[1]+c[1])/2;
      d+=' C'+a[0]+' '+my+', '+c[0]+' '+my+', '+c[0]+' '+c[1];
    }
    svg.setAttribute('viewBox','0 0 '+W+' '+b.height);
    path.setAttribute('d',d);
    L=path.getTotalLength(); table=[];
    for(var s=0;s<=L;s+=10) table.push([s,path.getPointAtLength(s).y]);
    path.style.strokeDasharray=L; draw();
  }
  function draw(){
    if(!L) return;
    if(reduce){ path.style.strokeDashoffset=0; return; }
    var b=wrap.getBoundingClientRect(), edge=window.innerHeight*0.8-b.top, len=0;
    for(var i=0;i<table.length;i++){ if(table[i][1]<=edge) len=table[i][0]; else break; }
    path.style.strokeDashoffset=L-len;
  }
  var t; function soon(){clearTimeout(t);t=setTimeout(build,120);}
  window.addEventListener('scroll',function(){requestAnimationFrame(draw)},{passive:true});
  window.addEventListener('resize',soon); window.addEventListener('load',build);
  [].forEach.call(document.images,function(im){ if(!im.complete) im.addEventListener('load',soon); });
  if(document.fonts&&document.fonts.ready) document.fonts.ready.then(build);
  build();
})();
