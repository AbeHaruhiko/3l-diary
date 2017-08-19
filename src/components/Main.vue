<template>
  <div>
    <div class="container">
      <a href="#" @click="getPosts">posts</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import request from 'superagent'
import firebase from 'firebase'

import * as consts from '../consts/consts'

@Component({
  components: {
  }
})
export default class Main extends Vue {

  getPosts () {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
      request
        .get(consts.API_ENDPOINT + 'posts')
        .set('X-Authorization-Firebase', idToken)
        .end(function (err, res) {
          if (err) throw err
          console.log(res.body)
        })
    }).catch(error => {
      // Handle error
      console.log(error)
    })
  }
}
</script>
