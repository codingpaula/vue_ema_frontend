<!-- displays button for one topic -->
<template>
  <div>
    <div class="btn-group col-12 topic-button-group d-flex"
      aria-label="topic button" role="group">
      <!-- edit topic button -->
      <button type="button" class="btn topic-button"
        @click="editTopic()"
        :style="edit ? offState : onState">
        <font-awesome-icon :icon="pencil" />
      </button>
      <!-- display name when not editing -->
      <button v-if="!edit" type="button"
        class="btn topic-button w-100 topic-name"
        @click="emitTopicOnOrOff()"
        :style="topic.on && !edit ? onState : offState">
        {{ topic.name }}
      </button>
      <!-- input field for topic name when editing -->
      <button v-if="edit" type="button"
        class="btn topic-button w-100 topic-name"
        :style="onState">
        <!-- TODO input field -->
        <form>
          <input class="topic-name-input" v-model="name" type="text" />
        </form>
      </button>
      <!-- add topic when not editing -->
      <button v-if="!edit" type="button" class="btn topic-button"
        @click="addTask2Topic()"
        :style="onState">
        <font-awesome-icon :icon="plus" />
      </button>
      <!-- delete topic when editing -->
      <button v-if="edit" type="button" class="btn topic-button"
        @click="deleteTopic()"
        :style="onState">
        <font-awesome-icon :icon="trash" />
      </button>
    </div>
    <div v-if="edit">
      <select v-model="color">
        <option v-for="option in colorOptions"
          :value="option.hex"
          :key="option.hex">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt'
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'

const dummyTask = {
  'due_date': '2018-06-10T10:00:00Z',
  'importance': 50,
  'name': 'Dummy',
  'topic': 0
}
const styleStringBack = 'background-color: '
const styleStringFont = '; color: '
const greyBack = '#daddd8'
const whiteFont = '#ffffff'

export default {
  name: 'MSidebarTopic',
  props: [
    'topic'
  ],
  components: {
    FontAwesomeIcon
  },
  data: function () {
    return {
      edit: false,
      colorOptions: [
        { hex: '#4d4e4e', label: 'grey' },
        { hex: '#001f54', label: 'dark blue' },
        { hex: '#1f487e', label: 'blue' },
        { hex: '#59a5d8', label: 'light blue' },
        { hex: '#926639', label: 'light brown' },
        { hex: '#6f5232', label: 'brown' },
        { hex: '#048ba8', label: 'turquoise' },
        { hex: '#137547', label: 'dark green' },
        { hex: '#528029', label: 'green' },
        { hex: '#8ea604', label: 'light green' },
        { hex: '#eabc20', label: 'yellow' },
        { hex: '#f56416', label: 'orange' },
        { hex: '#e71d36', label: 'red' },
        { hex: '#671934', label: 'dark red' },
        { hex: '#d90368', label: 'pink' },
        { hex: '#a4036f', label: 'purple' }
      ]
    }
  },
  computed: {
    pencil () { return faPencilAlt },
    trash () { return faTrash },
    plus () { return faPlus },
    onState () {
      var topicColor = this.topic.color[0] == '#' ? this.topic.color : '#'+this.topic.color
      return styleStringBack + topicColor + styleStringFont + whiteFont
    },
    offState () {
      var topicColor = this.topic.color[0] == '#' ? this.topic.color : '#'+this.topic.color
      return styleStringBack + greyBack + styleStringFont + topicColor
    },
    name: {
      get () { return this.topic.name },
      set (value) {
        var topicWithName = this.topic
        if (topicWithName.color[0] == '#') {
          topicWithName.color = topicWithName.color.split('#')[1]
        }
        topicWithName.name = value
        this.$store.dispatch('UPDATE_TOPIC', topicWithName)
      }
    },
    color: {
      get () { return this.topic.color },
      set (value) {
        var topicWithColor = this.topic
        topicWithColor.color = value
        this.$store.dispatch('UPDATE_TOPIC', topicWithColor)
      }
    }
  },
  methods: {
    // emit event that topic was toggled
    emitTopicOnOrOff: function () {
      this.$store.commit('TOGGLE_TOPIC', this.topic.id)
    },
    addTask2Topic: function () {
      dummyTask.topic = this.topic.id
      this.$store.dispatch('CREATE_TASK', dummyTask)
    },
    editTopic: function() {
      this.edit = !this.edit
    },
    deleteTopic: function () {
      alert("Are you sure you want to delete topic '" + this.topic.name + "'? \nThis will also delete all the topic's tasks!")
      // TODO response yes -> delete
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
.color-option {
  height: 20px;
  width: 20px;
}
.topic-name-input {

}
</style>
