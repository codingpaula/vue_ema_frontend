<template lang="html">
  <div :style="fontColor">
    <h3>{{ task.name }}</h3>
    <p>{{ task.dueDate }}</p>
    <p>{{ task.importance }}</p>
  </div>
</template>

<script>
var fontString = 'color: #'

export default {
  name: 'MatrixOneTask',
  props: [ 'task', 'color' ],
  data: function () {
    return {
      fontColor: fontString + this.color
    }
  }
}
</script>

<style lang="css">
</style>
