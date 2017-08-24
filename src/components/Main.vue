<template>
  <div>
    <div class="container">
      <post-list/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import PostList from './PostList.vue'

@Component({
  components: {
    'post-list': PostList
  }
})
export default class Main extends Vue {
}
</script>
