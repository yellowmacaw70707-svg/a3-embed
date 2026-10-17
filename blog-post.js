// Tilda feed posts of A3 Studio (feed «Статьи по сайтам»): loaded from the feed's custom HTML.
// Wraps the post into the case-page frame (.a3c), adds the site header and the offer block,
// then case-page.js adds the footer, the cookie notice and Metrika the same way as on case pages.
(function () {
  var E = 'https://yellowmacaw70707-svg.github.io/a3-embed/';
  function run() {
    var post = document.querySelector('.t-feed__post-popup');
    if (!post || document.querySelector('.a3post')) return;
    var HOME = '/a3-studio';
    document.body.classList.add('a3post-body');
    var wrap = document.createElement('div');
    wrap.className = 'a3c a3post';
    post.parentNode.insertBefore(wrap, post);
    var links = [['Работы', '/works'], ['Услуги', '/services'], ['О студии', '/about'], ['Контакты', '/contacts']];
    wrap.innerHTML = '<nav class="a3c__nav"><a class="a3c__logo" href="' + HOME + '">A3</a><div class="a3post__menu">' +
      links.map(function (l) { return '<a href="' + HOME + l[1] + '">' + l[0] + '</a>'; }).join('') +
      '</div><a class="a3c__btn" href="' + HOME + '/contacts">Обсудить проект</a></nav>';
    wrap.appendChild(post);
    var crumbs = document.createElement('div');
    crumbs.className = 'a3post__crumbs';
    crumbs.innerHTML = '<a href="' + HOME + '">A3 Studio</a><i>/</i><span>Статьи</span>';
    var tw = post.querySelector('.t-feed__post-popup__title-wrapper');
    if (tw) tw.parentNode.insertBefore(crumbs, tw);
    var cta = document.createElement('div');
    cta.className = 'a3c__cta';
    (post.querySelector('.t-feed__post-popup__content') || post).appendChild(cta);
    // the close «x» of the popup layout leads to the blog
    post.querySelectorAll('.t-popup__close, .t-feed__post-popup__close-wrapper').forEach(function (c) { c.remove(); });
    var s = document.createElement('script');
    s.src = E + 'case-page.js?v=' + Date.now().toString().slice(0, 7);
    document.head.appendChild(s);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
