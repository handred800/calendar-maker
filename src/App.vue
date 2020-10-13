<template>
  <div id="app">
    <el-form>
      <el-form-item label="圖片">
        <el-upload action="/" :auto-upload="false" :limit="1" accept=".jpeg,.jpg,.png" :show-file-list="false" :on-change="uploadImage" :on-exceed="uploadImage">
          <el-button type="primary">上傳圖片</el-button>
          <div slot="tip" class="el-upload__tip">圖檔不大於1MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="選擇時間">
        <el-date-picker
          v-model="yearMonth"
          type="month"
          placeholder="選擇年月">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="字級大小(標題)">
        <el-input-number size="small" v-model="styleConfig.titleFontsize" controls-position="right" :min="12" :max="20"></el-input-number>
      </el-form-item>
      <el-form-item label="字級大小(日期)">
        <el-input-number size="small" v-model="styleConfig.fontSize" controls-position="right" :min="12" :max="20"></el-input-number>
      </el-form-item>
      <el-form-item label="間距">
        <el-input-number size="small" v-model="gap" controls-position="right" :min="0" :max="15"></el-input-number>
      </el-form-item>
      <el-form-item label="背景色">
        <el-color-picker v-model="canvasColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="標題(年月)色">
        <el-color-picker v-model="styleConfig.titleColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="日期色(平日)">
        <el-color-picker v-model="styleConfig.weekdayColor"></el-color-picker>
      </el-form-item>
      <el-form-item label="日期色(假日)">
        <el-color-picker v-model="styleConfig.weekendColor"></el-color-picker>
      </el-form-item>
      <el-form-item>
        <el-switch
          v-model="styleConfig.titleShowYear"
          active-text="年月"
          inactive-text="月">
        </el-switch>
      </el-form-item>
      <v-stage ref="stage" :config="configStage">
        <v-layer>
          <v-rect :config="Object.assign({fill:canvasColor},configStage)"></v-rect>
          <v-image v-if="imageObject" :config="{image: imageObject, draggable: true}"></v-image>
          <Calendar :dateObject="yearMonth" :gap="gap" :styleConfig="styleConfig"/>
        </v-layer>
      </v-stage>
      <el-form-item>
        <el-link type="primary" :href="downloadLink" v-if="imageObject" icon="el-icon-download" download="圖片" @mouseenter.native="updateDownloadLink">下載</el-link>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import Calendar from './components/Calendar.vue'

export default {
  name: 'app',
  components: {
    Calendar
  },
  data () {
    return {
      imageObject: null,
      downloadLink: '',
      canvasColor: '#fff',
      yearMonth: new Date(),
      gap: 0,
      configStage: {
        width: 500,
        height: 500
      },
      styleConfig: {
        lang: '',
        fontSize: 14,
        titleFontsize: 14,
        titleColor: '#515151',
        titleShowYear: true,
        dateFontsize: 14,
        weekdayColor: '#515151',
        weekendColor: '#F85AB6'
      }
    }
  },
  methods: {
    uploadImage (file) {
      const imageUrl = (file[0] === undefined) ? URL.createObjectURL(file.raw) : URL.createObjectURL(file[0])
      const img = new Image()
      img.src = imageUrl
      img.onload = () => {
        this.imageObject = img
      }
    },
    updateDownloadLink () {
      this.downloadLink = this.$refs.stage.getNode().toDataURL({ pixelRatio: 3 })
      console.log(this.downloadLink)
    }
  }
}
</script>
