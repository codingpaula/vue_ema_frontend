<!-- displays button for one topic -->
<template>
  <div class="btn-group col-12 topic-button-group d-flex"
    aria-label="topic button" role="group">
    <button type="button" class="btn topic-button"
      @click="editTopic()"
      :style="onState">
      <i class="fas fa-pencil-alt"></i>
    </button>
    <button type="button" class="btn topic-button w-100 topic-name"
      @click="switchButton(true)"
      :style="topic.on ? onState : offState">
      {{ topic.name }}
    </button>
    <button type="button" class="btn topic-button"
      @click="addTask2Topic()"
      :style="onState">
      <i class="fas fa-plus"></i>
    </button>
  </div>
</template>

<script>

const dummyTask = {
  'due_date': '2018-05-20T10:00:00Z',
  'importance': 50,
  'name': 'Dummy',
  'topic': 0
}

export default {
  name: 'MSidebarTopic',
  props: [
    'topic'
  ],
  data: function () {
    var styleStringBack = 'background-color: '
    var styleStringFont = '; color: '
    var greyBack = '#DADDD8'
    var whiteFont = '#FFFFFF'

    return {
      // currentState: true,
      onState: styleStringBack + this.topic.color + styleStringFont + whiteFont,
      offState: styleStringBack + greyBack + styleStringFont + this.topic.color
    }
  },
  methods: {
    // used to switch style of button and with mode true to emit event
    switchButton: function () {
      // this.currentState = !this.currentState
      this.emitTopicOnOrOff()
    },
    // emit event that topic was toggled
    emitTopicOnOrOff: function () {
      this.$store.commit('TOGGLE_TOPIC', this.topic.id)
      console.log(this.topic.id)
    },
    addTask2Topic: function () {
      dummyTask.topic = this.topic.id
      this.$store.dispatch('CREATE_TASK', dummyTask)
    },
    editTopic: function() {
      this.$store.commit('TOGGLE_SHOW_EDIT_TOPIC')
    }
  }
}
</script>

<style>
.topic-button-group {
  padding: 5px;
}
.topic-button {
  color: white;
  border: 1px solid white;
}
.topic-name {
  white-space: normal;
}
</style>
