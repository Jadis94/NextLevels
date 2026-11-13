// Menu mobile
const burger=document.querySelector('.burger'),menu=document.getElementById('menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){menu.classList.remove('open');burger.setAttribute('aria-expanded',false);burger.focus()}});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}));

// Reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Frasi a rotazione
const phrases=["Le opportunità nascono dagli incontri.","Dove il talento incontra l'esperienza.","Una rete di professionisti al servizio di chi inizia.","Le connessioni che aprono opportunità."];
const q=document.getElementById('quote'),dots=document.getElementById('dots');let i=0,t;
phrases.forEach((_,n)=>{const b=document.createElement('button');b.setAttribute('aria-label','Frase '+(n+1));b.onclick=()=>{show(n);restart()};dots.appendChild(b)});
function show(n){i=n;q.classList.add('fade');setTimeout(()=>{q.textContent=phrases[i];q.classList.remove('fade')},400);[...dots.children].forEach((d,k)=>d.classList.toggle('on',k===i))}
function restart(){clearInterval(t);t=setInterval(()=>show((i+1)%phrases.length),5000)}
dots.children[0].classList.add('on');restart();

// Form -> mailto
const EMAIL='desilvestrisluca@gmail.com';
document.getElementById('form').addEventListener('submit',e=>{
  e.preventDefault();
  const v=id=>document.getElementById(id).value;
  const body=`Nome: ${v('nome')}\nEmail: ${v('email')}\nProfilo: ${v('ruolo')}\n\n${v('testo')}`;
  location.href=`mailto:${EMAIL}?subject=${encodeURIComponent('Contatto da sito Next Level')}&body=${encodeURIComponent(body)}`;
  document.getElementById('msg').style.display='block';
});
document.getElementById('year').textContent=new Date().getFullYear();

// ===== v2 =====
// Barra di avanzamento + header che si compatta + voce di menu attiva
const toTop=document.getElementById('totop');
toTop.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
const bar=document.getElementById('progress'),hdr=document.querySelector('header');
const links=[...document.querySelectorAll('#menu a[href^="#"]:not(.btn)')];
const secs=links.map(a=>document.querySelector(a.getAttribute('href')));
function onScroll(){
  const h=document.documentElement;
  bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
  hdr.classList.toggle('scrolled',h.scrollTop>40);
  toTop.classList.toggle('show',h.scrollTop>700);
  let cur=-1;secs.forEach((s,k)=>{if(s&&s.getBoundingClientRect().top<120)cur=k});
  links.forEach((a,k)=>a.classList.toggle('active',k===cur));
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

// Tab "Per te" (con tastiera: frecce, Home, End)
const tabEls=[...document.querySelectorAll('.tab')];
function selTab(t,focus){
  tabEls.forEach(x=>{const on=x===t;x.classList.toggle('on',on);x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1});
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on',p.id==='tab-'+t.dataset.tab));
  if(focus)t.focus();
}
tabEls.forEach((t,k)=>{
  t.addEventListener('click',()=>selTab(t));
  t.addEventListener('keydown',e=>{
    const n=tabEls.length;let j=null;
    if(e.key==='ArrowRight')j=(k+1)%n;else if(e.key==='ArrowLeft')j=(k-1+n)%n;else if(e.key==='Home')j=0;else if(e.key==='End')j=n-1;
    if(j!==null){e.preventDefault();selTab(tabEls[j],true)}
  });
});

// Eventi: modifica questa lista per aggiornare il sito (esempi da sostituire)
const EVENTS=[
  {date:'Data da definire',tag:'Formazione',title:'Lavorare in una multinazionale: lo racconta chi ci lavora',where:'Università – sede da definire'},
  {date:'Data da definire',tag:'Workshop',title:'Workshop su soft skill e leadership',where:'Sede da definire'},
  {date:'Data da definire',tag:'Networking',title:'Serata di networking tra professionisti e futuri professionisti',where:'Sede da definire'}
];
const ev=document.getElementById('events');
ev.innerHTML=EVENTS.map(e=>`<article class="card event reveal"><div class="date">${e.date}<small>${e.tag}</small></div><div class="body"><h3>${e.title}</h3><p class="where">📍 ${e.where}</p></div></article>`).join('');
ev.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('.steps .reveal,.faq.reveal,.join-band .reveal,.events-note.reveal').forEach(el=>io.observe(el));

// Informativa privacy (finestra modale)
const dlg=document.getElementById('privacy');
document.querySelectorAll('[data-privacy]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();dlg.showModal()}));
dlg.querySelector('.dlg-close').addEventListener('click',()=>dlg.close());
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});


// ===== v4: livelli, spotlight, tilt, magnetismo =====
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;

// H1: entrata parola per parola
(function(){
  const h1=document.querySelector('.hero h1');let n=0;
  (function walk(el){
    [...el.childNodes].forEach(c=>{
      if(c.nodeType===3){
        const f=document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(p=>{
          if(!p)return;
          if(/^\s+$/.test(p)){f.appendChild(document.createTextNode(' '));return}
          const w=document.createElement('span');w.className='w';
          const s=document.createElement('span');s.textContent=p;s.style.setProperty('--i',n++);
          w.appendChild(s);f.appendChild(w);
        });
        c.replaceWith(f);
      }else if(c.nodeType===1)walk(c);
    });
  })(h1);
})();

// Livelli: ogni sezione è un "LV"
const LEVELS=[['home','Start'],['chi-siamo','Chi siamo'],['cosa-facciamo','Cosa facciamo'],['per-chi','Per te'],['come-funziona','Il percorso'],['eventi','Eventi'],['faq','FAQ'],['contatti','Unisciti']];
const lvLabel=k=>k===0?'NEW GAME':k===LEVELS.length-1?'FINAL BOSS':'LV '+String(k+1).padStart(2,'0');
const lvEls=LEVELS.map(([id])=>document.getElementById(id));
lvEls.forEach((s,k)=>{
  const e=s&&s.querySelector('.eyebrow');if(!e)return;
  const b=document.createElement('b');b.className='lv';b.textContent=lvLabel(k);b.setAttribute('aria-hidden','true');
  e.prepend(b,' ');
});
const rN=document.getElementById('railNum'),rL=document.getElementById('railName'),rF=document.getElementById('railFill');
let curLv=-1;
function updRail(){
  let c=0;lvEls.forEach((s,k)=>{if(s&&s.getBoundingClientRect().top<innerHeight*.45)c=k});
  if(c!==curLv){
    curLv=c;rN.textContent=lvLabel(c);rN.classList.toggle('boss',c===LEVELS.length-1);rN.classList.toggle('start',c===0);rL.textContent=LEVELS[c][1];
    rN.classList.add('bump');setTimeout(()=>rN.classList.remove('bump'),350);
  }
  rF.style.height=((c+1)/LEVELS.length*100)+'%';
}
addEventListener('scroll',updRail,{passive:true});updRail();

if(fine&&!reduce){
  // Spotlight + parallax nell'hero
  const hero=document.querySelector('.hero'),art=document.querySelector('.hero-art');
  hero.addEventListener('pointermove',e=>{
    const r=hero.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    hero.style.setProperty('--mx',x+'px');hero.style.setProperty('--my',y+'px');
    const dx=x/r.width-.5,dy=y/r.height-.5;
    art.style.transform='perspective(900px) rotateY('+(dx*10)+'deg) rotateX('+(-dy*10)+'deg) translate3d('+(dx*12)+'px,'+(dy*12)+'px,0)';
  });
  hero.addEventListener('pointerleave',()=>{art.style.transform=''});
  art.addEventListener('animationend',e=>{if(e.target===art){art.style.animation='none';art.style.opacity=1}});

  // Card: bagliore + tilt
  document.querySelectorAll('.cards .card').forEach(c=>{
    c.addEventListener('pointermove',e=>{
      const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
      c.style.setProperty('--px',x+'px');c.style.setProperty('--py',y+'px');
      c.style.transform='perspective(800px) rotateX('+((.5-y/r.height)*5)+'deg) rotateY('+((x/r.width-.5)*5)+'deg) translateY(-6px)';
    });
    c.addEventListener('pointerleave',()=>{c.style.transform=''});
  });

  // Pulsanti magnetici
  document.querySelectorAll('.hero .btn,.join-band .btn,.btn-wine').forEach(b=>{
    b.addEventListener('pointermove',e=>{
      const r=b.getBoundingClientRect();
      b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.28)+'px)';
    });
    b.addEventListener('pointerleave',()=>{b.style.transform=''});
  });
}


