// Tilda case pages (a3-agency.ru/a3-studio/cases/...): loaded once for the whole project from the
// project head code, so changes here reach all 32 pages without re-uploading them.
// On a case page it adds the site footer and fixes the links; on other pages it does nothing.
(function () {
  function run() {
    var page = document.querySelector('.a3c');
    if (!page || document.querySelector('.a3c-foot')) return;
    var HOME = '/a3-studio';
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
      '<ul class="foot__sm"><li class="foot__head">Ссылки ▾</li>' + ['Telegram', 'VK', 'Behance', 'Dribbble', 'Instagram', 'YouTube'].map(function (n) { return '<li><a href="#">' + n + '</a></li>'; }).join('') + '</ul>' +
      '</div><div class="foot__right">' +
      '<div class="foot__btns"><a href="' + HOME + '/contacts">Обсудить проект <i>↗</i></a><a href="#">Telegram <i>↗</i></a></div>' +
      '<div class="foot__legal"><a href="#">Политика конфиденциальности</a></div>' +
      '<p class="foot__copy">©2026 A3 Studio</p></div></div>' +
      '<a class="foot__giant" href="' + HOME + '/contacts" aria-label="Написать A3 Studio"><span>НАПИСАТЬ</span><span>A3 STUDIO</span></a>';
    page.after(foot);
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
