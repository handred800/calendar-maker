<template>
  <v-layer>
    <v-group :config="gridConfig" ref="grid" @dragend="dragGrid">
      <v-text
        :config="{
          text: `${year}年 ${month}月`
        }"
      ></v-text>
      <v-text
        :config="{
          x: Math.floor((i - 1) % 7) * 30 + gap,
          y: Math.floor((i - 1) / 7) * 30 + gap * 2 + fontSize,
          width: 30,
          height: 30,
          fontSize: fontSize,
          fill: 'hotpink',
          text: i
        }"
        v-for="i in count"
        :key="i"
      ></v-text>
    </v-group>
  </v-layer>
</template>

<script>
import dateCounter from '@/plugins/dateCounter.js'
export default {
  props: {
    dateObject: Date,
    fontSize: Number,
    gap: Number
  },
  mixins: [dateCounter],
  data () {
    return {
      year: 0,
      month: 0,
      calendarGridArr: [],
      gridConfig: {
        x: 0,
        y: 0,
        draggable: true
      }
    }
  },
  methods: {
    dragGrid (e) {
      const { x, y } = this.$refs.grid.getNode().getClientRect()
      Object.assign(this.gridConfig, { x, y })
    },
    generateCalendarArr (firstDayWeekDay,dayCount) {
      this.calendarGridArr = []
      for(let i; i <= daycount; i++) {
        let newItem = []
        this.calendarGridArr.push(newItem);
      }
    }
  },
  watch: {
    dateObject (newDate) {
      this.year = newDate.getFullYear()
      this.month = newDate.getMonth() + 1
      const firstDayWeekDay = this.zellerCongruence(this.year, this.month, 1)
      const dayCount = this.countMonthDays(this.year, this.month)
      this.generateCalendarArr(firstDayWeekDay, dayCount)
    }
  }
}
</script>
