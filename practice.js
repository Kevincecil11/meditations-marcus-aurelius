// Daily Stoic Practice logic (data in practice-data.js, themes + symbols in theme.js)
var N=DAILY.length;
var completed=[];try{completed=JSON.parse(localStorage.getItem('ma-done')||'[]')}catch(e){completed=[]}
var reflections={};try{reflections=JSON.parse(localStorage.getItem('ma-ref')||'{}')}catch(e){reflections={}}
function localDay(){var n=new Date();return Math.floor((n.getTime()-n.getTimezoneOffset()*60000)/86400000)}
var currentDay=(localDay()%N)+1;
function saveDone(){try{localStorage.setItem('ma-done',JSON.stringify(completed))}catch(e){}}
function saveRef(){try{localStorage.setItem('ma-ref',JSON.stringify(reflections))}catch(e){}}
function esc(s){var d=document.createElement('div');d.appendChild(document.createTextNode(s));return d.innerHTML}
function symFor(r){if(r.sym)return r.sym;var m=/Book\s+(\d+)/.exec(r.src||'');return m&&window.MA?MA.symForBook(m[1]):null}
function symName(id){return window.MA?MA.symTitle(id):''}

var tabs=document.querySelectorAll('.tab');
var secs=document.querySelectorAll('.sec');
function goTab(name){
  for(var i=0;i<tabs.length;i++){tabs[i].classList.toggle('on',tabs[i].getAttribute('data-tab')===name)}
  for(var j=0;j<secs.length;j++){secs[j].classList.toggle('active',secs[j].id==='sec-'+name)}
  if(name==='toolkit'){document.getElementById('tkGrid').style.display='';document.getElementById('tkDetail').classList.remove('active')}
}
for(var ti=0;ti<tabs.length;ti++){tabs[ti].addEventListener('click',function(){goTab(this.getAttribute('data-tab'))})}
document.getElementById('calTab').textContent=N+'-Day Calendar';
document.getElementById('calTitle').textContent=N+'-Day Journey';

function showDay(d){
  var r=DAILY[d-1];
  document.getElementById('todayTitle').textContent='Day '+d+' of '+N;
  document.getElementById('todaySub').textContent=d===currentDay?'Today\'s morning reading':'Reading for Day '+d;
  var isDone=completed.indexOf(d)!==-1;
  var ref=reflections[d]||'';
  var sy=symFor(r);
  var h='<div class="reading-card"><div class="reading-label">Today\'s Passage</div><p class="reading-quote">\u201C'+esc(r.quote)+'\u201D</p>';
  h+='<div class="reading-src"><span>'+esc(r.src)+'</span>'+(sy?'<button class="sym-btn" data-sym="'+sy+'"><span class="gl">\u25C8</span> View symbol</button>':'')+'</div>';
  h+='<div class="reading-section"><h4>What This Means</h4><p>'+esc(r.explain)+'</p></div></div>';
  h+='<div class="action-card"><h4>\u26A1 Apply This Today</h4><p>'+esc(r.apply)+'</p></div>';
  h+='<div class="reflection-card"><h4>\uD83D\uDCDD Evening Reflection</h4><textarea id="refInput" placeholder="'+esc(r.reflect)+'">'+esc(ref)+'</textarea></div>';
  h+='<button class="done-btn'+(isDone?' completed':'')+'" id="doneBtn">'+(isDone?'\u2713 Day '+d+' Complete':'Mark Day '+d+' Complete')+'</button>';
  h+='<div class="nav-btns">';
  if(d>1)h+='<button class="nav-btn" data-go="'+(d-1)+'">\u2190 Day '+(d-1)+'</button>';
  if(d<N)h+='<button class="nav-btn" data-go="'+(d+1)+'">Day '+(d+1)+' \u2192</button>';
  h+='</div>';
  var ct=document.getElementById('todayContent');ct.innerHTML=h;
  document.getElementById('doneBtn').addEventListener('click',function(){if(completed.indexOf(d)===-1){completed.push(d);saveDone()}this.classList.add('completed');this.textContent='\u2713 Day '+d+' Complete';buildCal()});
  document.getElementById('refInput').addEventListener('input',function(){reflections[d]=this.value;saveRef()});
  var navs=ct.querySelectorAll('.nav-btn');for(var ni=0;ni<navs.length;ni++){navs[ni].addEventListener('click',function(){showDay(parseInt(this.getAttribute('data-go'),10));window.scrollTo({top:0,behavior:'smooth'})})}
}

