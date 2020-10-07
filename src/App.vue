<template>
  <div id="app">
    <el-upload action="/" :auto-upload="false" :limit="1" accept="jpg/png" :show-file-list="false" :on-change="uploadImage">
      <el-button type="primary">上傳圖片</el-button>
      <div slot="tip" class="el-upload__tip">圖檔不大於1MB</div>
    </el-upload>
    <el-date-picker
      v-model="yearMonth"
      type="month"
      placeholder="選擇年月">
    </el-date-picker>
    <el-input-number v-model="fontsize" controls-position="right" :min="12" :max="20"></el-input-number>
    <el-input-number v-model="gap" controls-position="right" :min="0" :max="15"></el-input-number>
    <v-stage :config="configStage">
      <v-layer v-if="imageObject" :config="{draggable: true}">
        <v-image :config="{image: imageObject}"></v-image>
      </v-layer>
      <Calendar :dateObject="yearMonth" :fontSize="fontsize" :gap="gap"/>
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
      yearMonth: null,
      fontsize: 12,
      gap: 15,
      configStage: {
        width: 500,
        height: 500
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
    }
  }
}
</script>
