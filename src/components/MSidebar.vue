<!-- sidebar component -->
<template>
  <div class="sidebar row align-items-center">
    <div class="col-9">
      <h2>Topics</h2>
    </div>
    <div class="col-3 add-topic">
      <!-- TODO functionality add topic -->
      <font-awesome-icon :icon="plus" />
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
    <div class="row">
      <div class="col-2 color-option" style="background-color: #001f54"></div>
      <div class="col-2 color-option" style="background-color: #1f487e"></div>
      <div class="col-2 color-option" style="background-color: #205b8d"></div>
      <div class="col-2 color-option" style="background-color: #59a5d8"></div>
      <div class="col-2 color-option" style="background-color: #5bc0eb"></div>
      <div class="col-2 color-option" style="background-color: #926639"></div>
      <div class="col-2 color-option" style="background-color: #6f5232"></div>
      <div class="col-2 color-option" style="background-color: #4d4e4e"></div>
      <div class="col-2 color-option" style="background-color: #2e4952"></div>
      <div class="col-2 color-option" style="background-color: #048ba8"></div>
      <div class="col-2 color-option" style="background-color: #137547"></div>
      <div class="col-2 color-option" style="background-color: #528029"></div>
      <div class="col-2 color-option" style="background-color: #8ea604"></div>
      <div class="col-2 color-option" style="background-color: #eabc20"></div>
      <div class="col-2 color-option" style="background-color: #f56416"></div>
      <div class="col-2 color-option" style="background-color: #e71d36"></div>
      <div class="col-2 color-option" style="background-color: #bf211e"></div>
      <div class="col-2 color-option" style="background-color: #671934"></div>
      <div class="col-2 color-option" style="background-color: #d90368"></div>
      <div class="col-2 color-option" style="background-color: #a4036f"></div>

    </div>
    <hr/>
    <div class="col-12 settings">
      <h2>Settings</h2>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'

import MSidebarTopic from '@/components/MSidebarTopic'
import EventBus from '@/event-bus'

export default {
  name: 'MSidebar',
  components: {
    MSidebarTopic,
    FontAwesomeIcon
  },
  props: [ 'topics' ],
  data: function () {
    return { allOnOrOff: true }
  },
  computed: {
    plus () { return faPlus }
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
.color-option {
  height: 20px;
}
</style>
