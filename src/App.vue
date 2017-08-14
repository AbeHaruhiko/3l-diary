<template>
  <div id="app">
    <message/>
    <navbar/>
    <router-view></router-view>
  </div>
</template>
 
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Navbar from './components/Navbar.vue'
import Message from './components/Message.vue'

@Component({
  name: 'app',
  components: {
    'navbar': Navbar,
    'message': Message
  }
})
export default class App extends Vue {
}
</script>
 
<style>
#app {
  font-family: Lato, "Noto Sans JP", "游ゴシック Medium", "游ゴシック体", "Yu Gothic Medium", YuGothic, "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@media screen and (min-width: 768px) {
  .container {
    max-width: 730px;
  }
}
</style>
