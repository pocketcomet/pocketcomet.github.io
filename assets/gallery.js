(() => {
  const tabs = [...document.querySelectorAll('[data-screen]')];
  const picture = document.querySelector('#app-screen');
  const panel = document.querySelector('#screen-panel');
  if (!picture || !panel || !tabs.length) return;
  const assetBase = new URL(picture.getAttribute('src'), document.baseURI);
  function choose(tab, focus) {
    tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    picture.src = new URL(tab.dataset.screen, assetBase).href;
    picture.alt = tab.dataset.alt;
    panel.setAttribute('aria-labelledby', tab.id);
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => choose(tab, false));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); choose(tabs[next], true); }
    });
  });
})();
