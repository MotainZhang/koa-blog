<template>
  <div id="md-preview">
    <link href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css" rel="stylesheet">
    <section id="markdown-preview-body" class="preview markdown-body" v-highlight>
    	 <mavon-editor codeStyle="dark" :value="contents" :toolbarsFlag="toolbarsFlag" :subfield="toolbarsFlag" defaultOpen="preview"/>
    </section>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'
import { markdown } from 'UTIL/markdown'

export default {
  name: 'md-preview',
  props: ['contents'],
  data() {
    return  {
      toolbarsFlag: false,
    }
  },
  components: {
  },
  created() {
  },
  watch: {
   
  },
  mounted() {
   
  },
  beforeDestroy() {
   
  },
  methods: {
    ...mapActions([
      
    ]),
   
  }
}
</script>

<style lang="stylus" src="STYLUS/markdown.styl"></style>

<style lang="stylus">
@import '~STYLUS/color.styl'
#md-preview
  position: relative
  width: 100%
  margin-top: 10px
</style>
