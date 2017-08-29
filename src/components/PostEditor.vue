<template>
  <div class="container">
    <textarea class="form-control" rows="3" v-model="postBody"></textarea>
    <input class="btn btn-default" type="button" value="投稿する" @click="saveDiary">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import request from 'superagent'

import * as consts from '../consts/consts'
// import {Post} from '../types/Post'

@Component({
})
export default class PostEditor extends Vue {

  postBody: string = ''

  saveDiary () {
    console.log("function 'saveDiary' called.")

    if (!this.$store.state.currentUser) {
    } else {
      const router = this.$router // thisはパラメータの一番目にないといけないが、一番目はgetIdTokenの仕様上idTokenなので、thisを避けるため代入
      console.log(router)
      this.$store.state.currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        request
          .post(consts.API_ENDPOINT + 'posts')
          .send({ body: this.postBody, id: '', createdAt: '', updatedAt: '', username: '' }) // sends a JSON post body
          .set('X-Authorization-Firebase', idToken)
          .end((err, res) => {
            if (err) throw err
            console.log(res.body)
            this.$router.push('/')
          })
      }).catch(error => {
        // Handle error
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  textarea {
    width: 70%;
    margin: auto;
  }
</style>
