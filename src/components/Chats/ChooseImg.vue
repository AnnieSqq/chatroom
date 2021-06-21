<template>
  <div class="chhose-file">
    <div class="file-preview">
      <a-upload-dragger
        list-type="picture-card"
        name="file"
        action="http://api.chatroom.anniesqq.com/api/chat/file"
        @change="handleChange"
        accept=".png,.jpg"
      >
        <p>
          <a-icon type="inbox" />
        </p>
        <p>拖拽或点击上传</p>
      </a-upload-dragger>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleChange(info) {
      const res = info.fileList[0].response
      if (res && res.code === '200') {
        this.$emit('imgok', res.data)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.chhose-file {
  height: 300px;
  .file-preview{
      height: 100px;
  }
}
</style>
