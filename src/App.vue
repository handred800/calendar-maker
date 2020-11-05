<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1 class="brand">📅 月曆製造</h1>
        <el-select style="max-width:6rem;" v-model="lang" @change="setLang" size="small">
          <el-option value="ch" :label="$t('LANG_FULL.CH')"></el-option>
          <el-option value="en" :label="$t('LANG_FULL.EN')"></el-option>
        </el-select>
      </el-header>
      <el-container>
        <el-aside width="400px">
          <el-scrollbar>
            <el-form>
              <el-collapse value="0">
                <el-collapse-item :title="$t('SYSTEM.SETTING_NAME.BASIC')" name="0">
                  <el-form-item :label="$t('NAME.UPLOAD')">
                    <el-upload
                      action="/"
                      :auto-upload="false"
                      :limit="1"
                      accept=".jpeg,.jpg,.png,.JPG,.JPEG,.PNG"
                      :show-file-list="false"
                      :on-change="uploadImage"
                      :on-exceed="uploadImage"
                    >
                      <el-button type="primary" icon="el-icon-upload2">{{ $t('NAME.IMAGE_UPLOAD') }}</el-button>
                      <div slot="tip" class="el-upload__tip">{{$t('TIPS.UPLOAD_LIMIT_TIPS')}}</div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item :label="$t('NAME.TIME')">
                    <el-date-picker
                      v-model="yearMonth"
                      type="month"
                      :placeholder="$t('NAME.YEAR')+$t('NAME.MONTH')"
                      :clearable="false"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item :label="$t('NAME.BACKGROUND_COLOR')">
                    <el-color-picker v-model="canvasColor"></el-color-picker>
                  </el-form-item>
                  <el-form-item :label="$t('NAME.SPACING')">
                    <el-input-number
                      size="small"
                      v-model="styleConfig.gap"
                      controls-position="right"
                      :min="0"
                      :max="15"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item :label="$t('NAME.FONT')">
                    <el-radio-group v-model="styleConfig.font" :size=" lang === 'ch' ? 'medium' : 'small'">
                      <el-radio-button label="Noto Sans TC" style="font-family: 'Noto Sans TC'">{{$t('NAME.FONT_NAME[0]')}}</el-radio-button>
                      <el-radio-button label="Noto Serif TC" style="font-family: 'Noto Serif TC'">{{$t('NAME.FONT_NAME[1]')}}</el-radio-button>
                      <el-radio-button label="HunInn" style="font-family: 'HunInn'">{{$t('NAME.FONT_NAME[2]')}}</el-radio-button>
                      <el-radio-button label="Zpix" style="font-family: 'Zpix'">{{$t('NAME.FONT_NAME[3]')}}</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item :label="$t('NAME.OUTPUT_SIZE')">
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
                <el-collapse-item :title="$t('SYSTEM.SETTING_NAME.YM')" name="1">
                  <el-form-item>
                    <el-switch
                      v-model="styleConfig.titleShowYear"
                      :active-text="`${$t('NAME.YEAR')} / ${$t('NAME.MONTH')}`"
                      :inactive-text="$t('NAME.MONTH')"
                    >
                    </el-switch>
                  </el-form-item>
                  <el-form-item :label="$t('NAME.ALIGN')">
                    <el-radio-group v-model="styleConfig.titleAlign" size="medium">
                      <el-radio-button label="left">{{$t('NAME.ALIGN_DIRECTION[0]')}}</el-radio-button>
                      <el-radio-button label="center">{{$t('NAME.ALIGN_DIRECTION[1]')}}</el-radio-button>
                      <el-radio-button label="right">{{$t('NAME.ALIGN_DIRECTION[2]')}}</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item :label="$t('NAME.TYPE')">
                    <el-radio-group v-model="styleConfig.titleType" size="medium">
                      <el-radio-button label="ch">{{$t('LANG.CH')}}</el-radio-button>
                      <el-radio-button label="en">{{$t('LANG.EN')}}</el-radio-button>
                      <el-radio-button label="num">{{$t('LANG.NUMBER')}}</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item :label="$t('NAME.FONT_SIZE')">
                    <el-input-number
                      size="small"
                      v-model="styleConfig.titleFontsize"
                      controls-position="right"
                      :min="12"
                      :max="24"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item :label="$t('NAME.COLOR')">
                    <el-color-picker v-model="styleConfig.titleColor"></el-color-picker>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item :title="$t('SYSTEM.SETTING_NAME.DATE')" name="2">
                  <el-form-item :label="`${$t('NAME.COLOR')} (${$t('NAME.DATE')})`">
                    <el-input-number
                      size="small"
                      v-model="styleConfig.dateFontsize"
                      controls-position="right"
                      :min="12"
                      :max="20"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item :label="$t('NAME.WEEK')">
                    <el-switch
                      v-model="styleConfig.weekShow"
                      :active-text="$t('NAME.SHOW')"
                      :inactive-text="$t('NAME.HIDE')"
                    >
                    </el-switch>
                  </el-form-item>
                  <el-form-item :label="$t('NAME.TYPE')">
                    <el-radio-group v-model="styleConfig.weekType" size="medium">
                      <el-radio-button label="ch">{{$t('LANG.CH')}}</el-radio-button>
                      <el-radio-button label="en">{{$t('LANG.EN')}}</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item :label="`${$t('NAME.COLOR')}(${$t('NAME.WEEKDAY')})`">
                    <el-color-picker v-model="styleConfig.weekdayColor"></el-color-picker>
                  </el-form-item>
                  <el-form-item :label="`${$t('NAME.COLOR')}(${$t('NAME.WEEKEND')})`">
                    <el-color-picker v-model="styleConfig.weekendColor"></el-color-picker>
                  </el-form-item>
                </el-collapse-item>
                <el-collapse-item title="Unsplash">
                  <p><el-link type="primary" href="https://unsplash.com/" target="_blank"><img src="https://unsplash.com/assets/core/logo-black-df2168ed0c378fa5506b1816e75eb379d06cfcd0af01e07a2eb813ae9b5d7405.svg" style="height:1em; margin-right:5px;" alt=""> Unsplash</el-link> {{$t('TIPS.UNSPLASH_DESCR_TIPS')}}</p>
                  <el-form-item :label="$t('NAME.IMAGE_SIZE')">
                    <el-radio-group v-model="unsplashConfig.orientation" size="medium" @change="unsplashUrlCreator">
                      <el-radio-button label="landscape">{{$t('NAME.LANDSCAPE')}} (16:9)</el-radio-button>
                      <el-radio-button label="portrait">{{$t('NAME.PORTRAIT')}} (9:16)</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <el-input
                      class="input-with-select"
                      :placeholder="unsplashConfig.type === 'keyword' ? $t('TIPS.SEARCH_KEYWORD_TIPS') : $t('TIPS.SEARCH_SPCIFIC_TIPS')"
                      v-model="unsplashConfig.text"
                      @keyup.enter.native="unsplashUrlCreator"
                    >
                      <el-select slot="prepend" v-model="unsplashConfig.type" @change="unsplashConfig.text=''">
                        <el-option :label="$t('NAME.KEYWORD')" value="keyword"></el-option>
                        <el-option :label="$t('NAME.URL')" value="url"></el-option>
                      </el-select>
                    </el-input>
                    <div class="text-muted">{{$t('TIPS.SEARCH_PLACEHOLDER_TIPS')}}</div>
                  </el-form-item>
                </el-collapse-item>
              </el-collapse>
            </el-form>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <div>
            <v-stage v-loading="imageIsLoading" :element-loading-text="$t('SYSTEM.LOADING')" ref="stage" :config="outputConfig" @wheel="resizeImage">
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
                <v-group v-if="this.unsplashConfig.text !== ''" :config="{ x: 0, y: outputConfig.height - 12 - 10 }">
                  <v-rect :config="{ width: attrConfig.text.length * 6 + 10, height: 12 + 10, fill: '#fff', opacity: 0.5 }"></v-rect>
                  <v-text :config="{ padding: 5, text: attrConfig.text }"></v-text>
                </v-group>
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
              >{{$t('SYSTEM.DOWNLOAD')}}</el-link>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// component
