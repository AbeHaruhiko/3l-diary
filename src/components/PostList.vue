<template>
  <div>
    <div class="panel panel-default" v-for="(post, index) in $store.state.posts" v-bind:key="index">
      <div class="panel-heading">
        <h3 class="panel-title">{{ post.createdAt }}</h3>
      </div>
      <div class="panel-body">
        post.body
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import firebase from 'firebase'

@Component({
})
export default class PostList extends Vue {
  mounted () {
    this.$store.dispatch('getPosts', { firebase })
  }
}
</script>

<style>
</style>
