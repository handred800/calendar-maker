# 月曆製造
## 完成
- 網格呈現
- 

## 📋TODO
- 月曆網格 
    - daycount: 當月天數 
    - firstDayWeekDay: 當月第一天是星期幾 (0為星期日) 
    - calendarGridArr: 月曆陣列，vue 依此陣列渲染月曆 
    - generateCalendarArr 規則: 
        依據 firstDayWeekDay 產生出陣列第一項，例: firstDayWeekDay=1 第一項為[0,1] (星期二，第一行的二格) 
        再依據 daycount 自動生成剩下的陣列項目
- 設定月曆樣式
    - monthFontsize
    - monthColor
    - dateFontsize
    - weekdayColor
    - weekendColor
- 設定 canvas 尺寸
    - mobile,pc