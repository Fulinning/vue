import Vue from 'vue'
import Vuex from 'vuex'
import objectPath from 'object-path'
import AV from '../lib/leancloud.js'
import { Message } from 'element-ui';


Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    active: 'profile',
    resumeConfig: [
      { field: 'profile', icon: 'id', key: ['name', 'job', 'city'] },
      { field: 'education', icon: 'book', type: 'array', key: ['school', 'details'] },
      { field: 'workHistory', icon: 'work', type: 'array', key: ['company', 'details'] },
      { field: 'awards', icon: 'heart', type: 'array', key: ['name', 'details'] },
      { field: 'projects', icon: 'cup', type: 'array', key: ['name', 'details'] },
      { field: 'contacts', icon: 'phone', type: 'array', key: ['contact', 'content'] }
    ],
    resume: {},
    user: {
      username: '',
      userID: ''
    }
  },
  mutations: {
    initResume(state) {
      state.resumeConfig.map((item) => {
        if (item.type === 'array') {
          Vue.set(state.resume, item.field, [])
        } else {
          Vue.set(state.resume, item.field, {})
          item.key.map((key) => {
            Vue.set(state.resume[item.field], key, '')
          })
        }
      })
    },
    changeActive(state, nowActive) {
      state.active = nowActive
    },
    inputResume(state, { path, value }) {
      objectPath.set(state.resume, path, value)
    },
    addSubItem(state, path) {
      let empty = {}
      state.resumeConfig.filter((item) => item.field === path)[0].key.map((key) => {
        Vue.set(empty, key, '')
      })
      state.resume[path].push(empty)
    },
    deleteSubItem(state, { path, index }) {
      state.resume[path].splice(index, 1)
    },
    showLogon(state) {
      state.LogonIsShow = true
    },
    showLogin(state) {
      state.LoginIsShow = true
    },
    userOnline(state, loginedUser) {
      state.user.username = loginedUser.attributes.username
      state.user.userID = loginedUser.id
    },
    logOut(state) {
      state.user.username = ''
      state.user.userID = ''
    },
    setResume(state, resume) {
      state.resumeConfig.map(({ field }) => {
        state.resume[field] = resume.attributes[field]
      })
    }
  },
  actions: {
    logonUser(context, { username, password }) {
      var user = new AV.User();
      user.setUsername(username);
      user.setPassword(password);
      user.signUp().then(function (loginedUser) {
        context.commit('userOnline', loginedUser),
          Message({
            message: '注册成功，已为您切换至已登录状态！',
            type: 'success'
          });
      }, function (error) {
        Message.error('注册失败，请重试！');
      });
    },
    loginUser({ commit, dispatch }, { username, password }) {
      AV.User.logIn(username, password).then(function (loginedUser) {
        commit('userOnline', loginedUser)
        dispatch('loadResume')
        Message({
          message: '登录成功，已为您切换至已登录状态！',
          type: 'success'
        });
      }, function (error) {
        Message.error('登录失败，请重试！');
      });
    },
    logOut(context) {
      AV.User.logOut()
      Message({
        message: '登出成功，已为您切换至未登录状态！',
        type: 'success'
      });
      context.commit('logOut')
    },
    saveResume({ state, commit }) {
      var Resume = AV.Object.extend('Resume');
      var query = new AV.Query('Resume');
      query.equalTo('userId', state.user.userID)
      query.first().then((getResume) => {
        if (getResume) {
          var resume = getResume
        } else {
          var resume = new Resume();
        }
        resume.set('profile', state.resume.profile);
        resume.set('education', state.resume.education);
        resume.set('workHistory', state.resume.workHistory);
        resume.set('awards', state.resume.awards);
        resume.set('projects', state.resume.projects);
        resume.set('contacts', state.resume.contacts);
        resume.set('userId', state.user.userID);

        // 新建一个 ACL 实例
        var acl = new AV.ACL();
        acl.setPublicReadAccess(true);
        acl.setWriteAccess(AV.User.current(), true);

        // 将 ACL 实例赋予 Resume 对象
        resume.setACL(acl);
        resume.save().then(function () {
          Message({
            message: '保存成功！',
            type: 'success'
          });
        }).catch(function (error) {
          Message.error('保存失败，请检查网络~');
        });
      })

    },
    loadResume({ state, commit }) {
      var query = new AV.Query('Resume');
      query.equalTo('userId', state.user.userID)
      query.first().then((resume) => {
        if (resume) {
          commit('setResume', resume)
        }
      })
    }
  }
})