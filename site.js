(() => {
  const supported = ['ko', 'en', 'zh-Hans', 'zh-Hant'];
  const requested = new URLSearchParams(location.search).get('lang');
  const device = navigator.language || 'en';
  const initial = supported.includes(requested) ? requested : device.startsWith('ko') ? 'ko' : device.startsWith('zh') ? /Hant|TW|HK|MO/i.test(device) ? 'zh-Hant' : 'zh-Hans' : 'en';
  function show(language, updateUrl = false) {
    if (!supported.includes(language)) return;
    document.documentElement.lang = language;
    for (const panel of document.querySelectorAll('[data-language-panel]')) panel.hidden = panel.dataset.languagePanel !== language;
    for (const link of document.querySelectorAll('[data-language]')) {
      if (link.dataset.language === language) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
    const heading = document.querySelector(`[data-language-panel="${language}"] h1`);
    if (heading) document.title = 'Past Self · ' + heading.textContent;
    if (updateUrl) {
      try { const url = new URL(location.href); url.searchParams.set('lang', language); url.hash = language; history.replaceState(null, '', url); } catch {}
      window.scrollTo(0, 0);
    }
  }
  for (const link of document.querySelectorAll('[data-language]')) link.addEventListener('click', event => { event.preventDefault(); show(link.dataset.language, true); });
  show(initial);
})();
