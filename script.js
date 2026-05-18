document.addEventListener('DOMContentLoaded', function () {

  // ── Mobile nav ──────────────────────────────────────────────
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger?.addEventListener('click', function () {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  document.addEventListener('click', function (e) {
    if (!hamburger?.contains(e.target) && !navLinks?.contains(e.target)) {
      navLinks?.classList.remove('open');
      hamburger?.classList.remove('open');
    }
  });

  // ── Smooth scroll ────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── FAQ accordion ────────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Calculator ───────────────────────────────────────────────
  const areaInput   = document.getElementById('calc-area');
  const pieceSelect = document.getElementById('calc-piece');
  const doubleChk   = document.getElementById('calc-double');
  const sacosEl     = document.getElementById('calc-sacos');
  const kgEl        = document.getElementById('calc-kg');
  const waBtn       = document.getElementById('calc-wa-btn');

  function calcUpdate() {
    const area   = Math.max(1, parseFloat(areaInput?.value) || 1);
    const base   = parseFloat(pieceSelect?.value) || 4.5;
    const double = doubleChk?.checked;
    const yield_ = double ? base * 0.55 : base;
    const sacos  = Math.max(1, Math.ceil(area / yield_));
    const kg     = sacos * 20;
    const piece  = pieceSelect?.options[pieceSelect.selectedIndex]?.text || '';

    if (sacosEl) sacosEl.innerHTML = sacos;
    if (kgEl)    kgEl.innerHTML    = `${kg}<span style="font-size:18px;margin-left:4px">kg</span>`;

    if (waBtn) {
      const msg = `Olá! Calculei ${sacos} sacos (~${kg}kg) pra ${area}m² em peças ${piece}${double ? ' (dupla camada)' : ''}. Pode me passar um orçamento?`;
      waBtn.href = `https://wa.me/5577999742551?text=${encodeURIComponent(msg)}`;
    }
  }

  areaInput?.addEventListener('input', calcUpdate);
  pieceSelect?.addEventListener('change', calcUpdate);
  doubleChk?.addEventListener('change', calcUpdate);
  calcUpdate();

  // ── Lote code with current year ──────────────────────────────
  const loteEl = document.getElementById('lote-code');
  if (loteEl) loteEl.textContent = `lote AC-${new Date().getFullYear()}/03`;
});
