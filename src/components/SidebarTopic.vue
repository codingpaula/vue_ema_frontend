<template>
  <div class="btn-group col-12 topic-button-group d-flex"
    aria-label="topic button" role="group">
    <button type="button" class="btn topic-button"
      :style="onState">
      <i class="fas fa-pencil-alt"></i>
    </button>
    <button type="button" class="btn topic-button w-100 topic-name"
      @click="switchButton(true)"
      :style="currentState ? onState : offState">
      {{ topic.name }}
    </button>
    <button type="button" class="btn topic-button"
      :style="onState">
      <i class="fas fa-plus"></i>
    </button>
  </div>
</template>

<script>
// TODO on and off state statt hin und hergeschubse
var styleStringBack = 'background-color: #'
var styleStringFont = '; color: #'

export default {
  name: 'SidebarTopic',
  props: [
    'topic',
    'allOnOrOff'
  ],
  data: function () {
    return {
      currentState: true,
      onState: styleStringBack + this.topic.color + styleStringFont + 'ffffff',
      offState: styleStringBack + 'DADDD8' + styleStringFont + this.topic.color
    }
  },
  watch: {
    allOnOrOff: function () {
      if (this.allOnOrOff && !this.currentState) {
        this.switchButton(false)
      } else if (!this.allOnOrOff && this.currentState) {
        this.switchButton(false)
      }
    }
  },
  methods: {
    switchButton: function (mode) {
      if (this.currentState) {
        this.currentState = false
        if (mode) {
          // TODO update matrix
          console.log('Changing matrix missing implementation')
          this.$emit('topic', { topic: this.topic.id })
          console.log('emitted event, topic id: ' + this.topic.id)
        }
      } else {
        this.currentState = true
        if (mode) {
          // TODO update matrix
          console.log('Changing matrix missing implementation')
          this.$emit('topic', { topic: this.topic.id })
          console.log('emitted event, topic id: ' + this.topic.id)
        }
      }
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
