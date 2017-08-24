<template>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">{{ this.$store.getters.getPostById(this.$route.params.id).createdAt }}</h3>
      </div>
      <div class="panel-body">
        {{ this.$store.getters.getPostById(this.$route.params.id).body }}
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
})
export default class Post extends Vue {

  // post = this.$store.getters.getPostById(this.$route.params.id)
}
</script>

<style>
</style>
