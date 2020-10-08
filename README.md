# 月曆製造
## 完成
- 月曆網格
- 上傳圖片
- 下載圖片

===  

## 📋TODO
- 月曆網格 
    - 星期設定
    - 假日導入
    - 月/周中英表示
    - 將陣列項目修改成物件，不放入xy應該用index + offset去推算座標  
      (e.g. {isWeekDay: true})
- 設定月曆樣式(styleConfig)
    - titleFontsize
    - titleColor
    - dateFontsize
    - weekdayColor
    - weekendColor
- 設定 canvas
    - mobile,pc 尺寸
    - 圖片縮放、拖曳限制  

===  

## 功能註解
- 月曆網格  
    - daycount: 當月天數 
    - firstDayWeekDay: 當月第一天是星期幾 (0為星期日) 
    - calendarGridArr: 月曆陣列，vue 依此陣列渲染月曆 
    - generateCalendarArr 規則 **(待調整)**:  
        依據 firstDayWeekDay 產生出陣列第一項，例: firstDayWeekDay=1 第一項為[0,1] (星期二，第一行的二格)  
        再依據 daycount 自動生成剩下的陣列項目  