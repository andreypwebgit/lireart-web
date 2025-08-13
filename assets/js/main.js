// LiReArt — JS ligero para navegación, galería y consentimiento
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initFilters();
    initLightbox();
    initCookieBanner();
  });

  function qs(sel, el = document) { return el.querySelector(sel); }
  function qsa(sel, el = document) { return [...el.querySelectorAll(sel)]; }

  function initMobileNav() {
    const btn = qs('#menu-toggle');
    const menu = qs('#mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', String(!open));
    });
  }

  function initFilters() {
    const container = qs('[data-gallery]');
    if (!container) return;
    const items = qsa('[data-item]', container);
    const buttons = qsa('[data-filter]');

    buttons.forEach(b => b.addEventListener('click', () => {
      const f = b.dataset.filter;
      buttons.forEach(x => x.classList.remove('bg-brand-purple','text-white'));
      b.classList.add('bg-brand-purple','text-white');
      items.forEach(it => {
        const ok = f === 'all' || it.dataset.category === f;
        it.classList.toggle('hidden', !ok);
      });
    }));
  }

  function initLightbox() {
    const gallery = qs('[data-gallery]');
    if (!gallery) return;

    // Crear modal accesible
    const modal = document.createElement('div');
    modal.id = 'lightbox';
    modal.className = 'fixed inset-0 z-50 hidden items-center justify-center bg-black/80 p-4';
    modal.innerHTML = `
      <div role="dialog" aria-modal="true" aria-label="Vista ampliada" class="max-w-4xl w-full">
        <button id="lb-close" class="mb-3 btn-ghost text-white" aria-label="Cerrar">Cerrar ✕</button>
        <img id="lb-img" src="" alt="Pieza seleccionada" class="w-full rounded-2xl shadow-soft" />
        <p id="lb-cap" class="mt-3 text-white/90"></p>
      </div>`;
    document.body.appendChild(modal);

    const lbImg = qs('#lb-img', modal);
    const lbCap = qs('#lb-cap', modal);
    const close = () => modal.classList.add('hidden');
    qs('#lb-close', modal).addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    gallery.addEventListener('click', (e) => {
      const fig = e.target.closest('[data-item]');
      if (!fig) return;
      const img = qs('img', fig);
      const cap = qs('figcaption', fig);
      lbImg.src = img.src;
      lbImg.alt = img.alt || 'Pieza LiReArt';
      lbCap.textContent = cap ? cap.textContent : '';
      modal.classList.remove('hidden');
    });
  }

  function initCookieBanner() {
    const KEY = 'lireart_consent_v1';
    if (localStorage.getItem(KEY)) return; // No usamos cookies de terceros; sólo guardamos preferencia

    const bar = document.createElement('div');
    bar.className = 'fixed bottom-4 inset-x-4 z-50 glass rounded-2xl p-4 shadow-soft text-sm text-brand-dark';
    bar.innerHTML = `
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p class="leading-snug">Usamos almacenamiento local para recordar tu preferencia de privacidad. No utilizamos cookies de terceros. Consulta la <a href="/cookies.html" class="underline">política de cookies</a>.</p>
        <div class="flex gap-2">
          <button class="btn-ghost" id="consent-decline">Rechazar</button>
          <button class="btn-primary" id="consent-accept">Aceptar</button>
        </div>
      </div>`;
    document.body.appendChild(bar);

    qs('#consent-accept', bar).addEventListener('click', () => {
      localStorage.setItem(KEY, 'accepted');
      bar.remove();
    });
    qs('#consent-decline', bar).addEventListener('click', () => {
      localStorage.setItem(KEY, 'declined');
      bar.remove();
    });
  }
})();