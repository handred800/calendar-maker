<script>
export default {
  data () {
    return {
      deviceResolution: [
        {
          label: 'iPhone',
          options: [
            {
              device: '375*812(X)',
              width: 375,
              height: 812,
              pixelRatio: 3
            },
            {
              device: '414*736(6+ ~ 8+)',
              width: 414,
              height: 736,
              pixelRatio: 3
            },
            {
              device: '375*667(6 ~ 8)',
              width: 375,
              height: 667,
              pixelRatio: 3
            }
          ]
        },
        {
          label: 'pc',
          options: [
            {
              device: '2560*1600(16:10)',
              width: 1024,
              height: 640,
              pixelRatio: 2.5
            },
            {
              device: '2560*1440',
              width: 1024,
              height: 576,
              pixelRatio: 2.5
            },
            {
              device: '1920*1080',
              width: 960,
              height: 540,
              pixelRatio: 2
            },
            {
              device: '1600*900',
              width: 800,
              height: 450,
              pixelRatio: 2
            }
          ]
        }
      ]
    }
  }
}
</script>
