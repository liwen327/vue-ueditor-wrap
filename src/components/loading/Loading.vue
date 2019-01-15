<template lang="html">
  <div class="progress alert round">
    <span class="meter bar" :style="{width:proBar+'%',background:colorParam,height: heightParam + 'px'}" ></span>
  </div>
</template>
<script>
export default {
  name: 'app-loading',
  data () {
    return {
      proBar: 70
    }
  },
  props: ['colorParam', 'heightParam'],
  mounted () {
  },
  methods: {
    change: function () {
      const clearInt = setInterval(() => {
        this.proBar++
        if (this.proBar === 100) {
          clearInterval(clearInt)
        }
      }, 10)
    }
  },
  created () {
    this.change()
  }
}
</script>
<style lang="stylus">
  .progress
    .bar
      display block
      left 0
      position fixed
      top 0
</style>
