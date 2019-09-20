import homePage from './pages/home-page';

export default function() {
  const pageName = document.body.getAttribute('data-page-name');
  if (!pageName) return;

  const pageList = {
    homePage,
  };

  if (pageName && pageList[pageName]) pageList[pageName]();
}
