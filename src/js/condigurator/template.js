import settings from './template-settings';
import preview from './template-preview';

export default `
<div class="configurator">
  <div class="configurator__bg">
    <picture>
      <source type="image/webp" :srcset="baseURL + 'img/intro-bg.webp'">
      <source type="image/jpeg" :srcset="baseURL + 'img/intro-bg.jpg'">
      <img src="/img/intro-bg.jpg" alt="background">
    </picture>
  </div>
  ${settings}
  ${preview}
</div>
`;
