var saved=[];try{saved=JSON.parse(localStorage.getItem('ma-sv')||'[]')}catch(e){saved=[]}
var allOpen=false;
var mode='full';

// DARK MODE
var theme=localStorage.getItem('ma-theme')||'light';
document.documentElement.setAttribute('data-theme',theme);
updateThemeIcon();

document.getElementById('themeToggle').addEventListener('click',function(){
  theme=theme==='light'?'dark':'light';
  document.documentElement.setAttribute('data-theme',theme);
  localStorage.setItem('ma-theme',theme);
  updateThemeIcon();
});

function updateThemeIcon(){
  document.getElementById('themeToggle').innerHTML=theme==='light'?'\u263E':'\u2600';
}

function allHighlighted(){
  var a=[];
  for(var i=0;i<BOOKS.length;i++){
    for(var j=0;j<BOOKS[i].passages.length;j++){
      var p=BOOKS[i].passages[j];
      if(p.key){a.push({id:p.id,text:p.text,book:'Book '+BOOKS[i].num,ex:p.ex,bookTitle:BOOKS[i].title})}
    }
  }
  return a;
}

function escH(s){var d=document.createElement('div');d.appendChild(document.createTextNode(s));return d.innerHTML}
function saveSt(){try{localStorage.setItem('ma-sv',JSON.stringify(saved))}catch(e){}}
function updCount(){document.getElementById('scount').textContent=saved.length}

function buildNav(){
  var c=document.getElementById('pillNav');var h='';
  for(var i=0;i<BOOKS.length;i++){h+='<button class="pill" data-b="'+BOOKS[i].num+'">Book '+BOOKS[i].num+'</button>'}
  c.innerHTML=h;
  c.addEventListener('click',function(e){var b=e.target;if(!b.classList.contains('pill'))return;var el=document.getElementById('bk-'+b.getAttribute('data-b'));if(el)el.scrollIntoView({behavior:'smooth'})});
}

function buildDaily(){
  var all=allHighlighted();if(!all.length)return;
  var idx=Math.floor(Date.now()/86400000)%all.length;
  var el=document.getElementById('daily');
  function show(q){
    el.innerHTML='<div class="daily-tag">Today\'s Reflection</div><p class="dq">\u201C'+escH(q.text)+'\u201D</p><p class="dr">'+q.book+'</p><button id="newD">\u21BB Another</button>';
    document.getElementById('newD').addEventListener('click',function(){show(all[Math.floor(Math.random()*all.length)])});
  }
  show(all[idx]);
}

function buildContent(){
  var c=document.getElementById('content');var h='';
  for(var i=0;i<BOOKS.length;i++){
    var bk=BOOKS[i];
    h+='<section class="book-sec" id="bk-'+bk.num+'">';
    h+='<div class="bk-num">'+bk.num+'</div>';
    h+='<h2 class="bk-title">'+bk.title+'</h2>';
    h+='<div class="bk-summary">'+bk.summary+'</div>';
    if(bk.themes)h+='<div class="bk-themes">Themes: '+bk.themes+'</div>';
    for(var j=0;j<bk.passages.length;j++){
      var p=bk.passages[j];
      var isS=saved.indexOf(p.id)!==-1;
      var cls=p.key?'passage highlighted':'passage';
      h+='<div class="'+cls+'" data-id="'+p.id+'" data-key="'+(p.key?'1':'0')+'">';
      h+='<div class="pnum">&sect; '+p.id.replace('b'+bk.num+'p','')+'</div>';
      h+='<p class="ptext">'+escH(p.text)+'</p>';
      if(p.key){
        h+='<div class="pmeta"><span></span><div class="pacts">';
        h+='<button class="exp-btn" data-q="'+p.id+'">What this means <span class="arr">\u25BC</span></button>';
        h+='<button class="hrt'+(isS?' on':'')+'" data-q="'+p.id+'">'+(isS?'\u2665':'\u2661')+'</button>';
        h+='</div></div>';
        h+='<div class="expl" data-q="'+p.id+'"><div class="expl-in"><div class="expl-tag">In Plain English</div><p class="expl-txt">'+p.ex+'</p></div></div>';
      } else {
        h+='<div class="pmeta"><span></span><div class="pacts">';
        h+='<button class="hrt'+(isS?' on':'')+'" data-q="'+p.id+'">'+(isS?'\u2665':'\u2661')+'</button>';
        h+='</div></div>';
      }
      h+='</div>';
    }
    h+='</section>';
  }
  c.innerHTML=h;
  updatePassageCount();
}

function updatePassageCount(){
  var vis=document.querySelectorAll('.passage:not(.hide)');
  document.getElementById('qcount').textContent=vis.length+' passages';
}

