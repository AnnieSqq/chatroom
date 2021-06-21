<template>
  <div class="chhose-file">
    <a-upload-dragger name="file" action="http://api.chatroom.anniesqq.com/api/chat/file" @change="handleChange">
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p>拖拽或点击上传</p>
    </a-upload-dragger>
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
        this.$emit('fileok', res.data)
      }
    }
  }
}
</script>
