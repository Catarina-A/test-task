import stepItem from './template-step-item';

export default `
<div class="configurator-settings" data-cursor-color="white">
  <div class="configurator-settings__steps"
    :class="{
      'no-border': activeStep === steps.length - 1
    }"
  >
    <div class="configurator-settings__step"
      v-for="(step, stepIndex) in steps" :key = step.id>
      <div class="configurator-settings__step-heading"
      data-cursor-type="bigger"
        @click="activeStep = stepIndex"
      >
        <span class="configurator-settings__step-number">{{stepIndex + 1}}</span>
        <span class="configurator-settings__step-title">{{step.title}}</span>
        <span class="configurator-settings__step-selected">{{steps[stepIndex].elements[selectedElement['step_' + stepIndex]].name}}</span>
      </div>
      <div class="configurator-settings__step-content"
        :style="stepIndex > 0 ? 'height: 0' : ''"
        :class="{
          active: activeStep === stepIndex
        }"
        ref="stepContent"
        >
        <div class="configurator-settings__step-content-items"
                ref="stepContentInner"
                :class="'configurator-settings__step-content-items--' + step.modifier"
              >
           ${stepItem}
        </div>
      </div>
    </div>
  </div>
</div>
`;
