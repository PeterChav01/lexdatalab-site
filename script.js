// Typewriter en bucle — widget de cadena de custodia del hero
document.addEventListener('DOMContentLoaded', () => {
  const log = document.getElementById('custody-log');
  if (!log) return;

  const lines = Array.from(log.querySelectorAll('.log-msg'));
  if (!lines.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    lines.forEach((msg) => { msg.textContent = msg.dataset.text; });
    return;
  }

  const TYPE_SPEED = 22;
  const LINE_PAUSE = 260;
  const LOOP_PAUSE = 2000;
  let cursor = null;

  function typeLine(msg, cb) {
    const text = msg.dataset.text;
    msg.textContent = '';
    cursor = document.createElement('span');
    cursor.className = 'log-cursor';
    msg.after(cursor);
    let i = 0;
    (function step() {
      if (i <= text.length) {
        msg.textContent = text.slice(0, i);
        i++;
        setTimeout(step, TYPE_SPEED);
      } else {
        cursor.remove();
        setTimeout(cb, LINE_PAUSE);
      }
    })();
  }

  function runCycle(index) {
    if (index >= lines.length) {
      setTimeout(() => {
        lines.forEach((msg) => { msg.textContent = ''; });
        runCycle(0);
      }, LOOP_PAUSE);
      return;
    }
    typeLine(lines[index], () => runCycle(index + 1));
  }

  runCycle(0);
});
// Typewriter de una sola pasada — tira de metodología (servicios.html)
document.addEventListener('DOMContentLoaded', () => {
  const strip = document.getElementById('method-strip');
  if (!strip) return;

  const items = Array.from(strip.querySelectorAll('.tw-msg'));
  if (!items.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    items.forEach((msg) => { msg.textContent = msg.dataset.text; });
    return;
  }

  const TYPE_SPEED = 18;

  function typeItem(msg, cb) {
    const text = msg.dataset.text;
    let i = 0;
    (function step() {
      if (i <= text.length) {
        msg.textContent = text.slice(0, i);
        i++;
        setTimeout(step, TYPE_SPEED);
      } else if (cb) {
        cb();
      }
    })();
  }

  function runOnce(index) {
    if (index >= items.length) return;
    typeItem(items[index], () => runOnce(index + 1));
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runOnce(0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(strip);
});

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.getElementById('navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach((el) => observer.observe(el));
});
