<template>
  <div class="matrix row">
    <div class="col-3">
      <matrix-sidebar v-bind:topics="topicList"></matrix-sidebar>
    </div>
    <div class="col-9"><p>Matrix!!</p></div>
  </div>
</template>

<script>
import MatrixSidebar from '@/components/MatrixSidebar'

export default {
  name: 'MatrixMain',
  components: {
    MatrixSidebar
  },
  data: function() {
    return {
      topicList: [
        {
          id: 1,
          name: 'shit',
          color: '3D405B'
        },
        {
          id: 2,
          name: 'what',
          color: 'E28413'
        },
        {
          id: 3,
          name: 'this has to be longer',
          color: 'D05353'
        }
      ]
    }
  }
}
</script>

<style>

</style>
