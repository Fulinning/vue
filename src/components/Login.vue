<template>
  <div>
    <div class="line">
      <label>用户名</label>
      <el-input placeholder="请输入用户名" v-model="username"></el-input>
    </div>
    <div class="line">
      <label>密码</label>
      <el-input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="$emit('login',{username,password})"></el-input>
    </div>
    <div class="line btn-block">
      <el-button class="btn btn-normal" @click="$emit('closePopUp')">取消</el-button>
      <el-button type="primary" class="btn btn-main" @click="$emit('login',{username,password})">登录</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Login",
    data(){
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      closePopUp(){
        this.$emit('closePopUp')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .line {
    margin: 20px 0;
    &:first-of-type {
      margin-top: 0;
    }
    label {
      display: inline-block;
      margin-bottom: 15px;
    }
    .btn-main {
      margin-left: 40px;
    }
    &.btn-block {
      display: flex;
      justify-content: center;
    }
  }
</style>