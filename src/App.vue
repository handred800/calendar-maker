<template>
  <div id="app">
    <el-upload action="/" :auto-upload="false" :limit="1" accept="jpg,png" :show-file-list="false" :on-change="uploadImage">
      <el-button type="primary">上傳圖片</el-button>
      <div slot="tip" class="el-upload__tip">圖檔不大於1MB</div>
    </el-upload>
    <el-date-picker
      v-model="yearMonth"
      type="month"
      placeholder="選擇年月">
    </el-date-picker>
    <el-input-number v-model="styleConfig.fontSize" controls-position="right" :min="12" :max="20"></el-input-number>
    <el-input-number v-model="gap" controls-position="right" :min="0" :max="15"></el-input-number>
    <el-color-picker v-model="canvasColor"></el-color-picker>
    <el-link type="primary" :href="downloadLink" v-if="imageObject" icon="el-icon-download" download="圖片" @mouseenter.native="updateDownloadLink">下載</el-link>
    <v-stage ref="stage" :config="configStage">
      <v-layer>
        <v-rect :config="Object.assign({fill:canvasColor},configStage)"></v-rect>
        <v-image v-if="imageObject" :config="{image: imageObject, draggable: true}"></v-image>
        <Calendar :dateObject="yearMonth" :gap="gap" :styleConfig="styleConfig"/>
      </v-layer>
    </v-stage>
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
      yearMonth: null,
      gap: 0,
      configStage: {
        width: 500,
        height: 500
      },
      styleConfig: {
        lang: '',
        fontSize: 14,
        titleFontsize: '',
        titleColor: '',
        titleShowYear: true,
        dateFontsize: '',
        weekdayColor: '',
        weekendColor: ''
      }
    }
  },
  methods: {
    uploadImage (file) {
      const imageUrl = URL.createObjectURL(file.raw)
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
