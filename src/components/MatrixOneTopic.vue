<template lang="html">
  <div>
    <matrix-one-task
      v-for="task in tasks"
      :key="task.id"
      v-bind:task="task"
      v-bind:color="color">
    </matrix-one-task>
  </div>
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
  }
}
</script>

<style lang="css">
</style>
