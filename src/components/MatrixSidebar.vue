<template>
  <div class="sidebar row align-items-center">
    <div class="col-9">
      <h2>Topics</h2>
    </div>
    <div class="col-3 add-topic">
      <i class="fas fa-plus"></i>
    </div>
    <hr/>
    <sidebar-topic
      v-for="topic in topics"
      :key="topic.id"
      v-bind:topic="topic"
      v-bind:allOnOrOff="allOnOrOff"
      v-on:topic="handleTButton(topic.id)">
    </sidebar-topic>
    <div class="btn-group col-12 topic-button-group d-flex"
      aria-label="topic button" role="group">
      <button type="button" class="btn topic-button w-100"
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
import SidebarTopic from '@/components/SidebarTopic'

export default {
  name: 'MatrixSidebar',
  components: {
    SidebarTopic
  },
  props: [ 'topics' ],
  data: function () {
    return { allOnOrOff: true }
  },
  methods: {
    changeAll: function () {
      if (this.allOnOrOff) {
        this.allOnOrOff = false
      } else {
        this.allOnOrOff = true
      }
    },
    handleTButton: function (number) {
      console.log('got event with topic id: ' + number)
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
</style>
