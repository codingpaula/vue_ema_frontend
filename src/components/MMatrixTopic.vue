<!-- component to display one topic -->
<template lang="html">
  <v-layer ref="layer" :config="configTopic">
    <m-matrix-topic-task
      v-for="task in topic.task_set"
      :key="task.id"
      v-bind:task="task"
      v-bind:dimensions="dimensions"
      v-bind:color="topic.color">
    </m-matrix-topic-task>
  </v-layer>
</template>

<script>
import MMatrixTopicTask from '@/components/MMatrixTopicTask'

export default {
  name: 'MMatrixTopic',
  props: [ 'topic', 'dimensions' ],
  components: {
    MMatrixTopicTask
  },
  data: function () {
    return {
      // separate values to hand it to MatrixOneTask
      color: this.topic.color,
      tasks: this.topic.task_set,
      configTopic: {
        visible: this.topic.on
      }
    }
  }
}
</script>

<style lang="css">
</style>
