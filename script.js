// Menu mobile
const burger=document.querySelector('.burger'),menu=document.getElementById('menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}));

// Reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Frasi a rotazione
const phrases=["Le opportunità nascono dagli incontri.","Dove il talento incontra l'esperienza.","Un ponte tra giovani e professionisti.","Le connessioni che aprono opportunità."];
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
  location.href=`mailto:${EMAIL}?subject=${encodeURIComponent('Contatto da sito Next Leaders')}&body=${encodeURIComponent(body)}`;
  document.getElementById('msg').style.display='block';
});
document.getElementById('year').textContent=new Date().getFullYear();

// ===== v2 =====
// Barra di avanzamento + header che si compatta + voce di menu attiva
const bar=document.getElementById('progress'),hdr=document.querySelector('header');
const links=[...document.querySelectorAll('#menu a[href^="#"]:not(.btn)')];
const secs=links.map(a=>document.querySelector(a.getAttribute('href')));
function onScroll(){
  const h=document.documentElement;
  bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
  hdr.classList.toggle('scrolled',h.scrollTop>40);
  let cur=-1;secs.forEach((s,k)=>{if(s&&s.getBoundingClientRect().top<120)cur=k});
  links.forEach((a,k)=>a.classList.toggle('active',k===cur));
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

// Tab "Per te"
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(x=>{x.classList.toggle('on',x===t);x.setAttribute('aria-selected',x===t)});
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on',p.id==='tab-'+t.dataset.tab));
}));

// Eventi: modifica questa lista per aggiornare il sito (esempi da sostituire)
const EVENTS=[
  {date:'Data da definire',tag:'Career Talk',title:'Lavorare in una multinazionale',where:'Università – sede da definire'},
  {date:'Data da definire',tag:'Workshop',title:'Soft skill e leadership',where:'Sede da definire'},
  {date:'Data da definire',tag:'Networking',title:'Incontro con i manager',where:'Sede da definire'}
];
const ev=document.getElementById('events');
ev.innerHTML=EVENTS.map(e=>`<article class="card event reveal"><div class="date">${e.date}<small>${e.tag}</small></div><div class="body"><h3>${e.title}</h3><p class="where">📍 ${e.where}</p></div></article>`).join('');
ev.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('.steps .reveal,.faq.reveal,.join-band .reveal').forEach(el=>io.observe(el));

// Informativa privacy (finestra modale)
const dlg=document.getElementById('privacy');
document.querySelectorAll('[data-privacy]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();dlg.showModal()}));
dlg.querySelector('.dlg-close').addEventListener('click',()=>dlg.close());
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
