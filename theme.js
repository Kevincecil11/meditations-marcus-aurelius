/* Meditations: shared theme picker + symbol viewer (no dependencies) */
(function(){
var THEMES=[
  {id:'simple',name:'Simple',sw:['#ffffff','#111111']},
  {id:'current',name:'Current',sw:['#faf9f7','#7c4d2a']},
  {id:'night',name:'Night',sw:['#111111','#d4a06a']},
  {id:'mtrx',name:'MTRX\u2122',sw:['#ECEAE4','#ED691D']},
  {id:'imperial',name:'Imperial',sw:['#17111f','#d8b45c']},
  {id:'olive',name:'Olive Grove',sw:['#f4f2e8','#5d6b2a']}
];
var FONTS={
  mtrx:['https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap','https://api.fontshare.com/v2/css?f[]=tanker@400&display=swap'],
  imperial:['https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap'],
  olive:['https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap']
};
var loaded={};
function loadFonts(t){(FONTS[t]||[]).forEach(function(u){if(loaded[u])return;loaded[u]=1;var l=document.createElement('link');l.rel='stylesheet';l.href=u;document.head.appendChild(l)})}
function cur(){return document.documentElement.getAttribute('data-theme')||'current'}
function setMeta(){var m=document.querySelector('meta[name="theme-color"]');if(m){m.setAttribute('content',getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()||'#faf9f7')}}
function applyTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  try{localStorage.setItem('ma-theme',t)}catch(e){}
  loadFonts(t);setMeta();renderPicker();setHdr();
}

/* ---------- Theme picker ---------- */
var tpWrap;
function buildPicker(){
  tpWrap=document.createElement('div');tpWrap.className='tp-wrap';
  tpWrap.innerHTML='<div class="tp-scrim"></div><div class="tp" role="dialog" aria-label="Choose a theme"><h4>Theme</h4><div class="tp-grid"></div></div>';
  document.body.appendChild(tpWrap);
  tpWrap.querySelector('.tp-scrim').addEventListener('click',closePicker);
  tpWrap.querySelector('.tp-grid').addEventListener('click',function(e){var b=e.target.closest('.tp-opt');if(!b)return;applyTheme(b.getAttribute('data-t'));setTimeout(closePicker,160)});
  renderPicker();
}
function renderPicker(){
  if(!tpWrap)return;var c=cur(),h='';
  THEMES.forEach(function(t){h+='<button class="tp-opt'+(t.id===c?' on':'')+'" data-t="'+t.id+'"><span class="tp-sw" style="background:linear-gradient(135deg,'+t.sw[0]+' 50%,'+t.sw[1]+' 50%)"></span>'+t.name+'</button>'});
  tpWrap.querySelector('.tp-grid').innerHTML=h;
}
function openPicker(){tpWrap.classList.add('on')}
function closePicker(){tpWrap.classList.remove('on')}

/* ---------- Header height (keeps sticky nav aligned when the header wraps on mobile) ---------- */
function setHdr(){var h=document.querySelector('.hdr');if(h)document.documentElement.style.setProperty('--hdr-h',h.offsetHeight+'px')}

/* ---------- Symbols ---------- */
var SYMBOLS=[
{id:'b01-lamp',book:1,title:'The Passed Lamp',meaning:'Every virtue you have was lit by someone else first: a parent, a teacher, a friend. Book 1 is Marcus counting those flames. Gratitude means keeping the lamp lit and handing it on.',quote:'From the gods I received that I had good grandfathers, good parents, a good sister, good teachers, good associates, good kinsmen and friends, nearly everything good.',src:'Book 1'},
{id:'b02-tablet',book:2,title:'The Frontier Tablet',meaning:'Marcus wrote Book 2 at dawn in a war camp on the Danube. The tablet by the fire is the morning practice: prepare your mind before the day starts preparing it for you.',quote:'Begin the morning by saying to thyself, I shall meet with the busy-body, the ungrateful, arrogant, deceitful, envious, unsocial.',src:'Book 2.1'},
{id:'b03-hourglass',book:3,title:'The Fallen Conqueror',meaning:'Alexander\u2019s laurel lies in the grass and the sand is nearly gone. Even conquerors run out of time. The question is not how much time you have, but what you do with what is left.',quote:'Alexander, and Pompeius, and Caius Caesar, after so often completely destroying whole cities... themselves too at last departed from life.',src:'Book 3'},
{id:'b04-citadel',book:4,title:'The Inner Citadel',meaning:'The storm can circle the walls forever; it cannot get inside unless you open the gate. Your judgement is the gate. The calm you keep looking for outside already has a fortress within you.',quote:'Nowhere either with more quiet or more freedom from trouble does a man retire than into his own soul.',src:'Book 4.3'},
{id:'b05-boulder',book:5,title:'The Carved Boulder',meaning:'The boulder did not end the path. Someone cut steps into it, and now the obstacle is part of the road. That is the Stoic move: use the problem as the material.',quote:'That which is a hindrance is made a furtherance to an act; and that which is an obstacle on the road helps us on this road.',src:'Book 5.20'},
{id:'b06-hive',book:6,title:'The Hive and the Bee',meaning:'You are one bee in a very large hive. Anything that harms the whole will eventually harm you, and real self-interest always includes other people.',quote:'That which is not good for the bee-hive cannot be good for the bee.',src:'Book 6.54'},
{id:'b07-stars',book:7,title:'Running with the Stars',meaning:'Step back far enough and your worries shrink to their real size. You are not watching the universe from outside; you are moving with it.',quote:'Look round at the courses of the stars, as if thou wert going along with them.',src:'Book 7.47'},
{id:'b08-cliff',book:8,title:'The Promontory',meaning:'The waves never stop. The rock does not argue with them, chase them, or take them personally. It just stays, and the fury exhausts itself against it.',quote:'Be like the promontory against which the waves continually break, but it stands firm and tames the fury of the water around it.',src:'Book 4.49'},
{id:'b09-spring',book:9,title:'The Unspoiled Spring',meaning:'Someone can throw stones and curses into a clear spring; it keeps sending up clean water and washes the dirt away. Other people\u2019s wrongs cannot foul your source unless you let them.',quote:'If a man should stand by a limpid pure spring, and curse it, the spring never ceases sending up potable water.',src:'Book 8.51'},
{id:'b10-bay',book:10,title:'The Waveless Bay',meaning:'The storm was never in the sea; it was in the opinion. Drop the opinion, round the headland, and you sail into calm water.',quote:'Take away then, when thou choosest, thy opinion, and like a mariner who has doubled the promontory, thou wilt find calm, everything stable, and a waveless bay.',src:'Book 12.22'},
{id:'b11-sphere',book:11,title:'The Sphere of the Soul',meaning:'A well-kept mind is like a perfect sphere of light: not stretched toward cravings, not shrunk in fear, not scattered. Just whole, and lit, and seeing clearly.',quote:'The spherical form of the soul maintains its figure, when it is neither extended towards any object, nor contracted inwards, nor dispersed nor sinks down, but is illuminated by light.',src:'Book 11.12'},
{id:'b12-olive',book:12,title:'The Ripe Olive',meaning:'The olive does not cling to the branch. It ripens, falls, and blesses the tree that grew it. That is how Marcus wanted to leave: finished, grateful, without drama.',quote:'End thy journey in content, just as an olive falls off when it is ripe, blessing nature who produced it, and thanking the tree on which it grew.',src:'Book 4.48'},
{id:'x-river',book:4,title:'The River of Time',meaning:'Crowns, coins, ruins and scrolls, all floating the same way. Whatever is bothering you today is already on the water. Let it go downstream.',quote:'Time is like a river made up of the events which happen, and a violent stream; for as soon as a thing has been seen, it is carried away.',src:'Book 4.43'},
{id:'x-fire',book:4,title:'The Fire that Feeds',meaning:'A weak flame is smothered by what is thrown on it. A strong fire eats it and burns higher. Train the mind to turn every setback into fuel.',quote:'When the fire is strong, it soon appropriates to itself the matter which is heaped on it, and consumes it, and rises higher by means of this very material.',src:'Book 4.1'},
{id:'x-above',book:9,title:'The View from Above',meaning:'From high enough, the city is a toy and the ships are specks. Rise above the moment and see your trouble at its true scale.',quote:'Look down from above on the countless herds of men and their countless solemnities, and the infinitely varied voyagings in storms and calms.',src:'Book 9.30'},
{id:'x-dye',book:5,title:'The Dyed Cloth',meaning:'Wool takes the colour of the vat it soaks in. Your mind takes the colour of the thoughts it soaks in all day. Choose the vat.',quote:'Such as are thy habitual thoughts, such also will be the character of thy mind; for the soul is dyed by the thoughts.',src:'Book 5.16'}
];
var BOOK_SYM={1:'b01-lamp',2:'b02-tablet',3:'b03-hourglass',4:'b04-citadel',5:'b05-boulder',6:'b06-hive',7:'b07-stars',8:'b08-cliff',9:'b09-spring',10:'b10-bay',11:'b11-sphere',12:'b12-olive'};
var IMG='img/symbols/';
function idx(id){for(var i=0;i<SYMBOLS.length;i++)if(SYMBOLS[i].id===id)return i;return -1}
function esc(s){var d=document.createElement('div');d.appendChild(document.createTextNode(s));return d.innerHTML}

var lb,lbI=0;
function buildLightbox(){
  lb=document.createElement('div');lb.className='lb';lb.setAttribute('aria-hidden','true');
  lb.innerHTML='<div class="lb-card" role="dialog" aria-modal="true" aria-label="Symbol"><button class="lb-x" aria-label="Close">&times;</button><div class="lb-img"><img alt=""><div class="lb-miss">Image not found.<br>Upload the <b>img/symbols</b> folder to the repo to see this symbol.</div></div><div class="lb-body"><div class="lb-tag"></div><h3></h3><p class="lb-mean"></p><p class="lb-q q-font"></p><div class="lb-src"></div><div class="lb-nav"><button data-d="-1">&larr; Prev</button><span class="lb-ct"></span><button data-d="1">Next &rarr;</button></div></div></div>';
  document.body.appendChild(lb);
  lb.addEventListener('click',function(e){if(e.target===lb)closeSymbol()});
  lb.querySelector('.lb-x').addEventListener('click',closeSymbol);
  lb.querySelector('.lb-nav').addEventListener('click',function(e){var b=e.target.closest('button');if(b)step(parseInt(b.getAttribute('data-d'),10))});
  lb.querySelector('img').addEventListener('error',function(){lb.querySelector('.lb-img').classList.add('missing')});
  var sx=null;
  lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>60)step(dx<0?1:-1);sx=null},{passive:true});
}
function renderSymbol(){
  var s=SYMBOLS[lbI];var box=lb.querySelector('.lb-img');box.classList.remove('missing');
  var img=lb.querySelector('img');img.src=IMG+s.id+'.webp';img.alt=s.title;
  lb.querySelector('.lb-tag').textContent='Symbol \u00B7 Book '+s.book;
  lb.querySelector('h3').textContent=s.title;
  lb.querySelector('.lb-mean').textContent=s.meaning;
  lb.querySelector('.lb-q').textContent='\u201C'+s.quote+'\u201D';
  lb.querySelector('.lb-src').textContent=s.src;
  lb.querySelector('.lb-ct').textContent=(lbI+1)+' / '+SYMBOLS.length;
}
function step(d){lbI=(lbI+d+SYMBOLS.length)%SYMBOLS.length;renderSymbol()}
function openSymbol(id){var i=idx(id);if(i<0)return;lbI=i;renderSymbol();lb.classList.add('on');lb.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll')}
function closeSymbol(){lb.classList.remove('on');lb.setAttribute('aria-hidden','true');if(!gal||!gal.classList.contains('on'))document.body.classList.remove('no-scroll')}

var gal;
function buildGallery(){
  gal=document.createElement('div');gal.className='gal';
  var h='<div class="gal-top"><div class="gal-top-in"><h2>Symbols of the Meditations</h2><button class="gal-x" aria-label="Close">&times;</button></div></div>';
  h+='<p class="gal-intro">One emblem for each book, plus four images Marcus keeps returning to. Tap any symbol to read what it means.</p><div class="gal-grid">';
  SYMBOLS.forEach(function(s){h+='<button class="gal-card" data-sym="'+s.id+'"><div class="th"><img data-src="'+IMG+s.id+'-t.webp" alt="'+esc(s.title)+'"></div><div class="gt"><div class="gb">Book '+s.book+'</div><div class="gn">'+esc(s.title)+'</div></div></button>'});
  gal.innerHTML=h+'</div>';
  document.body.appendChild(gal);
  gal.querySelector('.gal-x').addEventListener('click',closeGallery);
}
function openGallery(){
  var imgs=gal.querySelectorAll('img[data-src]');
  for(var i=0;i<imgs.length;i++){imgs[i].src=imgs[i].getAttribute('data-src');imgs[i].removeAttribute('data-src');imgs[i].loading='lazy'}
  gal.classList.add('on');document.body.classList.add('no-scroll');
}
function closeGallery(){gal.classList.remove('on');document.body.classList.remove('no-scroll')}

/* ---------- Global wiring ---------- */
function init(){
  buildPicker();buildLightbox();buildGallery();
  loadFonts(cur());setMeta();setHdr();
  window.addEventListener('resize',setHdr);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(setHdr);
  document.addEventListener('click',function(e){
    var s=e.target.closest('[data-sym]');if(s){e.preventDefault();openSymbol(s.getAttribute('data-sym'));return}
    if(e.target.closest('[data-open-gallery]')){e.preventDefault();openGallery();return}
    if(e.target.closest('#themeBtn')){e.preventDefault();openPicker();return}
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){if(lb.classList.contains('on'))closeSymbol();else if(tpWrap.classList.contains('on'))closePicker();else if(gal.classList.contains('on'))closeGallery()}
    if(lb.classList.contains('on')){if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)}
  });
}
window.MA={SYMBOLS:SYMBOLS,BOOK_SYM:BOOK_SYM,openSymbol:openSymbol,openGallery:openGallery,applyTheme:applyTheme,setHdr:setHdr,
  symForBook:function(n){return BOOK_SYM[parseInt(n,10)]||null},
  symTitle:function(id){var i=idx(id);return i<0?'':SYMBOLS[i].title}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
