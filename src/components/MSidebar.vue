<!-- sidebar component -->
<template>
  <div class="sidebar row align-items-center">
    <div class="col-9">
      <h2>Topics</h2>
    </div>
    <div class="col-3 add-topic">
      <!-- TODO functionality add topic -->
      <i class="fas fa-plus"></i>
    </div>
    <hr/>
    <m-sidebar-topic
      v-for="topic in topics"
      :key="topic.id"
      v-bind:topic="topic">
    </m-sidebar-topic>
    <div class="btn-group col-12 topic-button-group d-flex"
      aria-label="topic button" role="group">
      <button type="button" class="btn topic-button w-100 settings-button"
        @click="changeAll">
        <span v-if="allOnOrOff">unselect all topics</span>
        <span v-else>select all topics</span>
      </button>
    </div>
    <hr/>
    <div class="col-12 settings">
      <h2>Settings</h2>
    </div>
  </div>
</template>

<script>
import MSidebarTopic from '@/components/MSidebarTopic'
import EventBus from '@/event-bus'

export default {
  name: 'MSidebar',
  components: {
    MSidebarTopic
  },
  props: [ 'topics' ],
  data: function () {
    return { allOnOrOff: true }
  },
  methods: {
    // change variable allOnOrOff locally and emit event ALL_TOPICS_ON/OFF
    changeAll: function () {
      if (this.allOnOrOff) {
        this.allOnOrOff = false
        this.$store.commit('ALL_TOPICS_OFF')
        // console.log('MatrixSidebar: emitted ALL_TOPICS_OFF')
      } else {
        this.allOnOrOff = true
        this.$store.commit('ALL_TOPICS_ON')
        // console.log('MatrixSidebar: emitted ALL_TOPICS_ON')
      }
    }
  }
}
</script>

<style scoped>
.sidebar {
  border: 1px solid black;
  border-radius: 5px;
  margin-left: 2px;
  padding: 5px;
}
.sidebar h2 {
  margin-top: 5px;
  padding-top: 10px;
}
.settings {
  border-top: 1px solid black;
  margin-top: 10px;
}
.settings-button {
  background-color: #646563;
}
</style>
