<template>
  <div class="outer">
    <div class="sider"></div>
    <div class="main">
      <div class="header"></div>
      <div class="content"></div>
      <div class="input"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'chats',
  data() {
    return {}
  }
}
</script>
<style lang="less" scoped>
.outer {
  background-color: #ffa6008e;
  height: 576px;
  width: 876px;
  display: flex;
  * {
    border: 1px solid #666;
  }
  .sider {
    height: 100%;
    width: 300px;
  }
  .main {
    width: 576px;
    .header {
      height: 76px;
      -webkit-app-region: drag;
      * {
        -webkit-app-region: no-drag;
      }
    }
    .content {
      height: 300px;
    }
    .input {
      height: 200px;
    }
  }
}
</style>
