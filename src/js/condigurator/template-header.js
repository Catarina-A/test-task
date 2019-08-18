export default `
<div class="configurator-header"
  :class="{small: headerIsSmall}"
  :data-cursor-color="headerIsWhite ? 'white' : ''"
>
  <div class="configurator-header__inner">
    <button class="configurator-header__back"
      @click="goBack()"
    >
      <span>leave</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.2 16">
        <path d="M9.1 6.9L14 2l1.1 1.1L10.2 8l4.9 4.9L14 14 9.1 9l-4.9 5-1.1-1.1 5-4.9-5-4.9L4.2 2l4.9 4.9z"/>
      </svg>
    </button>
  </div>
</div>
`;
