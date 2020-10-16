<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1 class="brand">📅 月曆製造</h1>
      </el-header>
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
                      accept=".jpeg,.jpg,.png,.JPG,.JPEG,.PNG"
                      :show-file-list="false"
                      :on-change="uploadImage"
                      :on-exceed="uploadImage"
                    >
                      <el-button type="primary" icon="el-icon-upload2">上傳圖片</el-button>
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
                      v-model="styleConfig.gap"
                      controls-position="right"
                      :min="0"
                      :max="15"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item label="字型">
                    <el-radio-group v-model="styleConfig.font" size="medium">
                      <el-radio-button label="Noto Sans TC" style="font-family: 'Noto Sans TC'">思源黑體</el-radio-button>
                      <el-radio-button label="Noto Serif TC" style="font-family: 'Noto Serif TC'">思源宋體</el-radio-button>
                      <el-radio-button label="HunInn" style="font-family: 'HunInn'">粉圓體</el-radio-button>
                      <el-radio-button label="Zpix" style="font-family: 'Zpix'">最像素</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="輸出尺寸">
                    <el-select v-model="outputConfig" value-key="device" placeholder="請選擇" @change="resetStage">
                      <el-option-group
                        v-for="group in deviceResolution"
                        :key="group.label"
                        :label="group.label">
                        <el-option
                          v-for="item in group.options"
                          :key="item.device"
                          :label="item.device"
                          :value="item">
                        </el-option>
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="年月設定" name="1">
                  <el-form-item>
                    <el-switch
                      v-model="styleConfig.titleShowYear"
                      active-text="年月"
                      inactive-text="月"
                    >
                    </el-switch>
                  </el-form-item>
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
                      :max="24"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item label="顏色">
                    <el-color-picker v-model="styleConfig.titleColor"></el-color-picker>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="日期設定" name="2">
                  <el-form-item label="字級大小(日期)">
                    <el-input-number
                      size="small"
                      v-model="styleConfig.dateFontsize"
                      controls-position="right"
                      :min="12"
                      :max="20"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item label="星期">
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
                  <el-form-item label="顏色(平日)">
                    <el-color-picker v-model="styleConfig.weekdayColor"></el-color-picker>
                  </el-form-item>
                  <el-form-item label="顏色(假日)">
                    <el-color-picker v-model="styleConfig.weekendColor"></el-color-picker>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="Unsplash">
                  <p><el-link type="primary" href="https://unsplash.com/" target="_blank">Unsplash</el-link> 是一個免授權的照片分享平台</p>
                  <el-form-item label="圖片尺寸">
                    <el-radio-group v-model="unsplashConfig.size" size="medium" @change="unsplashUrlCreator">
                      <el-radio-button label="2560x1440">橫向(16:9)</el-radio-button>
                      <el-radio-button label="1080x1920">直向(9:16)</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <el-input
                      class="input-with-select"
                      :placeholder="unsplashConfig.type === 'keyword' ? '請輸入關鍵字，建議使用英文' : '請填入Unsplash相片網址'"
                      v-model="unsplashConfig.text"
                      @keyup.enter.native="unsplashUrlCreator"
                    >
                      <el-select slot="prepend" v-model="unsplashConfig.type" @change="unsplashConfig.text=''">
                        <el-option label="關鍵字" value="keyword"></el-option>
                        <el-option label="網址" value="url"></el-option>
                      </el-select>
                    </el-input>
                    <div class="text-muted">輸入完後按下 Enter 送出</div>
                  </el-form-item>
                </el-collapse-item>
              </el-collapse>
            </el-form>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <div>
            <v-stage v-loading="imageIsLoading" element-loading-text="圖片載入中" ref="stage" :config="outputConfig" @wheel="resizeImage">
              <v-layer>
                <v-rect
                  :config="Object.assign({ fill: canvasColor }, outputConfig)"
                ></v-rect>
                <v-image
                  ref="image"
                  v-if="imageConfig.image"
                  :config="imageConfig"
                  @mouseenter="dragHover(true)"
                  @mouseleave="dragHover(false)"
                ></v-image>
                <Calendar
                  ref="calendar"
                  :dateObject="yearMonth"
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
              >下載</el-link>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'
// mixin
import deviceResolution from '@/mixins/deviceResolution.vue'
import { throttle } from '@/mixins/D&T.js'
export default {
  name: 'app',
  components: {
    Calendar
  },
  mixins: [deviceResolution],
  data () {
    return {
      imageIsLoading: false,
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
      styleConfig: {
        lang: '',
        gap: 10,
        font: 'Noto Sans TC',
        titleFontsize: 16,
        titleColor: '#515151',
        titleAlign: 'center',
        titleShowYear: true,
        titleType: 'ch',
        weekShow: false,
        weekType: 'ch',
        dateFontsize: 14,
        weekdayColor: '#515151',
        weekendColor: '#F85AB6'
      },
      outputConfig: {
        device: '1920*1080',
        width: 960,
        height: 540,
        pixelRatio: 2
      },
      unsplashConfig: {
        type: 'keyword',
        text: '',
        size: '2560x1440'
      }
    }
  },
  methods: {
    uploadImage (file) {
      const imageUrl = file[0] === undefined ? URL.createObjectURL(file.raw) : URL.createObjectURL(file[0])
      this.createImageObject(imageUrl)
    },
    unsplashUrlCreator: throttle(function () {
      const config = this.unsplashConfig
      if (config.text === '') return
      let url = 'https://source.unsplash.com/'

      switch (this.unsplashConfig.type) {
        case 'keyword':
          url += `${config.size}/?${config.text}/${Math.random() * 100}`
          break
        case 'url':
          if (config.text.includes('https://unsplash.com/photos/')) {
            url += `${config.text.replace('https://unsplash.com/photos/', '')}/${config.size}`
          } else {
            this.$notify({
              title: '錯誤的網址',
              type: 'error',
              position: 'bottom-left',
              duration: 1000
            })
            return
          }
          break
        default:
          break
      }
      this.createImageObject(url)
    }, 1000),
    createImageObject (url) {
      this.imageIsLoading = true
      const img = new Image()
      img.src = url
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        this.imageConfig.image = img
        this.imageIsLoading = false
      }
    },
    updateDownloadLink () {
      this.downloadLink = this.$refs.stage.getNode().toDataURL({ pixelRatio: 3 })
    },
    resizeImage (e) {
      const minScale = 0.1
      const maxScale = 5
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
      const delta = Math.sign(e.evt.wheelDelta) / 50
      const newScale = oldScale + delta <= minScale ? minScale : oldScale + delta >= maxScale ? maxScale : oldScale + delta

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
    },
    resetStage () {
      this.$refs.calendar.reset()
    }
  }
}
</script>
