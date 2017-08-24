<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import firebase from 'firebase'
import firebaseui from 'firebaseui'

@Component({
})
export default class Auth extends Vue {

  authUi: firebaseui.auth.AuthUI = this.$store.getters.firebaseUiApp

  mounted () {
    // signInSuccessUrlはセットするとサーバサイドでリダイレクトされるため/#/がおかしくなるので''にする。移動はvue-router.pushで実施。
    const uiConfig = {
      signInSuccessUrl: '',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    }

    this.authUi.start('#firebaseui-auth-container', uiConfig)
  }

  destroy () {
    this.authUi.reset()
  }
}
</script>
