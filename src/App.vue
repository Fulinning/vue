<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import icons from './assets/icons.js'
document.body.insertAdjacentHTML('afterbegin', icons) 

export default {
  name: 'app',
  created(){
    this.$store.commit('initResume')
  },
  beforeDestroy(){
    if(this.$store.state.user.userID){
      this.$store.dispatch('saveResume')
    }
  }
}
</script>

<style>
</style>
