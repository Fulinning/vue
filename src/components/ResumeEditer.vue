<template>
  <div id="resume-editer">
    <ol>
      <li v-for="item of resumeConfig" :class="{active:isActive === item.field}" @click="changeActive(item.field)">
        <svg>
          <use :xlink:href="`#icon-${item.icon}`"/>
        </svg>
      </li>
    </ol>
    <ul>
      <li v-for="item of resumeConfig" v-show="item.field === isActive">
        <div v-if="item.type === 'array'">
          <h2>{{$t(`${item.field}._`)}}</h2>
          <div v-for="(subItem,i) in resume[item.field]" class="block">
            <div v-for="(value,key) in subItem" class="line">
              <label>{{$t(`${item.field}.${key}`)}}</label>
              <el-input @input="inputResume(`${item.field}.${i}.${key}`,$event)" placeholder="请输入内容" :value="resume[item.field][i][key]" @focus="loginOrNot()" @blur="saveResume()"></el-input>              
            </div>
            <i class="el-icon-circle-close" @click="deleteSubItem(item.field,i)"></i> 
          </div>
          <el-button type="primary" class="btn main" @click="addSubItem(item.field)">新增</el-button>
        </div>
        <div v-else>
          <div v-for="(value,key) in resume[item.field]" class="line">
            <label>{{$t(`${item.field}.${key}`)}}</label>
            <el-input @input="inputResume(`${item.field}.${key}`,$event)" placeholder="请输入内容" :value="resume[item.field][key]" @focus="loginOrNot()" @blur="saveResume()"></el-input>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ResumeEditer',
  computed: {
    resumeConfig(){
      return this.$store.state.resumeConfig
    },
    resume(){
      return this.$store.state.resume
    },
    isActive(){
      return this.$store.state.active
    }
  },
  methods: {
    changeActive(nowActive){
      this.$store.commit('changeActive',nowActive)
    },
    inputResume(path,value){
      this.$store.commit('inputResume',{path,value})
    },
    addSubItem(path){
      this.$store.commit('addSubItem',path)
    },
    deleteSubItem(path,index){
      this.$store.commit('deleteSubItem',{path,index})      
    },
    loginOrNot(){
     let userID = this.$store.state.user.userID
     if(!userID){
      this.$message({
          message: '您还没有登录，数据无效哦~',
          type: 'warning'
        });
     }   
    },
    saveResume(){
      if(this.$store.state.user.userID){
        this.$store.dispatch('saveResume')
      }
    }
  }
}
</script>
<style lang="scss">
  @import '../assets/color';
  #resume-editer {
    width: 35vw;
    height: 100%;
    margin: 0 2vh;
    background: $gray-two;
    border-redius: 4px;
    display: flex;
    ol {
      list-style: none;
      margin: 0;
      box-sizing: border-box;
      padding: 0;
      padding-top: 1px;
      background: $gray-four;
      height: 100%;
      width: 20%;
      li {
        &.active svg {
          fill: snow;
        }
        width: 100%;
        height: 8vh;
        margin: 3vh 0;
        svg {
          width: 100%;
          height: 60%;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    ul {
      flex-grow: 1;
      list-style: none;
      height: 100%;
      overflow-y: auto;
      padding: 0;
      margin: 0;
      &::-webkit-scrollbar {display:none}
      h2 {
          margin-left: 30px;
          margin-bottom: 10px;
          color: gainsboro;
        }
      .btn.main {
          margin: 10px 30px 30px 30px;
          background: $green;
          border-color: $green;
          &:hover {
            background: #65b595;
          }          
        }
      .block {
        padding: 1px 0;
        position: relative;
        .line {
          margin: 3vh 0;
        }
        i {
          cursor: pointer;
          position: absolute;
          top: 25px;
          right: 50px;
          color: snow;
        }
      }
      .line {
        margin: 4vh 0;
        padding: 0 30px;
        label {
          color: snow;
          display: inline-block;
          margin-bottom: 15px;
        }
        input {
          width: 80%;
          &:focus {
            border-color: $gray-two;
          }
        }
      }
    }
  }
</style>