function buildCal(){
  var g=document.getElementById('calGrid');var h='';var doneCount=0;
  for(var c=0;c<completed.length;c++)if(completed[c]>=1&&completed[c]<=N)doneCount++;
  for(var i=1;i<=N;i++){
    if((i-1)%30===0)h+=(i>1?'</div>':'')+'<div class="cal-head">Days '+i+'\u2013'+Math.min(i+29,N)+'</div><div class="cal-grid">';
    var isDone=completed.indexOf(i)!==-1;var isToday=i===currentDay;
    var cls='cal-card'+(isDone?' done-card':'')+(isToday?' today-card':'');
    h+='<button class="'+cls+'" data-day="'+i+'"><div class="cal-num">'+i+'</div><div class="cal-status">'+(isDone?'\u2713 Done':(isToday?'Today':''))+'</div></button>';
  }
  g.innerHTML=h+'</div>';
  var cards=g.querySelectorAll('.cal-card');
  for(var ci=0;ci<cards.length;ci++){cards[ci].addEventListener('click',function(){showDay(parseInt(this.getAttribute('data-day'),10));goTab('today');window.scrollTo({top:0,behavior:'smooth'})})}
  var pct=Math.round(doneCount/N*100);
  document.getElementById('progText').textContent=doneCount+' of '+N+' complete';
  document.getElementById('progPct').textContent=pct+'%';
  document.getElementById('progFill').style.width=pct+'%';
}

function buildToolkit(){
  var g=document.getElementById('tkGrid');var h='';
  for(var i=0;i<TOOLKIT.length;i++){var t=TOOLKIT[i];h+='<button class="toolkit-card" data-tk="'+t.id+'"><div class="toolkit-icon">'+t.icon+'</div><div class="toolkit-title">'+t.title+'</div><div class="toolkit-desc">'+t.desc+'</div></button>'}
  g.innerHTML=h;
  var cards=g.querySelectorAll('.toolkit-card');for(var ci=0;ci<cards.length;ci++){cards[ci].addEventListener('click',function(){showToolkit(this.getAttribute('data-tk'))})}
}
function showToolkit(id){
  var t;for(var i=0;i<TOOLKIT.length;i++){if(TOOLKIT[i].id===id){t=TOOLKIT[i];break}}
  if(!t)return;
  document.getElementById('tkGrid').style.display='none';
  var det=document.getElementById('tkDetail');
  var sy=t.sym||'b04-citadel';
  var h='<button class="toolkit-back">\u2190 Back to toolkit</button><h2 class="disp">'+t.icon+' '+t.title+'</h2><p class="tk-desc">'+t.desc+' Here is what Marcus would tell you.</p>';
  h+='<div class="tk-sym"><button class="sym-btn" data-sym="'+sy+'"><span class="gl">\u25C8</span> Symbol: '+esc(symName(sy))+'</button></div>';
  for(var j=0;j<t.passages.length;j++){var p=t.passages[j];h+='<div class="tk-passage"><p class="tkq">\u201C'+esc(p.q)+'\u201D</p><div class="tks">'+p.s+'</div><p class="tka">'+esc(p.a)+'</p></div>'}
  det.innerHTML=h;det.classList.add('active');
  det.querySelector('.toolkit-back').addEventListener('click',function(){det.classList.remove('active');document.getElementById('tkGrid').style.display=''});
  window.scrollTo({top:0,behavior:'smooth'});
}

showDay(currentDay);buildCal();buildToolkit();
