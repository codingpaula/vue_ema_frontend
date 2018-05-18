import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const HTTP = axios.create({
  baseURL: 'http://127.0.0.1:8000/matrix/',
  headers: {
    Authorization: 'testuser {Test123.}'
  }
})

const store = new Vuex.Store({
  state: {
    matrixData: [],
    loading: false,
    showEditTopic: false
  },
  actions: {
    LOAD_MATRIX_DATA: function ({ commit }) {
      commit('IS_LOADING')
      HTTP.get('topics/').then((response) => {
        commit('SET_MATRIX_DATA', { matrixData: response.data })
        commit('DONE_LOADING')
      }, (err) => {
        console.log(err)
      })
    },
    // tasks
    UPDATE_TASK : function ({ commit, state }, task) {
      HTTP.put('tasks/' + task.id + '.json', task).then((response) => {
        commit('EDIT_TASK', { task: response.data })
      }, (err) => {
        console.log(err)
        console.log(err.response)
      })
    },
    CREATE_TASK: function ({ commit, state }, task) {
      HTTP.post('tasks/', task).then((response) => {
        commit('ADD_TASK', { task: response.data })
      }, (err) => {
        console.log(err)
        console.log(err.response)
      })
    },
    DELETE_TASK: function ({ commit, state }, task) {
      HTTP.delete('tasks/' + task.id + '.json', task).then((response) => {
        commit('REMOVE_TASK', { task: response.data })
      }, (err) => {
        console.log(err)
        console.log(err.response)
      })
    },
    // topics
    UPDATE_TOPIC: function ({ commit, state }, topic) {
      HTTP.put('topics/' + topic.id + '.json', topic).then((response) => {
        commit('EDIT_TOPIC', { topic: response.data })
      }, (err) => {
        console.log(err)
        console.log(err.response)
      })
    },
    CREATE_TOPIC: function ({ commit, state }, topic) {
      HTTP.post('topics/', topic).then((response) => {
        commit('ADD_TOPIC', { topic: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    DELETE_TOPIC: function ({ commit }) {

    }
  },
  mutations: {
    SET_MATRIX_DATA: (state, { matrixData }) => {
      state.matrixData = []
      matrixData.forEach(function(topic) {
        topic.on = true
        topic.color = '#'+topic.color
        state.matrixData.push(topic)
        // Object.assign({}, topic, { on: true, color: '#'+topic.color }))
      })
      console.log(state.matrixData)
    },
    IS_LOADING: (state) => {
      state.loading = true
    },
    DONE_LOADING: (state) => {
      state.loading = false
    },
    // topics
    EDIT_TOPIC: (state, { topic }) => {
      var index = findObjectInData(topic.id)
      state.matrixData[index] = topic
    },
    ADD_TOPIC: (state, { topic }) => {
      state.matrixData.push(topic)
    },
    // toggling topics
    TOGGLE_TOPIC: (state, topic_id) => {
      var index = findObjectInData(topic_id)
      state.matrixData[index].on = !state.matrixData[index].on
    },
    ALL_TOPICS_ON: (state) => {
      state.matrixData.forEach(function(topic) {
        if (!topic.on) topic.on = true
      })
    },
    ALL_TOPICS_OFF: (state) => {
      state.matrixData.forEach(function(topic) {
        if (topic.on) topic.on = false
      })
    },
    TOGGLE_SHOW_EDIT_TOPIC: (state) => {
      state.showEditTopic = !state.showEditTopic
    },
    // tasks
    EDIT_TASK: (state, { task }) => {
      // find task
      var topic_index = findObjectInData(task.topic)
      var task_index = findObjectInData(task.id)
      state.matrixData[topic_index].task_set[task_index] = task
    },
    ADD_TASK: (state, { task }) => {
      var index = findObjectInData(task.topic)
      state.matrixData[index].task_set.push(task)
    },
    REMOVE_TASK: (state, { task }) => {
      var topic_index = findObjectInData(task.topic)
      var task_index = findObjectInData(task.id)
      state.matrixData[index].task_set.splice(task_index,1)
    }
  }
})

function findObjectInData (id) {
  var index = store.state.matrixData.findIndex(function(x) {
    if (x.id == id) return true
  })
  return index
}


export default store
