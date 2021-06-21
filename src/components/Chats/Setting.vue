<template>
  <div class="nickname-setting">
    <div style="flex: 0 0 15%">新昵称：</div>
    <div style="flex: 0 0 55%"><a-input v-model="newNickName"></a-input></div>
    <div style="flex: 0 0 20%">
      <a-button type="primary" @click="handleChangeNick">提交修改</a-button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      newNickName: ''
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    handleChangeNick() {
      if (!this.newNickName) {
        return this.$message.info('修改的昵称不能为空')
      }
      this.$api.user.update({ newNickName: this.newNickName }).then(res => {
        if (res.code === '200') {
          this.$message.success('修改成功，重新登录可以生效哦')
        }
      })
    }
  },
  mounted() {
    this.newNickName = this.userInfo.nickname
  }
}
</script>
<style lang="less" scoped>
.nickname-setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
