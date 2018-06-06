<!-- matrix component receives events, modifies topicData, hands it to topics-->
<template lang="html">
  <div class="row">
    <v-stage ref="stage" :config="configKonva">
      <v-layer ref="arrows" :config="configArrows">
        <v-arrow ref="xArrow" :config="configXArrow"></v-arrow>
        <v-arrow ref="yArrow" :config="configYArrow"></v-arrow>
        <v-line ref="yLine" :config="configYLine"></v-line>
        <v-line ref="xLine" :config="configXLine"></v-line>
      </v-layer>
      <m-matrix-topic
        v-for="topic in topics"
        :key="topic.id"
        v-bind:topic="topic"
        v-bind:dimensions="dimensions">
      </m-matrix-topic>
    </v-stage>
  </div>
</template>

<script>
import axios from 'axios'

import MMatrixTopic from '@/components/MMatrixTopic'
import EventBus from '@/event-bus'
import {HTTP} from '@/api-route'

export default {
  name: 'MMatrix',
  props: [ 'topics', 'dimensions' ],
  components: {
    MMatrixTopic
  },
  data: function () {
    return {
      errors: [],
      // TODO settings with different sizes of canvas
      configKonva: {
        width: this.dimensions.width,
        height: this.dimensions.height
      },
      configXArrow: {
        points: [
          25,
          this.dimensions.height-25,
          this.dimensions.width-25,
          this.dimensions.height-25
        ],
        pointerLength: 20,
        pointerWidth: 20,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4
      },
      configYArrow: {
        points: [
          25,
          this.dimensions.height-25,
          25,
          25
        ],
        pointerLength: 20,
        pointerWidth: 20,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4
      },
      configYLine: {
        points: [
          this.dimensions.width/2,
          this.dimensions.height-25,
          this.dimensions.width/2,
          25
        ],
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2
      },
      configXLine: {
        points: [
          25,
          this.dimensions.height/2,
          this.dimensions.width-25,
          this.dimensions.height/2
        ],
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2
      },
      configArrows: {
        visible: true
      }
    }
  }
}
//<!--v-show="topic.on"-->
</script>

<style lang="css">
</style>
