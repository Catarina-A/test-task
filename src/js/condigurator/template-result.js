export default `
<transition name="configurator-transition">
  <div class="configurator-result" v-show="isTimeToConfirm">
    <div class="configurator-result__inner">
      <ul class="configurator-result__list" ref="resultList" id="test">
        <li class="configurator-result__item"
        v-for="(step, index) in steps"
        >
          <span class="configurator-result__item-name">{{step.resultsTitle}}</span>
          <span class="configurator-result__item-value"
          :class="{
            italic: step.modifier !== 'size'
          }"
          >{{steps[index].elements[selectedElement['step_' + index]].name}} <span v-if="step.modifier === 'size'">cm</span></span>
        </li>
      </ul>
      <div class="configurator-result__buttons" v-if="pdfScriptIsLoaded">
        <div class="configurator-result__button">
          <button class="button" @click="downloadPDF()">Download PDF</button>
        </div>
        <div class="configurator-result__button">
          <button class="button">Share PDF</button>
        </div>
      </div>
      <p class="configurator-result__info">Or if you have any question or if you want to see your bed in person, <a :href="baseURL + 'contact'">get in touch</a> or find a store.</p>
    </div>
  </div>
</transition>
`
