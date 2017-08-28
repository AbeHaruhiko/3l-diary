<template>
  <transition name="fade" v-on:after-enter="afterEnter">
    <div class="alert alert-info" role="alert" v-if="this.$store.state.message" id="message">{{ this.$store.state.message }}</div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
})
export default class Message extends Vue {
  // created () {
  //   this.$store.watch(this.$store.getters.getMessage, )
  // }

  afterEnter () {
    setTimeout(() => this.$store.commit('setMessage', null), 5000)
  }
}
</script>

<style scoped>
#message {
  position: absolute;
  top: 10px;
  right: 30px;
  z-index: 10;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
