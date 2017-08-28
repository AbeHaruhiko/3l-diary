<template>
  <div class="container">
    <textarea class="form-control" rows="3"></textarea>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
})
export default class PostEditor extends Vue {

  // post = this.$store.getters.getPostById(this.$route.params.id)
}
</script>

<style scoped>

</style>
