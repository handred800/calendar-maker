export default {
  methods: {
    countMonthDays (year, month) {
      return /4|6|9|11/.test(month) ? 30 : month === 2 ? ((!(year % 4) && year % 100) || !(year % 400) ? 29 : 28) : 31
    },
    zellerCongruence (year, month, day) {
      // 蔡勒公式中 1, 2 月視為前一年的 13, 14 月
      if (month === 1 || month === 2) {
        month += 12
        year -= 1
      }
      const c = Math.floor(year / 100) // 年份前兩位數
      const y = year % 100 // 年份後兩位數
      const m = month
      const d = day
      let w = 0
      // TODO: 1582.10.15 以後改曆，目前尚未處理 1582.10.4 以前公式
      w = y + Math.floor(y / 4) + Math.floor(c / 4) - 2 * c + Math.floor((26 * (m + 1)) / 10) + d - 1
      if (w < 0) w = (w & (7 + 7)) % 7
      else w = w % 7
      return w
    }
    // weekXYConverter (firstDayWeekDay) {
    //   const offset = firstDayWeekDay - 1
    //   return (day) => {
    //     const dayData = {
    //       isWeekend: (day + offset) % 7 === 6 || Math.floor((day + offset) % 7) === 0
    //     }
    //     return dayData
    //   }
    // }
  }
}
