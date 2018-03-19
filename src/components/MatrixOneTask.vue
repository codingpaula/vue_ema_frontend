<template lang="html">
  <div :style="styleDiv" class="task-div">
    <h3 class="task-heading">{{ task.name }}</h3>
    <p class="task-date">{{ task.dueDate }}</p>
    <div class="task-imp-stars">
      <i v-bind:class="stars(13) ? halfStar : fullStar"></i>
      <i v-bind:class="stars(26) ? emptyStar : stars(38) ? halfStar : fullStar"></i>
      <i v-bind:class="stars(51) ? emptyStar : stars(63) ? halfStar : fullStar"></i>
      <i v-bind:class="stars(76) ? emptyStar : stars(88) ? halfStar : fullStar"></i>
    </div>
  </div>
</template>

<script>
var fontString = 'color: #'

export default {
  name: 'MatrixOneTask',
  props: [ 'task', 'color' ],
  data: function () {
    return {
      fontColor: fontString + this.color,
      fullStar: 'fas fa-star',
      halfStar: 'fas fa-star-half',
      emptyStar: 'far fa-star'
    }
  },
  methods: {
    stars: function (number) {
      return this.task.importance < number ? true : false
    },
    calcImp: function () {
      console.log('in calcImp')
      return 3*this.task.importance + 'px'
    },
    calcDue: function () {
      return Math.random()*800 + 'px'
    }
  },
  computed: {
    styleDiv () {
      var fontColor = 'color: #' + this.color + ';'
      var border = 'border-color: #' + this.color + ';'
      var impYValue = 'top: ' + this.calcImp() + ';'
      var dueXValue = 'right: ' + this.calcDue() + ';'
      var result = fontColor + ' ' + border + ' '  + impYValue + ' ' + dueXValue
      console.log(result)
      return result
    }
  }
}
</script>

<style scoped lang="css">
.task-div {
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  padding: 3px;
  position: absolute;
}
.task-div p {
  font-size: 0.8rem;
  margin: 0;
}
.task-heading {
  font-size: 1rem;
  margin-bottom: 0;
}
.task-date {

}
.task-imp {
}
</style>
