export default `
<div class="configurator-header"
  :class="{
    small: headerIsSmall,
    black: isTimeToConfirm
    }"
  :data-cursor-color="headerIsWhite ? 'white' : ''"
  ref="header"
>
  <div class="configurator-header__inner">
    <button class="configurator-header__back"
      :class="{visible: isTimeToConfirm}"
      @click="isTimeToConfirm = false"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.5 13.1">
        <path d="M2.1 6.6l5.4-5.5L6.4 0 0 6.6l6.4 6.5L7.5 12z"/>
      </svg>
      <span>go back</span>
    </button>
    <button class="configurator-header__leave"
      @click="outConfirmationIsOpened = true"
    >
      <span>leave</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.2 16">
        <path d="M9.1 6.9L14 2l1.1 1.1L10.2 8l4.9 4.9L14 14 9.1 9l-4.9 5-1.1-1.1 5-4.9-5-4.9L4.2 2l4.9 4.9z"/>
      </svg>
    </button>
  </div>
</div>
`;
