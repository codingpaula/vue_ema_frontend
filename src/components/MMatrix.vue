<!-- matrix component receives events, modifies topicData, hands it to topics-->
<template lang="html">
  <div class="row">
    <v-stage ref="stage" :config="configKonva">
      <m-matrix-topic
        v-for="topic in topicList"
        :key="topic.id"
        v-bind:topic="topic"
        v-show="topic.on">
      </m-matrix-topic>
    </v-stage>
  </div>
</template>

<script>
import MMatrixTopic from '@/components/MMatrixTopic'
import EventBus from '@/event-bus'

export default {
  name: 'MMatrix',
  props: [ 'topics' ],
  components: {
    MMatrixTopic
  },
  data: function () {
    var topicList = []
    // add property to track toggle in sidebar
    this.topics.forEach(function(topic) {
      topicList.push(Object.assign({}, topic, { on: true }))
    })
    return {
      topicList: topicList,
      // TODO settings with different sizes of canvas
      configKonva: {
        width: 800,
        height: 800
      }
    }
  },
  methods: {
    // turn tasks of one topic on/off
    switchTopic: function(topic) {
      var index = this.topicList.findIndex(function(x) {
        if (x.id == topic) return true
      })
      this.topicList[index].on = !this.topicList[index].on
    },
    // turn all tasks on
    allTopicsOn: function() {
      this.topicList.forEach(function(topic) {
        if (!topic.on) topic.on = true
      })
    },
    // turn all tasks off
    allTopicsOff: function () {
      this.topicList.forEach(function(topic) {
        if (topic.on) topic.on = false
      })
    }
  },
  // eventListeners for event bus for toggle events from sidebar
  mounted: function () {
    EventBus.$on('TOGGLE_TOPIC', (topic) => this.switchTopic(topic))
    EventBus.$on('ALL_TOPICS_ON', (payLoad) => this.allTopicsOn())
    EventBus.$on('ALL_TOPICS_OFF', (payLoad) => this.allTopicsOff())
  }
}
</script>

<style lang="css">
</style>
