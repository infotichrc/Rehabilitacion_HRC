(() => {
  const input = document.querySelector('[data-search]');
  const chips = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-card]')];
  let active = 'all';
  function normalize(text){return (text||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
  function apply(){
    const q = normalize(input?.value || '');
    cards.forEach(card => {
      const cats = (card.dataset.category || '').split('|');
      const text = normalize(card.textContent);
      const okCat = active === 'all' || cats.includes(active);
      const okText = !q || text.includes(q);
      card.classList.toggle('hidden', !(okCat && okText));
    });
  }
  if(input) input.addEventListener('input', apply);
  chips.forEach(chip => chip.addEventListener('click', () => {
    active = chip.dataset.filter;
    chips.forEach(c => c.classList.toggle('active', c === chip));
    apply();
  }));

  const cleanVideoNoise = (container) => {
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const value = (node.nodeValue || '').trim();
      if(!value) return;
      if(/^(&(?:amp;)?(?:t|feature)=[^\s]+|\/%20|\/)+$/.test(value)) node.nodeValue = '';
    });
  };

  document.querySelectorAll('.article-layout > article.article-card').forEach(article => {
    const links = [...article.querySelectorAll('a.video-button')];
    if(!links.length) return;
    const seen = new Set();
    const urls = links.map(a => a.getAttribute('href')).filter(Boolean).filter(url => (seen.has(url) ? false : (seen.add(url), true)));
    links.forEach(a => a.remove());
    cleanVideoNoise(article);

    const section = document.createElement('section');
    section.className = 'video-section';
    section.innerHTML = '<h2>Videos de apoyo</h2><p class="video-section-copy">Material audiovisual de apoyo para complementar esta rutina. Si un video externo ya no se encuentra disponible, la tarjeta se mantiene como referencia del ejercicio.</p>';

    const grid = document.createElement('div');
    grid.className = 'video-grid';
    urls.forEach((url, index) => {
      const card = document.createElement('article');
      card.className = 'video-card';
      card.innerHTML = `<span class="video-badge">YouTube</span><h3>Video de apoyo ${index + 1}</h3><p>Abrir material audiovisual en una nueva pestaña para revisar el ejercicio.</p><a class="btn btn-primary video-card-link" href="${url}" target="_blank" rel="noopener">Ver video</a>`;
      grid.appendChild(card);
    });

    section.appendChild(grid);
    const note = document.createElement('p');
    note.className = 'video-note';
    note.textContent = 'Nota: los videos se abren desde YouTube para mantener el sitio liviano y compatible con GitHub Pages.';
    section.appendChild(note);
    article.prepend(section);
  });

  const openHeroVideo = document.querySelector('[data-open-hero-video]');
  const heroVideoModal = document.getElementById('hero-video-modal');
  const heroVideoEl = heroVideoModal?.querySelector('video');
  const closeHeroVideo = () => {
    if(!heroVideoModal) return;
    heroVideoModal.hidden = true;
    document.body.classList.remove('modal-open');
    if(heroVideoEl) heroVideoEl.pause();
  };
  if(openHeroVideo && heroVideoModal){
    openHeroVideo.addEventListener('click', () => {
      heroVideoModal.hidden = false;
      document.body.classList.add('modal-open');
      if(heroVideoEl){
        heroVideoEl.muted = false;
        heroVideoEl.currentTime = 0;
        heroVideoEl.play().catch(() => {});
      }
    });
    heroVideoModal.querySelectorAll('[data-close-hero-video]').forEach(el => el.addEventListener('click', closeHeroVideo));
    document.addEventListener('keydown', e => {
      if(e.key === 'Escape' && !heroVideoModal.hidden) closeHeroVideo();
    });
  }

})();
