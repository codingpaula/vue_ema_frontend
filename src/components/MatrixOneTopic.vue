<template lang="html">
  <v-layer ref="layer" :config="configTopic">
    <matrix-one-task
      v-for="task in tasks"
      :key="task.id"
      v-bind:task="task"
      v-bind:color="color">
    </matrix-one-task>
  </v-layer>
</template>

<script>
import MatrixOneTask from '@/components/MatrixOneTask'

export default {
  name: 'MatrixOneTopic',
  props: [ 'topic' ],
  components: {
    MatrixOneTask
  },
  data: function () {
    return {
      color: this.topic.color,
      tasks: this.topic.tasks
    }
  },
  computed: {
    configTopic () {
      return {
        visible: this.topic.on
      }
    }
  }
}
</script>

<style lang="css">
</style>
