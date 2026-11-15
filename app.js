// Meditations reader (themes + symbols live in theme.js)
var saved=[];try{saved=JSON.parse(localStorage.getItem('ma-sv')||'[]')}catch(e){saved=[]}
var allOpen=false;
var mode='full';
var SYM=window.MA||{symForBook:function(){return null},symTitle:function(){return ''}};

function localDay(){var n=new Date();return Math.floor((n.getTime()-n.getTimezoneOffset()*60000)/86400000)}
function escH(s){var d=document.createElement('div');d.appendChild(document.createTextNode(s));return d.innerHTML}
function saveSt(){try{localStorage.setItem('ma-sv',JSON.stringify(saved))}catch(e){}}
function updCount(){document.getElementById('scount').textContent=saved.length}

function allHighlighted(){
  var a=[];
  for(var i=0;i<BOOKS.length;i++){
    for(var j=0;j<BOOKS[i].passages.length;j++){
      var p=BOOKS[i].passages[j];
      if(p.key&&!p.note){a.push({id:p.id,text:p.text,num:BOOKS[i].num,book:'Book '+BOOKS[i].num+(p.ref?' \u00B7 '+p.ref:''),ex:p.ex,sym:p.sym||SYM.symForBook(BOOKS[i].num)})}
    }
  }
  return a;
}

function buildStats(){
  var n=0,k=0;
  for(var i=0;i<BOOKS.length;i++){n+=BOOKS[i].passages.length;for(var j=0;j<BOOKS[i].passages.length;j++)if(BOOKS[i].passages[j].key)k++}
  var s=(window.MA&&MA.SYMBOLS)?MA.SYMBOLS.length:0;
  document.getElementById('stats').innerHTML='<span>12 Books</span><span>'+n+' Passages</span><span>'+k+' Explained</span>'+(s?'<span>'+s+' Symbols</span>':'');
}

function buildNav(){
  var c=document.getElementById('pillNav');var h='';
  for(var i=0;i<BOOKS.length;i++){h+='<button class="pill" data-b="'+BOOKS[i].num+'">Book '+BOOKS[i].num+'</button>'}
  c.innerHTML=h;
  c.addEventListener('click',function(e){var b=e.target;if(!b.classList.contains('pill'))return;var el=document.getElementById('bk-'+b.getAttribute('data-b'));if(el)el.scrollIntoView({behavior:'smooth'})});
}

function buildDaily(){
  var all=allHighlighted();if(!all.length)return;
  var idx=localDay()%all.length;
  var el=document.getElementById('daily');
  function show(q){
    var h='<div class="daily-tag">Today\'s Reflection</div><p class="dq">\u201C'+escH(q.text)+'\u201D</p><p class="dr">'+q.book+'</p>';
    h+='<div class="dx" id="dx"><strong>In plain English:</strong> '+q.ex+'</div>';
    h+='<div class="daily-acts"><button id="dxBtn">What this means</button>';
    if(q.sym)h+='<button data-sym="'+q.sym+'">\u25C8 Symbol</button>';
    h+='<button id="goD">Read in context</button><button id="newD">\u21BB Another</button></div>';
    el.innerHTML=h;
    document.getElementById('newD').addEventListener('click',function(){show(all[Math.floor(Math.random()*all.length)])});
    document.getElementById('dxBtn').addEventListener('click',function(){var d=document.getElementById('dx');d.classList.toggle('open');this.textContent=d.classList.contains('open')?'Hide meaning':'What this means'});
    document.getElementById('goD').addEventListener('click',function(){jumpTo(q.id)});
  }
  show(all[idx]);
}

function jumpTo(id){
  var el=document.querySelector('.passage[data-id="'+id+'"]');if(!el)return;
  if(el.classList.contains('hide')){var s=document.getElementById('search');s.value='';doSearch('');mode='full';setModeBtns();applyMode()}
  el.scrollIntoView({behavior:'smooth',block:'center'});
  var ex=el.querySelector('.expl'),eb=el.querySelector('.exp-btn');if(ex&&!ex.classList.contains('open')){ex.classList.add('open');eb.classList.add('open')}
}

