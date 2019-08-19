export default `
<div class="configurator-out-confirmation"
  :class="{visible: outConfirmationIsOpened}"
  data-cursor-color="white"
>
  <div class="configurator-out-confirmation__inner">
    <p class="configurator-out-confirmation__title">are you 100% sure you want to leave?</p>
    <div class="configurator-out-confirmation__buttons">
      <div class="configurator-out-confirmation__button">
        <button class="button button--white" @click="goBack">yes, I want to leave</button>
      </div>
      <div class="configurator-out-confirmation__button">
        <button class="button button--white" @click="outConfirmationIsOpened = false">no, keep designing</button>
      </div>
    </div>
  </div>
</div>
`
