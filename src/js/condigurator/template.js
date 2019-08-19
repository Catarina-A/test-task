import settings from './template-settings';
import preview from './template-preview';
import result from './template-result';
import header from './template-header';
import outConfirmation from './template-out-confirmation';

export default `
<div class="configurator">
  ${outConfirmation}
  ${header}
  <div class="configurator__build-part" ref="content">
    <div class="configurator__bg">
      <!--<picture>
        <source type="image/webp" :srcset="baseURL + 'img/intro-bg.webp'">
        <source type="image/jpeg" :srcset="baseURL + 'img/intro-bg.jpg'">
        <img src="/img/intro-bg.jpg" alt="background">
      </picture>-->
    </div>
    ${settings}
    ${result}
    ${preview}
  </div>
</div>
`;