function buildContent(){
  var c=document.getElementById('content');var h='';
  for(var i=0;i<BOOKS.length;i++){
    var bk=BOOKS[i];var bs=SYM.symForBook(bk.num);
    h+='<section class="book-sec" id="bk-'+bk.num+'">';
    h+='<div class="bk-num disp">'+bk.num+'</div>';
    h+='<h2 class="bk-title disp">'+bk.title+'</h2>';
    h+='<div class="bk-summary">'+bk.summary+'</div>';
    h+='<div class="bk-row">'+(bk.themes?'<div class="bk-themes">Themes: '+bk.themes+'</div>':'<span></span>');
    if(bs)h+='<button class="sym-btn" data-sym="'+bs+'"><span class="gl">\u25C8</span> Symbol: '+escH(SYM.symTitle(bs))+'</button>';
    h+='</div>';
    for(var j=0;j<bk.passages.length;j++){
      var p=bk.passages[j];
      var isS=saved.indexOf(p.id)!==-1;
      var cls=p.key?'passage highlighted':'passage';
      h+='<div class="'+cls+'" data-id="'+p.id+'" data-key="'+(p.key?'1':'0')+'">';
      h+='<div class="pnum">&sect; '+p.id.replace('b'+bk.num+'p','')+(p.ref?'<span class="ref">Med. '+p.ref+'</span>':'')+'</div>';
      h+='<p class="ptext">'+escH(p.text)+'</p>';
      if(p.note)h+='<div class="pnote">\u24D8 '+p.note+'</div>';
      h+='<div class="pmeta"><div class="pacts">';
      if(p.key)h+='<button class="exp-btn" data-q="'+p.id+'">What this means <span class="arr">\u25BC</span></button>';
      if(p.sym)h+='<button class="sym-mini" data-sym="'+p.sym+'" title="View symbol: '+escH(SYM.symTitle(p.sym))+'">\u25C8</button>';
      h+='<button class="hrt'+(isS?' on':'')+'" data-q="'+p.id+'" aria-label="Save">'+(isS?'\u2665':'\u2661')+'</button>';
      h+='</div></div>';
      if(p.key)h+='<div class="expl" data-q="'+p.id+'"><div class="expl-in"><div class="expl-tag">In Plain English</div><p class="expl-txt">'+p.ex+'</p></div></div>';
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

function setModeBtns(){var b=document.querySelectorAll('.mode-btn');for(var k=0;k<b.length;k++)b[k].classList.toggle('on',b[k].getAttribute('data-mode')===mode)}

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
      mode=this.getAttribute('data-mode');setModeBtns();
      var s=document.getElementById('search');
      if(s.value.trim())doSearch(s.value);else applyMode();
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
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closePanel()});
  document.getElementById('btt').addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
}

function applyMode(){
  var passages=document.querySelectorAll('.passage');
  for(var i=0;i<passages.length;i++){
    var hide=mode==='highlights'&&passages[i].getAttribute('data-key')==='0';
    passages[i].classList.toggle('hide',hide);
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
  for(var c=0;c<passages.length;c++){var p0=passages[c].querySelector('.ptext');if(p0&&p0.querySelector('mark'))p0.innerHTML=escH(p0.textContent)}
  if(!q){
    applyMode();
    document.getElementById('noRes').classList.remove('show');
    return;
  }
  var re=new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi');
  var vis=0;
  for(var i2=0;i2<passages.length;i2++){
    var pt2=passages[i2].querySelector('.ptext');
    var txt=pt2?pt2.textContent:'';
    var exEl=passages[i2].querySelector('.expl-txt');
    var exTxt=exEl?exEl.textContent.toLowerCase():'';
    var modeOk=!(mode==='highlights'&&passages[i2].getAttribute('data-key')==='0');
    var hit=txt.toLowerCase().indexOf(q)!==-1||exTxt.indexOf(q)!==-1;
    if(hit&&modeOk){
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
  document.getElementById('noRes').classList.toggle('show',vis===0);
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
    var short=txt.length>160?txt.substring(0,160)+'...':txt;
    h+='<div class="pnl-item"><p class="pq" data-go="'+id+'">\u201C'+escH(short)+'\u201D</p><button class="prm" data-id="'+id+'">Remove</button></div>';
  }
  body.innerHTML=h;
  var gos=body.querySelectorAll('.pq');
  for(var g=0;g<gos.length;g++){gos[g].addEventListener('click',function(){closePanel();jumpTo(this.getAttribute('data-go'))})}
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
  var ticking=false;
  function onScroll(){
    ticking=false;
    var s=window.pageYOffset||document.documentElement.scrollTop;
    var t=document.documentElement.scrollHeight-window.innerHeight;
    if(t>0)pbar.style.width=(s/t*100)+'%';
    btt.classList.toggle('show',s>400);
    var secs=document.querySelectorAll('.book-sec');
    var off=(parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hdr-h'),10)||58)+90;
    var cur='';
    for(var i=0;i<secs.length;i++){if(secs[i].style.display!=='none'&&secs[i].getBoundingClientRect().top<=off)cur=secs[i].id.replace('bk-','')}
    for(var j=0;j<pills.length;j++){
      var on=pills[j].getAttribute('data-b')===cur;
      if(on&&!pills[j].classList.contains('on')){pills[j].classList.add('on');var nav=pills[j].parentElement.parentElement;nav.scrollTo({left:pills[j].offsetLeft-40,behavior:'smooth'})}
      else if(!on)pills[j].classList.remove('on');
    }
  }
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});
}

buildStats();buildNav();buildDaily();buildContent();bind();updCount();setupScroll();
