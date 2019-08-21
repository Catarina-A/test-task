export default `
<div class="configurator-preview"
  :class="{visible: isViewMode}"
>
  <div class="configurator-preview__inner">
    <div class="configurator-preview__images" ref="images">
      <img
      v-for="step in stepImages"
      :src="step" 
      alt="layer of configurator"
      >
      <div class="configurator-preview__size">
        <span>{{selectedSize}}</span>
      </div>
    </div>
    <div class="configurator-preview__side-select">
      <button
        v-for="side in sidesArray"
        :class="{
          active: activeSide === side
        }"
        @click="activeSide = side"
      >{{side}}</button>
    </div>
  </div>
</div>
`;
