<template>
  <v-group :config="gridConfig" ref="grid" @dragend="dragGrid">
    <v-text :config="titleConfig"></v-text>
    <v-text
      :config="textConfig(item,i + 1)"
      v-for="(item,i) in calendarGridArr"
      :key="i"
    ></v-text>
  </v-group>
</template>

<script>
import dateCounter from '@/plugins/dateCounter.js'
export default {
  props: {
    dateObject: Date,
    gap: Number,
    styleConfig: Object
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
      console.log({ x, y })
      Object.assign(this.gridConfig, { x, y })
    },
    generateCalendarArr (firstDayWeekDay, totalDay) {
      this.calendarGridArr = []
      const converter = this.weekXYConverter(firstDayWeekDay)

      for (let day = 1; day <= totalDay; day++) {
        this.calendarGridArr.push(converter(day))
      }
    },
    textConfig (item, text) {
      const vm = this
      return {
        x: item.pos[0] * vm.styleConfig.fontSize * 2 + vm.gap,
        y: item.pos[1] * vm.styleConfig.fontSize * 2 + vm.gap * 2 + vm.styleConfig.fontSize,
        width: vm.styleConfig.fontSize * 2,
        height: vm.styleConfig.fontSize * 2,
        fontSize: vm.styleConfig.fontSize,
        fontFamily: 'Noto Sans TC',
        align: 'center',
        fill: item.isWeekend ? vm.styleConfig.weekendColor : vm.styleConfig.weekdayColor,
        text
      }
    }
  },
  computed: {
    titleConfig () {
      const vm = this
      const text = vm.styleConfig.titleShowYear ? `${vm.year}年 ${vm.month}月` : `${vm.month}月`
      return {
        x: vm.gap,
        y: vm.gap,
        fontSize: vm.styleConfig.titleFontsize,
        fontFamily: 'Noto Sans TC',
        align: 'center',
        fill: vm.styleConfig.titleColor,
        text
      }
    }
  },
  watch: {
    dateObject: {
      immediate: true,
      handler (newDate) {
        this.year = newDate.getFullYear()
        this.month = newDate.getMonth() + 1
        const firstDayWeekDay = this.zellerCongruence(this.year, this.month, 1)
        const totalDay = this.countMonthDays(this.year, this.month)
        this.generateCalendarArr(firstDayWeekDay, totalDay)
      }
    }
  }
}
</script>
