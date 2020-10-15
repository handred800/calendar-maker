# 月曆製造
## ✔️完成
- 月曆網格
- 上傳/下載圖片
- 設定月曆樣式
- 圖片縮放
- 輸出尺寸設定(待完善)

## 📋TODO
- 月曆網格
    - 周次
- 設定 canvas
    - 拖曳限制(保留)
- 優化
    - snap 拖拉吸附
    - 假日導入

## ✍️功能註解
- 月曆網格  
    - **daycount**: 當月天數  
    - **offset**: 日期與格數的偏移量  
      依據 **zellerCongruence** (蔡勒公式)求出第1日是星期幾，星期幾 - 1 = offset
    - 月曆生成規則:  
        目標: 用*迴圈的 index(即日期)* 換算出繪製canvas所需的 *xy座標*  
        1. 用 **daycount** 迴圈生成 xy座標
        2. 迴圈內執行 index + offset = 第幾格
        3. x = 第幾格 % 7 ; y = Math.celi(第幾格 / 7)  
           例 第5格: 
           - x = 5 % 7 = 5  
           - y = Math.floor(5 / 7) = Math.floor(0.71...) = 0  
        4. 以上不儲存直接用 computed 返回  
        
- 月曆樣式(styleConfig)
    - font
    - titleFontsize
    - titleColor
    - titleAlign
    - titleShowYear
    - titleType
    - dateFontsize
    - weekdayColor
    - weekendColor
    - [ ] weekColor
    - [ ] weekShow
    - [ ] weekType
    