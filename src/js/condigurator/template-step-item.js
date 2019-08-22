export default `
<div class="configurator-step-item"
   :class="[
   ('configurator-step-item--' + step.modifier),
   {active: selectedElement['step_' + stepIndex] === elementIndex}
   ]"
   @click="handleElementClick(stepIndex, elementIndex)"
   @mouseenter="loadImageOnHoverElement(element)"
   data-cursor-type="bigger"
   v-for="(element, elementIndex) in step.elements"
>
  <div class="configurator-step-item__inner">
    <div class="configurator-step-item__image">
      <img :src="element.thumbnail" :alt="'image for ' +  element.name">
    </div>
    <div class="configurator-step-item__name">
      <span v-if="step.modifier === 'mattress'">N° {{elementIndex + 1}}</span>
      <span><span v-html="element.name"></span><span v-if="step.modifier === 'size'"> cm</span></span>
    </div>
  </div>
</div>
`;
