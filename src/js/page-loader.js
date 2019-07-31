import homePage from './pages/home-page';

export default function() {
  const attr = 'data-page-name';

  const pageSelector = document.querySelector(`[${attr}]`);
  if (!pageSelector) return;

  const pageList = {
    'home-page': homePage,
  };

  const pageName = pageSelector.getAttribute(attr);

  if (pageName && pageList[pageName]) {
    pageList[pageName]();
  }

}
