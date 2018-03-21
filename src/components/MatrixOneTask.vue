<!-- component to display one task with dot and description -->
<template lang="html">
  <!-- dot in canvas -->
  <v-circle
    :config="configTask"
    @dragend="alertDragEnd">
  </v-circle>
  <!-- TODO add description in canvas or over it? -->
  <!-- <div :style="styleDiv" class="task">
    <div :style="styleDot" class="task-dot"></div>
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
  </div> -->
</template>

<script>
var fontString = 'color: #'

export default {
  name: 'MatrixOneTask',
  // task infos + color of topic
  props: [ 'task', 'color' ],
  data: function () {
    return {
      // style stuff for description
      fontColor: fontString + this.color,
      fullStar: 'fas fa-star',
      halfStar: 'fas fa-star-half',
      emptyStar: 'far fa-star',
      // config for canvas element
      configTask: {
        x: this.calcDue(),
        y: this.calcImp(),
        radius: 20,
        fill: this.color,
        stroke: this.color,
        strokeWidth: 1,
        draggable: true,
        // only drag vertically
        dragBoundFunc: function(pos) {
          return {
            x: this.getAbsolutePosition().x,
            y: pos.y
          }
        }
      }
    }
  },
  methods: {
    // used to conditionally display the stars in description
    stars: function (number) {
      return this.task.importance < number ? true : false
    },
    // TODO include size of matrix canvas
    calcImp: function () {
      return 300-3*this.task.importance
    },
    // TODO include size of matrix canvas
    // TODO how to transform dates into numbers?
    calcDue: function () {
      return this.task.dueDate*800
    },
    // TODO add request to change task
    alertDragEnd: function () {
      console.log('did end drag of task ' + this.task.name)
    }
  },
  computed: {
    // styles with topic color and calculated values
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
.task-dot {
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
}
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
