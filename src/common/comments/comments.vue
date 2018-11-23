<template>
  <div id="comments">
   
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: 'comments',
  components: {
   
  },
  data () {
    return {
    
    }
  },
  computed: {
  
  },
  watch: {
    
  },
  created() {
   
  },
  mounted(){
    const Valine = require('valine');
    if (typeof window !== 'undefined') {
      this.window = window
      window.AV = require('leancloud-storage')
    }
     
    new Valine({
      el: '#comments' ,
      appId: 'VITR9FskbbXnDcpwBdyTT15i-gzGzoHsz',
      appKey: 'acgrONeHircp8V2jHpsppXdm', 
      verify:false, 
      avatar:'mm', 
      placeholder: '欢迎留言与我分享你的想法。。。' 
    });
  },
  methods: {
    ...mapActions([
     
    ]),
    
  }
}
</script>

<style scoped>
#comments{
  margin-top: 20px;
  position: relative;
  background-color: #fff;
  animation: show .8s;
}
</style>
