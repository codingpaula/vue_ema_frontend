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
      circle: null,
      group: null,
      layer: null,
      stage: null,
      mouseOver: false,
      active: false,
      configGroupHalf: {
        draggable: true,
        drawBorder: true,
        dragBoundFunc: function(pos) {
          return {
            x: this.getAbsolutePosition().x,
            y: pos.y
          }
        }
      }
    }
  },
  computed: {
    // config for canvas element
    x: function () {
      var today = new Date()
      var relDate = 1 - ((Date.parse(this.task.due_date)-today)/(24*60*60*10000))
      var newDue = relDate > 1 ? this.dimensions.width : relDate*this.dimensions.width
      return Math.round(newDue)
    },
    y: function () {
      var y = this.dimensions.height-(this.dimensions.height/100)*this.task.importance
      if (y > this.dimensions.height) {
        return this.dimensions.height
      } else if (y < 0) {
        return 0
      } else {
        return y
      }
    },
    configGroup: function () {
      return {
        draggable: this.configGroupHalf.draggable,
        drawBorder: this.configGroupHalf.drawBorder,
        dragBoundFunc: this.configGroupHalf.dragBoundFunc,
        x: this.x,
        y: this.y,
      }
    },
    configTitle: function () {
      return {
        text: this.task.name,
        x: 10,
        y: 12,
        fontSize: 15,
        fill: this.color
      }
    },
    lighterShade: function () {
      return this.shadeColor(this.color, 14)
    },
    darkerShade: function () {
      return this.shadeColor(this.color, 5)
    },
    fill: function () {
      if (this.mouseOver) return this.color
      if (!this.mouseOver) return this.lighterShade
    },
    stroke: function () {
      if (this.active) return this.darkerShade
      if (!this.active) return this.color
    },
    configTask: function () {
      return {
        radius: 15,
        fill: this.fill,
        stroke: this.stroke,
        strokeWidth: 5,
        //opacity: 0.8
      }
    },
    fontColor: function() {
      return fontString + this.color
    },
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
    y2imp: function (y) {
      return Math.round((this.dimensions.height-y)/(this.dimensions.height/100))
      //this.task.importance = newImp
      //this.configGroup.y = this.imp2y()
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
      var newTask = this.task
      newTask.importance = this.y2imp(mousePos.y)
      this.$store.dispatch('UPDATE_TASK', newTask)
    },
    mouseOverDot: function () {
      this.mouseOver = true
    },
    mouseOutDot: function () {
      this.mouseOver = false
    },
    comp2hex: function (comp) {
      var hex = comp.toString(16)
      return hex.length == 1 ? "0" + hex : hex
    },
    hex2rgb: function (hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    },
    rgb2hex: function (r, g, b) {
      return '#' + this.comp2hex(r) + this.comp2hex(g) + this.comp2hex(b);
    },
    // takes hex, converts it to shade percentage and serves back a hex
    // darker: 0 (black), 1 - 10 (darker), 11 (middle)
    // lighter: 22 (white), 12 - 21 (lighter), 11 (middle)
    shadeColor: function (hex, shade) {
      var rgb = this.hex2rgb(hex)
      if (shade < 12) {
        // f(x) = 22 * middle / 11 * shade/22
        return this.rgb2hex(
          Math.round(this.darkerComp(rgb.r, shade)),
          Math.round(this.darkerComp(rgb.g, shade)),
          Math.round(this.darkerComp(rgb.b, shade))
        )
      } else {
        // f(x) = 2*(255-middle)*shade/22 + 2*middle-255
        return this.rgb2hex(
          Math.round(this.lighterComp(rgb.r, shade)),
          Math.round(this.lighterComp(rgb.g, shade)),
          Math.round(this.lighterComp(rgb.b, shade))
        )
      }
    },
    darkerComp: function (rgb, shade) {
      return 22 * rgb / 11 * shade/22
    },
    lighterComp: function (rgb, shade) {
      return 2 * (255 - rgb) * shade/22 + 2*rgb - 255;
    }
  },
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