function bind(){
  var content=document.getElementById('content');

  content.addEventListener('click',function(e){
    var t=e.target;
    while(t&&t!==content){
      if(t.classList.contains('exp-btn')){
        var qid=t.getAttribute('data-q');
        var ex=content.querySelector('.expl[data-q="'+qid+'"]');
        if(ex){t.classList.toggle('open');ex.classList.toggle('open')}
        return;
      }
      if(t.classList.contains('hrt')){
        var qid2=t.getAttribute('data-q');
        var idx=saved.indexOf(qid2);
        if(idx!==-1){saved.splice(idx,1);t.classList.remove('on');t.textContent='\u2661'}
        else{saved.push(qid2);t.classList.add('on');t.textContent='\u2665'}
        saveSt();updCount();
        return;
      }
      t=t.parentElement;
    }
  });

  document.getElementById('toggleAll').addEventListener('click',function(){
    allOpen=!allOpen;
    var ex=content.querySelectorAll('.expl');var eb=content.querySelectorAll('.exp-btn');
    for(var i=0;i<ex.length;i++){allOpen?ex[i].classList.add('open'):ex[i].classList.remove('open')}
    for(var j=0;j<eb.length;j++){allOpen?eb[j].classList.add('open'):eb[j].classList.remove('open')}
    this.textContent=allOpen?'Hide all explanations':'Show all explanations';
  });

  var modeBtns=document.querySelectorAll('.mode-btn');
  for(var m=0;m<modeBtns.length;m++){
    modeBtns[m].addEventListener('click',function(){
      for(var k=0;k<modeBtns.length;k++)modeBtns[k].classList.remove('on');
      this.classList.add('on');
      mode=this.getAttribute('data-mode');
      applyMode();
    });
  }

  var searchTimer;
  document.getElementById('search').addEventListener('input',function(e){
    clearTimeout(searchTimer);var v=e.target.value;
    searchTimer=setTimeout(function(){doSearch(v)},150);
  });

  document.getElementById('openSaved').addEventListener('click',openPanel);
  document.getElementById('pnlX').addEventListener('click',closePanel);
  document.getElementById('overlay').addEventListener('click',closePanel);
  document.getElementById('btt').addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
}

function applyMode(){
  var passages=document.querySelectorAll('.passage');
  if(mode==='highlights'){
    for(var i=0;i<passages.length;i++){
      if(passages[i].getAttribute('data-key')==='0')passages[i].classList.add('hide');
      else passages[i].classList.remove('hide');
    }
  } else {
    for(var j=0;j<passages.length;j++)passages[j].classList.remove('hide');
  }
  var secs=document.querySelectorAll('.book-sec');
  for(var s=0;s<secs.length;s++){
    var vis=secs[s].querySelectorAll('.passage:not(.hide)');
    secs[s].style.display=vis.length?'':'none';
  }
  updatePassageCount();
}

function doSearch(raw){
  var q=raw.toLowerCase().trim();
  var passages=document.querySelectorAll('.passage');
  var secs=document.querySelectorAll('.book-sec');
  if(!q){
    for(var i=0;i<passages.length;i++){passages[i].classList.remove('hide');var pt=passages[i].querySelector('.ptext');if(pt)pt.innerHTML=escH(pt.textContent)}
    applyMode();
    document.getElementById('noRes').classList.remove('show');
    return;
  }
  var re=new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi');
  var vis=0;
  for(var i2=0;i2<passages.length;i2++){
    var pt2=passages[i2].querySelector('.ptext');
    var txt=pt2?pt2.textContent:'';
    if(txt.toLowerCase().indexOf(q)!==-1){
      passages[i2].classList.remove('hide');
      pt2.innerHTML=escH(txt).replace(re,'<mark>$1</mark>');
      vis++;
    } else {
      passages[i2].classList.add('hide');
    }
  }
  for(var j2=0;j2<secs.length;j2++){
    var v=secs[j2].querySelectorAll('.passage:not(.hide)');
    secs[j2].style.display=v.length?'':'none';
  }
  document.getElementById('qcount').textContent=vis+' passages';
  var nr=document.getElementById('noRes');
  if(vis===0)nr.classList.add('show');else nr.classList.remove('show');
}

function openPanel(){
  document.getElementById('panel').classList.add('on');
  document.getElementById('overlay').classList.add('on');
  renderPanel();
}
function closePanel(){
  document.getElementById('panel').classList.remove('on');
  document.getElementById('overlay').classList.remove('on');
}
function renderPanel(){
  var body=document.getElementById('pnlBody');
  if(!saved.length){body.innerHTML='<div class="pnl-empty">No saved passages yet.<br>Tap the heart on any passage to save it.</div>';return}
  var h='';
  for(var i=0;i<saved.length;i++){
    var id=saved[i];
    var el=document.querySelector('.passage[data-id="'+id+'"]');
    if(!el)continue;
    var txt=el.querySelector('.ptext').textContent;
    var short=txt.length>140?txt.substring(0,140)+'...':txt;
    h+='<div class="pnl-item"><p class="pq">\u201C'+escH(short)+'\u201D</p><button class="prm" data-id="'+id+'">Remove</button></div>';
  }
  body.innerHTML=h;
  var rmBtns=body.querySelectorAll('.prm');
  for(var k=0;k<rmBtns.length;k++){
    rmBtns[k].addEventListener('click',function(){
      var rid=this.getAttribute('data-id');
      var idx=saved.indexOf(rid);if(idx!==-1)saved.splice(idx,1);
      saveSt();updCount();
      var mb=document.querySelector('.hrt[data-q="'+rid+'"]');
      if(mb){mb.classList.remove('on');mb.textContent='\u2661'}
      renderPanel();
    });
  }
}

function setupScroll(){
  var pills=document.querySelectorAll('.pill');
  var btt=document.getElementById('btt');
  var pbar=document.getElementById('pbar');
  window.addEventListener('scroll',function(){
    var s=window.pageYOffset||document.documentElement.scrollTop;
    var t=document.documentElement.scrollHeight-window.innerHeight;
    if(t>0)pbar.style.width=(s/t*100)+'%';
    btt.classList.toggle('show',s>400);
    var secs=document.querySelectorAll('.book-sec');
    var cur='';
    for(var i=0;i<secs.length;i++){if(secs[i].getBoundingClientRect().top<=140)cur=secs[i].id.replace('bk-','')}
    for(var j=0;j<pills.length;j++){pills[j].classList.toggle('on',pills[j].getAttribute('data-b')===cur)}
  },{passive:true});
}

buildNav();buildDaily();buildContent();bind();updCount();setupScroll();
