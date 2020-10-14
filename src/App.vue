<template>
  <div id="app">
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside width="400px">
          <el-scrollbar>
            <el-form>
              <el-collapse value="0">
                <el-collapse-item title="基本設定" name="0">
                  <el-form-item label="圖片">
                    <el-upload
                      action="/"
                      :auto-upload="false"
                      :limit="1"
                      accept=".jpeg,.jpg,.png"
                      :show-file-list="false"
                      :on-change="uploadImage"
                      :on-exceed="uploadImage"
                    >
                      <el-button type="primary">上傳圖片</el-button>
                      <div slot="tip" class="el-upload__tip">圖檔不大於1MB</div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="選擇時間">
                    <el-date-picker
                      v-model="yearMonth"
                      type="month"
                      placeholder="選擇年月"
                      :clearable="false"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="背景色">
                    <el-color-picker v-model="canvasColor"></el-color-picker>
                  </el-form-item>
                  <el-form-item label="間距">
                    <el-input-number
                      size="small"
                      v-model="gap"
                      controls-position="right"
                      :min="0"
                      :max="15"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item label="字型">
                    <el-radio-group v-model="styleConfig.font" size="medium">
                      <el-radio-button label="Noto Sans TC">思源黑體</el-radio-button>
                      <el-radio-button label="Noto Serif TC">思源宋體</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="年月設定" name="1">
                  <el-form-item label="對齊">
                    <el-radio-group v-model="styleConfig.titleAlign" size="medium">
                      <el-radio-button label="left">置左</el-radio-button>
                      <el-radio-button label="center">置中</el-radio-button>
                      <el-radio-button label="right">置右</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="類型">
                    <el-radio-group v-model="styleConfig.titleType" size="medium">
                      <el-radio-button label="ch">中文</el-radio-button>
                      <el-radio-button label="en">英文</el-radio-button>
                      <el-radio-button label="num">數字</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="字級大小">
                    <el-input-number
                      size="small"
                      v-model="styleConfig.titleFontsize"
                      controls-position="right"
                      :min="12"
                      :max="20"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item label="顏色">
                    <el-color-picker v-model="styleConfig.titleColor"></el-color-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-switch
                      v-model="styleConfig.titleShowYear"
                      active-text="年月"
                      inactive-text="月"
                    >
                    </el-switch>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="周設定" name="2">
                  <el-form-item>
                    <el-switch
                      v-model="styleConfig.weekShow"
                      active-text="顯示"
                      inactive-text="隱藏"
                    >
                    </el-switch>
                  </el-form-item>
                  <el-form-item label="類型">
                    <el-radio-group v-model="styleConfig.weekType" size="medium">
                      <el-radio-button label="ch">中文</el-radio-button>
                      <el-radio-button label="en">英文</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="顏色">
                    <el-color-picker v-model="styleConfig.weekColor"></el-color-picker>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="日期設定" name="3">
                  <el-form-item label="字級大小(日期)">
                    <el-input-number
                      size="small"
                      v-model="styleConfig.dateFontsize"
                      controls-position="right"
                      :min="12"
                      :max="20"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item label="顏色(平日)">
                    <el-color-picker v-model="styleConfig.weekdayColor"></el-color-picker>
                  </el-form-item>
                  <el-form-item label="顏色(假日)">
                    <el-color-picker v-model="styleConfig.weekendColor"></el-color-picker>
                  </el-form-item>
                </el-collapse-item>
              </el-collapse>
            </el-form>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <v-stage ref="stage" :config="configStage" @wheel="resizeImage">
            <v-layer>
              <v-rect
                :config="Object.assign({ fill: canvasColor }, configStage)"
              ></v-rect>
              <v-image
                ref="image"
                v-if="imageConfig.image"
                :config="imageConfig"
                @mouseenter="dragHover(true)"
                @mouseleave="dragHover(false)"
              ></v-image>
              <Calendar
                :dateObject="yearMonth"
                :gap="gap"
                :styleConfig="styleConfig"
                @hover="dragHover"
              />
            </v-layer>
          </v-stage>
          <el-link
            id="btn-download"
            class="el-button el-button--primary"
            :href="downloadLink"
            v-if="imageConfig.image"
            icon="el-icon-download"
            :download="`月曆 ${yearMonth.getFullYear()}-${yearMonth.getMonth()+1}`"
            @mouseenter.native="updateDownloadLink"
            >下載</el-link
          >
        </el-main>
      </el-container>
    </el-container>
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
      imageConfig: {
        image: null,
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        draggable: true
      },
      downloadLink: '',
      canvasColor: '#fff',
      yearMonth: new Date(),
      gap: 10,
      configStage: {
        width: 500,
        height: 500
      },
      styleConfig: {
        lang: '',
        font: 'Noto Sans TC',
        titleFontsize: 16,
        titleColor: '#515151',
        titleAlign: 'center',
        titleShowYear: true,
        titleType: 'ch',
        weekColor: '#515151',
        weekShow: false,
        weekType: 'ch',
        dateFontsize: 14,
        weekdayColor: '#515151',
        weekendColor: '#F85AB6'
      }
    }
  },
  methods: {
    uploadImage (file) {
      const imageUrl = file[0] === undefined ? URL.createObjectURL(file.raw) : URL.createObjectURL(file[0])
      const img = new Image()
      img.src = imageUrl
      img.onload = () => {
        this.imageConfig.image = img
      }
    },
    updateDownloadLink () {
      this.downloadLink = this.$refs.stage.getNode().toDataURL({ pixelRatio: 3 })
    },
    resizeImage (e) {
      if (!this.imageConfig.image) return
      e.evt.preventDefault()
      const stage = this.$refs.stage.getNode()
      const image = this.$refs.image.getNode()
      const oldScale = this.imageConfig.scaleX
      const pointer = stage.getPointerPosition()

      const mousePointTo = {
        x: (pointer.x - image.x()) / oldScale,
        y: (pointer.y - image.y()) / oldScale
      }
      const delta = Math.sign(e.evt.wheelDelta) / 10
      const newScale = oldScale + delta <= 0.3 ? 0.3 : oldScale + delta >= 4 ? 4 : oldScale + delta

      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale
      }

      Object.assign(this.imageConfig, {
        x: newPos.x,
        y: newPos.y,
        scaleX: newScale,
        scaleY: newScale
      })
    },
    dragHover (isHover) {
      const style = isHover ? 'move' : 'default'
      this.$refs.stage.getNode().container().style.cursor = style
    }
  }
}
</script>
