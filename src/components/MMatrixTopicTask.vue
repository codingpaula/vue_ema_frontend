<!-- component to display one task with dot and description -->
<template lang="html">
  <!-- dot in canvas -->
  <v-group
    ref="container"
    :config="configGroup"
    @dragend="alertDragEnd">
    <v-circle
      ref="circle"
      :config="configTask"
      @mouseover="mouseOverDot"
      @mouseout="mouseOutDot">
    </v-circle>
    <v-text
      ref="title"
      :config="configTitle">
    </v-text>
  </v-group>
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
import axios from 'axios'

const fontString = 'color: '
const fullStar = 'fas fa-star'
const halfStar = 'fas fa-star-half'
const emptyStar = 'far fa-star'

export default {
  name: 'MMatrixTopicTask',
  // task infos + color of topic
  props: [ 'task', 'color', 'dimensions' ],
  data: function () {
    return {
      // style stuff for description
      fontColor: fontString + this.color,
      circle: null,
      group: null,
      layer: null,
      stage: null,
      // config for canvas element
      configGroup: {
        x: this.due2x(),
        y: this.imp2y(),
        draggable: true,
        drawBorder: true,
        dragBoundFunc: function(pos) {
          return {
            x: this.getAbsolutePosition().x,
            y: pos.y
          }
        }
      },
      configTitle: {
        text: this.task.name,
        x: 10,
        y: 10,
        fontSize: 15,
        fill: this.color
      },
      configTask: {
        radius: 15,
        fill: this.color,
        stroke: this.color,
        strokeWidth: 1,
        opacity: 0.8
      }
    }
  },
  mounted () {
    // general stuff to do with canvas konva
    var vm = this
    setTimeout(function() {
      vm.circle = vm.$refs.circle.getStage()
      vm.group = vm.circle.parent
      vm.layer = vm.group.parent
      vm.stage = vm.layer.parent
    }, 0)
  },
  methods: {
    // used to conditionally display the stars in description
    stars: function (number) {
      return this.task.importance < number ? true : false
    },
    // TODO include size of matrix canvas
    imp2y: function () {
      var y = this.dimensions.height-(this.dimensions.height/100)*this.task.importance
      if (y > this.dimensions.height) return this.dimensions.height
      if (y < 0) return 0
      return y
    },
    y2imp: function (y) {
      console.log(y)
      var newImp = Math.round((this.dimensions.height-y)/(this.dimensions.height/100))
      this.task.importance = newImp
      console.log(newImp)
      console.log(this.task)
      this.configGroup.y = this.imp2y()
    },
    // TODO include size of matrix canvas
    // TODO how to transform dates into numbers?
    due2x: function () {
      // 12.05.
      var today = new Date()
      // 15.05.
      var parsedDate = Date.parse(this.task.due_date)
      // 15.05. - 12.05 = 3 days
      var diffDate = parsedDate-today
      // 10 days
      var maxDateMSecs = 10 * 24 * 60 * 60 * 1000
      // 3 days / 10 days = 0.3
      var relDate = 1 - diffDate/maxDateMSecs
      if (relDate > 1) relDate = 1
      var newDue = relDate*this.dimensions.width
      return Math.round(newDue)
    },
    // TODO add request to change task
    alertDragEnd: function () {
      if (this.stage == null) {
        console.log('this.stage is null')
        this.container = this.$refs.container.getStage()
        this.layer = this.container.parent
        this.stage = this.layer.parent
      }
      var mousePos = this.stage.getPointerPosition()
      this.y2imp(mousePos.y)
      this.$store.dispatch('UPDATE_TASK', this.task)
    },
    mouseOverDot: function () {
      // this.configTask.opacity = 1
      this.configTask.fill =
    },
    mouseOutDot: function () {
      this.configTask.opacity = 0.8
    }
  },
  computed: {
    // styles with topic color and calculated values
    styleDiv () {
      var fontColor = 'color: ' + this.color + ';'
      var border = 'border-color: ' + this.color + ';'
      var impYValue = 'top: ' + this.calcImpY() + ';'
      var dueXValue = 'right: ' + this.calcDueX() + ';'
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
