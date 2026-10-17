// Tilda case pages (a3-agency.ru/a3-studio/cases/...): loaded once for the whole project from the
// project head code, so changes here reach all 32 pages without re-uploading them.
// On a case page it adds the site footer and fixes the links; on other pages it does nothing.
(function () {
  function run() {
    var page = document.querySelector('.a3c');
    if (!page || document.querySelector('.a3c-foot')) return;
    var HOME = '/a3-studio';
    // Yandex Metrika of A3 Studio (counter 113658769): only on the studio case pages
    var startYm = function () {
    if (!window.__a3ym) {
      window.__a3ym = true;
      (function (m, e, t, r, i, k, a) { m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); }; m[i].l = 1 * new Date(); for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) return; } k = e.createElement(t); a = e.getElementsByTagName(t)[0]; k.async = 1; k.src = r; a.parentNode.insertBefore(k, a); })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=113658769', 'ym');
      window.ym(113658769, 'init', { ssr: true, webvisor: true, clickmap: true, referrer: document.referrer, url: location.href, accurateTrackBounce: true, trackLinks: true });
      document.addEventListener('click', function (ev) { var l = ev.target.closest && ev.target.closest('a[href]'); if (l && /^(https?:)?\/\/(t\.me|wa\.me|max\.ru)\//.test(l.getAttribute('href'))) window.ym(113658769, 'reachGoal', 'click_messenger'); }, true);
    }
    };
    // Metrika from the first visit; the cookie notice only informs (shown once per browser)
    startYm();
    var ckSeen = false; try { ckSeen = !!localStorage.getItem('a3-cookie'); } catch (e) {}
    if (!ckSeen) {
      var ck = document.createElement('div'); ck.className = 'ck'; ck.setAttribute('role', 'status');
      ck.innerHTML = '<p class="ck__text">Мы используем cookie и Яндекс Метрику. <a href="' + HOME + '/confidence">Подробнее</a></p><div class="ck__btns"><button class="yes" type="button">Ок</button></div>';
      document.body.appendChild(ck);
      var ckClose = function () { if (!ck.parentNode) return; try { localStorage.setItem('a3-cookie', 'ok'); } catch (e) {} ck.classList.remove('on'); window.removeEventListener('scroll', ckScroll); setTimeout(function () { ck.remove(); }, 600); };
      var ckY = null; var ckScroll = function () { if (ckY === null) { ckY = window.scrollY; return; } if (Math.abs(window.scrollY - ckY) > 80) ckClose(); };
      setTimeout(function () { ck.classList.add('on'); window.addEventListener('scroll', ckScroll); }, 1800);
      ck.querySelector('.yes').addEventListener('click', ckClose);
    }
    var HELLO = encodeURIComponent('Здравствуйте! Пишу по поводу создания сайта.');
    var TG = 'https://t.me/Agency_a3?text=' + HELLO, WA = 'https://wa.me/79180337015?text=' + HELLO, MAX = 'https://max.ru/u/f9LHodD0cOL55TPSFyPvoONvFPdmK_7ai1wAXHZZeKI27mL5WTRMpC79K4I';
    // the final offer: price and term of this case's site type
    var PRICES = { lendingi: ['лендинг', 'от 50 000 ₽', 'от 20 дней'], korporativnye: ['корпоративный сайт', 'от 150 000 ₽', 'от 30 дней'], magaziny: ['интернет-магазин', 'от 150 000 ₽', 'от 30 дней'], eksperty: ['сайт эксперта', 'от 80 000 ₽', 'от 20 дней'], media: ['блог или медиа', 'от 80 000 ₽', 'от 20 дней'], servisy: ['сервис', 'от 200 000 ₽', 'от 30 дней'] };
    var type = (location.pathname.match(/\/cases\/([^/]+)/) || [])[1];
    var pr = PRICES[type] || ['сайт', 'от 50 000 ₽', 'от 20 дней'];
    document.querySelectorAll('.a3c__cta').forEach(function (c) {
      c.innerHTML = page.classList.contains('a3post')
        ? '<div class="a3c__cta-text"><p>Нужен сайт для вашего бизнеса?</p><span>Лендинг <b>от 50 000 ₽</b>, корпоративный сайт <b>от 150 000 ₽</b>. Точную смету назовём после короткого звонка.</span></div><a href="' + HOME + '/contacts">Обсудить проект →</a>'
        : '<div class="a3c__cta-text"><p>Хотите такой же сайт для своего бизнеса?</p><span>Похожий ' + pr[0] + ': <b>' + pr[1] + '</b>, ' + pr[2] + '. Точную смету назовём после короткого звонка.</span></div><a href="' + HOME + '/contacts">Обсудить проект →</a>';
    });
    // «На главную» lands on the cases block of the main page
    document.querySelectorAll('.a3c__back').forEach(function (a) { a.href = HOME + '#cases'; });
    // «Обсудить проект» leads to the contacts page (the request form lives there)
    document.querySelectorAll('a[href$="#contact"]').forEach(function (a) { a.href = HOME + '/contacts'; });
    var links = [['Главная', HOME], ['Работы', HOME + '/works'], ['Услуги', HOME + '/services'], ['О студии', HOME + '/about'], ['Лаборатория', HOME + '/lab'], ['Контакты', HOME + '/contacts']];
    var li = function (l) { return '<li><a href="' + l[1] + '">' + l[0] + '</a></li>'; };
    var foot = document.createElement('footer');
    foot.className = 'foot a3c-foot';
    foot.innerHTML =
      '<div class="foot__top"><div class="foot__cols">' +
      '<ul>' + links.slice(0, 3).map(li).join('') + '</ul>' +
      '<ul>' + links.slice(3).map(li).join('') + '</ul>' +
      '<ul class="foot__sm"><li class="foot__head">Ссылки ▾</li><li><a href="https://t.me/fdxcyghbnhjn" target="_blank" rel="noopener">Telegram-канал</a></li>' + ['VK', 'Behance', 'Dribbble', 'Instagram', 'YouTube'].map(function (n) { return '<li><a href="#" data-soon>' + n + '</a></li>'; }).join('') + '</ul>' +
      '</div><div class="foot__right">' +
      '<div class="foot__btns"><a href="' + HOME + '/contacts">Обсудить проект <i>↗</i></a><a href="' + TG + '" target="_blank" rel="noopener">Telegram <i>↗</i></a><a href="' + WA + '" target="_blank" rel="noopener">WhatsApp <i>↗</i></a><a href="' + MAX + '" target="_blank" rel="noopener">MAX <i>↗</i></a></div>' +
      '<div class="foot__legal"><a href="' + HOME + '/confidence">Политика конфиденциальности</a></div>' +
      '<p class="foot__copy">©2026 A3 Studio</p></div></div>' +
      '<a class="foot__giant" href="' + HOME + '/contacts" aria-label="Написать A3 Studio"><span>НАПИСАТЬ</span><span>A3 STUDIO</span></a>';
    page.after(foot);
    // socials without an address yet: a short notice
    foot.addEventListener('click', function (ev) {
      var s = ev.target.closest('[data-soon]'); if (!s) return; ev.preventDefault();
      var t = document.querySelector('.a3-toast') || document.body.appendChild(Object.assign(document.createElement('div'), { className: 'a3-toast' }));
      t.textContent = 'Скоро здесь будет актуальная ссылка'; t.classList.add('on'); clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove('on'); }, 2600);
    });
    // each line of the big text spans the footer width minus 10px a side
    var fit = function () {
      foot.querySelectorAll('.foot__giant span').forEach(function (s) {
        s.style.fontSize = '100px';
        s.style.fontSize = (100 * s.parentElement.clientWidth / s.getBoundingClientRect().width) + 'px';
      });
    };
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(fit);
    window.addEventListener('resize', fit);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  window.addEventListener('load', run);
})();
