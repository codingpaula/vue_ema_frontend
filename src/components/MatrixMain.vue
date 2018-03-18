<template>
  <div class="matrix row">
    <div class="col-3">
      <matrix-sidebar v-bind:topics="topicList"></matrix-sidebar>
    </div>
    <div class="col-9">
      <matrix-matrix v-bind:topics="topicList"></matrix-matrix>
    </div>
  </div>
</template>

<script>
import MatrixSidebar from '@/components/MatrixSidebar'
import MatrixMatrix from '@/components/MatrixMatrix'

export default {
  name: 'MatrixMain',
  components: {
    MatrixSidebar,
    MatrixMatrix
  },
  data: function() {
    return {
      topicList: [
        {
          id: 1,
          name: 'shit',
          color: '3D405B',
          tasks: [
            {
              id: 1,
              name: 'do sth',
              dueDate: '17.08.2018 10:00:00',
              importance: 78
            },
            {
              id: 2,
              name: 'sth else',
              dueDate: '17.10.2018 10:00:00',
              importance: 66
            },
            {
              id: 3,
              name: 'else where',
              dueDate: '01.09.2018 10:00:00',
              importance: 22
            }
          ]
        },
        {
          id: 2,
          name: 'what',
          color: 'E28413',
          tasks: [
            {
              id: 4,
              name: 'where you',
              dueDate: '08.09.2018 10:00:00',
              importance: 44
            },
            {
              id: 5,
              name: 'you can',
              dueDate: '18.10.2018 10:00:00',
              importance: 98
            }
          ]
        },
        {
          id: 3,
          name: 'this has to be longer',
          color: 'D05353',
          tasks: [
            {
              id: 6,
              name: 'can laugh',
              dueDate: '20.09.2018 10:00:00',
              importance: 33
            },
            {
              id: 7,
              name: 'laugh loud',
              dueDate: '01.10.2018 10:00:00',
              importance: 29
            },
            {
              id: 8,
              name: 'loud cry',
              dueDate: '15.09.2018 10:00:00',
              importance: 90
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>

</style>
