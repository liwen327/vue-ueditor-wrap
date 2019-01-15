 <template>
  <el-container>
    <router-view></router-view>
  </el-container>
</template>
<script>
export default {
  name: 'con-check',
  props: {
    conId: [Number, String],
    resourceId: [Number, String]
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  },
  components: {
  }
}
</script>
<style lang="stylus">
</style>