// ===== v5: esperienza personalizzata =====
const PERSONAS={
  stud:{lead:"Speech di professionisti, formazione e occasioni di networking per entrare nel mondo del lavoro con più chiarezza e più contatti.",cta:"Partecipa agli eventi",tab:'giovani',role:'Studente / Laureando / Laureato',ph:"Raccontaci cosa studi o di cosa ti occupi e quali temi vorresti approfondire."},
  pro:{lead:"Entra in una rete di professionisti, fai networking con persone di settori diversi e, se vuoi, porta la tua esperienza a chi sta iniziando.",cta:"Entra nella rete",tab:'pro',role:'Professionista',ph:"Raccontaci il tuo ruolo, il tuo settore e come vorresti partecipare."},
  ente:{lead:"Portiamo talk, speech e formazione di professionisti nella tua università o azienda, su misura per i tuoi studenti e le tue persone.",cta:"Organizziamo insieme",tab:'enti',role:'Università / Scuola / Azienda',ph:"Raccontaci chi siete e che tipo di incontro avete in mente."}
};
const lead=document.getElementById('lead'),ctaT=document.getElementById('heroCtaT'),chips=[...document.querySelectorAll('.chip')];
const DEF={lead:lead.textContent,cta:ctaT.textContent};
const roleSel=document.getElementById('ruolo'),testo=document.getElementById('testo');
const DEF_PH=testo.placeholder;
function setPersona(key){
  const p=PERSONAS[key];
  chips.forEach(c=>c.setAttribute('aria-pressed',c.dataset.p===key));
  lead.classList.add('swap');
  setTimeout(()=>{lead.textContent=p?p.lead:DEF.lead;ctaT.textContent=p?p.cta:DEF.cta;lead.classList.remove('swap')},220);
  if(p){
    const t=tabEls.find(x=>x.dataset.tab===p.tab);if(t)selTab(t);
    [...roleSel.options].forEach((o,k)=>{if(o.text===p.role)roleSel.selectedIndex=k});
    testo.placeholder=p.ph;
  }else testo.placeholder=DEF_PH;
}
chips.forEach(c=>c.addEventListener('click',()=>setPersona(c.getAttribute('aria-pressed')==='true'?null:c.dataset.p)));
// anche i pulsanti "per te" tengono il form coerente
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
  const k=Object.keys(PERSONAS).find(x=>PERSONAS[x].tab===t.dataset.tab);
  if(k){[...roleSel.options].forEach((o,i)=>{if(o.text===PERSONAS[k].role)roleSel.selectedIndex=i})}
}));
// copia email
document.getElementById('copyMail').addEventListener('click',e=>{
  navigator.clipboard&&navigator.clipboard.writeText(EMAIL).then(()=>{e.target.textContent='Indirizzo copiato ✓'});
});
