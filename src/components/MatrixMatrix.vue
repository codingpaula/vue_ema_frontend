<template lang="html">
  <div class="row">
    <v-stage ref="stage" :config="configKonva">
      <matrix-one-topic
        v-for="topic in topicList"
        :key="topic.id"
        v-bind:topic="topic"
        v-show="topic.on">
      </matrix-one-topic>
    </v-stage>
  </div>
</template>

<script>
import MatrixOneTopic from '@/components/MatrixOneTopic'
import EventBus from '@/event-bus'

export default {
  name: 'MatrixMatrix',
  props: [ 'topics' ],
  components: {
    MatrixOneTopic
  },
  data: function () {
    var topicList = []
    this.topics.forEach(function(topic) {
      topicList.push(Object.assign({}, topic, { on: true }))
    })
    return {
      topicList: topicList,
      configKonva: {
        width: 800,
        height: 800
      }
    }
  },
  methods: {
    switchTopic: function(topic) {
      var index = this.topicList.findIndex(function(x) {
        if (x.id == topic) return true
      })
      this.topicList[index].on = !this.topicList[index].on
    },
    allTopicsOn: function() {
      this.topicList.forEach(function(topic) {
        if (!topic.on) topic.on = true
      })
    },
    allTopicsOff: function () {
      this.topicList.forEach(function(topic) {
        if (topic.on) topic.on = false
      })
    }
  },
  mounted: function () {
    EventBus.$on('TOGGLE_TOPIC', (topic) => this.switchTopic(topic))
    EventBus.$on('ALL_TOPICS_ON', (payLoad) => this.allTopicsOn())
    EventBus.$on('ALL_TOPICS_OFF', (payLoad) => this.allTopicsOff())
  }
}
</script>

<style lang="css">
</style>
