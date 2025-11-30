// Smooth scroll
function scrollToSection(id){document.getElementById(id).scrollIntoView({behavior:'smooth'});}

// Greeting & date
function updateDateGreeting(){
  const g = document.getElementById('greeting');
  const d = document.getElementById('current-date');
  const now = new Date();
  const hour = now.getHours();
  let greet = 'Hello';
  if(hour<12) greet='Good morning';
  else if(hour<18) greet='Good afternoon';
  else greet='Good evening';
  if(g) g.textContent = greet + ' — welcome!';
  if(d){ d.textContent = now.toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}); d.setAttribute('datetime', now.toISOString()); }
  const year = document.getElementById('year');
  if(year) year.textContent = now.getFullYear();
}

// Lightbox
const lightbox = {
  el: null,
  img: null,
  title: null,
  desc: null,
  init(){
    this.el = document.getElementById('lightbox');
    this.img = document.getElementById('lb-image');
    this.title = document.getElementById('lb-title');
    this.desc = document.getElementById('lb-desc');
    document.getElementById('lb-close').addEventListener('click', ()=> this.close());
    this.el.addEventListener('click', (e)=>{ if(e.target === this.el) this.close(); });
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') this.close(); });
    // attach click to gallery items
    document.querySelectorAll('.gallery-item').forEach(item=>{
      item.addEventListener('click', ()=> this.open(item));
      item.addEventListener('keydown', (ev)=>{ if(ev.key==='Enter') this.open(item); });
    });
  },
  open(item){
    const img = item.querySelector('img').getAttribute('src');
    const alt = item.querySelector('img').getAttribute('alt') || '';
    const title = item.getAttribute('data-title') || '';
    const desc = item.getAttribute('data-desc') || '';
    this.img.src = img;
    this.img.alt = alt;
    this.title.textContent = title;
    this.desc.textContent = desc;
    this.el.setAttribute('aria-hidden','false');
  },
  close(){
    if(!this.el) return;
    this.el.setAttribute('aria-hidden','true');
    this.img.src=''; this.title.textContent=''; this.desc.textContent='';
  }
};

// Games
function setupGameChips(){
  const chips = document.querySelectorAll('.chip');
  const title = document.getElementById('game-title');
  const desc = document.getElementById('game-desc');
  const gameData = {
    "Stardew Valley": "A cozy farming sim that inspires warm palettes and slow storytelling—perfect for soft portrait moods.",
    "Life is Strange": "Narrative-driven choices and emotional beats—helps me frame portraits that suggest a story.",
    "Spiritfarer": "A gentle game about care and farewells; inspires tender color grading and compositions.",
    "A Short Hike": "Small, beautiful moments—reminds me to capture candid, fleeting expressions.",
    "Coffee Talk": "Character-driven conversations inspire how I approach portrait narratives."
  };
  chips.forEach(c=>{
    c.addEventListener('click', ()=>{
      chips.forEach(x=>x.classList.remove('active'));
      c.classList.add('active');
      const g = c.getAttribute('data-game');
      title.textContent = g;
      desc.textContent = gameData[g] || '';
    });
  });
}

// Reveal on scroll for some subtle entrance
function revealOnScroll(){
  document.querySelectorAll('.section').forEach(sec=>{
    const rect = sec.getBoundingClientRect();
    if(rect.top < window.innerHeight - 80){
      sec.classList.add('visible');
    }
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  updateDateGreeting();
  lightbox.init();
  setupGameChips();
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);
});
