<template>
  <div>
    <div id="topbar">
      <h2>resumer</h2>
      <div class="button" v-if="!this.$store.state.user.userID">
        <el-button class="btn btn-normal" @click.prevent="LogonIsShow = true">注册</el-button>
        <el-button type="primary" class="btn btn-main" @click.prevent="LoginIsShow = true">登录</el-button>
      </div>
      <div class="button" v-else>
        <h3>欢迎您，{{username}}！</h3>
        <el-button class="btn btn-normal" @click="logOut">登出</el-button>
        <el-button class="btn btn-gray" @click="$router.push('preview')">预览</el-button>
        <el-button type="primary" class="btn btn-main" @click="saveResume">保存</el-button>
      </div>
    </div>
    <PopUp title="注册" :PopUpIsShow="LogonIsShow">
      <Logon @closePopUp="LogonIsShow = false" @logon="logon"></Logon>
    </PopUp>
    <PopUp title="登录" :PopUpIsShow="LoginIsShow">
      <Login @closePopUp="LoginIsShow = false" @login="login"></Login>
    </PopUp>
  </div>
</template>
<script>
import '../assets/color.scss'
import PopUp from './PopUp'
import Logon from './Logon'
import Login from './Login'

export default {
  name: 'Topbar',
  data(){
    return {
      LogonIsShow: false,
      LoginIsShow: false,
    }
  },
  computed: {
    username(){
      return this.$store.state.user.username
    }
  },
  methods: {
    logon({username,password}){
      this.LogonIsShow = false
      return this.$store.dispatch('logonUser',{username,password})
    },
    login({username,password}){
      this.LoginIsShow = false
      return this.$store.dispatch('loginUser',{username,password})
    },
    logOut(){
      this.$store.dispatch('logOut')
    },
    saveResume(){
      this.$store.dispatch('saveResume')      
    }
  },
  components: {
    PopUp,Logon,Login
  }
}

</script>
<style lang="scss" scoped>
  @import '../assets/color';
  #topbar {
    h3 {
      color: snow;
      font-weight: normal;
    }
    h2 {
      color: snow;
      margin: 0;
      margin-left: 2vw;
      line-height: 10vh;
    }
    .button {
      .btn {
        width: 6vw;
        margin-left: 1.5vw;
        &.btn-main {
          background: $green;
          border-color: $green;
        }
        &.btn-main:hover {
          background: #65b595;
        }
        &.btn-normal {
          border-color: $gray-one;
          color: $gray-three;
        }
        &.btn-gray {
          background: $gray-two;
          border-color: $gray-two;
          color: snow;          
        }
        &.btn-gray:hover {
          background: $gray-one;
        }
        &.btn-normal:hover {
          border-color: $green;
          color: $green;
        }
      }
      margin-right: 2vw;
      display: inline-flex;
      align-items: center;
    }
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>