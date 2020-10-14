<template>
  <v-group :config="gridConfig" ref="grid" @mouseenter="hover(true)" @mouseleave="hover(false)" @dragend="dragGrid">
    <v-text :config="titleConfig"></v-text>
    <v-group :config="{
      x: gap,
      y: gap * 2 + styleConfig.titleFontsize * 2
    }">
      <v-text
        :config="textConfig(index)"
        v-for="index in totalDay"
        :key="index"
      ></v-text>
    </v-group>
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
      // calendarGridArr: [],
      totalDay: 0,
      offset: 0,
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
    },
    hover (isHover) {
      this.$emit('hover', isHover)
    },
    // generateCalendarArr (firstDayWeekDay, totalDay) {
    //   this.calendarGridArr = []
    //   const converter = this.weekXYConverter(firstDayWeekDay)

    //   for (let day = 1; day <= totalDay; day++) {
    //     this.calendarGridArr.push(converter(day))
    //   }
    // },
    textConfig (day) {
      const vm = this
      // 算出該日是第幾格
      const dayAddOffset = day + vm.offset
      // 月曆第一格(左上)為 [0,0]
      return {
        x: (dayAddOffset % 7) * vm.styleConfig.dateFontsize * 2,
        y: Math.floor(dayAddOffset / 7) * vm.styleConfig.dateFontsize * 2,
        width: vm.styleConfig.dateFontsize * 2,
        height: vm.styleConfig.dateFontsize * 2,
        fontSize: vm.styleConfig.dateFontsize,
        fontFamily: vm.styleConfig.font,
        align: 'center',
        fill: (dayAddOffset % 7) === 6 || (dayAddOffset % 7) === 0 ? vm.styleConfig.weekendColor : vm.styleConfig.weekdayColor,
        text: day
      }
    }
  },
  computed: {
    titleConfig () {
      const vm = this
      const text = ((type) => {
        const m = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'][vm.month - 1]
        switch (type) {
          case 'ch':
            return vm.styleConfig.titleShowYear ? `${vm.year}年 ${vm.month}月` : `${vm.month}月`
          case 'en':
            return vm.styleConfig.titleShowYear ? `${vm.year} ${m}` : m
          case 'num':
            return vm.styleConfig.titleShowYear ? `${vm.year} . ${vm.month}` : vm.month
          default:
            break
        }
      })(vm.styleConfig.titleType)

      return {
        padding: vm.styleConfig.dateFontsize / 2 + vm.gap,
        width: vm.styleConfig.dateFontsize * 2 * 7 + vm.gap * 2,
        fontSize: vm.styleConfig.titleFontsize,
        fontFamily: vm.styleConfig.font,
        align: vm.styleConfig.titleAlign,
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
        // zellerCongruence 算出當年當月1日為星期幾，再推出 offset (之後用來推算某日為第幾格)
        this.offset = this.zellerCongruence(this.year, this.month, 1) - 1
        this.totalDay = this.countMonthDays(this.year, this.month)
        // this.generateCalendarArr(firstDayWeekDay, totalDay)
      }
    }
  }
}
</script>
