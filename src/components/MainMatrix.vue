<!-- main component for accessing topics, tasks and matrix infos -->
<template>
  <div class="matrix row">
    <div class="loading" v-if="loading">
      Loading ...
    </div>
    <div class="col-2" v-if="matrixData">
      <m-sidebar v-bind:topics="matrixData"></m-sidebar>
    </div>
    <div class="col-10" v-if="matrixData && !showEditTopic">
      <m-matrix v-bind:topics="matrixData" v-bind:dimensions="dimensions"></m-matrix>
    </div>
    <div class="col-10" v-if="showEditTopic">
      <m-edit-topic v-bind:topics="matrixData"></m-edit-topic>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

import MSidebar from '@/components/MSidebar'
import MMatrix from '@/components/MMatrix'
import MEditTopic from '@/components/MEditTopic'
import {HTTP} from '@/api-route'

export default {
  name: 'MainMatrix',
  components: {
    MSidebar,
    MMatrix,
    MEditTopic
  },
  data: function () {
    return {
      dimensions: {
        width: 800,
        height: 600
      }
    }
  },
  mounted: function () {
    this.$store.dispatch('LOAD_MATRIX_DATA')
  },
  computed: mapState([
    'matrixData',
    'loading',
    'showEditTopic'
  ]),
  // data: function() {
  //   return {
  //     loading: false,
  //     matrixData: null,
  //     error: null,
  //     // TODO really accessing topics and tasks
  //     // dummy data
  //     topicList: []
  //     //   {
  //     //     id: 1,
  //     //     name: 'shit',
  //     //     color: '#3D405B',
  //     //     tasks: [
  //     //       {
  //     //         id: 1,
  //     //         name: 'do sth',
  //     //         dueDate: 0.1,
  //     //         dueDateString: '17.08.2018 10:00:00',
  //     //         importance: 10
  //     //       },
  //     //       {
  //     //         id: 2,
  //     //         name: 'sth else',
  //     //         dueDate: 0.2,
  //     //         dueDateString: '17.10.2018 10:00:00',
  //     //         importance: 66
  //     //       },
  //     //       {
  //     //         id: 3,
  //     //         name: 'else where',
  //     //         dueDate: 0.3,
  //     //         dueDateString: '01.09.2018 10:00:00',
  //     //         importance: 22
  //     //       }
  //     //     ]
  //     //   },
  //     //   {
  //     //     id: 2,
  //     //     name: 'what',
  //     //     color: '#E28413',
  //     //     tasks: [
  //     //       {
  //     //         id: 4,
  //     //         name: 'where you',
  //     //         dueDate: 0.4,
  //     //         dueDateString: '08.09.2018 10:00:00',
  //     //         importance: 44
  //     //       },
  //     //       {
  //     //         id: 5,
  //     //         name: 'you can',
  //     //         dueDate: 0.5,
  //     //         dueDateString: '18.10.2018 10:00:00',
  //     //         importance: 98
  //     //       }
  //     //     ]
  //     //   },
  //     //   {
  //     //     id: 3,
  //     //     name: 'this has to be longer',
  //     //     color: '#D05353',
  //     //     tasks: [
  //     //       {
  //     //         id: 6,
  //     //         name: 'can laugh',
  //     //         dueDate: 0.6,
  //     //         dueDateString: '20.09.2018 10:00:00',
  //     //         importance: 33
  //     //       },
  //     //       {
  //     //         id: 7,
  //     //         name: 'laugh loud',
  //     //         dueDate: 0.7,
  //     //         dueDateString: '01.10.2018 10:00:00',
  //     //         importance: 29
  //     //       },
  //     //       {
  //     //         id: 8,
  //     //         name: 'loud cry',
  //     //         dueDate: 0.8,
  //     //         dueDateString: '15.09.2018 10:00:00',
  //     //         importance: 90
  //     //       }
  //     //     ]
  //     //   }
  //     // ]
  //   }
  // },
//  created() {
//    this.fetchMatrixData()
//  },
  methods: {
    fetchMatrixData () {
      this.error = this.matrixData = null
      this.loading = true
      HTTP.get('matrix/topics.json')
        .then(response => {
          this.matrixData = response.data
          console.log(response.data)
          this.loading = false
        })
        .catch(e => {
          this.errors.push(e)
          this.error = e.toString()
          console.log(this.errors)
        })
    }
  }
}
</script>

<style>

</style>
