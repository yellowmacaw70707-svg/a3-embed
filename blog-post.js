// The A3 Studio blog: the list page (a3-studio/blog, .a3blog) and the articles of the Tilda feed
// «Статьи по сайтам» (loaded from the feed's custom HTML). Adds the site header with «Экосистема»;
// an article is wrapped into the case-page frame (.a3c) with crumbs and the offer block. Then
// case-page.js adds the footer, the cookie notice and Metrika the same way as on case pages.
(function () {
  var E = location.hostname === '127.0.0.1' ? '/' : 'https://yellowmacaw70707-svg.github.io/a3-embed/';
  var HOME = '/a3-studio';
  // keep in sync with src/ui/eco.js
  var ECO = [
    ['A3 Marketplace', 'Продвижение на маркетплейсах', 'https://a3-agency.ru/marketplace'],
    ['A3 Bot', 'ИИ-боты для бизнеса', 'https://a3-agency.ru/a3bot'],
    ['A3 Context', 'Контекстная реклама', 'https://a3-agency.ru/a3-context'],
    ['A3 SEO', 'SEO-продвижение', 'https://a3-agency.ru/a3-seo'],
    ['A3 SMM', 'Ведение соцсетей', 'https://a3-agency.ru/a3-smm']
  ];
  function nav() {
    var links = [['Работы', '/works'], ['Услуги', '/services'], ['О студии', '/about'], ['Блог', '/blog'], ['Контакты', '/contacts']];
    var n = document.createElement('nav');
    n.className = 'a3c__nav';
    n.innerHTML = '<a class="a3c__logo" href="' + HOME + '">A3</a><div class="a3post__menu">' +
      links.map(function (l) { return '<a href="' + HOME + l[1] + '">' + l[0] + '</a>'; }).join('') +
      '<div class="a3eco"><span class="a3eco__btn">Экосистема <i>▾</i></span><div class="a3eco__list">' +
      ECO.map(function (p) { return '<a href="' + p[2] + '"><b>' + p[0] + '</b><span>' + p[1] + '</span></a>'; }).join('') +
      '</div></div></div><a class="a3c__btn" href="' + HOME + '/contacts">Обсудить проект</a>';
    return n;
  }
  function footEco() {
    // the «Экосистема» column next to «Ссылки» in the footer case-page.js draws
    var t = setInterval(function () {
      var sm = document.querySelector('.a3c-foot .foot__sm');
      if (!sm) return;
      clearInterval(t);
      if (document.querySelector('.a3c-foot .foot__eco')) return;
      var ul = document.createElement('ul');
      ul.className = 'foot__sm foot__eco';
      ul.innerHTML = '<li class="foot__head">Экосистема</li>' + ECO.map(function (p) { return '<li><a href="' + p[2] + '">' + p[0] + '</a></li>'; }).join('');
      sm.after(ul);
    }, 200);
    setTimeout(function () { clearInterval(t); }, 15000);
  }
  // the articles come from the feed's RSS (Tilda keeps it up to date), so a new article shows up
  // in the blog list and in «Читайте далее» as soon as it is published, with no deploy
  var RSS = '/rss-feed-347949535251.xml';
  var MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  function posts() {
    return fetch(RSS).then(function (r) { return r.text(); }).then(function (x) {
      var doc = new DOMParser().parseFromString(x, 'text/xml');
      return [].map.call(doc.querySelectorAll('item'), function (it) {
        var get = function (t) { var e = it.getElementsByTagName(t)[0]; return e ? e.textContent.trim() : ''; };
        var d = new Date(get('pubDate'));
        return { title: get('title'), descr: get('description'), url: new URL(get('link')).pathname, date: d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear() };
      });
    });
  }
  var esc = function (t) { var d = document.createElement('div'); d.textContent = t; return d.innerHTML; };
  function card(p, tag) {
    return '<a class="a3blog__card" href="' + p.url + '"><span class="a3blog__meta"><time>' + p.date + '</time></span><' + tag + '>' + esc(p.title) + '</' + tag + '><p>' + esc(p.descr) + '</p><b>Читать ↗</b></a>';
  }
  function fillList(box) {
    posts().then(function (all) { box.innerHTML = all.map(function (p) { return card(p, 'h2'); }).join(''); }).catch(function () {});
  }
  // «Читайте далее»: up to 3 random other articles, after the offer block
  function more(after) {
    posts().then(function (all) {
      var others = all.filter(function (p) { return p.url !== location.pathname; });
      for (var i = others.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = others[i]; others[i] = others[j]; others[j] = t; }
      others = others.slice(0, 3);
      if (!others.length) return;
      var box = document.createElement('section');
      box.className = 'a3more';
      box.innerHTML = '<h2 class="a3more__title">Читайте далее</h2><div class="a3blog__list">' + others.map(function (p) { return card(p, 'h3'); }).join('') +
        '</div><a class="a3more__all" href="' + HOME + '/blog">Все статьи ↗</a>';
      after.after(box);
    }).catch(function () {});
  }
  function loadCasePage() {
    var s = document.createElement('script');
    s.src = E + 'case-page.js?v=' + Date.now().toString().slice(0, 7);
    document.head.appendChild(s);
  }
  function run() {
    var list = document.querySelector('.a3blog');
    if (list) {
      if (list.querySelector('.a3c__nav')) return;
      list.prepend(nav());
      var box = list.querySelector('.a3blog__list');
      if (box) fillList(box);
      footEco();
      loadCasePage();
      return;
    }
    var post = document.querySelector('.t-feed__post-popup');
    if (!post || document.querySelector('.a3post')) return;
    document.body.classList.add('a3post-body');
    var wrap = document.createElement('div');
    wrap.className = 'a3c a3post';
    post.parentNode.insertBefore(wrap, post);
    wrap.appendChild(nav());
    wrap.appendChild(post);
    var crumbs = document.createElement('div');
    crumbs.className = 'a3post__crumbs';
    crumbs.innerHTML = '<a href="' + HOME + '">A3 Studio</a><i>/</i><a href="' + HOME + '/blog">Блог</a>';
    var tw = post.querySelector('.t-feed__post-popup__date-parts-wrapper') || post.querySelector('.t-feed__post-popup__title-wrapper');
    if (tw) tw.parentNode.insertBefore(crumbs, tw);
    var cta = document.createElement('div');
    cta.className = 'a3c__cta';
    (post.querySelector('.t-feed__post-popup__content') || post).appendChild(cta);
    more(cta);
    // the close «x» of the popup layout is not needed on a page
    post.querySelectorAll('.t-popup__close, .t-feed__post-popup__close-wrapper').forEach(function (c) { c.remove(); });
    footEco();
    loadCasePage();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