import Calendar from '@/components/Calendar.vue'
// mixin
import deviceResolution from '@/mixins/deviceResolution.vue'
import { throttle } from '@/mixins/D&T.js'
// unsplash init
import Unsplash, { toJson } from 'unsplash-js'
const unsplash = new Unsplash({ accessKey: process.env.VUE_APP_APPKEY })

export default {
  name: 'app',
  components: {
    Calendar
  },
  mixins: [deviceResolution],
  data () {
    return {
      lang: localStorage.getItem('language') || 'ch',
      imageAttr: '',
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
        orientation: 'landscape'
      }
    }
  },
  methods: {
    setLang (val) {
      this.$i18n.locale = val
      // localStorage.setItem('language', val)
      // return history.go(0)
    },
    uploadImage (file) {
      this.unsplashConfig.text = ''
      const imageUrl = file[0] === undefined ? URL.createObjectURL(file.raw) : URL.createObjectURL(file[0])
      this.createImageObject(imageUrl)
    },
    unsplashUrlCreator: throttle(function () {
      console.log(process.env.VUE_APP_APPKEY)
      const vm = this
      vm.imageIsLoading = true
      const config = vm.unsplashConfig
      if (config.text === '') return
      let url = ''

      let method = ''
      let options = null

      switch (vm.unsplashConfig.type) {
        case 'keyword':
          method = 'getRandomPhoto'
          options = { query: vm.unsplashConfig.text, orientation: vm.unsplashConfig.orientation }
          break
        case 'url':
          if (config.text.includes('https://unsplash.com/photos/')) {
            method = 'getPhoto'
            options = `${config.text.replace('https://unsplash.com/photos/', '')}/${config.size}`
          } else {
            vm.$notify({
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
      unsplash.photos[method](options)
        .then(toJson)
        .then((json) => {
          vm.imageAttr = `Photo by ${json.user.name} on Unsplash`
          url = json.urls.full
          this.createImageObject(url)
        }).catch((err) => {
          console.log(err)
          this.$notify({
            title: '發生錯誤',
            type: 'error',
            position: 'bottom-left',
            duration: 1000
          })
        })
    }, 1500),
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
      this.downloadLink = this.$refs.stage.getNode().toDataURL({ pixelRatio: this.outputConfig.pixelRatio })
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
  },
  computed: {
    attrConfig () {
      const padding = 5
      return {
        x: padding,
        y: this.outputConfig.height - 12 - padding,
        text: this.imageAttr
      }
    }
  }
}
</script>
