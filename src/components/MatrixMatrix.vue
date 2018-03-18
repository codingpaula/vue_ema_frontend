<template lang="html">
  <div class="row">
    <matrix-one-topic
      v-for="topic in topics"
      :key="topic.id"
      v-bind:topic="topic"
      class="col">
    </matrix-one-topic>
  </div>
</template>

<script>
import MatrixOneTopic from '@/components/MatrixOneTopic'

export default {
  name: 'MatrixMatrix',
  props: [ 'topics' ],
  components: {
    MatrixOneTopic
  },
  data: function () {
    return {

    }
  }
}
</script>

<style lang="css">
</style>
