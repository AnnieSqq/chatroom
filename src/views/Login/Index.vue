<template>
  <div class="outer">
    <div class="header">
      <a-icon type="close" class="icon-close" @click="handleClose"></a-icon>
      <a-icon type="minus" @click="handleMinimize"></a-icon>
    </div>
    <div class="form-row">
      <a-icon type="user"></a-icon>
      <a-input
        v-model="userInput.username"
        placeholder="请输入用户名"
      ></a-input>
    </div>
    <div class="form-row">
      <a-icon type="lock"></a-icon>
      <a-input v-model="userInput.password" placeholder="请输入密码"></a-input>
    </div>
    <div class="submit-row">
      <a-button type="default" @click="handleRegister">注册</a-button>
      <a-button type="primary" @click="handleLogin">登录</a-button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'login',
  data() {
    return {
      userInput: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin() {
      this.$api.user.login(this.userInput).then(res => {
        if (res.code === '200') {
          this.$message.success(res.msg)
          ipcRenderer.send('login', JSON.stringify(res.data))
        }
      })
    },
    handleRegister() {
      this.$api.user.register(this.userInput).then(res => {
        if (res.code === '200') {
          this.$message.success(res.msg)
        }
      })
    },
    handleMinimize() {
      ipcRenderer.send('login-min')
    },
    handleClose() {
      ipcRenderer.send('login-close')
    }
  }
}
</script>

<style lang="less" scoped>
.outer {
  width: 90%;
  height: 90%;
  background-image: linear-gradient(322deg, #ccabd8, #fa897b);
  box-shadow: 0px 5px 10px #ee9285;
  // -webkit-app-region: drag;
  // * {
  //   -webkit-app-region: no-drag;
  // }
  .header {
    width: 100%;
    height: 72px;
    -webkit-app-region: drag;
    * {
      -webkit-app-region: no-drag;
    }
    .anticon {
      float: right;
      font-size: 16px;
      color: #ffdce4;
      padding: 8px 16px;
    }
    .anticon:hover {
      background-color: rgba(255, 255, 255, 0.199);
    }
    .icon-close:hover {
      background-color: #fd7083cc;
    }
  }
  .form-row {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 3px solid #ee9285;
    margin: 0px 32px 16px;
    .ant-input {
      background: none;
      border: none;
    }
    .ant-input:focus {
      box-shadow: none;
    }
  }
  .submit-row {
    display: flex;
    justify-content: space-around;
    margin-top: 32px;
    .ant-btn {
      box-shadow: 2px 6px 8px #ccabd8 inset;
      border: none;
    }
  }
}
</style>
