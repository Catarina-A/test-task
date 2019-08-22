export default `
<div class="configurator-preview"
  :class="{visible: isViewMode}"
>
  <div class="configurator-preview__inner">
    <div class="configurator-preview__images" ref="images">
      <div class="configurator-preview__images-box">
        <transition-group name="configurator-image-animation" tag="div">
          <img
          v-for="src in selectedImages"
          :src="src" 
          :key="src"
          alt="layer of configurator"
          >
        </transition-group>
        <div class="configurator-preview__size">
          <span>{{selectedSize}}</span>
        </div>
      </div>
    </div>
    <div class="configurator-preview__side-select">
      <button
        v-for="side in sidesArray"
        :class="{
          active: activeSide === side
        }"
        @mouseenter="loadImageOnHoverSide(side)"
        @click="activeSide = side"
      >{{side}}</button>
    </div>
  </div>
  <div class="configurator-preview__preloaded-images" v-if="loadedImagesArr.length">
    <img :src="src" alt="preloded image" v-for="src in loadedImagesArr" :key="src">
  </div>
</div>
`;
