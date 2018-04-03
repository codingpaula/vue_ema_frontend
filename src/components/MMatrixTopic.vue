<!-- component to display one topic -->
<template lang="html">
  <v-layer ref="layer" :config="configTopic">
    <m-matrix-topic-task
      v-for="task in tasks"
      :key="task.id"
      v-bind:task="task"
      v-bind:color="color">
    </m-matrix-topic-task>
  </v-layer>
</template>

<script>
import MMatrixTopicTask from '@/components/MMatrixTopicTask'

export default {
  name: 'MMatrixTopic',
  props: [ 'topic' ],
  components: {
    MMatrixTopicTask
  },
  data: function () {
    return {
      // separate values to hand it to MatrixOneTask
      color: this.topic.color,
      tasks: this.topic.tasks
    }
  },
  computed: {
    // use to toggle topics on/off by sidebar events
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
